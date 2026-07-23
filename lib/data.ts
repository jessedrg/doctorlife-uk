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
    name: "Monthly subscription",
    subtitle: "Continuous medical follow-up, prescription and one call consultation per month. No commitment.",
    price: "£139",
    priceSuffix: "/month",
    tag: "Subscription",
    img: "/products/maren-pen.png",
    featured: true,
    features: [
      "First assessment free",
      "Continuous medical follow-up with your doctor",
      "GLP-1 prescription (Mounjaro, Ozempic or Wegovy) when appropriate",
      "One call consultation per month",
      "Direct chat with your doctor via the app",
      "No commitment: cancel whenever you want",
    ],
  },
  {
    name: "5-month pack",
    subtitle: "The complete programme in a single payment. Best value for committed treatment.",
    price: "£449",
    priceSuffix: "· one-off payment · 5 months",
    tag: "Savings pack",
    img: "/products/maren-daily.png",
    features: [
      "5 months of medical follow-up",
      "GLP-1 prescription when appropriate",
      "One call consultation per month",
      "Direct chat with your doctor via the app",
      "Fixed price: much better value for you",
    ],
  },
  {
    name: "Nutritionist + GLP1",
    subtitle: "5-month programme with medical follow-up and nutritionist support.",
    price: "£649",
    priceSuffix: "· one-off payment · 5 months",
    tag: "Complete programme",
    img: "/products/maren-hd.png",
    features: [
      "5 months of medical follow-up",
      "Nutritionist support",
      "GLP-1 prescription when appropriate",
      "One call consultation per month",
      "Direct chat with your team via the app",
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
  { name: "Dr Elena Ruiz", role: "Independent doctor on the platform", spec: "Women's and hormonal health", img: "/experts/elena-ruiz.png" },
  { name: "Dr Marcus Hale", role: "Independent doctor on the platform", spec: "Metabolic medicine", img: "/experts/marcus-hale.png" },
  { name: "Dr Priya Nair", role: "Independent doctor on the platform", spec: "Thyroid and hormones", img: "/experts/priya-nair.png" },
  { name: "Dr James Okafor", role: "Independent doctor on the platform", spec: "Internal medicine", img: "/experts/james-okafor.png" },
  { name: "Dr Sofía Bergman", role: "Independent doctor on the platform", spec: "Cardiovascular health", img: "/experts/sofia-bergman.png" },
];

export type Metric = { value: number; prefix?: string; suffix?: string; label: string };

export const metrics: Metric[] = [
  { value: 24, prefix: "−", suffix: "%", label: "average body weight lost*" },
  { value: 92, suffix: "%", label: "stayed on their plan" },
  { value: 50, suffix: "k+", label: "patients in follow-up" },
  { value: 4.9, suffix: "★", label: "average rating" },
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
    q: "What is your main goal?",
    sub: "Take the first step. In 2 minutes you'll know if GLP‑1 treatment is right for you.",
    opts: [
      "Lose weight and keep it off",
      "Control hunger and cravings",
      "Improve my health and energy",
      "Feel better about my body",
    ],
  },
  {
    key: "amount",
    q: "How much weight would you like to lose?",
    sub: "There's no wrong answer. We just want to understand your starting point.",
    opts: ["Less than 5 kg", "Between 5 and 10 kg", "Between 10 and 20 kg", "More than 20 kg"],
  },
  {
    key: "tried",
    q: "What have you tried before without being able to maintain it?",
    sub: "If the weight always comes back, it's not your fault: it's your biology defending itself.",
    opts: [
      "Diets and counting calories",
      "Intense exercise",
      "Intermittent fasting",
      "A bit of everything… and it always comes back",
    ],
  },
  {
    key: "frustration",
    q: "What weighs on you most today?",
    sub: "Choose what resonates most with you right now.",
    opts: [
      "Constant hunger and cravings",
      "Regaining what I worked so hard to lose",
      "Not feeling good about myself",
      "How it's affecting my health",
    ],
  },
  {
    key: "glp1Experience",
    q: "Have you tried a GLP‑1 treatment like semaglutide?",
    sub: "It's the medication that's changing weight loss with real medical follow-up.",
    opts: ["I'm using it now", "I used it in the past", "No, but I'm interested", "I don't know what it is"],
  },
  {
    key: "why",
    q: "Why do you want to take the step now?",
    sub: "Being clear is half the journey.",
    opts: [
      "For my health and my future",
      "I want to feel like myself again",
      "I have an important moment coming up",
      "I'm tired of trying on my own",
    ],
  },
];

/* Todos los funnels (incluidas las campañas) usan el mismo cuestionario,
   mencionando el GLP‑1 abiertamente. */
export const adsQuizSteps: QuizStep[] = quizSteps;

export const adsProducts: Product[] = [
  {
    name: "Monthly subscription",
    subtitle:
      "Everything you need to manage your weight with real medical follow-up. First assessment free.",
    price: "£139",
    priceSuffix: "/month",
    tag: "Subscription",
    img: "/products/maren-pen.png",
    featured: true,
    features: [
      "First assessment free with a registered doctor",
      "Online GLP-1 prescription (Mounjaro, Ozempic or Wegovy) to buy at your pharmacy",
      "Continuous follow-up and dose adjustments via the app",
      "Direct chat with your doctor whenever you need it",
      "One call consultation per month included",
      "No commitment: cancel whenever you want",
    ],
  },
];

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export const footerColumns: FooterColumn[] = [
  {
    title: "Treatment",
    links: [
      { label: "How it works", href: "/#product" },
      { label: "Plans and pricing", href: "/#planes" },
      { label: "Real stories", href: "/#transform" },
      { label: "Book appointment", href: "/#cta" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Editorial policy", href: "/editorial-policy" },
      { label: "Weight loss with medical supervision", href: "/weight-loss-with-medical-supervision" },
      { label: "Medical blog", href: "/blog" },
      { label: "Our doctors", href: "/authors" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "BMI calculator", href: "/tools/bmi-calculator" },
      { label: "TDEE calculator", href: "/tools/tdee-calculator" },
      { label: "Calorie deficit", href: "/tools/calorie-deficit-calculator" },
      { label: "Daily protein", href: "/tools/daily-protein-calculator" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms and conditions", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
    ],
  },
];

/** Porcentaje usado en los textos ("Pierde hasta un {LOSS}%"). */
export const LOSS_STAT = 25;
