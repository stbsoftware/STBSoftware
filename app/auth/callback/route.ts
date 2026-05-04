import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";

/** Rutas permitidas tras `exchangeCodeForSession` (evita redirects abiertos). */
const ALLOWED_AFTER_AUTH = new Set<string>([
  "/cuenta",
  "/restablecer-contrasena",
]);

function safeNextPath(raw: string | null, fallback = "/cuenta"): string {
  if (!raw?.trim()) return fallback;
  let t: string;
  try {
    t = decodeURIComponent(raw).trim();
  } catch {
    return fallback;
  }
  if (!t.startsWith("/") || t.startsWith("//")) return fallback;
  if (t.includes("://")) return fallback;
  return ALLOWED_AFTER_AUTH.has(t) ? t : fallback;
}
/*
command:
npm run dev

result:
> webpersonal@0.1.0 dev
> node scripts/dev-with-browser.mjs

node:internal/modules/package_json_reader:301
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'open' imported from /Users/hermestrujillopgmail.com/LocalDocuments/STBSoftware/scripts/dev-with-browser.mjs
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:301:9)
    at packageResolve (node:internal/modules/esm/resolve:768:81)
    at moduleResolve (node:internal/modules/esm/resolve:859:18)
    at defaultResolve (node:internal/modules/esm/resolve:991:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:713:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:730:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:759:52)
    at #resolve (node:internal/modules/esm/loader:695:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:615:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:160:33) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v25.5.0

*/ 

/**
 * PKCE/email de confirmación: las cookies deben ir en el NextResponse.redirect,
 * no solo en cookieStore — si no, el intercambio “funciona” pero el navegador no guarda sesión.
 */
export async function GET(request: NextRequest) {
  const urlEnv =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonEnv =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

  const origin = request.nextUrl.origin;
  const code = request.nextUrl.searchParams.get("code");
  const safeNext = safeNextPath(request.nextUrl.searchParams.get("next"));

  const loginErrorUrl = `${origin}/login?error=auth`;
  const successUrl = `${origin}${safeNext}`;

  const oauthErr = request.nextUrl.searchParams.get("error");
  const oauthErrDesc =
    request.nextUrl.searchParams.get("error_description");
  if (oauthErr || oauthErrDesc) {
    return NextResponse.redirect(loginErrorUrl);
  }

  if (!code || !urlEnv || !anonEnv) {
    return NextResponse.redirect(loginErrorUrl);
  }

  const response = NextResponse.redirect(successUrl);

  const supabase = createServerClient(urlEnv, anonEnv, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(loginErrorUrl);
  }

  return response;
}
