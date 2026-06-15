import { QuizTrigger } from "./quiz-trigger";

const bullets = [
  "Dirigido por médicos endocrinos",
  "Tratamiento farmacológico supervisado",
  "Apoyo de equipo clínico multidisciplinar",
];

export function Hero() {
  return (
    <section id="top" className="mx-auto -mt-[84px] max-w-[1180px] scroll-mt-[90px] px-[18px] pt-[84px]">
      <div className="relative min-h-[760px] overflow-hidden rounded-[36px]">
        {/* base brand color block */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(155deg,#6b774a 0%,#5f6a3e 45%,#454d2e 100%)" }}
        />

        {/* PLACEHOLDER — foto de personas (sustituir luego) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[64%]">
          <div className="flex h-full w-full items-center justify-center bg-olive/30">
            <div className="flex flex-col items-center gap-3 text-paper/70">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-paper/50 text-3xl font-light">
                +
              </div>
              <span className="text-sm font-medium tracking-wide">Foto de personas</span>
            </div>
          </div>
          {/* color overlay para fundir la foto con el bloque */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(95deg,#5f6a3e 0%,rgba(95,106,62,.65) 30%,rgba(95,106,62,.15) 60%,transparent 100%)" }}
          />
        </div>

        {/* contenido */}
        <div className="relative z-[2] flex min-h-[760px] items-center px-5 py-16 sm:px-10">
          <div className="w-full max-w-[560px] rounded-[28px] bg-paper p-8 shadow-[0_30px_80px_-30px_rgba(34,29,23,.45)] sm:p-12">
            <div className="text-[13px] font-semibold uppercase tracking-[.18em] text-clay">
              Tu clínica 100% digital
            </div>
            <h1 className="mt-6 text-balance text-[clamp(38px,5.2vw,66px)] font-light leading-[1.02] tracking-[-.03em] text-ink">
              El tratamiento médico para la{" "}
              <span className="font-serif italic text-olive">pérdida de peso</span>, adaptado a tu realidad
            </h1>

            <ul className="mt-9 flex flex-col gap-[14px]">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[clamp(15px,1.4vw,18px)] text-ink-soft">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage text-sm text-olive">
                    →
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <QuizTrigger className="mt-10 inline-flex items-center gap-[10px] rounded-full bg-ink px-8 py-[16px] text-base font-medium text-paper">
              Calcula tu IMC
              <span className="text-[13px]">↗</span>
            </QuizTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
