import type { Metadata } from "next";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, breadcrumbSchema, SITE_URL, BRAND } from "@/lib/seo";
import { experts } from "@/lib/data";
import { BadgeCheck, Stethoscope, ShieldCheck, Users, HeartPulse, Clock } from "lucide-react";
import { MedicalTeamSection } from "@/components/medical-team-section";

export const metadata: Metadata = {
  title: `About us — Who we are | ${BRAND}`,
  description:
    "DoctorLife is a telemedicine platform founded in the UK with registered doctors. Learn about our mission, our team and how we select the professionals who care for you.",
  alternates: { canonical: `${SITE_URL}/about-us` },
  openGraph: {
    title: `About us | ${BRAND}`,
    description:
      "DoctorLife is a telemedicine platform founded in the UK with registered doctors. Learn about our mission and how we select the professionals who care for you.",
    url: `${SITE_URL}/about-us`,
    type: "website",
    locale: "en-GB",
    siteName: BRAND,
  },
};

const values = [
  {
    icon: Stethoscope,
    title: "Evidence-based medicine",
    body: "Every recommendation we make is backed by up-to-date clinical guidelines and reviewed by GMC-registered doctors.",
  },
  {
    icon: ShieldCheck,
    title: "Safety before speed",
    body: "We don't prescribe if it isn't right for you. The medical assessment determines whether treatment is appropriate for your case.",
  },
  {
    icon: Users,
    title: "Real accessibility",
    body: "Quality medical consultations with no waiting lists, no travel and a response in hours, not weeks.",
  },
  {
    icon: HeartPulse,
    title: "Continuous follow-up",
    body: "We don't leave you alone with a prescription. We adjust treatment with real medical follow-up, month by month.",
  },
  {
    icon: Clock,
    title: "No lock-in",
    body: "Cancel whenever you like. We believe trust is built on results, not contracts.",
  },
  {
    icon: BadgeCheck,
    title: "Total transparency",
    body: "You know the price, the doctor assessing you and exactly what each visit includes before you start.",
  },
];

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "About us", url: `${SITE_URL}/about-us` },
]);

export default function SobreNosotrosPage() {
  return (
    <QuizProvider>
      <JsonLd data={[organizationSchema, breadcrumbs]} />
      <div className="overflow-x-clip bg-paper">
        <Navbar />
        <main>
          {/* ── Hero ── */}
          <section className="mx-auto max-w-[860px] px-5 pb-16 pt-14">
            <nav aria-label="Breadcrumbs" className="mb-8 flex items-center gap-2 text-[13px] text-ink-mute">
              <a href="/" className="hover:text-ink">Home</a>
              <span aria-hidden>/</span>
              <span className="text-ink">About us</span>
            </nav>

            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
              Who we are
            </span>
            <h1 className="mt-3 text-balance text-[clamp(32px,5vw,56px)] font-light leading-[1.05] tracking-[-0.03em] text-ink">
              Real medicine, accessible and without waiting
            </h1>
            <p className="mt-5 max-w-[62ch] text-[18px] leading-[1.7] text-ink-soft">
              DoctorLife is a telemedicine platform founded in the UK with the
              purpose of bringing quality medical care to anyone,
              regardless of where they live or their schedule. We work with
              registered doctors who practice independently on the platform
              and are clinically responsible for each case.
            </p>
          </section>

          {/* ── Mission ── */}
          <section className="bg-espresso">
            <div className="mx-auto max-w-[860px] px-5 py-16">
              <h2 className="text-balance text-[clamp(24px,3.5vw,38px)] font-light leading-[1.1] tracking-[-0.025em] text-paper">
                Our mission is to give medicine back its real purpose:{" "}
                <span className="font-serif italic text-sage">
                  understanding the person, not just the symptom.
                </span>
              </h2>
              <p className="mt-6 max-w-[64ch] text-[17px] leading-[1.7] text-paper/75">
                Today&apos;s healthcare system makes it hard to access specialists
                quickly and in a personalised way. DoctorLife was created to fill that
                gap: to offer specialist medical assessment, supervised treatment and
                continuous follow-up, all from a platform designed to keep the
                patient always informed and in control.
              </p>
            </div>
          </section>

          {/* ── How we select doctors ── */}
          <section className="mx-auto max-w-[860px] px-5 py-16">
            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-olive">
              Our standards
            </span>
            <h2 className="mt-3 text-balance text-[clamp(22px,3vw,34px)] font-light leading-[1.1] tracking-[-0.025em] text-ink">
              How we select the doctors on the platform
            </h2>
            <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.7] text-ink-soft">
              Every doctor who works with DoctorLife goes through a rigorous
              verification process before seeing their first patient:
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {[
                "Active, verified registration with the General Medical Council (GMC).",
                "Accredited specialisation in endocrinology, internal medicine, hormonal or metabolic health.",
                "Review of continuing education and up-to-date knowledge of current clinical guidelines (NICE, EASO, AACE).",
                "Onboarding interview with the DoctorLife medical team.",
                "Regular quality monitoring of assessments and patient follow-up.",
                "Compliance with current UK telemedicine regulations and GMC guidance.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16.5px] leading-relaxed text-ink-soft">
                  <BadgeCheck aria-hidden className="mt-0.5 h-5 w-5 flex-shrink-0 text-olive" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* ── Values ── */}
          <section className="bg-cream">
            <div className="mx-auto max-w-[860px] px-5 py-16">
              <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
                Our principles
              </span>
              <h2 className="mt-3 text-balance text-[clamp(22px,3vw,34px)] font-light leading-[1.1] tracking-[-0.025em] text-ink">
                What guides every decision at DoctorLife
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {values.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="rounded-[20px] bg-paper p-6 shadow-[0_2px_16px_-4px_rgba(34,29,23,.1)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive/10">
                      <Icon aria-hidden className="h-5 w-5 text-olive" />
                    </div>
                    <h3 className="mt-4 text-[17px] font-medium text-ink">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Medical team ── */}
          <MedicalTeamSection />

          {/* ── Contact ── */}
          <section className="bg-espresso">
            <div className="mx-auto flex max-w-[860px] flex-col items-center gap-6 px-5 py-14 text-center">
              <h2 className="text-balance text-[clamp(22px,3vw,34px)] font-light leading-tight tracking-[-0.025em] text-paper">
                Have a question about DoctorLife?
              </h2>
              <p className="max-w-[48ch] text-[16px] text-paper/70">
                Our team responds in under 3 hours on working days.
              </p>
              <a
                href="mailto:hello@doctorlife.io"
                className="rounded-full bg-clay px-7 py-3 text-[15px] font-semibold text-paper transition-opacity hover:opacity-90"
              >
                Contact the team
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
