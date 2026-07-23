import Image from "next/image";
import {
  ShieldCheck,
  Video,
  Stethoscope,
  CalendarCheck,
  ClipboardList,
  HeartPulse,
  Lock,
  BadgeCheck,
} from "lucide-react";
import { QuizProvider } from "@/components/quiz-context";
import { QuizTrigger } from "@/components/quiz-trigger";
import { Navbar } from "@/components/navbar";
import { BrandLogo } from "@/components/brand-logo";
import { TrustBox } from "@/components/trustbox";
import { BeforeAfterCarousel } from "@/components/before-after-carousel";
import { SITE_URL, BRAND } from "@/lib/articles";

export type LandingConfig = {
  /** Canonical route, e.g. "/weight-consultation-glp1" */
  path: string;
  /** Prefix for analytics events, e.g. "ads-weight-glp1" */
  planPrefix: string;
  /** Top badge text */
  eyebrow: string;
  /** Headline (accepts JSX for styling parts) */
  headline: React.ReactNode;
  /** Subtitle under the headline */
  subtitle: string;
  /** Number of before/after cases to show (0 = no photos) */
  photos: number;
};

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us your case",
    text: "Complete a simple clinical questionnaire about your history, habits, and goals. Just a few minutes.",
  },
  {
    icon: Video,
    title: "Video consultation with your doctor",
    text: "A registered doctor assesses your situation via video call and answers your questions calmly.",
  },
  {
    icon: HeartPulse,
    title: "Plan and follow-up",
    text: "You receive a personalised plan and continuous follow-up via chat. If your doctor considers it clinically indicated, they can prescribe treatment and adjust it to your progress.",
  },
];

const benefits = [
  {
    icon: Stethoscope,
    title: "Endocrinologists and registered doctors",
    text: "Specialists in endocrinology and nutrition, registered and listed in the State Registry of Health Professionals (REPS).",
  },
  {
    icon: Video,
    title: "100% online, from home",
    text: "No travel or waiting rooms. You choose the schedule that suits you best.",
  },
  {
    icon: CalendarCheck,
    title: "Continuous follow-up",
    text: "Not a one-off consultation: we accompany you month by month and adjust the plan to your pace.",
  },
  {
    icon: ShieldCheck,
    title: "No commitment",
    text: "A single transparent subscription. You can pause or cancel whenever you want.",
  },
];

const faqs = [
  {
    q: "What does the first visit include?",
    a: "A complete clinical assessment with a registered doctor via video call, where your history and objectives are reviewed and the starting point is defined. The first visit is free, with no commitment.",
  },
  {
    q: "Are the doctors registered?",
    a: "Yes. All our professionals are doctors registered in Spain and listed in the State Registry of Health Professionals (REPS), including specialists in endocrinology and nutrition. We verify their qualifications and registration before incorporating them.",
  },
  {
    q: "Can the doctor prescribe treatment?",
    a: "Yes. When the clinical assessment justifies it, the doctor or endocrinologist can prescribe the treatment they consider appropriate for your case and follow it up. The indication always depends on an individual medical assessment; not all cases require medication.",
  },
  {
    q: "How much does it cost?",
    a: "The first assessment is free. If you decide to continue, you choose your plan: subscription of 139 €/month with no commitment, 5-month pack for 449 €, or nutritionist + GLP1 for 649 €. Includes follow-up via chat with your doctor and plan adjustment.",
  },
  {
    q: "Do I need to attend in person?",
    a: "It's not necessary: the service is 100% online. If at any point your doctor considers you need an in-person assessment or test, they will let you know and guide you on how to do it.",
  },
  {
    q: "Are my data protected?",
    a: "Yes. We process your health data in accordance with GDPR and LOPDGDD, with reinforced security measures and medical confidentiality.",
  },
];

export function WeightLossLanding({ config }: { config: LandingConfig }) {
  const { path, planPrefix, eyebrow, headline, subtitle, photos } = config;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: BRAND,
    url: `${SITE_URL}${path}`,
    medicalSpecialty: "Endocrinology",
    description:
      "Telemedicine service for weight control with doctors registered in Spain. Clinical assessment, personalised plan, and continuous follow-up.",
    areaServed: "ES",
    priceRange: "€€",
  };

  return (
    <QuizProvider>
      <div className="overflow-x-clip bg-paper">
        <Navbar />

        <main>
          {/* ── Hero ── */}
          <section className="mx-auto mt-5 max-w-none px-3 sm:px-4 lg:px-5">
            <div className="relative w-full overflow-hidden rounded-[36px]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(155deg,#6b774a 0%,#5f6a3e 45%,#454d2e 100%)",
                }}
              />

              <div className="relative z-[2] grid grid-cols-1 items-center gap-10 px-5 py-12 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:px-14 lg:py-16">
                <div className="max-w-[620px]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-paper/12 px-3 py-1.5 text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage backdrop-blur-sm">
                    <BadgeCheck aria-hidden className="h-4 w-4" />
                    {eyebrow}
                  </span>
                  <h1 className="mt-5 text-balance text-[clamp(30px,5vw,60px)] font-light leading-[1.04] tracking-[-.03em] text-paper">
                    {headline}
                  </h1>
                  <p className="mt-4 text-[15px] font-medium text-paper/75">
                    {subtitle}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <QuizTrigger
                      plan={planPrefix}
                      className="rounded-full bg-sage px-8 py-[15px] text-[16px] font-semibold text-ink shadow-lg"
                    >
                      Book free first visit
                    </QuizTrigger>
                    <span className="text-[13.5px] text-paper/70">
                      Free · no commitment
                    </span>
                  </div>

                  <div className="mt-7 max-w-[280px]">
                    <TrustBox theme="dark" alignment="left" />
                  </div>
                </div>

                {/* Media: carrusel de casos o imagen de consulta */}
                {photos > 0 ? (
                  <div className="mx-auto w-full max-w-[440px] lg:max-w-none">
                    <BeforeAfterCarousel count={photos} />
                  </div>
                ) : (
                  <div className="relative mx-auto aspect-[4/3] w-full max-w-[440px] overflow-hidden rounded-[24px] shadow-2xl ring-1 ring-paper/15 lg:max-w-none">
                    <Image
                      src="/landing/consulta-online.png"
                      alt="Médica colegiada durante una videoconsulta de control de peso"
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="object-cover"
                      style={{ objectPosition: "60% center" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── Barra de confianza ── */}
          <section className="mx-auto max-w-[1100px] px-5 pt-10">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Stethoscope, label: "Registered endocrinologists (REPS)" },
                { icon: ClipboardList, label: "Prescription if indicated" },
                { icon: ShieldCheck, label: "No commitment" },
                { icon: Lock, label: "Data protected (GDPR)" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-[16px] border border-ink/10 bg-warm px-4 py-3.5"
                >
                  <Icon aria-hidden className="h-5 w-5 flex-shrink-0 text-olive" />
                  <span className="text-[13.5px] font-medium leading-tight text-ink">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Cómo funciona ── */}
          <section
            aria-labelledby="como-funciona"
            className="mx-auto max-w-[1100px] px-5 pt-16"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
              How it works
            </span>
            <h2
              id="como-funciona"
              className="mt-3 max-w-[20ch] text-balance text-[clamp(26px,3.4vw,40px)] font-light leading-[1.1] text-ink"
            >
              Three steps to start safely
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <div
                  key={title}
                  className="relative rounded-[24px] border border-ink/10 bg-warm p-7"
                >
                  <span className="text-[13px] font-semibold text-clay">
                    0{i + 1}
                  </span>
                  <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/50">
                    <Icon aria-hidden className="h-6 w-6 text-olive" />
                  </div>
                  <h3 className="mt-5 text-[20px] font-medium text-ink">{title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Por qué con supervisión médica ── */}
          <section
            aria-labelledby="beneficios"
            className="mx-auto max-w-[1100px] px-5 pt-16"
          >
            <div className="overflow-hidden rounded-[32px] bg-espresso px-6 py-12 text-paper sm:px-12">
              <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-sage">
                Why with a doctor
              </span>
              <h2
                id="beneficios"
                className="mt-3 max-w-[24ch] text-balance text-[clamp(24px,3.2vw,38px)] font-light leading-[1.12]"
              >
                Weight has physiological causes. Treating them requires medical judgement.
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-paper/10">
                      <Icon aria-hidden className="h-5 w-5 text-sage" />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-medium text-paper">{title}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-paper/75">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Precio transparente ── */}
          <section
            aria-labelledby="precio"
            className="mx-auto max-w-[1100px] px-5 pt-16"
          >
            <div className="grid grid-cols-1 items-center gap-8 rounded-[32px] border border-ink/10 bg-warm p-8 sm:p-12 md:grid-cols-[1.1fr_1fr]">
              <div>
                <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
                  Transparent pricing
                </span>
                <h2
                  id="precio"
                  className="mt-3 text-balance text-[clamp(24px,3.2vw,38px)] font-light leading-[1.1] text-ink"
                >
                  Start free and decide calmly
                </h2>
                <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">
                  The first assessment is free. If you decide to continue, you choose your
                  plan: 139 €/month with no commitment, 5-month pack for 449 € or
                  nutritionist + GLP1 for 649 €. Covers follow-up with your doctor
                  and plan adjustment. No surprises.
                </p>
                <ul className="mt-6 flex flex-col gap-2.5 text-[15px] text-ink">
                  {[
                    "Assessment with registered doctor",
                    "Plan personalised to your case",
                    "Follow-up chat with your doctor",
                    "Cancel whenever you want",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <BadgeCheck
                        aria-hidden
                        className="h-[18px] w-[18px] flex-shrink-0 text-olive"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[24px] bg-espresso p-8 text-paper">
                <p className="text-[14px] text-paper/70">First visit</p>
                <p className="mt-1 flex items-end gap-2">
                  <span className="text-[48px] font-light leading-none">Free</span>
                  <span className="mb-1 text-[14px] text-paper/70">
                    no commitment
                  </span>
                </p>
                <div className="my-6 h-px bg-paper/15" />
                <p className="text-[14px] text-paper/70">
                  If you continue · choose your plan
                </p>
                <p className="mt-1 flex items-end gap-2">
                  <span className="text-[32px] font-light leading-none">139 €</span>
                  <span className="mb-1 text-[14px] text-paper/70">
                    /month · or 5-month pack 449 €
                  </span>
                </p>
                <QuizTrigger
                  plan={`${planPrefix}-precio`}
                  className="mt-7 block w-full rounded-full bg-sage px-7 py-[15px] text-center text-[16px] font-semibold text-ink"
                >
                  Book first visit
                </QuizTrigger>
                <p className="mt-3 text-center text-[12.5px] text-paper/60">
                  No commitment · cancel whenever you want
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section
            aria-labelledby="faq"
            className="mx-auto max-w-[860px] px-5 pt-16"
          >
            <h2
              id="faq"
              className="text-balance text-[clamp(24px,3.2vw,36px)] font-light leading-[1.1] text-ink"
            >
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-ink/10 overflow-hidden rounded-[24px] border border-ink/10 bg-warm">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16.5px] font-medium text-ink">
                    {q}
                    <span
                      aria-hidden
                      className="text-[22px] font-light text-clay transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ── CTA final ── */}
          <section
            aria-labelledby="cta-final"
            className="mx-auto max-w-[1100px] px-5 py-16"
          >
            <div className="overflow-hidden rounded-[32px] bg-espresso text-paper">
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
                <div className="p-8 sm:p-12">
                  <h2
                    id="cta-final"
                    className="text-balance text-[clamp(24px,3.2vw,36px)] font-light leading-[1.1]"
                  >
                    Take the first step today, with a doctor by your side
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-paper/75">
                    Book your free first visit. No travel, no commitment,
                    and with the rigour of registered doctors.
                  </p>
                  <QuizTrigger
                    plan={`${planPrefix}-final`}
                    className="mt-8 inline-block rounded-full bg-sage px-8 py-[15px] text-[16px] font-semibold text-ink"
                  >
                    Book free first visit
                  </QuizTrigger>
                  <p className="mt-5 text-[14px] text-paper/70">
                    Want to know us better?{" "}
                    <a
                      href="/#product"
                      className="font-medium text-paper underline decoration-paper/40 underline-offset-4 transition-colors hover:decoration-paper"
                    >
                      Discover how DoctorLife works
                    </a>
                  </p>
                </div>
                <div className="relative min-h-[260px] md:min-h-full">
                  <Image
                    src="/landing/consulta-online.png"
                    alt="Consulta médica online de control de peso"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg,#171009 0%,transparent 55%)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Medical compliant notice (without drug names) */}
            <p className="mx-auto mt-8 max-w-[70ch] text-center text-[12.5px] leading-relaxed text-ink-mute">
              Telemedicine service provided by doctors registered in Spain.
              The indication of any treatment always depends on an
              individual medical assessment. This service does not guarantee specific
              results and does not replace in-person care when necessary.
              We process your data in accordance with GDPR and LOPDGDD.
            </p>
          </section>
        </main>

        {/* ── Clean and compliant footer (without drug names) ── */}
        <footer className="px-3 pb-6 pt-[40px] sm:px-4 lg:px-5">
          <div className="mx-auto max-w-none overflow-hidden rounded-[32px] bg-ink text-paper">
            <div className="grid grid-cols-1 gap-x-10 gap-y-8 px-8 pb-10 pt-12 md:grid-cols-[1.6fr_1fr_1fr] md:px-14">
              <div>
                <a
                  href="/"
                  aria-label="DoctorLife — home"
                  className="inline-flex no-underline"
                >
                  <BrandLogo
                    boxed
                    markSize={28}
                    textSize={23}
                    textClassName="text-paper"
                  />
                </a>
                <p className="mt-5 max-w-[320px] text-[15px] leading-relaxed text-paper/65">
                  Telemedicine platform that connects patients with independent
                  registered doctors for weight control with medical supervision.
                </p>
                <QuizTrigger
                  plan={`${planPrefix}-footer`}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-sage px-6 py-[12px] text-[15px] font-semibold text-ink"
                >
                  Book free first visit
                  <span className="text-[13px]">↗</span>
                </QuizTrigger>
                <TrustBox theme="dark" alignment="left" className="mt-6 max-w-[260px]" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[.14em] text-sage">
                  Service
                </span>
                <ul className="mt-4 flex flex-col gap-3 text-[15px] text-paper/75">
                  <li>
                    <a href="#como-funciona" className="no-underline hover:text-paper">
                      How it works
                    </a>
                  </li>
                  <li>
                    <a href="#precio" className="no-underline hover:text-paper">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="no-underline hover:text-paper">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <span className="text-xs uppercase tracking-[.14em] text-sage">
                  Legal
                </span>
                <ul className="mt-4 flex flex-col gap-3 text-[15px] text-paper/75">
                  <li>
                    <a
                      href="/legal/privacy-policy"
                      className="no-underline hover:text-paper"
                    >
                      Privacy policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/legal/terms-of-services"
                      className="no-underline hover:text-paper"
                    >
                      Terms and conditions
                    </a>
                  </li>
                  <li>
                    <a href="/cookies" className="no-underline hover:text-paper">
                      Cookie policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-1 border-t border-paper/10 px-8 py-7 text-[12.5px] text-paper/45 md:flex-row md:items-center md:justify-between md:px-14">
              <span>© 2026 DoctorLife · doctorlife.io</span>
              <span>Service subject to individual medical assessment.</span>
            </div>
          </div>
        </footer>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
    </QuizProvider>
  );
}
