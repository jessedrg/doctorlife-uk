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
  featured?: boolean;
};

/* Catálogo enfocado en cuidado del peso (los 4 productos clave
   + dos planes de entrada y mantenimiento). */
export const products: Product[] = [
  {
    name: "Weight Loss Basic",
    subtitle: "Evaluación médica, receta GLP‑1 si procede y seguimiento mensual.",
    price: "149€/mes",
    tag: "Entrada",
    img: "/products/maren-oral.png",
  },
  {
    name: "Weight Loss Plus",
    subtitle: "Todo lo anterior + nutricionista asignado y plan personalizado.",
    price: "199€/mes",
    tag: "Recomendado",
    img: "/products/maren-pen.png",
    featured: true,
  },
  {
    name: "Weight Loss Premium",
    subtitle: "Revisiones quincenales, acceso prioritario e informes de progreso.",
    price: "249€/mes",
    tag: "Premium",
    img: "/products/maren-hd.png",
  },
  {
    name: "Weight Maintenance",
    subtitle: "Estrategia anti‑rebote y plan de mantenimiento tras el GLP‑1.",
    price: "99€/mes",
    tag: "Mantenimiento",
    img: "/products/maren-daily.png",
  },
  {
    name: "Longevity Premium",
    subtitle: "Médico dedicado, analíticas avanzadas y optimización hormonal.",
    price: "499€/mes",
    tag: "Longevidad",
    img: "/products/maren-balance.png",
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
  { q: "¿Qué te trae a Maren?", opts: ["Perder peso", "Equilibrar mis hormonas", "Ambas cosas", "Solo estoy explorando"] },
  { q: "¿Has usado un GLP‑1 antes?", opts: ["Ahora mismo lo uso", "En el pasado", "Nunca"] },
  { q: "¿Cómo prefieres tomarlo?", opts: ["Oral a diario", "Pluma semanal", "Sin preferencia"] },
  { q: "¿Cuál es tu horizonte?", opts: ["Próximos 3 meses", "6–12 meses", "A largo plazo"] },
];

export type FooterColumn = { title: string; links: string[] };

export const footerColumns: FooterColumn[] = [
  { title: "Cuidado", links: ["Pérdida de peso", "Salud hormonal", "Analíticas", "Salud mental", "Piel"] },
  { title: "Popular", links: ["Opciones GLP‑1", "Semaglutida", "Tirzepatida", "Menopausia", "Sueño"] },
  { title: "Maren", links: ["Sobre nosotros", "Cómo funciona", "Excelencia clínica", "Empleo", "Prensa"] },
  { title: "Contacto", links: ["Centro de ayuda", "Contacto", "Privacidad", "Términos"] },
];

/** Porcentaje usado en los textos ("Pierde hasta un {LOSS}%"). */
export const LOSS_STAT = 25;
