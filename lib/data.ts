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
};

/* Catálogo enfocado en cuidado del peso (los 4 productos clave
   + dos planes de entrada y mantenimiento). Cada plan incluye
   seguimiento continuo desde la app interna de Maren. */
export const products: Product[] = [
  {
    name: "Weight Loss Basic",
    subtitle: "Empieza tu tratamiento con acompañamiento médico real.",
    price: "149€/mes",
    tag: "Entrada",
    img: "/products/maren-oral.png",
    features: [
      "Evaluación médica completa con un endocrino",
      "Receta de GLP‑1 (Wegovy, Mounjaro u Ozempic) asignada para tu caso",
      "Seguimiento mensual desde la app",
      "Mensajería con tu equipo clínico",
      "Ajustes de dosis según tu evolución",
    ],
  },
  {
    name: "Weight Loss Plus",
    subtitle: "El plan más completo para resultados sostenibles.",
    price: "199€/mes",
    tag: "Recomendado",
    img: "/products/maren-pen.png",
    featured: true,
    features: [
      "Todo lo del plan Basic",
      "Receta de GLP‑1 (Wegovy, Mounjaro u Ozempic) asignada para tu caso",
      "Nutricionista asignado y plan personalizado",
      "Plan de entrenamiento adaptado",
      "Seguimiento quincenal desde la app",
      "Recordatorios y registro de progreso",
      "Soporte por chat en horario ampliado",
    ],
  },
  {
    name: "Weight Loss Premium",
    subtitle: "Atención prioritaria y máximo acompañamiento.",
    price: "249€/mes",
    tag: "Premium",
    img: "/products/maren-hd.png",
    features: [
      "Todo lo del plan Plus",
      "Receta de GLP‑1 (Wegovy, Mounjaro u Ozempic) asignada para tu caso",
      "Revisiones médicas quincenales",
      "Acceso prioritario a tu equipo",
      "Informes de progreso detallados",
      "Analíticas de control incluidas",
      "Coordinación con tu médico de cabecera",
    ],
  },
  {
    name: "Weight Maintenance",
    subtitle: "Mantén tu peso tras finalizar el tratamiento.",
    price: "99€/mes",
    tag: "Mantenimiento",
    img: "/products/maren-daily.png",
    features: [
      "Estrategia anti‑rebote personalizada",
      "Receta de GLP‑1 (Wegovy, Mounjaro u Ozempic) asignada para tu caso",
      "Plan de mantenimiento tras el GLP‑1",
      "Seguimiento mensual desde la app",
      "Pautas de nutrición y hábitos",
      "Revisión médica trimestral",
    ],
  },
  {
    name: "Longevity Premium",
    subtitle: "Salud metabólica y hormonal al máximo nivel.",
    price: "499€/mes",
    tag: "Longevidad",
    img: "/products/maren-balance.png",
    features: [
      "Médico dedicado en exclusiva",
      "Receta de GLP‑1 (Wegovy, Mounjaro u Ozempic) asignada para tu caso",
      "Analíticas avanzadas (130+ biomarcadores)",
      "Optimización hormonal personalizada",
      "Plan de longevidad y prevención",
      "Seguimiento continuo desde la app",
      "Acceso a especialistas de la red Maren",
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
  { q: "¿Qué te trae a DoctorLife?", opts: ["Perder peso", "Equilibrar mis hormonas", "Ambas cosas", "Solo estoy explorando"] },
  { q: "¿Has usado un GLP‑1 antes?", opts: ["Ahora mismo lo uso", "En el pasado", "Nunca"] },
  { q: "¿Cómo prefieres tomarlo?", opts: ["Oral a diario", "Pluma semanal", "Sin preferencia"] },
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
