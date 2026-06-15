import type { Metadata } from "next";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogCard } from "@/components/blog-card";
import { BlogFunnel } from "@/components/blog-funnel";
import { posts, SITE_URL } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog Maren — Wegovy, Mounjaro y pérdida de peso con GLP‑1",
  description:
    "Guías claras y médicas sobre Wegovy, Mounjaro, semaglutida y tirzepatida: precios, recetas y cómo empezar tu tratamiento de pérdida de peso en España.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog Maren — Cuidado del peso con GLP‑1",
    description:
      "Guías sobre Wegovy, Mounjaro y pérdida de peso con GLP‑1: precios, recetas y cómo empezar con seguimiento médico.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndex() {
  const featured = posts.filter((p) => p.featured).slice(0, 1);
  const lead = featured[0] ?? posts[0];
  const rest = posts.filter((p) => p.slug !== lead.slug);

  return (
    <QuizProvider>
      <div className="overflow-x-clip bg-paper">
        <Navbar />
        <main className="mx-auto max-w-[1180px] px-[18px] pb-10 pt-10">
          <header className="mx-auto max-w-[760px] py-12 text-center sm:py-16">
            <span className="text-[13px] font-semibold uppercase tracking-[.18em] text-clay">
              Blog Maren
            </span>
            <h1 className="mt-4 text-balance text-[clamp(34px,5vw,58px)] font-light leading-[1.04] tracking-[-.02em] text-ink">
              Todo sobre el <span className="font-serif italic text-olive">cuidado del peso</span> con GLP‑1
            </h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-pretty text-[17px] leading-relaxed text-ink-soft">
              Wegovy, Mounjaro, semaglutida, tirzepatida: precios, recetas y cómo empezar de forma segura y con seguimiento médico real.
            </p>
          </header>

          <BlogCard post={lead} large />

          <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(0, 3).map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>

          <BlogFunnel />

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(3).map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
