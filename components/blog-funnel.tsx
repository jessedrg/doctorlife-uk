import { QuizTrigger } from "./quiz-trigger";

/**
 * Bloque de conversión reutilizable dentro de los posts del blog.
 * Empuja al lector a empezar el tratamiento con Maren (primera visita 25 €).
 */
export function BlogFunnel({
  title = "Empieza tu tratamiento con médicos colegiados",
  subtitle = "Tu primera visita son solo 25 € y se descuentan del tratamiento. Todo el seguimiento, desde nuestra app.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <aside className="my-12 overflow-hidden rounded-[28px] bg-espresso text-paper">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
        <div className="p-8 sm:p-10">
          <span className="inline-block rounded-full bg-sage px-[13px] py-[5px] text-xs font-semibold text-ink">
            Primera visita 25 €
          </span>
          <h3 className="mt-5 text-balance text-[clamp(24px,3vw,32px)] font-light leading-[1.1]">
            {title}
          </h3>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-paper/75">{subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <QuizTrigger className="rounded-full bg-sage px-7 py-[14px] text-[15px] font-semibold text-ink">
              Reservar primera visita
            </QuizTrigger>
            <a
              href="/#planes"
              className="rounded-full border border-paper/25 px-7 py-[14px] text-[15px] font-medium text-paper no-underline transition-colors hover:bg-paper/10"
            >
              Ver planes
            </a>
          </div>
        </div>
        <div className="relative min-h-[220px] md:min-h-full">
          <img
            src="/hero/woman.png"
            alt="Paciente de Maren sonriendo"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(90deg,#171009 0%,transparent 45%)" }}
          />
        </div>
      </div>
    </aside>
  );
}
