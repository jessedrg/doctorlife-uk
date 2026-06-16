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
  /** Si es true, el plan se muestra como "Próximamente" y no es contratable. */
  comingSoon?: boolean;
};

/* Catálogo enfocado en cuidado del peso (los 4 productos clave
   + dos planes de entrada y mantenimiento). Cada plan incluye
   seguimiento continuo desde la app interna de Maren. */
export const products: Product[] = [
  {
    name: "Seguimiento con endocrino",
    subtitle:
      "Tu endocrino asignado, videollamada mensual de seguimiento y chat en vivo con tu médico durante toda la suscripción.",
    price: "65€/mes + IVA",
    tag: "Disponible",
    img: "/products/maren-pen.png",
    featured: true,
    features: [
      "Endocrino asignado a tu caso",
      "Videollamada mensual de seguimiento",
      "Chat en vivo con tu médico mientras dure la suscripción",
      "Receta y ajustes de tratamiento según tu evolución",
      "Panel privado con tu historial y tus recetas",
    ],
  },
  {
    name: "Plan Nutrición",
    subtitle: "Nutricionista dedicado y plan de alimentación personalizado.",
    price: "Próximamente",
    tag: "Próximamente",
    img: "/products/maren-daily.png",
    comingSoon: true,
    features: [
      "Nutricionista asignado",
      "Plan de alimentación a medida",
      "Seguimiento de hábitos desde la app",
    ],
  },
  {
    name: "Plan Longevidad",
    subtitle: "Salud metabólica y hormonal al máximo nivel.",
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
  { name: "Dra. Elena Ruiz", role: "Directora médica", spec: "Salud femenina y hormonal", img: "/experts/elena-ruiz.png" },
  { name: "Dr. Marcus Hale", role: "Responsable de peso", spec: "Medicina metabólica", img: "/experts/marcus-hale.png" },
  { name: "Dra. Priya Nair", role: "Jefa de endocrinología", spec: "Tiroides y hormonas", img: "/experts/priya-nair.png" },
  { name: "Dr. James Okafor", role: "Asuntos médicos", spec: "Medicina interna", img: "/experts/james-okafor.png" },
  { name: "Dra. Sofía Bergman", role: "Asesora de cardiología", spec: "Salud cardiovascular", img: "/experts/sofia-bergman.png" },
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
      { label: "Comprar Wegovy Barcelona", href: "/blog/comprar-wegovy-barcelona" },
      { label: "Comprar Mounjaro Barcelona", href: "/blog/comprar-mounjaro-barcelona" },
      { label: "Wegovy precio España", href: "/blog/wegovy-precio-espana" },
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
