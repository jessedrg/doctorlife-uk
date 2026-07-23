import type { Metadata } from "next";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, SITE_URL, BRAND } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Editorial policy — How we create medical content | ${BRAND}`,
  description:
    "Learn how DoctorLife's medical content is created, reviewed and updated: editorial process, scientific evidence criteria, review by GMC-registered doctors and update policy.",
  alternates: { canonical: `${SITE_URL}/editorial-policy` },
  openGraph: {
    title: `Editorial policy | ${BRAND}`,
    description:
      "Editorial process, scientific evidence criteria, review by GMC-registered doctors and update policy for DoctorLife content.",
    url: `${SITE_URL}/editorial-policy`,
    type: "website",
    locale: "en-GB",
    siteName: BRAND,
  },
};

const faqs = [
  {
    q: "Who writes DoctorLife's medical content?",
    a: "Content is written by healthcare communication professionals and reviewed by specialist GMC-registered doctors (endocrinologists, internal medicine physicians, metabolic health specialists). Each article names its author and medical reviewer.",
  },
  {
    q: "How often is content updated?",
    a: "We review every article at least once a year, or sooner if relevant new clinical guidelines are published (NICE, EASO, AACE, ADA). The date of the last update is shown on every article.",
  },
  {
    q: "Which scientific sources do you use?",
    a: "We use only clinical guidelines from recognised medical bodies, studies published in indexed journals (PubMed, Cochrane) and official medicines information from the MHRA and EMA. We do not use non-peer-reviewed sources.",
  },
  {
    q: "Does DoctorLife content replace a medical consultation?",
    a: "No. All blog and website content is informational and educational. It never replaces diagnosis, treatment or advice from a GMC-registered doctor. For any health concern, consult a professional.",
  },
  {
    q: "How do you report errors?",
    a: "If you spot an error or outdated information, you can write to us at hello@doctorlife.io with the subject 'Editorial correction'. We review all reports within 5 working days.",
  },
];

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Editorial policy", url: `${SITE_URL}/editorial-policy` },
]);

const steps = [
  {
    num: "01",
    title: "Topic identification",
    body: "The editorial team selects topics based on real patient questions, the most recent clinical guidelines and the searches with the highest informational intent in metabolic and hormonal health.",
  },
  {
    num: "02",
    title: "Research and writing",
    body: "A writer specialising in healthcare communication researches primary sources (clinical guidelines, clinical trials on PubMed/Cochrane) and writes the article in accessible language, citing all references.",
  },
  {
    num: "03",
    title: "Medical review",
    body: "A GMC-registered doctor specialising in the area reviews clinical accuracy, corrects inaccuracies and validates that the content aligns with current guidelines. Their name and GMC registration number are published on the article.",
  },
  {
    num: "04",
    title: "Editing and publication",
    body: "The editorial team does a final review of clarity, structure and compliance with our medical style guidelines. The article is published with visible creation and last-review dates.",
  },
  {
    num: "05",
    title: "Regular updates",
    body: "We review every article at least once a year. If new guidelines are published or medical consensus changes, we update the article before that annual review and mark the new modification date.",
  },
];

const sources = [
  { name: "NICE — National Institute for Health and Care Excellence", url: "https://www.nice.org.uk" },
  { name: "EASO — European Association for the Study of Obesity", url: "https://easo.org" },
  { name: "AACE — American Association of Clinical Endocrinology", url: "https://www.aace.com" },
  { name: "ADA — American Diabetes Association", url: "https://www.diabetes.org" },
  { name: "MHRA — Medicines and Healthcare products Regulatory Agency", url: "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency" },
  { name: "PubMed / MEDLINE — NLM", url: "https://pubmed.ncbi.nlm.nih.gov" },
  { name: "Cochrane Library", url: "https://www.cochranelibrary.com" },
];

export default function PoliticaEditorialPage() {
  return (
    <QuizProvider>
      <JsonLd data={[breadcrumbs, faqSchema(faqs)]} />
      <div className="overflow-x-clip bg-paper">
        <Navbar />
        <main>
          {/* ── Hero ── */}
          <section className="mx-auto max-w-[820px] px-5 pb-12 pt-14">
            <nav aria-label="Breadcrumbs" className="mb-8 flex items-center gap-2 text-[13px] text-ink-mute">
              <a href="/" className="hover:text-ink">Home</a>
              <span aria-hidden>/</span>
              <span className="text-ink">Editorial policy</span>
            </nav>
            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
              Editorial transparency
            </span>
            <h1 className="mt-3 text-balance text-[clamp(30px,4.5vw,52px)] font-light leading-[1.05] tracking-[-0.03em] text-ink">
              How we create and review medical content
            </h1>
            <p className="mt-5 max-w-[62ch] text-[17.5px] leading-[1.7] text-ink-soft">
              All DoctorLife content is written by healthcare communication
              specialists and reviewed by GMC-registered doctors. This page explains
              exactly how that process works and which standards we follow.
            </p>
            <p className="mt-3 text-[14px] text-ink-mute">
              Last review of this policy: July 2025
            </p>
          </section>

          {/* ── Disclaimer ── */}
          <div className="mx-auto max-w-[820px] px-5 pb-10">
            <div className="rounded-[16px] border border-amber/30 bg-amber/8 px-6 py-5">
              <p className="text-[15px] leading-relaxed text-ink-soft">
                <strong className="text-ink">Important notice:</strong> The content
                of the DoctorLife blog and website is purely informational and
                educational. It does not constitute diagnosis, advice or a medical
                prescription. For any symptom or health concern, always consult a
                GMC-registered doctor.
              </p>
            </div>
          </div>

          {/* ── Editorial process ── */}
          <section className="mx-auto max-w-[820px] px-5 py-10">
            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-olive">
              Our process
            </span>
            <h2 className="mt-3 text-balance text-[clamp(20px,2.8vw,32px)] font-light leading-[1.1] tracking-[-0.025em] text-ink">
              From draft to publication: 5 steps
            </h2>
            <div className="mt-10 flex flex-col gap-0">
              {steps.map((s, i) => (
                <div key={s.num} className="flex gap-6">
                  {/* vertical line */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-olive text-[13px] font-bold text-paper">
                      {s.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-olive/20" style={{ minHeight: 32 }} />
                    )}
                  </div>
                  <div className="pb-10">
                    <h3 className="text-[17px] font-medium text-ink">{s.title}</h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Sources ── */}
          <section className="bg-cream">
            <div className="mx-auto max-w-[820px] px-5 py-14">
              <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
                Reference sources
              </span>
              <h2 className="mt-3 text-balance text-[clamp(20px,2.8vw,32px)] font-light leading-[1.1] tracking-[-0.025em] text-ink">
                Organisations and databases we consult
              </h2>
              <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft">
                We use only primary-level sources: guidelines from recognised medical
                bodies, peer-reviewed studies and official medicines information.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {sources.map((s) => (
                  <li key={s.name} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-olive" />
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15.5px] text-olive underline-offset-2 hover:underline"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="mx-auto max-w-[820px] px-5 py-14">
            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-olive">
              Frequently asked questions
            </span>
            <h2 className="mt-3 mb-8 text-balance text-[clamp(20px,2.8vw,32px)] font-light leading-[1.1] tracking-[-0.025em] text-ink">
              About our content
            </h2>
            <div className="flex flex-col divide-y divide-ink/10">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[17px] font-medium text-ink">
                    {f.q}
                    <span className="mt-0.5 flex-shrink-0 text-ink-mute transition-transform group-open:rotate-180">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ── Editorial contact ── */}
          <section className="bg-espresso">
            <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 px-5 py-14 text-center">
              <h2 className="text-balance text-[clamp(20px,2.8vw,32px)] font-light leading-tight tracking-[-0.025em] text-paper">
                Found an error or outdated information?
              </h2>
              <p className="max-w-[48ch] text-[16px] text-paper/70">
                Write to us with the subject &quot;Editorial correction&quot;. We
                review all reports within 5 working days.
              </p>
              <a
                href="mailto:hello@doctorlife.io?subject=Editorial correction"
                className="rounded-full bg-clay px-7 py-3 text-[15px] font-semibold text-paper transition-opacity hover:opacity-90"
              >
                Report an error
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
