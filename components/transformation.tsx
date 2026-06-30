import { Reveal } from "./reveal";
import { QuizTrigger } from "./quiz-trigger";
import { WegovyPenCard } from "./wegovy-pen-card";

export function Transformation() {
  return (
    <section id="transform" className="mx-auto max-w-none scroll-mt-[90px] px-3 pt-24 sm:px-4 lg:px-5">
      {/* Heading centrado — sin fondo gris */}
      <Reveal className="text-center">
        <div className="text-[13px] uppercase tracking-[.16em] text-ink-mute">Cambio real</div>
        <h2 className="mt-[10px] text-[clamp(34px,4.8vw,62px)] font-light leading-none tracking-[-.02em] text-ink text-balance">
          Un cambio que dura,
          <br />
          en <span className="font-serif italic">tus</span> términos
        </h2>
        <div className="mt-[26px] flex flex-wrap justify-center gap-3">
          <QuizTrigger className="rounded-full bg-ink px-[30px] py-[13px] text-[15px] font-medium text-paper">
            Empezar
          </QuizTrigger>
          <QuizTrigger className="rounded-full border border-ink/30 bg-transparent px-[30px] py-[13px] text-[15px] font-medium text-ink">
            Comprobar si soy apto
          </QuizTrigger>
        </div>
      </Reveal>

      {/* Grid de cards — sin wrapper gris, cards directamente sobre el fondo de página */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-[46px] sm:gap-[18px] lg:grid-cols-[1fr_1.2fr_1fr]">

        {/* Columna izquierda: card de resultados + card de objetivo */}
        <div className="flex flex-col gap-4 sm:gap-[18px]">
          {/* Card: Resultados en 3-6 meses */}
          <Reveal>
            <div
              className="grain relative min-h-[200px] overflow-hidden rounded-[26px] border border-paper/15 p-7 text-paper"
              style={{ background: "linear-gradient(155deg,#3a4a2a 0%,#2c3820 50%,#1e2818 100%)" }}
            >
              <div className="max-w-[16ch] text-[23px] font-light leading-[1.16]">
                Resultados en 3–6 meses con un plan creado para ti
              </div>
              <QuizTrigger
                className="absolute bottom-6 right-6 rounded-full border border-paper/30 px-[18px] py-[9px] text-[13.5px] text-paper"
                style={{ background: "rgba(246,240,230,.16)" }}
              >
                Empezar
              </QuizTrigger>
              <div className="absolute bottom-5 left-5 flex h-[80px] w-[80px] items-center justify-center">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(50% 50% at 50% 50%,rgba(205,217,160,.30),transparent 70%)" }}
                />
                <img
                  src="/glp1-pen.png"
                  alt="Pluma inyectora GLP-1"
                  className="relative h-[66px] w-[66px] -rotate-[18deg] object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,.45)]"
                />
              </div>
            </div>
          </Reveal>

          {/* Card: ¿Cuál es tu objetivo? */}
          <Reveal>
            <div
              className="rounded-[26px] border border-paper/15 p-7 text-paper"
              style={{ background: "linear-gradient(155deg,#3a4a2a 0%,#2c3820 50%,#1e2818 100%)" }}
            >
              <div className="text-[13px] uppercase tracking-[.14em] text-paper/60">¿Cuál es tu objetivo?</div>
              <div className="mt-4 flex flex-col gap-[10px]">
                {["Perder peso de forma constante", "Equilibrar mis hormonas", "Todo lo anterior"].map((g) => (
                  <QuizTrigger
                    key={g}
                    className="rounded-full border border-paper/20 px-[18px] py-3 text-left text-[14.5px] text-paper"
                    style={{ background: "rgba(246,240,230,.1)" }}
                  >
                    {g}
                  </QuizTrigger>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Columna central: WegovyPenCard */}
        <WegovyPenCard />

        {/* Columna derecha: Daniel */}
        <Reveal>
          <div
            className="flex flex-col justify-between rounded-[26px] border border-paper/15 p-[34px] text-paper"
            style={{ background: "linear-gradient(155deg,#3a4a2a 0%,#2c3820 50%,#1e2818 100%)" }}
          >
            <div className="mb-7 overflow-hidden rounded-[20px]" style={{ background: "linear-gradient(160deg,#5f6a3e,#2c3439)" }}>
              <img
                src="/testimonials/daniel.png"
                alt="Daniel, paciente de DoctorLife"
                className="h-[220px] w-full object-cover object-[center_20%] sm:h-[260px] lg:h-[340px] 2xl:h-[400px]"
              />
            </div>
            <div className="font-serif text-[clamp(20px,2.4vw,30px)] font-normal italic leading-[1.3]">
              &ldquo;Por primera vez el peso se fue y{" "}
              <span className="text-sage">no volvió</span>. DoctorLife se sintió como
              cuidado de verdad, no como una transacción.&rdquo;
            </div>
            <div className="mt-[26px] flex items-center gap-4">
              <img
                src="/testimonials/daniel.png"
                alt="Daniel"
                className="h-[60px] w-[60px] rounded-full object-cover object-[center_20%]"
              />
              <div>
                <div className="text-base font-medium">Daniel, 38</div>
                <div className="text-[13.5px] text-paper/60">9 meses · Semaglutida + analíticas</div>
              </div>
            </div>
            <div className="mt-[22px] flex gap-[7px]">
              <span className="h-[5px] w-6 rounded-[9px] bg-sage" />
              <span className="h-[5px] w-2 rounded-[9px] bg-paper/30" />
              <span className="h-[5px] w-2 rounded-[9px] bg-paper/30" />
            </div>
          </div>
        </Reveal>
      </div>

      <p className="mt-[26px] text-center text-[11.5px] text-ink-mute">
        El testimonio refleja la experiencia de un paciente. Los resultados
        individuales varían. Consulta siempre con tu médico.
      </p>
    </section>
  );
}
