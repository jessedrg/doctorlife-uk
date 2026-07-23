import type { Metadata } from "next";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Cookie policy — DoctorLife",
  description:
    "Which cookies DoctorLife uses (essential, analytics and marketing), how long they last and how to manage your consent.",
  alternates: { canonical: `${SITE_URL}/cookies` },
};

type Section = {
  title: string;
  body?: string;
  bullets?: string[];
};

const sections: Section[] = [
  {
    title: "What cookies are",
    body: "Small files stored in your browser to remember your preferences and measure how the site is used.",
  },
  {
    title: "Which cookies we use",
    bullets: [
      "Essential — required for the site to function (for example, remembering your language). No consent needed.",
      "Analytics — help us understand what works and what doesn't. Only with your consent.",
      "Marketing — only if you accept. We never share medical data with advertising networks.",
    ],
  },
  {
    title: "Duration",
    body: "Essential cookies expire when your session ends or, where applicable, after 12 months. Analytics cookies are retained for a maximum of 14 months. Marketing cookies, if you accept, are retained for a maximum of 13 months and are deleted if you withdraw your consent.",
  },
  {
    title: "Managing cookies",
    body: "You can change your choice at any time from the cookie banner or from your browser settings.",
  },
];

export default function CookiesPage() {
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
              Cookie <span className="font-serif italic text-olive">policy</span>
            </h1>
            <p className="mt-5 max-w-[58ch] text-pretty text-[16px] leading-relaxed text-ink-soft">
              We explain which cookies we use, what they are for and how you can
              manage your consent at any time.
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
