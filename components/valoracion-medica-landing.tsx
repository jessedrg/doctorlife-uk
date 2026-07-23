import {
  ShieldCheck,
  Stethoscope,
  ClipboardList,
  MessageSquareText,
  Lock,
  BadgeCheck,
  FileCheck2,
  Check,
  Star,
  CalendarCheck,
  Video,
  HeartPulse,
  ChevronDown,
  Pill,
} from "lucide-react";
import { QuizProvider } from "@/components/quiz-context";
import { QuizTrigger } from "@/components/quiz-trigger";
import { BrandLogo } from "@/components/brand-logo";
import { TrustBox } from "@/components/trustbox";
import { BRAND } from "@/lib/articles";
import { StickyValoracionCTA } from "@/components/sticky-valoracion-cta";

export type ValoracionConfig = {
  /** Canonical route, e.g. "/medical-assessment" */
  path: string;
  /** Prefix for analytics events, e.g. "ads-assessment" */
  planPrefix: string;
  /** Hides the TrustBox widget and the Trustpilot reviews section */
  hideReviews?: boolean;
  /** Shows a GLP-1 medical treatment badge in the hero */
  showGlpBadge?: boolean;
  /** Text of the hero GLP-1 badge (defaults to "GLP-1 medical treatment, if the doctor considers it appropriate") */
  glpBadgeText?: string;
  /** Hides all form/assessment buttons (hero, price, final CTA and sticky) */
  hideCta?: boolean;
};

const heroPoints = [
  { icon: Stethoscope, label: "Assessment with a GMC-registered doctor" },
  { icon: Video, label: "Video consultation with no appointment or travel" },
  { icon: MessageSquareText, label: "Follow-up with the medical team via chat" },
  { icon: Lock, label: "Your health data always protected" },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Complete the health questionnaire",
    text: "You tell us your medical history and your goals in a few minutes, from your phone or computer.",
  },
  {
    icon: Video,
    title: "Video consultation with your doctor",
    text: "A GMC-registered doctor reviews your case and assesses the most suitable option for you.",
  },
  {
    icon: HeartPulse,
    title: "Continuous follow-up",
    text: "We support your progress and adjust the plan when needed, with your doctor always available via chat.",
  },
];

const planIncludes = [
  "Video consultation with a GMC-registered doctor",
  "Personalised clinical assessment of your case",
  "Plan tailored to your medical history and goals",
  "Follow-up with the medical team throughout the process",
  "Chat with your doctor whenever you need it",
  "Personalised recommendations based on your clinical assessment",
];

const TRUSTPILOT_URL = "https://uk.trustpilot.com/review/doctorlife.io";
const TRUSTPILOT_GREEN = "#00b67a";

/** Real reviews verified on Trustpilot, focused on care and service. */
const reviews = [
  {
    name: "Eric Jenkins",
    initial: "E",
    stars: 5,
    title: "All online without losing the personal touch",
    text: "What I liked most was being able to do everything online without losing the feeling of being well looked after. The medical team replies quickly and warmly.",
    timeAgo: "3 days ago",
  },
  {
    name: "Samuel Shah",
    initial: "S",
    stars: 5,
    title: "Excellent follow-up",
    text: "I started quite scared because I'd tried many things without success. The follow-up with the medical team has been excellent and I felt supported the whole way.",
    timeAgo: "3 days ago",
  },
  {
    name: "Max",
    initial: "M",
    stars: 5,
    title: "Unbeatable care",
    text: "Honestly it's 10/10, really happy with the care and the way the medical team treated me.",
    timeAgo: "4 days ago",
  },
  {
    name: "Zachary Moore",
    initial: "Z",
    stars: 4,
    title: "A team that understands the problem",
    text: "I finally found a team that truly understands the problem and gets involved in the process. Highly recommended.",
    timeAgo: "3 days ago",
  },
];

const faqs = [
  {
    q: "Who carries out the assessment?",
    a: "Always a GMC-registered doctor. They review your health questionnaire and your case in a video consultation before recommending any plan.",
  },
  {
    q: "Do I need an appointment or to travel?",
    a: "No. The whole process is online: you complete the questionnaire whenever you like and the video consultation takes place from home, with no queues or waiting rooms.",
  },
  {
    q: "How much does it cost?",
    a: "The first assessment is free. If you decide to continue, you choose your plan: a £139/month subscription with no lock-in, a 5-month pack for £449, or a nutritionist + GLP-1 for £649. You can cancel the subscription whenever you like.",
  },
  {
    q: "What happens after the assessment?",
    a: "If the doctor considers it appropriate, they propose a personalised plan and follow your progress. You decide whether to continue at each step.",
  },
  {
    q: "Is my data protected?",
    a: "Yes. We process your clinical information in line with UK GDPR and only authorised medical staff can access it.",
  },
];

/** Row of stars in Trustpilot's green style. */
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
          <Star aria-hidden className="fill-white text-white" style={{ width: size * 0.66, height: size * 0.66 }} />
        </span>
      ))}
    </div>
  );
}

export function ValoracionMedicaLanding({ config }: { config: ValoracionConfig }) {
  const { planPrefix } = config;

  return (
    <QuizProvider variant="ads">
      <main className="min-h-screen bg-paper text-ink">
        {/* ── Minimal header: logo only (no navbar) ── */}
        <header className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-5">
          <BrandLogo markSize={30} textSize={20} textClassName="text-ink" />
          <span className="hidden items-center gap-2 text-[13px] font-medium text-ink-soft sm:flex">
            <ShieldCheck aria-hidden className="h-4 w-4 text-olive" />
            GMC-registered doctors
          </span>
        </header>

        {/* ── Hero (with image of the doctor on the phone) ── */}
        <section className="relative overflow-hidden bg-espresso text-paper">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
            {/* Text column */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-4 py-1.5 text-[13px] font-medium text-paper/90 ring-1 ring-paper/15">
                <Stethoscope aria-hidden className="h-4 w-4 text-sage" />
                Online medical assessment
              </span>

              <h1 className="mt-6 text-balance text-[clamp(30px,5vw,52px)] font-light leading-[1.05] tracking-[-.03em] text-paper">
                Manage your weight with professional{" "}
                <span className="font-serif italic text-sage">medical support</span>
              </h1>

              <p className="mx-auto mt-5 max-w-[52ch] text-pretty text-[16px] leading-relaxed text-paper/80 lg:mx-0">
                Complete a short health questionnaire and a GMC-registered doctor
                assesses your case in a video consultation. If they consider it
                appropriate, they propose a personalised plan with continuous
                follow-up.
              </p>

              {config.showGlpBadge && (
                <div className="mt-5 flex justify-center lg:justify-start">
                  <span className="inline-flex items-center gap-2 rounded-full bg-sage/15 px-4 py-2 text-[13.5px] font-medium text-paper ring-1 ring-sage/30">
                    <Pill aria-hidden className="h-4 w-4 flex-shrink-0 text-sage" />
                    <span className="text-pretty">
                      {config.glpBadgeText ??
                        "GLP-1 medical treatment, if the doctor considers it appropriate"}
                    </span>
                  </span>
                </div>
              )}

              {/* Social proof */}
              <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
                <div className="flex items-center gap-1 text-sage">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden className="h-[18px] w-[18px] fill-current" />
                  ))}
                </div>
                <span className="text-[14px] font-medium text-paper/85">
                  <span className="font-semibold text-paper">4.1/5</span> · our patients' rating
                </span>
              </div>

              {!config.hideCta && (
                <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
                  <QuizTrigger
                    plan={`${planPrefix}-hero`}
                    className="w-full max-w-[360px] rounded-full bg-sage px-8 py-[16px] text-[16px] font-bold text-espresso"
                  >
                    Start my free assessment
                  </QuizTrigger>
                  <span className="text-[13px] text-paper/70">
                    First assessment free · no obligation
                  </span>
                </div>
              )}

              <ul className="mx-auto mt-10 grid max-w-[640px] grid-cols-1 gap-3 sm:grid-cols-2 lg:mx-0">
                {heroPoints.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-2xl bg-paper/[.06] px-4 py-3 text-left text-[14px] leading-snug text-paper/90 ring-1 ring-paper/10"
                  >
                    <Icon aria-hidden className="h-[18px] w-[18px] flex-shrink-0 text-sage" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image column: doctor on a video call from the phone */}
            <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
              {/* glow that blends the image into the background */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(179,196,168,.28) 0%, transparent 70%)" }}
              />
              <img
                src="/doctor-mobile.webp"
                alt="A GMC-registered DoctorLife doctor holding a video consultation from a phone"
                className="relative mx-auto h-auto w-full max-w-[380px] object-contain lg:max-w-[440px]"
              />
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section aria-labelledby="como-funciona" className="mx-auto max-w-[1100px] px-5 pt-20">
          <div className="text-center">
            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
              How it works
            </span>
            <h2
              id="como-funciona"
              className="mx-auto mt-3 max-w-[24ch] text-balance text-[clamp(26px,3.4vw,40px)] font-light leading-[1.1] text-ink"
            >
              Three simple steps, always with a doctor
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="rounded-[24px] border border-ink/10 bg-warm p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/60 text-[15px] font-bold text-olive">
                    {i + 1}
                  </span>
                  <Icon aria-hidden className="h-6 w-6 text-olive" />
                </div>
                <h3 className="mt-5 text-[19px] font-medium text-ink">{title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Price + what's included ── */}
        <section aria-labelledby="precio" className="mx-auto max-w-[1100px] px-5 pt-20">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
            <div>
              <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
                What your programme includes
              </span>
              <h2
                id="precio"
                className="mt-3 text-balance text-[clamp(26px,3.4vw,40px)] font-light leading-[1.1] text-ink"
              >
                Everything you need, in one place
              </h2>
              <ul className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {planIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-olive">
                      <Check aria-hidden className="h-3.5 w-3.5 text-paper" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price card */}
            <div className="rounded-[28px] border border-ink/10 bg-warm p-7 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-sage/50 px-3 py-1 text-[12.5px] font-semibold text-olive">
                <BadgeCheck aria-hidden className="h-4 w-4" />
                First assessment free
              </span>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-[44px] font-light leading-none tracking-[-.03em] text-ink">£0</span>
                <span className="pb-1 text-[15px] text-ink-mute">first assessment</span>
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                If you decide to continue with medical follow-up:
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 text-[15px] text-ink">
                <li className="flex items-center justify-between border-b border-ink/10 pb-2.5">
                  <span>Monthly subscription</span>
                  <span className="font-semibold">£139/month</span>
                </li>
                <li className="flex items-center justify-between border-b border-ink/10 pb-2.5">
                  <span>5-month pack</span>
                  <span className="font-semibold">£449</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Nutritionist + GLP-1</span>
                  <span className="font-semibold">£649</span>
                </li>
              </ul>
              {!config.hideCta && (
                <>
                  <QuizTrigger
                    plan={`${planPrefix}-precio`}
                    className="mt-6 block w-full rounded-full bg-ink px-8 py-[15px] text-center text-[16px] font-bold text-paper"
                  >
                    Start free assessment
                  </QuizTrigger>
                  <p className="mt-3 flex items-center justify-center gap-2 text-center text-[12.5px] text-ink-mute">
                    <CalendarCheck aria-hidden className="h-4 w-4 text-olive" />
                    No lock-in · cancel whenever you like
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── Trust / TrustBox ── */}
        <section className="mx-auto max-w-[1100px] px-5 pt-20">
          <div className="rounded-[28px] border border-ink/10 bg-warm px-6 py-8 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <span className="flex items-center gap-2 text-[14.5px] font-medium text-ink">
                <ShieldCheck aria-hidden className="h-5 w-5 text-olive" />
                GMC-registered doctors
              </span>
              <span className="flex items-center gap-2 text-[14.5px] font-medium text-ink">
                <Lock aria-hidden className="h-5 w-5 text-olive" />
                Data protected (UK GDPR)
              </span>
              <span className="flex items-center gap-2 text-[14.5px] font-medium text-ink">
                <FileCheck2 aria-hidden className="h-5 w-5 text-olive" />
                Personalised medical follow-up
              </span>
            </div>
            {!config.hideReviews && (
              <div className="mt-6 flex justify-center">
                <TrustBox />
              </div>
            )}
          </div>
        </section>

        {/* ── Real reviews (Trustpilot style) ── */}
        {!config.hideReviews && (
        <section aria-labelledby="opiniones" className="mx-auto max-w-[1100px] px-5 pt-20">
          <div className="flex flex-col items-center text-center">
            <h2
              id="opiniones"
              className="max-w-[24ch] text-balance text-[clamp(26px,3.4vw,40px)] font-light leading-[1.1] text-ink"
            >
              What our patients say
            </h2>
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <Star aria-hidden className="h-6 w-6 fill-current" style={{ color: TRUSTPILOT_GREEN }} />
                <span className="text-[20px] font-semibold text-ink">Trustpilot</span>
              </div>
              <TrustpilotStars rating={4} size={30} />
              <p className="text-[14px] text-ink-soft">
                <span className="font-semibold text-ink">Excellent</span> · TrustScore{" "}
                <span className="font-semibold text-ink">4.1</span> · Based on{" "}
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

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <figure key={r.name} className="flex flex-col rounded-[16px] border border-ink/10 bg-paper p-6">
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
                      <span className="truncate text-[14.5px] font-semibold text-ink">{r.name}</span>
                      <BadgeCheck aria-label="Verified" className="h-4 w-4 flex-shrink-0" style={{ color: TRUSTPILOT_GREEN }} />
                    </span>
                    <span className="block text-[12px] text-ink-mute">{r.timeAgo}</span>
                  </span>
                </figcaption>
                <h3 className="mt-4 text-[15px] font-semibold leading-snug text-ink">{r.title}</h3>
                <blockquote className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft">{r.text}</blockquote>
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
              <Star aria-hidden className="h-4 w-4 fill-current" style={{ color: TRUSTPILOT_GREEN }} />
              See all reviews on Trustpilot
            </a>
          </div>
        </section>
        )}

        {/* ── FAQ ── */}
        <section aria-labelledby="faq" className="mx-auto max-w-[760px] px-5 pt-20">
          <div className="text-center">
            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
              Frequently asked questions
            </span>
            <h2
              id="faq"
              className="mx-auto mt-3 max-w-[24ch] text-balance text-[clamp(26px,3.4vw,40px)] font-light leading-[1.1] text-ink"
            >
              We answer your questions
            </h2>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-[18px] border border-ink/10 bg-warm px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium text-ink">
                  {f.q}
                  <ChevronDown aria-hidden className="h-5 w-5 flex-shrink-0 text-ink-mute transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="mx-auto max-w-[1100px] px-5 py-20">
          <div className="overflow-hidden rounded-[32px] bg-espresso px-6 py-14 text-center text-paper sm:px-10">
            <h2 className="mx-auto max-w-[22ch] text-balance text-[clamp(26px,3.6vw,42px)] font-light leading-[1.08]">
              Take the first step today, at no cost
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-[15.5px] leading-relaxed text-paper/80">
              Your first assessment with a GMC-registered doctor is free and with
              no obligation. Start whenever you like, from wherever you like.
            </p>
            {!config.hideCta && (
              <QuizTrigger
                plan={`${planPrefix}-cta-final`}
                className="mt-8 inline-block rounded-full bg-sage px-10 py-[16px] text-[16px] font-bold text-espresso"
              >
                Start my free assessment
              </QuizTrigger>
            )}
          </div>
        </section>

        {/* ── Minimal footer ── */}
        <footer className="border-t border-ink/10 bg-warm">
          <div className="mx-auto max-w-[1100px] px-5 py-10">
            <div className="flex flex-col items-center gap-6 text-center">
              <BrandLogo markSize={28} textSize={19} textClassName="text-ink" />
              <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] text-ink-soft">
                <a href="/about-us" className="hover:text-ink">About us</a>
                <a href="/editorial-policy" className="hover:text-ink">Editorial policy</a>
                <a href="/privacy" className="hover:text-ink">Privacy</a>
                <a href="/terms" className="hover:text-ink">Terms</a>
                <a href="/cookies" className="hover:text-ink">Cookies</a>
                <a href="/legal-notice" className="hover:text-ink">Legal notice</a>
              </nav>
              <p className="mx-auto max-w-[70ch] text-[12px] leading-relaxed text-ink-mute">
                {BRAND} is an online doctor consultation service provided by
                GMC-registered doctors in the UK. The information on this page is
                general in nature and does not replace professional medical advice.
                Each case is assessed individually. Always consult your doctor.
              </p>
              <p className="text-[12px] text-ink-mute">
                © {new Date().getFullYear()} {BRAND}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {!config.hideCta && <StickyValoracionCTA planPrefix={planPrefix} />}
      </main>
    </QuizProvider>
  );
}
