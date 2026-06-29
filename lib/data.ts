/* ───────────────────────────────────────────────────────────
   Contenido centralizado. Cambia textos / precios / personas
   aquí una sola vez y toda la página se actualiza. Las fotos
   reales viven en /public (productos y equipo médico).
   ─────────────────────────────────────────────────────────── */

export type Product = {
  name: string;
  subtitle: string;
  price: string;
  tag: string;
  img: string;
  features: string[];
  featured?: boolean;
  /** Plan aún no disponible: se muestra como teaser «Próximamente», no es seleccionable. */
  comingSoon?: boolean;
};

/* Una única suscripción real (100 €/mes) con todo lo necesario para el
   tratamiento con GLP‑1. El resto de servicios llegarán «Próximamente». */
export const products: Product[] = [
  {
    name: "Tratamiento GLP‑1",
    subtitle: "Todo lo que necesitas para adelgazar con seguimiento médico real, en una sola cuota.",
    price: "100€/mes + IVA",
    tag: "Suscripción",
    img: "/products/maren-pen.png",
    featured: true,
    features: [
      "Chat directo con endocrino colegiado en la plataforma",
      "Receta de GLP‑1 (Wegovy, Mounjaro u Ozempic) si es necesaria",
      "Seguimiento continuo y ajustes de dosis desde la app",
      "Sin permanencia: cancela cuando quieras",
    ],
  },
  {
    name: "Nutrición personalizada",
    subtitle: "Plan de alimentación diseñado por tu nutricionista para potenciar el GLP‑1.",
    price: "Próximamente",
    tag: "Próximamente",
    img: "/products/maren-daily.png",
    comingSoon: true,
    features: [
      "Nutricionista asignado a tu caso",
      "Plan de comidas adaptado a tu tratamiento",
      "Seguimiento de hábitos desde la app",
    ],
  },
  {
    name: "Entrenamiento guiado",
    subtitle: "Rutinas adaptadas para preservar músculo y mantener tus resultados.",
    price: "Próximamente",
    tag: "Próximamente",
    img: "/products/maren-hd.png",
    comingSoon: true,
    features: [
      "Plan de entrenamiento personalizado",
      "Enfoque en preservar masa muscular",
      "Progresión y registro desde la app",
    ],
  },
  {
    name: "Longevidad y hormonas",
    subtitle: "Salud metabólica y hormonal al máximo nivel para el largo plazo.",
    price: "Próximamente",
    tag: "Próximamente",
    img: "/products/maren-balance.png",
    comingSoon: true,
    features: [
      "Analíticas avanzadas de biomarcadores",
      "Optimización hormonal personalizada",
      "Plan de longevidad y prevención",
    ],
  },
];

export type Expert = {
  name: string;
  role: string;
  spec: string;
  img: string;
};

export const experts: Expert[] = [
  { name: "Dra. Elena Ruiz", role: "Médica independiente en la plataforma", spec: "Salud femenina y hormonal", img: "/experts/elena-ruiz.png" },
  { name: "Dr. Marcus Hale", role: "Médico independiente en la plataforma", spec: "Medicina metabólica", img: "/experts/marcus-hale.png" },
  { name: "Dra. Priya Nair", role: "Médica independiente en la plataforma", spec: "Tiroides y hormonas", img: "/experts/priya-nair.png" },
  { name: "Dr. James Okafor", role: "Médico independiente en la plataforma", spec: "Medicina interna", img: "/experts/james-okafor.png" },
  { name: "Dra. Sofía Bergman", role: "Médica independiente en la plataforma", spec: "Salud cardiovascular", img: "/experts/sofia-bergman.png" },
];

export type Metric = { value: number; prefix?: string; suffix?: string; label: string };

export const metrics: Metric[] = [
  { value: 24, prefix: "−", suffix: "%", label: "peso corporal medio perdido*" },
  { value: 92, suffix: "%", label: "siguió con su plan" },
  { value: 50, suffix: "k+", label: "pacientes en seguimiento" },
  { value: 4.9, suffix: "★", label: "valoración media" },
];

export type QuizStep = { q: string; opts: string[] };

export const quizSteps: QuizStep[] = [
  { q: "¿Has usado un GLP‑1 antes?", opts: ["Ahora mismo lo uso", "En el pasado", "Nunca"] },
];

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export const footerColumns: FooterColumn[] = [
  {
    title: "Tratamiento",
    links: [
      { label: "Cómo funciona", href: "/#product" },
      { label: "Planes y precios", href: "/#planes" },
      { label: "Historias reales", href: "/#transform" },
      { label: "Reservar visita", href: "/#cta" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Adelgazar con supervisión médica", href: "/adelgazar-con-supervision-medica" },
      { label: "Comprar Wegovy Barcelona", href: "/blog/comprar-wegovy-barcelona" },
      { label: "Comprar Mounjaro Barcelona", href: "/blog/comprar-mounjaro-barcelona" },
      { label: "Wegovy precio España", href: "/blog/wegovy-precio-espana" },
    ],
  },
  {
    title: "Herramientas",
    links: [
      { label: "Calculadora de IMC", href: "/herramientas/calculadora-imc" },
      { label: "Calculadora TDEE", href: "/herramientas/calculadora-tdee" },
      { label: "Déficit calórico", href: "/herramientas/calculadora-deficit-calorico" },
      { label: "Proteína diaria", href: "/herramientas/calculadora-proteina-diaria" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de privacidad", href: "/privacidad" },
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Política de cookies", href: "/cookies" },
    ],
  },
];

/** Porcentaje usado en los textos ("Pierde hasta un {LOSS}%"). */
export const LOSS_STAT = 25;
