import { QuizTrigger } from "./quiz-trigger";

/**
 * Bloque de conversión reutilizable dentro de los posts del blog.
 * Empuja al lector a empezar el tratamiento con DoctorLife (primera visita 25 €).
 */
export function BlogFunnel({
  title = "Empieza tu tratamiento con un endocrino colegiado",
  subtitle = "Primera visita por 25 € (descontables). Después, una sola suscripción de 100 €/mes con chat con tu endocrino, la receta de GLP‑1 si es necesaria y el seguimiento. Sin permanencia.",
  image = "/hero/woman.png",
  imageAlt = "Paciente de DoctorLife sonriendo",
}: {
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <aside className="my-12 overflow-hidden rounded-[28px] bg-espresso text-paper">
      <div className="flex flex-col-reverse md:grid md:grid-cols-[1.2fr_1fr]">
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
              Ver qué incluye
            </a>
          </div>
        </div>
        <div className="relative aspect-[5/4] w-full sm:aspect-[16/9] md:aspect-auto md:min-h-full">
          <img
            src={image || "/placeholder.svg"}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-[center_25%] md:object-top"
          />
          {/* degradado: vertical en móvil (oscurece la parte inferior), horizontal en escritorio */}
          <div
            className="pointer-events-none absolute inset-0 md:hidden"
            style={{ background: "linear-gradient(180deg,transparent 45%,#171009 100%)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{ background: "linear-gradient(90deg,#171009 0%,transparent 45%)" }}
          />
        </div>
      </div>
    </aside>
  );
}
