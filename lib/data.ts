/* ───────────────────────────────────────────────────────────
   Contenido centralizado. Cambia textos / precios / personas
   aquí una sola vez y toda la página se actualiza. Las fotos
   reales viven en /public (productos y equipo médico).
   ─────────────────────────────────────────────────────────── */

export type Product = {
  name: string;
  subtitle: string;
  price: string;
  /** Texto tras el precio, p. ej. "/mes" o "· pago único · 5 meses". */
  priceSuffix?: string;
  tag: string;
  img: string;
  features: string[];
  featured?: boolean;
  /** Plan aún no disponible: se muestra como teaser «Próximamente», no es seleccionable. */
  comingSoon?: boolean;
};

/* Tres planes reales. La primera valoración es gratuita (gancho) y luego el
   paciente elige: suscripción mensual, pack de 5 meses o nutricionista+GLP1.
   Servicios médicos exentos de IVA: los precios son finales. */
export const products: Product[] = [
  {
    name: "Suscripción mensual",
    subtitle: "Seguimiento médico continuo, receta y una consulta por llamada al mes. Sin permanencia.",
    price: "139€",
    priceSuffix: "/mes",
    tag: "Suscripción",
    img: "/products/maren-pen.png",
    featured: true,
    features: [
      "Primera valoración gratuita",
      "Seguimiento médico continuo con tu médico",
      "Receta de GLP-1 (Mounjaro, Ozempic o Wegovy) cuando proceda",
      "Una consulta por llamada al mes",
      "Chat directo con tu médico desde la app",
      "Sin permanencia: cancela cuando quieras",
    ],
  },
  {
    name: "Pack 5 meses",
    subtitle: "El programa completo en un único pago. La mejor relación calidad-precio para comprometerte.",
    price: "449€",
    priceSuffix: "· pago único · 5 meses",
    tag: "Pack ahorro",
    img: "/products/maren-daily.png",
    features: [
      "5 meses de seguimiento médico",
      "Receta de GLP-1 cuando proceda",
      "Una consulta por llamada al mes",
      "Chat directo con tu médico desde la app",
      "Precio cerrado: te sale mucho más barato",
    ],
  },
  {
    name: "Nutricionista + GLP1",
    subtitle: "Programa de 5 meses con seguimiento médico y acompañamiento de nutricionista.",
    price: "649€",
    priceSuffix: "· pago único · 5 meses",
    tag: "Programa completo",
    img: "/products/maren-hd.png",
    features: [
      "5 meses de seguimiento médico",
      "Acompañamiento de nutricionista",
      "Receta de GLP-1 cuando proceda",
      "Una consulta por llamada al mes",
      "Chat directo con tu equipo desde la app",
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

export type QuizStep = { key: string; q: string; sub?: string; opts: string[] };

/* ── Cuestionario orientado a pérdida de peso con GLP‑1 ──
   Secuencia psicológica de conversión:
   1) Aspiración (objetivo) → primer clic fácil, visualiza el resultado.
   2) Empatía → quita la culpa ("no es culpa tuya, es biología").
   3) Dolor emocional → conecta con lo que de verdad le importa.
   4) Conciencia de la solución → introduce el GLP‑1 como la respuesta.
   5) Compromiso ("por qué ahora") → refuerza la motivación antes de pedir datos.
   El orden crea micro‑compromisos crecientes y momentum. */
export const quizSteps: QuizStep[] = [
  {
    key: "objective",
    q: "¿Cuál es tu objetivo principal?",
    sub: "Da el primer paso. En 2 minutos sabrás si el tratamiento GLP‑1 es para ti.",
    opts: [
      "Perder peso y no recuperarlo",
      "Controlar el hambre y los antojos",
      "Mejorar mi salud y mi energía",
      "Sentirme mejor con mi cuerpo",
    ],
  },
  {
    key: "amount",
    q: "¿Cuánto peso te gustaría perder?",
    sub: "No hay respuesta incorrecta. Solo queremos entender tu punto de partida.",
    opts: ["Menos de 5 kg", "Entre 5 y 10 kg", "Entre 10 y 20 kg", "Más de 20 kg"],
  },
  {
    key: "tried",
    q: "¿Qué has intentado antes sin conseguir mantenerlo?",
    sub: "Si el peso siempre vuelve, no es culpa tuya: es tu biología defendiéndose.",
    opts: [
      "Dietas y contar calorías",
      "Ejercicio a tope",
      "Ayuno intermitente",
      "Un poco de todo… y siempre vuelve",
    ],
  },
  {
    key: "frustration",
    q: "¿Qué es lo que más te pesa hoy?",
    sub: "Elige lo que más te suene ahora mismo.",
    opts: [
      "El hambre y los antojos constantes",
      "Recuperar lo que tanto me costó perder",
      "No sentirme bien conmigo mismo/a",
      "Cómo está afectando a mi salud",
    ],
  },
  {
    key: "glp1Experience",
    q: "¿Has probado un tratamiento GLP‑1 como la semaglutida?",
    sub: "Es la medicación que está cambiando la pérdida de peso con seguimiento médico real.",
    opts: ["Lo estoy usando ahora", "Lo usé en el pasado", "No, pero me interesa", "No sé qué es"],
  },
  {
    key: "why",
    q: "¿Por qué quieres dar el paso ahora?",
    sub: "Tenerlo claro es la mitad del camino.",
    opts: [
      "Por mi salud y mi futuro",
      "Quiero volver a sentirme yo",
      "Tengo un momento importante cerca",
      "Estoy cansado/a de intentarlo solo/a",
    ],
  },
];

/* Todos los funnels (incluidas las campañas) usan el mismo cuestionario,
   mencionando el GLP‑1 abiertamente. */
export const adsQuizSteps: QuizStep[] = quizSteps;

export const adsProducts: Product[] = [
  {
    name: "Suscripción mensual",
    subtitle:
      "Todo lo que necesitas para cuidar tu peso con seguimiento médico real. Primera valoración gratuita.",
    price: "139€",
    priceSuffix: "/mes",
    tag: "Suscripción",
    img: "/products/maren-pen.png",
    featured: true,
    features: [
      "Primera valoración gratuita con médico colegiado",
      "Receta online de GLP-1 (Mounjaro, Ozempic o Wegovy) para comprar en tu farmacia",
      "Seguimiento continuo y ajustes de dosis desde la app",
      "Chat directo con tu médico cuando lo necesites",
      "Una consulta por llamada al mes incluida",
      "Sin permanencia: cancela cuando quieras",
    ],
  },
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
      { label: "Sobre nosotros", href: "/sobre-nosotros" },
      { label: "Política editorial", href: "/politica-editorial" },
      { label: "Adelgazar con supervisión médica", href: "/adelgazar-con-supervision-medica" },
      { label: "Blog médico", href: "/blog" },
      { label: "Nuestros médicos", href: "/autores" },
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
