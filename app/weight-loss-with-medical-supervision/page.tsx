import type { Metadata } from "next";
import Image from "next/image";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/editorial/breadcrumbs";
import { KeyTakeaways } from "@/components/editorial/key-takeaways";
import { CTABlock } from "@/components/editorial/cta-block";
import { MedicalDisclaimer } from "@/components/editorial/medical-disclaimer";
import { StickyCTA } from "@/components/editorial/sticky-cta";
import {
  PILLAR,
  SITE_URL,
  BRAND,
  articles,
  authors,
  formatDate,
} from "@/lib/articles";

export const metadata: Metadata = {
  title: PILLAR.metaTitle,
  description: PILLAR.metaDescription,
  alternates: { canonical: `${SITE_URL}/${PILLAR.slug}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/${PILLAR.slug}`,
    title: PILLAR.metaTitle,
    description: PILLAR.metaDescription,
  },
};

const pillarLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  headline: PILLAR.h1,
  description: PILLAR.metaDescription,
  inLanguage: "en-GB",
  publisher: {
    "@type": "MedicalOrganization",
    name: BRAND,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${PILLAR.slug}` },
};

export default function PillarPage() {
  return (
    <QuizProvider>
      <div className="overflow-x-clip bg-paper">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="mx-auto max-w-[860px] px-5 pb-2 pt-10">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: PILLAR.title },
              ]}
            />
            <span className="mt-6 inline-block text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
              Complete guide
            </span>
            <h1 className="mt-3 text-balance text-[clamp(32px,5vw,52px)] font-light leading-[1.06] tracking-[-0.025em] text-ink">
              {PILLAR.h1}
            </h1>
            <p className="mt-6 max-w-[65ch] text-[18px] leading-[1.65] text-ink-soft">
              {PILLAR.answerFirst}
            </p>
          </section>

          <section className="mx-auto max-w-[860px] px-5 pt-8">
            <KeyTakeaways items={PILLAR.keyTakeaways} />
          </section>

          {/* Medical intro */}
          <section className="mx-auto max-w-[860px] px-5 pt-10">
            <h2 className="text-balance text-[clamp(24px,3vw,34px)] font-light leading-[1.12] text-ink">
              Why losing weight through diet alone doesn&apos;t work
            </h2>
            <p className="mt-5 text-[17.5px] leading-[1.7] text-ink-soft">
              When your weight doesn&apos;t respond to the usual efforts, there is almost always a
              physiological cause that no diet can fix on its own: insulin resistance,
              hypothyroidism, sleep deprivation, elevated cortisol or a metabolism that has adapted
              after years of calorie restriction. Identifying that cause —and treating it— is exactly
              what medical supervision does.
            </p>
            <p className="mt-5 text-[17.5px] leading-[1.7] text-ink-soft">
              GLP‑1 analogues (semaglutide such as Ozempic or Wegovy; tirzepatide such as Mounjaro)
              have shown in clinical trials weight loss of between 10% and 22% of body weight. But
              they are prescription medicines that require a prior medical assessment, follow-up and
              dose adjustment. Using them without supervision is risky and illegal.
            </p>
          </section>

          {/* Mid CTA */}
          <section className="mx-auto max-w-[860px] px-5 pt-4">
            <CTABlock variant="compact" source="pilar" />
          </section>

          {/* Cluster articles */}
          <section
            aria-labelledby="articles-heading"
            className="mx-auto max-w-[1100px] px-5 pb-6 pt-10"
          >
            <h2
              id="articles-heading"
              className="mb-8 text-balance text-[clamp(24px,3vw,34px)] font-light text-ink"
            >
              Everything you need to know about losing weight with medical help
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <a
                  key={a.slug}
                  href={`/${a.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[22px] border border-ink/10 bg-warm no-underline transition-shadow hover:shadow-[0_18px_40px_-22px_rgba(34,29,23,.4)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={a.cover || "/placeholder.svg"}
                      alt={a.coverAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[12px] font-semibold uppercase tracking-[.14em] text-clay">
                      {a.category}
                    </span>
                    <h3 className="mt-2 text-balance text-[17px] font-medium leading-snug text-ink">
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-ink-soft">
                      {a.answerFirst}
                    </p>
                    <span className="mt-4 text-[13.5px] font-medium text-olive">
                      Read article &rarr;
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Medical team */}
          <section
            aria-labelledby="equipo-heading"
            className="mx-auto max-w-[860px] px-5 pb-4 pt-12"
          >
            <h2
              id="equipo-heading"
              className="mb-7 text-balance text-[clamp(22px,2.8vw,30px)] font-light text-ink"
            >
              Content reviewed by GMC-registered doctors
            </h2>
            <div className="flex flex-col gap-5 sm:flex-row">
              {authors.map((author) => (
                <a
                  key={author.slug}
                  href={`/authors/${author.slug}`}
                  className="group flex flex-1 items-start gap-4 rounded-[20px] border border-ink/10 bg-warm p-5 no-underline transition-shadow hover:shadow-[0_14px_32px_-16px_rgba(34,29,23,.3)]"
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-cream-2 text-[22px] font-medium text-ink-soft">
                    {author.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-ink">{author.name}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
                      {author.jobTitle}
                    </p>
                    <p className="mt-1 text-[13px] text-olive">View profile &rarr;</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Final CTA with form */}
          <div className="mx-auto max-w-[860px] px-5 pb-4">
            <CTABlock variant="form" source="pilar" />
          </div>

          <div className="mx-auto max-w-[860px] px-5 pb-10">
            <MedicalDisclaimer
              reviewer="Dr. Laura Méndez (Registration No. 28/2841 · Barcelona) and Dr. Carlos Vidal (Registration No. 28/5567 · Madrid)"
            />
          </div>
        </main>
        <Footer />
        <StickyCTA />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pillarLd) }}
      />
    </QuizProvider>
  );
}
