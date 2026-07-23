import type { Metadata } from "next";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Terms and conditions — DoctorLife",
  description:
    "Terms of use for DoctorLife's online medical consultation service: eligibility, pricing, liability and governing law.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

type Section = {
  title: string;
  body?: string;
  bullets?: string[];
};

const sections: Section[] = [
  {
    title: "1. Purpose",
    body: "DoctorLife is an online medical consultation service. A GMC-registered doctor reviews your questionnaire and decides whether treatment is appropriate for you. We never prescribe without a medical assessment.",
  },
  {
    title: "2. Eligibility",
    body: "You must be 18 or over and resident in the United Kingdom. The questionnaire is currently optimised for patients in the UK.",
  },
  {
    title: "3. Pricing and payment",
    body: "The first assessment is free, with no obligation. If the doctor approves treatment and you decide to continue, you choose your plan: a monthly subscription of £139/month (no lock-in, cancellable whenever you like), a 5-month pack for £449, or a nutritionist + GLP-1 plan for £649 (both one-off payments with 5 months of access). Medical services are exempt from VAT.",
  },
  {
    title: "4. Service limitations",
    body: "This service does not replace emergency medicine. If you have a health problem requiring immediate attention, call 999 or go to A&E.",
  },
  {
    title: "5. Liability",
    body: "DoctorLife is a technology intermediary platform connecting patients with independent GMC-registered doctors. DoctorLife does not provide medical services or make diagnoses. The doctor handling your case acts solely under their own professional judgement and is solely responsible for the medical act. The contractual relationship for the medical act is established directly between the patient and the doctor, not with DoctorLife.",
  },
  {
    title: "6. Intellectual property",
    body: "The content of doctorlife-uk.com (text, images, code) is the property of DoctorLife unless otherwise stated.",
  },
  {
    title: "7. Right to cancel",
    body: "As a medical consultation service, provision begins immediately with your express consent when you start the clinical questionnaire. Accordingly, under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, once the medical review has begun the right to cancel is lost. If the doctor declines treatment, we refund the full amount within 48 hours.",
  },
  {
    title: "8. Governing law",
    body: "These terms are governed by the laws of England and Wales. Disputes will be resolved in the courts of England and Wales, unless the law designates a different jurisdiction.",
  },
  {
    title: "9. Complaints and dispute resolution",
    body: "If you are a consumer and have a complaint, we ask that you first contact us at hello@doctorlife.io so we can try to resolve the matter directly. Complaints about clinical care can also be raised with the relevant regulator, and unresolved disputes may be referred to an alternative dispute resolution scheme where available.",
  },
];

export default function TerminosPage() {
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
              Terms and <span className="font-serif italic text-olive">conditions</span>
            </h1>
            <p className="mt-5 max-w-[58ch] text-pretty text-[16px] leading-relaxed text-ink-soft">
              These terms set out how our online medical consultation service works,
              including eligibility, pricing, liability and governing law.
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
