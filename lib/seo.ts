/* ───────────────────────────────────────────────────────────
   Helpers de datos estructurados (Schema.org / JSON-LD).
   Centraliza el SEO técnico: entidad de marca, buscador de
   sitelinks, breadcrumbs, FAQ y fichas de herramienta.
   Úsalo con <JsonLd data={...} /> en cualquier página.
   ─────────────────────────────────────────────────────────── */

export const SITE_URL = "https://doctorlife.io";
export const BRAND = "DoctorLife";
export const CONTACT_EMAIL = "hello@doctorlife.io";

/* Entidad de marca: organización médica. Ayuda a Google a entender
   que DoctorLife es una empresa real (clave en nichos YMYL de salud). */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
  image: `${SITE_URL}/icon.png`,
  slogan: "Tu cuerpo, por fin entendido",
  // TODO(negocio): añadir el nº de registro sanitario real como `identifier`
  // cuando esté disponible (refuerza E-E-A-T en salud). No inventar.
  email: CONTACT_EMAIL,
  description:
    "Cuidado del peso y hormonal dirigido por médicos colegiados, con tratamiento GLP‑1 supervisado y seguimiento real desde la app.",
  medicalSpecialty: ["Endocrinology", "Bariatrics"],
  knowsAbout: [
    "Obesidad",
    "Sobrepeso",
    "Salud metabólica",
    "Tratamiento GLP‑1",
    "Endocrinología",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "ES",
  },
  areaServed: { "@type": "Country", name: "España" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: CONTACT_EMAIL,
    availableLanguage: ["Spanish"],
    areaServed: "ES",
  },
  /* Perfiles externos verificables (refuerza la entidad en YMYL). */
  sameAs: ["https://es.trustpilot.com/review/doctorlife.io"],
  availableLanguage: "es",
} as const;

/* Sitio + buscador interno (sitelinks searchbox en resultados de Google). */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: BRAND,
  url: SITE_URL,
  inLanguage: "es-ES",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;

export type Crumb = { name: string; url?: string };

/* Migas de pan estructuradas para cualquier página. */
export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: c.url } : {}),
    })),
  };
}

/* Lista de FAQ -> rich result de preguntas frecuentes. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* Ficha de herramienta gratuita (calculadoras) -> WebApplication. */
export function toolSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    inLanguage: "es-ES",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/* Ficha de medicamento -> Drug (útil en posts sobre fármacos GLP‑1).
   Marca el estado de prescripción para dejar claro a Google/IA que es
   contenido informativo sobre un medicamento con receta, no venta. */
export function drugSchema(opts: {
  name: string;
  /** Denominación común internacional (p. ej. "semaglutida"). */
  nonProprietaryName?: string;
  description?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Drug",
    name: opts.name,
    ...(opts.nonProprietaryName
      ? { nonProprietaryName: opts.nonProprietaryName }
      : {}),
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.url ? { url: opts.url } : {}),
    prescriptionStatus: "PrescriptionOnly",
    inLanguage: "es-ES",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/* Página de listado (hubs como /herramientas o /autores). */
export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}
