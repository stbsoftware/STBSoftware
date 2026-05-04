import type { Metadata } from "next";

const CS_URL = "https://www.coffeesocial.com";
const FEC_URL = "https://fundacion-eternos.netlify.app/";

const cardClassName =
  "group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_1px_3px_rgb(15_23_42/0.06)] transition duration-200 hover:border-brand-primary/45 hover:shadow-[0_4px_20px_rgb(37_99_235/0.1)] sm:p-6";

export const metadata: Metadata = {
  title: "Trabajos y proyectos",
  description:
    "Hoja de vida, trabajos en Google Drive y perfil en LinkedIn.",
};

export default function TrabajosYProyectosPage() {
  return (
    <main className="min-h-screen bg-gray-50/90 px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
       <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
          Trabajos y proyectos
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <a
            href={FEC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClassName}
          >
            <h2 className="text-lg font-semibold text-ink">Fundación Eternos Colombia</h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Conectamos corazones generosos con necesidades reales...
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:gap-2">
              Ir a sitio web
              <span aria-hidden>→</span>
            </span>
          </a>

          <a
            href={CS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClassName}
          >
            <h2 className="text-lg font-semibold text-ink">
              Mobile App Coffee Social
            </h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Connect Over Coffee
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:gap-2">
              Go to website
              <span aria-hidden>→</span>
            </span>
          </a>

        </div>
      </div>
    </main>
  );
}
