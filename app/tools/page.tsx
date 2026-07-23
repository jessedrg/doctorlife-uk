import type { Metadata } from "next";
import Link from "next/link";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { QuizTrigger } from "@/components/quiz-trigger";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, BRAND, breadcrumbSchema, itemListSchema } from "@/lib/seo";

const URL = `${SITE_URL}/tools`;

export const metadata: Metadata = {
  title: `Free health and weight calculators | ${BRAND}`,
  description:
    "Free health calculators: BMI, daily calorie expenditure (TDEE), calorie deficit and daily protein. Instant results and medical guidance from DoctorLife.",
  alternates: { canonical: URL },
  openGraph: {
    title: `Free health and weight calculators | ${BRAND}`,
    description:
      "Calculate your BMI, TDEE, calorie deficit and daily protein for free. Evidence-based tools with medical guidance.",
    url: URL,
    type: "website",
  },
};

const TOOLS = [
  {
    href: "/tools/bmi-calculator",
    title: "BMI Calculator",
    desc: "Find out your Body Mass Index and which weight range you fall into in seconds.",
    tag: "Weight",
  },
  {
    href: "/tools/tdee-calculator",
    title: "TDEE Calculator",
    desc: "Work out your total daily energy expenditure: how many calories you burn each day based on your activity.",
    tag: "Calories",
  },
  {
    href: "/tools/calorie-deficit-calculator",
    title: "Calorie Deficit Calculator",
    desc: "Discover how many calories to eat to lose weight at a healthy, sustainable pace.",
    tag: "Weight loss",
  },
  {
    href: "/tools/daily-protein-calculator",
    title: "Daily Protein Calculator",
    desc: "Work out how much protein you need each day based on your weight, goal and activity level.",
    tag: "Nutrition",
  },
];

const RELATED = [
  { href: "/weight-loss-with-medical-supervision", label: "Weight loss with medical supervision" },
  { href: "/blog/wegovy-price-uk", label: "Wegovy price in the UK" },
  { href: "/blog/ozempic-vs-wegovy-vs-mounjaro", label: "Ozempic vs Wegovy vs Mounjaro" },
];

export default function ToolsPage() {
  return (
    <QuizProvider>
      <div className="overflow-x-clip bg-paper">
        <Navbar />
        <main>
          <div className="mx-auto max-w-[1100px] px-5 pb-6 pt-10">
            {/* breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-[13px] text-ink-mute">
                <li><Link href="/" className="hover:text-ink">Home</Link></li>
                <li aria-hidden>/</li>
                <li className="font-medium text-ink">Tools</li>
              </ol>
            </nav>

            <header className="max-w-[680px]">
              <span className="text-[13px] font-semibold uppercase tracking-[.18em] text-clay">
                Free tools
              </span>
              <h1 className="mt-4 text-balance text-[clamp(34px,5vw,54px)] font-light leading-[1.05] tracking-[-.02em] text-ink">
                Calculadoras de <span className="font-serif italic text-olive">salud y peso</span>
              </h1>
              <p className="mt-5 text-pretty text-[17px] leading-relaxed text-ink-soft">
                Evidence-based tools to understand your body: BMI, caloric expenditure,
                déficit y proteína. Son un punto de partida — para un plan real, una valoración
                médica marca la diferencia.
              </p>
            </header>

            {/* Tools grid */}
            <section aria-labelledby="tools-heading" className="mt-12">
              <h2 id="tools-heading" className="sr-only">Listado de calculadoras</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {TOOLS.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="group flex flex-col rounded-[24px] border border-ink/10 bg-warm p-7 no-underline transition-shadow hover:shadow-[0_18px_40px_-22px_rgba(34,29,23,.4)]"
                  >
                    <span className="mb-4 inline-block w-fit rounded-full bg-sage/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[.12em] text-olive">
                      {t.tag}
                    </span>
                    <h3 className="text-balance text-[22px] font-medium leading-snug text-ink">
                      {t.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink-soft">
                      {t.desc}
                    </p>
                    <span className="mt-5 text-[14px] font-semibold text-olive">
                      Abrir calculadora →
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Enlazado interno hacia contenido relacionado */}
            <section aria-labelledby="related-heading" className="mt-14 rounded-[24px] border border-ink/10 bg-cream/50 px-7 py-7">
              <h2 id="related-heading" className="text-[13px] font-semibold uppercase tracking-[.14em] text-clay">
                Sigue informándote
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {RELATED.map((r) => (
                  <li key={r.href} className="flex items-start gap-2 text-[16px] leading-relaxed">
                    <span aria-hidden className="mt-[2px] text-clay">→</span>
                    <Link
                      href={r.href}
                      className="text-ink underline decoration-clay/40 underline-offset-4 hover:decoration-clay"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* CTA final */}
          <section className="mx-auto mt-12 max-w-[1100px] px-5 pb-16">
            <div className="flex flex-col items-center gap-8 rounded-[28px] bg-ink px-8 py-12 text-center md:flex-row md:px-14 md:text-left">
              <div className="flex-1">
                <span className="mb-3 inline-block rounded-full bg-sage/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[.14em] text-sage">
                  Primera visita gratis
                </span>
                <h2 className="text-balance text-3xl font-bold text-paper md:text-4xl">
                  ¿List@ para un plan de verdad?
                </h2>
                <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-paper/65">
                  Las calculadoras orientan, pero tu cuerpo es único. Reserva tu primera visita gratis y empieza con un plan diseñado en torno a ti.
                </p>
              </div>
              <div className="shrink-0">
                <QuizTrigger className="rounded-full bg-sage px-8 py-4 text-[15px] font-semibold text-ink">
                  Reservar primera visita
                </QuizTrigger>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Tools", url: URL },
          ]),
          itemListSchema(
            TOOLS.map((t) => ({ name: t.title, url: `${SITE_URL}${t.href}` })),
          ),
        ]}
      />
    </QuizProvider>
  );
}
