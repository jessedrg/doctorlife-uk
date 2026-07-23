import type { Metadata } from "next";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Privacy policy — DoctorLife",
  description:
    "How DoctorLife processes your personal and health data in line with UK GDPR and the Data Protection Act 2018.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

type Section = {
  title: string;
  body?: string;
  bullets?: string[];
};

const sections: Section[] = [
  {
    title: "Data controller",
    body: "DoctorLife — hello@doctorlife.io. We process your data in line with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",
  },
  {
    title: "Data Protection Officer",
    body: "You can contact our Data Protection Officer (DPO) at dpo@doctorlife.io for any matter relating to the processing of your personal or health data.",
  },
  {
    title: "What data we process",
    bullets: [
      "Identifying data: name, email, phone number.",
      "Health data provided in the questionnaire.",
      "Payment data (processed by our certified payment provider).",
    ],
  },
  {
    title: "Purpose",
    bullets: [
      "Providing the medical consultation and issuing a prescription where appropriate.",
      "Operational communications (email, the platform's private chat).",
      "Meeting legal obligations.",
    ],
  },
  {
    title: "Lawful basis",
    body: "Explicit consent (Art. 6(1)(a) UK GDPR), performance of a contract (6(1)(b)) and compliance with a legal obligation (6(1)(c)). For health data, Art. 9(2)(h) UK GDPR — processing by healthcare professionals.",
  },
  {
    title: "Retention",
    body: "We keep your data for as long as you maintain your account, and for up to ten years after your last consultation to meet medical record-keeping obligations under GMC guidance.",
  },
  {
    title: "Recipients",
    body: "Your data is not shared with third parties for commercial purposes. Our processors (UK/EU hosting, email delivery, PCI DSS-certified payment provider) sign data processing agreements in line with Art. 28 UK GDPR.",
  },
  {
    title: "International transfers",
    body: "By default, your data is hosted on servers located in the UK or the European Union. Where we occasionally use a provider outside the UK, we apply the appropriate safeguards required under UK GDPR (International Data Transfer Agreement or the UK Addendum to the EU Standard Contractual Clauses).",
  },
  {
    title: "Security measures",
    body: "We apply the technical and organisational measures required under Art. 32 UK GDPR: encryption in transit and at rest, role-based access control, audit logging, encrypted backups, ongoing staff training and incident response procedures.",
  },
  {
    title: "Your rights",
    bullets: [
      "Access, rectification, erasure, objection, restriction, portability.",
      "Withdraw consent at any time.",
      "Lodge a complaint with the Information Commissioner's Office (ico.org.uk).",
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <QuizProvider>
      <div className="overflow-x-clip bg-paper">
        <Navbar />
        <main className="mx-auto max-w-[820px] px-5 pb-10 pt-10 sm:px-8">
          <header className="py-12 sm:py-16">
            <span className="text-[13px] font-semibold uppercase tracking-[.18em] text-clay">
              Legal
            </span>
            <h1 className="mt-4 text-balance text-[clamp(32px,5vw,54px)] font-light leading-[1.05] tracking-[-.02em] text-ink">
              Privacy <span className="font-serif italic text-olive">policy</span>
            </h1>
            <p className="mt-5 max-w-[58ch] text-pretty text-[16px] leading-relaxed text-ink-soft">
              We explain how we handle your personal and health data, the lawful
              basis for processing it, and the rights you can exercise at any time.
            </p>
          </header>

          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-[20px] font-medium tracking-[-.01em] text-ink sm:text-[22px]">
                  {s.title}
                </h2>
                {s.body ? (
                  <p className="mt-3 text-pretty text-[16px] leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                ) : null}
                {s.bullets ? (
                  <ul className="mt-4 flex flex-col gap-3">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-soft"
                      >
                        <span className="mt-[9px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-olive" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section>
              <h2 className="text-[20px] font-medium tracking-[-.01em] text-ink sm:text-[22px]">
                Exercising your rights
              </h2>
              <p className="mt-3 text-pretty text-[16px] leading-relaxed text-ink-soft">
                Exercise your rights by writing to{" "}
                <a href="mailto:hello@doctorlife.io" className="text-olive underline">
                  hello@doctorlife.io
                </a>
                . We respond within a maximum of 30 days.
              </p>
            </section>
          </div>

          <aside className="mt-14 rounded-[24px] border border-ink/10 bg-sage/15 p-8">
            <span className="text-[12px] font-semibold uppercase tracking-[.16em] text-clay">
              Need more information?
            </span>
            <h2 className="mt-3 text-[clamp(22px,3vw,30px)] font-light leading-[1.1] tracking-[-.02em] text-ink">
              Let&apos;s talk.
            </h2>
            <p className="mt-3 max-w-[52ch] text-pretty text-[16px] leading-relaxed text-ink-soft">
              If any part of this document is unclear, or you want to exercise a
              right, our privacy and legal team responds directly.
            </p>
            <a
              href="mailto:hello@doctorlife.io"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-[12px] text-[15px] font-semibold text-paper no-underline"
            >
              Contact the team
              <span className="text-[13px]">↗</span>
            </a>
          </aside>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
