import Image from "next/image";
import {
  ShieldCheck,
  Stethoscope,
  ClipboardList,
  MessageSquareText,
  Clock,
  Lock,
  BadgeCheck,
  FileCheck2,
  Check,
  Star,
  TrendingDown,
  Truck,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";
import { QuizProvider } from "@/components/quiz-context";
import { QuizTrigger } from "@/components/quiz-trigger";
import { BrandLogo } from "@/components/brand-logo";
import { Navbar } from "@/components/navbar";
import { TrustBox } from "@/components/trustbox";
import { Counter } from "@/components/counter";
import { HeroVideo } from "@/components/hero-video";
import { SITE_URL, BRAND } from "@/lib/articles";

export type ClinicConfig = {
  /** Canonical path, e.g. "/online-doctor-consultation" */
  path: string;
  /** Prefix for analytics events, e.g. "ads-clinic" */
  planPrefix: string;
};

const heroPoints = [
  { icon: TrendingDown, label: "Lose up to 25% of your weight with GLP-1 treatment" },
  { icon: Stethoscope, label: "Guidance and a call with a GMC-registered doctor" },
  { icon: MessageSquareText, label: "Live chat follow-up, whenever you need it" },
  { icon: FileCheck2, label: "Prescription issued if the doctor prescribes it" },
  { icon: Truck, label: "Delivered to your home — no queues or travel" },
];

const stats = [
  { to: 14, prefix: "−", suffix: " kg", label: "Average with follow-up*" },
  { to: 4.8, prefix: "", suffix: "/5", label: "Patient rating" },
  { to: 3, prefix: "<", suffix: " h", label: "Response from your doctor" },
];

const packIncludes = [
  "Video consultation with a GMC-registered doctor",
  "Appointment and GLP-1 prescription, if the doctor prescribes it",
  "Follow-up with the endocrinologist throughout treatment",
  "Live chat with your doctor whenever you need it",
  "Weekly painless injection, easy to use at home",
];

const steps = [
  {
    icon: ClipboardList,
    title: "Complete the medical questionnaire",
    text: "You complete a simple clinical questionnaire about your history, habits and goals. Just a few minutes.",
  },
  {
    icon: FileCheck2,
    title: "A registered doctor assesses you",
    text: "A registered doctor reviews your request, provides a diagnosis and, if appropriate, prescribes a GLP-1 treatment suited to your case.",
  },
  {
    icon: MessageSquareText,
    title: "Receive it and follow up",
    text: "You receive your treatment at home and message your doctor about any questions, effects or adjustments you need.",
  },
];

/** Real reviews verified on Trustpilot (uk.trustpilot.com/review/doctorlife.io) */
const reviews = [
  {
    name: "Eric Jenkins",
    initial: "E",
    stars: 5,
    title: "All online without losing the personal touch",
    text: "What I liked most about Dr. Life was being able to do everything online without losing the feeling of being well looked after. I've lost 14 kg and my blood tests have improved enormously.",
    timeAgo: "3 days ago",
  },
  {
    name: "Samuel Shah",
    initial: "S",
    stars: 5,
    title: "18 kg in 5 months",
    text: "I started the treatment quite scared because I'd tried many diets without success. In 5 months I've lost 18 kg and the follow-up with the endocrinologist has been excellent. I felt supported the whole way.",
    timeAgo: "3 days ago",
  },
  {
    name: "Max",
    initial: "M",
    stars: 5,
    title: "GLP-1 treatment 10/10",
    text: "I did the GLP-1 treatment and honestly it's 10/10, happy with the result and the care.",
    timeAgo: "4 days ago",
  },
  {
    name: "Zachary Moore",
    initial: "Z",
    stars: 4,
    title: "Finally a treatment that works",
    text: "After years struggling with my weight, I finally found a treatment that works and a team that understands the problem of obesity. Highly recommended.",
    timeAgo: "3 days ago",
  },
];

const faqs = [
  {
    q: "Is it safe?",
    a: "Yes. Every treatment is assessed and prescribed by a GMC-registered doctor after reviewing your medical history. You also have continuous medical follow-up throughout the process.",
  },
  {
    q: "Do I need a prescription beforehand?",
    a: "No. If the doctor considers the treatment appropriate for your case, they issue the prescription themselves after your assessment. The whole process is online.",
  },
  {
    q: "How much weight can I lose?",
    a: "It depends on each person, your starting point and your consistency. Many patients achieve significant weight loss with follow-up, but results vary and are not guaranteed.",
  },
  {
    q: "Is there a minimum term?",
    a: "There's no lock-in. You can pause or cancel whenever you like, with no penalties.",
  },
  {
    q: "What if I'm not suitable for the treatment?",
    a: "If, after the assessment, the doctor decides the treatment isn't right for you, you aren't charged for treatment and you'll receive recommendations for your case.",
  },
  {
    q: "How do I receive the treatment?",
    a: "If the doctor prescribes it, you receive it at home discreetly, with no need to travel to a pharmacy.",
  },
];

const trustBar = [
  { icon: Stethoscope, label: "GMC-registered doctors" },
  { icon: Clock, label: "Response in under 3 h" },
  { icon: ShieldCheck, label: "No lock-in" },
  { icon: Lock, label: "Data protected (UK GDPR)" },
];

const payments = [
  { src: "/payments/visa.svg", alt: "Visa" },
  { src: "/payments/mastercard.svg", alt: "Mastercard" },
  { src: "/payments/paypal.svg", alt: "PayPal" },
  { src: "/payments/apple-pay.svg", alt: "Apple Pay" },
  { src: "/payments/google-pay.svg", alt: "Google Pay" },
];

const FIRST_VISIT = "Free";
const MONTHLY = "£139/month";

const TRUSTPILOT_URL = "https://uk.trustpilot.com/review/doctorlife.io";
const TRUSTPILOT_GREEN = "#00b67a";

/** Row of stars in Trustpilot's green style (green box + white star). */
function TrustpilotStars({ rating, size = 24 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-[2px]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="flex items-center justify-center"
          style={{
            width: size,
            height: size,
            backgroundColor: i < rating ? TRUSTPILOT_GREEN : "#dcdce6",
          }}
        >
          <Star
            aria-hidden
            className="fill-white text-white"
            style={{ width: size * 0.66, height: size * 0.66 }}
          />
        </span>
      ))}
    </div>
  );
}

export function ClinicLanding({ config }: { config: ClinicConfig }) {
  const { path, planPrefix } = config;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: BRAND,
    url: `${SITE_URL}${path}`,
    medicalSpecialty: "Endocrinology",
    description:
      "Telemedicine service with GMC-registered doctors in the UK. Online medical assessment of weight management based on a questionnaire, with diagnosis and plan if appropriate.",
    areaServed: "GB",
    priceRange: "££",
  };

  return (
    <QuizProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <div className="overflow-x-clip bg-paper">
        {/* ── Site navigation ── */}
        <Navbar />

        <main className="pb-24 lg:pb-0">
          {/* ── Hero with offer ── */}
          <section className="mx-auto mt-2 max-w-none px-3 sm:px-4 lg:px-5">
            <div className="relative w-full overflow-hidden rounded-[36px]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(155deg,#6b774a 0%,#5f6a3e 45%,#454d2e 100%)",
                }}
              />

              <div className="relative z-[2] grid grid-cols-1 items-center gap-8 px-5 py-8 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:px-14 lg:py-14">
                <div className="max-w-[620px]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-paper/12 px-3 py-1.5 text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage backdrop-blur-sm">
                    <BadgeCheck aria-hidden className="h-4 w-4" />
                    GLP-1 treatment with medical follow-up
                  </span>
                  <h1 className="mt-5 text-balance text-[clamp(32px,4.8vw,56px)] font-light leading-[1.04] tracking-[-.03em] text-paper">
                    Lose up to{" "}
                    <span className="font-serif italic text-sage">25%</span> of your
                    weight with GLP-1 treatment
                  </h1>

                  {/* Quick social proof */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-1 text-sage">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} aria-hidden className="h-[18px] w-[18px] fill-current" />
                      ))}
                    </div>
                    <span className="text-[14px] font-medium text-paper/85">
                      <span className="font-semibold text-paper">4.8/5</span> · our patients' rating
                    </span>
                  </div>

                  <ul className="mt-6 flex flex-col gap-2.5">
                    {heroPoints.map(({ icon: Icon, label }) => (
                      <li
                        key={label}
                        className="flex items-start gap-3 text-[14px] leading-snug text-paper/85 sm:text-[14.5px]"
                      >
                        <Icon
                          aria-hidden
                          className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-sage"
                        />
                        {label}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="mt-7">
                    <span className="text-[13px] font-medium uppercase tracking-[.14em] text-sage">
                      First medical assessment
                    </span>
                    <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
                      <span className="text-[clamp(40px,6vw,58px)] font-semibold leading-none text-paper">
                        {FIRST_VISIT}
                      </span>
                      <span className="mb-1 text-[15px] font-medium text-paper/75">
                        then {MONTHLY} · no lock-in
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <QuizTrigger
                      plan={planPrefix}
                      className="rounded-full bg-clay px-9 py-[16px] text-[16.5px] font-bold text-paper shadow-lg transition-transform hover:scale-[1.02]"
                    >
                      Request my assessment
                    </QuizTrigger>
                    <span className="text-[13.5px] text-paper/70">
                      No obligation · in a few minutes
                    </span>
                  </div>

                  <div className="mt-7 hidden max-w-[280px] lg:block">
                    <TrustBox theme="dark" alignment="left" />
                  </div>
                </div>

                <div className="relative mx-auto aspect-[4/3] w-full max-w-[440px] overflow-hidden rounded-[24px] shadow-2xl ring-1 ring-paper/15 lg:max-w-none">
                  <HeroVideo
                    src="/products/pills-pen.mp4"
                    poster="/landing/consulta-online.png"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Result badge over the video */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-[16px] bg-espresso/85 px-4 py-3 backdrop-blur-sm">
                    <TrendingDown aria-hidden className="h-6 w-6 text-sage" />
                    <div className="leading-tight">
                      <span className="block text-[20px] font-semibold text-paper">
                        up to −25%
                      </span>
                      <span className="text-[12px] text-paper/75">
                        of your body weight*
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Stats band ── */}
          <section className="mx-auto max-w-[1100px] px-5 pt-10">
            <ul className="grid grid-cols-1 gap-4 rounded-[24px] border border-ink/10 bg-warm px-4 py-6 sm:grid-cols-3 md:px-8">
              {stats.map((s) => (
                <li key={s.label} className="text-center">
                  <Counter
                    to={s.to}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    className="block text-[clamp(28px,4vw,40px)] font-semibold leading-none text-olive"
                  />
                  <span className="mt-2 block text-[13px] font-medium leading-tight text-ink-soft">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Trust bar ── */}
          <section className="mx-auto max-w-[1100px] px-5 pt-6">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {trustBar.map(({ icon: Icon, label }) => (
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

          {/* ── Price + what's included in your programme ── */}
          <section
            aria-labelledby="programa"
            className="mx-auto max-w-[1100px] px-5 pt-20"
          >
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.1fr_.9fr]">
              {/* What's included */}
              <div className="rounded-[28px] border border-ink/10 bg-warm p-8 sm:p-10">
                <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
                  Your programme
                </span>
                <h2
                  id="programa"
                  className="mt-3 text-balance text-[clamp(24px,3.2vw,36px)] font-light leading-[1.1] text-ink"
                >
                  What does your programme include?
                </h2>
                <ul className="mt-7 flex flex-col gap-4">
                  {packIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage/60">
                        <Check aria-hidden className="h-4 w-4 text-olive" />
                      </span>
                      <span className="text-[15.5px] leading-relaxed text-ink-soft">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price card */}
              <div className="flex flex-col justify-center rounded-[28px] bg-espresso p-8 text-center text-paper sm:p-10">
                <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-sage">
                  First medical assessment
                </span>
                <div className="mt-4 flex items-end justify-center gap-2">
                  <span className="text-[clamp(48px,8vw,68px)] font-semibold leading-none text-paper">
                    {FIRST_VISIT}
                  </span>
                </div>
                <p className="mt-3 text-[14px] text-paper/70">
                  Then{" "}
                  <span className="font-semibold text-paper">{MONTHLY}</span> for
                  medical follow-up · no lock-in
                </p>

                <QuizTrigger
                  plan={`${planPrefix}-precio`}
                  className="mt-7 w-full rounded-full bg-clay px-8 py-[16px] text-[16.5px] font-bold text-paper shadow-lg transition-transform hover:scale-[1.02]"
                >
                  Request my assessment
                </QuizTrigger>

                <ul className="mt-6 flex flex-col gap-2.5 text-left">
                  {[
                    "No obligation or lock-in",
                    "If you're not suitable, you don't pay for treatment",
                    "GMC-registered doctors",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2.5 text-[13.5px] text-paper/85">
                      <Check aria-hidden className="h-4 w-4 flex-shrink-0 text-sage" />
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-center gap-1.5 text-sage">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-1.5 text-[13px] text-paper/70">
                    Rated by thousands of patients
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ── How does it work? ── */}
          <section
            aria-labelledby="como-funciona"
            className="mx-auto max-w-[1100px] px-5 pt-20"
          >
            <div className="overflow-hidden rounded-[32px] bg-espresso px-6 py-12 text-paper sm:px-12">
              <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-sage">
                How does it work?
              </span>
              <h2
                id="como-funciona"
                className="mt-3 max-w-[22ch] text-balance text-[clamp(24px,3.2vw,38px)] font-light leading-[1.12]"
              >
                Start today in three simple steps
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {steps.map(({ icon: Icon, title, text }, i) => (
                  <div
                    key={title}
                    className="rounded-[24px] bg-paper/[.06] p-7 ring-1 ring-paper/10"
                  >
                    <span className="text-[13px] font-semibold text-sage">
                      0{i + 1}
                    </span>
                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-paper/10">
                      <Icon aria-hidden className="h-6 w-6 text-sage" />
                    </div>
                    <h3 className="mt-5 text-[19px] font-medium text-paper">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-paper/75">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <QuizTrigger
                  plan={`${planPrefix}-como`}
                  className="inline-block rounded-full bg-clay px-8 py-[15px] text-[16px] font-bold text-paper transition-transform hover:scale-[1.02]"
                >
                  Request my assessment
                </QuizTrigger>
              </div>
            </div>
          </section>

          {/* ── Real Trustpilot reviews ── */}
          <section
            aria-labelledby="testimonios"
            className="mx-auto max-w-[1100px] px-5 pt-20"
          >
            <div className="flex flex-col items-center text-center">
              <h2
                id="testimonios"
                className="max-w-[24ch] text-balance text-[clamp(26px,3.4vw,40px)] font-light leading-[1.1] text-ink"
              >
                What our patients say
              </h2>

              {/* Header with TrustScore, Trustpilot style */}
              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <Star
                    aria-hidden
                    className="h-6 w-6 fill-current"
                    style={{ color: TRUSTPILOT_GREEN }}
                  />
                  <span className="text-[20px] font-semibold text-ink">Trustpilot</span>
                </div>
                <TrustpilotStars rating={4} size={30} />
                <p className="text-[14px] text-ink-soft">
                  <span className="font-semibold text-ink">Excellent</span>{" "}
                  · TrustScore <span className="font-semibold text-ink">4.1</span>{" "}
                  · Based on{" "}
                  <a
                    href={TRUSTPILOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ink underline underline-offset-2"
                  >
                    real reviews
                  </a>
                </p>
              </div>
            </div>

            {/* Review cards, Trustpilot style */}
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {reviews.map((r) => (
                <figure
                  key={r.name}
                  className="flex flex-col rounded-[16px] border border-ink/10 bg-paper p-6"
                >
                  <TrustpilotStars rating={r.stars} size={22} />
                  <figcaption className="mt-4 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[15px] font-semibold text-paper"
                      style={{ backgroundColor: TRUSTPILOT_GREEN }}
                      aria-hidden
                    >
                      {r.initial}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate text-[14.5px] font-semibold text-ink">
                          {r.name}
                        </span>
                        <BadgeCheck
                          aria-label="Verified"
                          className="h-4 w-4 flex-shrink-0"
                          style={{ color: TRUSTPILOT_GREEN }}
                        />
                      </span>
                      <span className="block text-[12px] text-ink-mute">
                        {r.timeAgo}
                      </span>
                    </span>
                  </figcaption>
                  <h3 className="mt-4 text-[15px] font-semibold leading-snug text-ink">
                    {r.title}
                  </h3>
                  <blockquote className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft">
                    {r.text}
                  </blockquote>
                </figure>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href={TRUSTPILOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-warm px-6 py-3 text-[14.5px] font-semibold text-ink transition-colors hover:bg-ink/[.04]"
              >
                <Star
                  aria-hidden
                  className="h-4 w-4 fill-current"
                  style={{ color: TRUSTPILOT_GREEN }}
                />
                See all reviews on Trustpilot
              </a>
            </div>

            <p className="mx-auto mt-6 max-w-[60ch] text-center text-[11.5px] leading-relaxed text-ink-mute">
              Verified reviews published on Trustpilot. They reflect individual
              experiences; results vary from person to person. Always consult your
              doctor.
            </p>
          </section>

          {/* ── Frequently asked questions ── */}
          <section
            aria-labelledby="faq"
            className="mx-auto max-w-[820px] px-5 pt-20"
          >
            <div className="text-center">
              <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
                Frequently asked questions
              </span>
              <h2
                id="faq"
                className="mx-auto mt-3 max-w-[24ch] text-balance text-[clamp(26px,3.4vw,40px)] font-light leading-[1.1] text-ink"
              >
                We answer your questions before you start
              </h2>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-[18px] border border-ink/10 bg-warm px-5 py-4 [&_svg]:open:rotate-180"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium text-ink marker:hidden">
                    {f.q}
                    <ChevronDown
                      aria-hidden
                      className="h-5 w-5 flex-shrink-0 text-olive transition-transform"
                    />
                  </summary>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ── Reviews + secure payment ── */}
          <section className="mx-auto max-w-[1100px] px-5 pt-20">
            <div className="grid grid-cols-1 items-center gap-6 rounded-[32px] border border-ink/10 bg-warm p-8 sm:p-10 md:grid-cols-2">
              <div>
                <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
                  Reviews
                </span>
                <h2 className="mt-3 text-balance text-[clamp(22px,2.8vw,32px)] font-light leading-[1.12] text-ink">
                  Thousands of patients already trust our doctors
                </h2>
                <div className="mt-5 max-w-[300px]">
                  <TrustBox alignment="left" />
                </div>
              </div>
              <div className="rounded-[24px] bg-paper p-7 ring-1 ring-ink/10">
                <div className="flex items-center gap-2 text-olive">
                  <Lock aria-hidden className="h-5 w-5" />
                  <span className="text-[15px] font-semibold text-ink">
                    Secure payment
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
                  {payments.map(({ src, alt }) => (
                    <span key={alt} className="relative block h-7 w-12">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-[13.5px] leading-relaxed text-ink-mute">
                  Your payments and health data are processed with encryption and
                  in line with UK GDPR and the Data Protection Act 2018.
                </p>
              </div>
            </div>
          </section>

          {/* ── Final CTA ── */}
          <section
            aria-labelledby="cta-final"
            className="mx-auto max-w-[1100px] px-5 py-16"
          >
            <div className="overflow-hidden rounded-[32px] bg-espresso px-6 py-14 text-center text-paper sm:px-12">
              <div className="mx-auto mb-5 flex items-center justify-center gap-2 text-sage">
                <CalendarCheck aria-hidden className="h-5 w-5" />
                <span className="text-[13px] font-semibold uppercase tracking-[.16em]">
                  Limited places this week
                </span>
              </div>
              <h2
                id="cta-final"
                className="mx-auto max-w-[20ch] text-balance text-[clamp(26px,3.4vw,40px)] font-light leading-[1.1]"
              >
                Start your supervised GLP-1 treatment today
              </h2>
              <div className="mt-5 flex flex-wrap items-end justify-center gap-x-3 gap-y-1">
                <span className="text-[clamp(36px,6vw,52px)] font-semibold leading-none text-paper">
                  {FIRST_VISIT}
                </span>
                <span className="mb-1 text-[15px] font-medium text-paper/75">
                  then {MONTHLY} · no lock-in
                </span>
              </div>
              <QuizTrigger
                plan={`${planPrefix}-final`}
                className="mt-7 inline-block rounded-full bg-clay px-9 py-[16px] text-[16.5px] font-bold text-paper transition-transform hover:scale-[1.02]"
              >
                Request my assessment
              </QuizTrigger>
              <p className="mx-auto mt-4 max-w-[52ch] text-[14px] leading-relaxed text-paper/70">
                Book your place today · No lock-in · GMC-registered doctors
              </p>
            </div>

            <p className="mx-auto mt-8 max-w-[70ch] text-center text-[12.5px] leading-relaxed text-ink-mute">
              *Indicative figure based on the progress of patients with follow-up;
              results vary from person to person. Telemedicine service provided by
              GMC-registered doctors in the UK. The prescription of any treatment
              always depends on an individual medical assessment. This service does
              not guarantee specific results and does not replace in-person care
              when needed. We process your data in line with UK GDPR and the Data
              Protection Act 2018.
            </p>
          </section>
        </main>

        {/* ── Fixed mobile CTA bar ── */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-warm/95 px-4 py-3 backdrop-blur-sm lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="leading-tight">
              <span className="block text-[18px] font-semibold text-ink">
                {FIRST_VISIT}
              </span>
              <span className="text-[11.5px] text-ink-mute">
                then {MONTHLY} · no lock-in
              </span>
            </div>
            <QuizTrigger
              plan={`${planPrefix}-sticky`}
              className="rounded-full bg-clay px-6 py-[13px] text-[15px] font-bold text-paper shadow-md"
            >
              Start now
            </QuizTrigger>
          </div>
        </div>

        {/* ── Minimal legal footer ── */}
        <footer className="border-t border-ink/10 bg-warm">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-4 px-5 py-10 text-center">
            <BrandLogo markSize={24} textSize={19} />
            <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-ink-mute">
              A telemedicine platform connecting patients with GMC-registered
              doctors in the UK for fast, safe and personal care.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-soft">
              <a href="/legal-notice" className="hover:text-ink">
                Legal notice
              </a>
              <a href="/privacy" className="hover:text-ink">
                Privacy policy
              </a>
              <a href="/contact" className="hover:text-ink">
                Contact
              </a>
            </nav>
            <span className="text-[12.5px] text-ink-mute">
              © {new Date().getFullYear()} {BRAND}. All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </QuizProvider>
  );
}
