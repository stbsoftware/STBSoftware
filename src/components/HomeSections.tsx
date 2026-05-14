import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EMAIL, PHONE_DISPLAY, PHONE_E164 } from "@/config/contact";

const MAILTO_HREF = `mailto:${EMAIL}`;

const cardClassName =
  "flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_1px_3px_rgb(15_23_42/0.06)] transition duration-200 hover:border-brand-primary/45 hover:shadow-[0_4px_20px_rgb(37_99_235/0.1)] sm:p-6";

const linkCardClassName =
  "group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_1px_3px_rgb(15_23_42/0.06)] transition duration-200 hover:border-brand-primary/45 hover:shadow-[0_4px_20px_rgb(37_99_235/0.1)] sm:p-6";

const CS_URL = "https://www.coffeesocial.com";
const FEC_URL = "https://fundacion-eternos.netlify.app/";

export const HOME_SECTION_DESCRIPTION =
  "Páginas web, aplicaciones, publicidad con Google y contacto con STB Software.";

/** Metadatos de la página de inicio (contenido unificado aquí). */
export const HOME_PAGE_METADATA = {
  title: "STB Software",
  description:
    `${HOME_SECTION_DESCRIPTION} Trabajos y redes en una sola página.`,
} satisfies Metadata;

function SectionShell({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16 md:scroll-mt-32 md:py-20"
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export default function HomeSections() {
  return (
    <div className="border-t border-line/80 bg-gray-50/90">
      <SectionShell id="servicios">
        <h2
          id="servicios-heading"
          className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
        >
          Servicios
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <div className={cardClassName}>
            <h3 className="text-lg font-semibold text-ink">Páginas web</h3>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Sitios que se ven bien en cualquier dispositivo para tener marca
              empresarial.
            </p>
          </div>

          <div className={cardClassName}>
            <h3 className="text-lg font-semibold text-ink">Aplicaciones web</h3>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Para gestionar de forma segura la información de su empresa.
            </p>
          </div>

          <div className={cardClassName}>
            <h2 className="text-lg font-semibold text-ink">Aplicaciones móviles Apple</h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Convertimos su idea en una aplicación móvil funcional para que la encuentre en la App Store.
            </p>
          </div>

          <div className={cardClassName}>
            <h2 className="text-lg font-semibold text-ink">Aplicaciones móviles Android</h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Convertimos su idea en una aplicación móvil funcional para que la encuentre en Google Play Store.
            </p>
          </div>

          <div className={cardClassName}>
            <h3 className="text-lg font-semibold text-ink">
              Publicidad con Google
            </h3>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Aparición en las búsquedas de Google para captar clientes.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="trabajos">
        <h2
          id="trabajos-heading"
          className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
        >
          Trabajos
        </h2>

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
      </SectionShell>

      <SectionShell id="contacto">
        <h2 id="contacto-heading"
          className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
        >
          Contacto
        </h2>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6">
          <a href={`tel:${PHONE_E164}`} className={linkCardClassName}>
            <h3 className="text-lg font-semibold text-ink">Llamadas</h3>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Llámame al{" "}
              <span className="font-medium text-ink">{PHONE_DISPLAY}</span>.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:gap-2">
              Llamar ahora
              <span aria-hidden>→</span>
            </span>
          </a>

          <a href={MAILTO_HREF} className={linkCardClassName}>
            <h3 className="text-lg font-semibold text-ink">Correo</h3>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Correo personal:{" "}
              <span className="font-medium text-ink break-all">{EMAIL}</span>.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:gap-2">
              Enviar correo
              <span aria-hidden>→</span>
            </span>
          </a>
        </div>
      </SectionShell>
    </div>
  );
}
