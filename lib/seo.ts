/* ───────────────────────────────────────────────────────────
   Helpers de datos estructurados (Schema.org / JSON-LD).
   Centraliza el SEO técnico: entidad de marca, buscador de
   sitelinks, breadcrumbs, FAQ y fichas de herramienta.
   Úsalo con <JsonLd data={...} /> en cualquier página.
   ─────────────────────────────────────────────────────────── */

export const SITE_URL = "https://doctorlife-uk.com";
export const BRAND = "DoctorLife";
export const CONTACT_EMAIL = "hello@doctorlife.io";

/* Brand entity: medical organisation. Helps Google understand that
   DoctorLife is a real company (key in YMYL health niches). */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
  image: `${SITE_URL}/icon.png`,
  slogan: "Your body, finally understood",
  // TODO(business): add the real healthcare registration number as `identifier`
  // once available (reinforces E-E-A-T in health). Do not invent.
  email: CONTACT_EMAIL,
  description:
    "Doctor-led weight and hormonal care with a real medical assessment and ongoing follow-up from the app.",
  medicalSpecialty: ["Endocrinology", "Bariatrics"],
  knowsAbout: [
    "Obesity",
    "Overweight",
    "Metabolic health",
    "Weight management",
    "Endocrinology",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: CONTACT_EMAIL,
    availableLanguage: ["English"],
    areaServed: "GB",
  },
  /* Verifiable external profiles (reinforces the entity in YMYL). */
  sameAs: ["https://uk.trustpilot.com/review/doctorlife.io"],
  availableLanguage: "en",
} as const;

/* Sitio + buscador interno (sitelinks searchbox en resultados de Google). */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: BRAND,
  url: SITE_URL,
  inLanguage: "en-GB",
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
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
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
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/* Listing page (hubs like /tools or /authors). */
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
