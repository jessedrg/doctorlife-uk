import { footerColumns } from "@/lib/data";
import { QuizTrigger } from "./quiz-trigger";
import { BrandLogo } from "./brand-logo";

export function Footer() {
  return (
    <footer className="px-3 pb-6 pt-[60px] sm:px-4 lg:px-5">
      <div className="mx-auto max-w-none overflow-hidden rounded-[32px] bg-ink text-paper">
        <div className="grid grid-cols-2 gap-10 px-8 pb-12 pt-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-14">
          {/* marca + CTA */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="/#top"
              aria-label="DoctorLife — inicio"
              className="inline-flex no-underline"
            >
              <BrandLogo boxed markSize={28} textSize={23} textClassName="text-paper" />
            </a>
            <p className="mt-5 max-w-[280px] text-[15px] leading-relaxed text-paper/65">
              Cuidado del peso dirigido por médicos colegiados, con seguimiento
              real desde la app y tratamiento GLP‑1 supervisado.
            </p>
            <QuizTrigger className="mt-7 inline-flex items-center gap-2 rounded-full bg-sage px-6 py-[12px] text-[15px] font-semibold text-ink">
              Empieza por 25 €
              <span className="text-[13px]">↗</span>
            </QuizTrigger>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <div className="mb-5 text-xs uppercase tracking-[.14em] text-sage">{col.title}</div>
              <div className="flex flex-col gap-[13px] text-[15px] text-paper/70">
                {col.links.map((l) => (
                  <a key={l.label} href={l.href} className="text-inherit no-underline transition-colors hover:text-paper">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/10 px-8 py-6 text-[12.5px] text-paper/45 md:px-14">
          <span>© 2026 DoctorLife · doctorlife.io</span>
          <span>Tratamiento sujeto a evaluación médica.</span>
        </div>
      </div>
    </footer>
  );
}
