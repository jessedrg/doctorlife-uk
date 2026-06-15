/* ───────────────────────────────────────────────────────────
   Centralized content. Swap copy / pricing / people here once
   and every section updates. Imagery is procedural CSS art
   (see components/art.tsx); replace with <Image> when you have
   real photography.
   ─────────────────────────────────────────────────────────── */

export type Product = {
  name: string;
  mol: string;
  price: string;
  tag: string;
  kind: "pen" | "pill";
  /** CSS gradient for pill art */
  pillBg?: string;
};

export const products: Product[] = [
  {
    name: "Maren Oral",
    mol: "Semaglutide",
    price: "From $79/mo",
    tag: "New",
    kind: "pill",
    pillBg:
      "radial-gradient(60% 60% at 38% 32%,#fff,#efe7da 55%,#d6c8b3)",
  },
  { name: "Maren Pen", mol: "Semaglutide", price: "From $149/mo", tag: "Weekly", kind: "pen" },
  {
    name: "Maren Daily",
    mol: "Tirzepatide",
    price: "From $159/mo",
    tag: "New",
    kind: "pill",
    pillBg: "radial-gradient(60% 60% at 38% 32%,#f3c79a,#d49a63 55%,#a65f3b)",
  },
  { name: "Maren HD", mol: "High dose", price: "From $199/mo", tag: "High dose", kind: "pen" },
  {
    name: "Maren Balance",
    mol: "Hormone support",
    price: "From $39/mo",
    tag: "New",
    kind: "pill",
    pillBg: "radial-gradient(60% 60% at 38% 32%,#eef0e2,#cdd3b4 55%,#9aa472)",
  },
];

export type Expert = {
  name: string;
  role: string;
  spec: string;
  initials: string;
  /** CSS gradient placeholder for portrait */
  av: string;
};

export const experts: Expert[] = [
  { name: "Dr. Elena Ruiz, MD", role: "Chief Medical Officer", spec: "Women’s & hormonal health", initials: "ER", av: "linear-gradient(140deg,#c98a4f,#7a4a2b)" },
  { name: "Dr. Marcus Hale, MD", role: "Head of Weight Care", spec: "Metabolic medicine", initials: "MH", av: "linear-gradient(140deg,#a9b083,#5f6a3e)" },
  { name: "Dr. Priya Nair, MD", role: "Endocrinology Lead", spec: "Thyroid & hormones", initials: "PN", av: "linear-gradient(140deg,#d8a36a,#9a5a33)" },
  { name: "Dr. James Okafor, MD", role: "Medical Affairs", spec: "Internal medicine", initials: "JO", av: "linear-gradient(140deg,#8c8f9e,#4a4d5e)" },
  { name: "Dr. Sofia Bergman, MD", role: "Cardiology Advisor", spec: "Heart health", initials: "SB", av: "linear-gradient(140deg,#caa06a,#7a4a2b)" },
];

export type Metric = { value: number; prefix?: string; suffix?: string; label: string };

export const metrics: Metric[] = [
  { value: 24, prefix: "−", suffix: "%", label: "avg. body weight lost*" },
  { value: 92, suffix: "%", label: "stayed on their plan" },
  { value: 50, suffix: "k+", label: "members in care" },
  { value: 4.9, suffix: "★", label: "member rating" },
];

export type QuizStep = { q: string; opts: string[] };

export const quizSteps: QuizStep[] = [
  { q: "What brings you to Maren?", opts: ["Lose weight", "Balance my hormones", "Both", "Just exploring"] },
  { q: "Have you used a GLP‑1 before?", opts: ["Currently on one", "In the past", "Never"] },
  { q: "How would you like to take it?", opts: ["Daily oral", "Weekly pen", "No preference"] },
  { q: "What is your timeline?", opts: ["Next 3 months", "6–12 months", "Long term"] },
];

export type FooterColumn = { title: string; links: string[] };

export const footerColumns: FooterColumn[] = [
  { title: "Care", links: ["Weight care", "Hormonal care", "Labs", "Mental health", "Skin"] },
  { title: "Popular", links: ["GLP‑1 options", "Semaglutide", "Tirzepatide", "Menopause", "Sleep"] },
  { title: "Maren", links: ["About us", "How it works", "Clinical excellence", "Careers", "Press"] },
  { title: "Connect", links: ["Help center", "Contact", "Privacy", "Terms"] },
];

/** Default percentage used across copy ("Lose up to {LOSS}%"). */
export const LOSS_STAT = 25;
