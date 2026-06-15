import { Reveal } from "./reveal";
import { QuizTrigger } from "./quiz-trigger";

export function FinalCta() {
  return (
    <section id="cta" className="mx-auto max-w-[1280px] px-[30px] pt-10">
      <Reveal className="relative grid min-h-[460px] grid-cols-1 overflow-hidden rounded-[40px] text-paper md:grid-cols-2" >
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#3a4029 0%,#2a2114 60%,#171009 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(70% 80% at 95% 60%,rgba(227,181,130,.4),transparent 55%)" }} />

        <div className="relative z-[2] p-[54px]">
          <h2 className="m-0 text-[clamp(30px,3.4vw,46px)] font-light leading-[1.04] tracking-[-.02em]">
            Empieza con un plan
            <br />
            creado en torno a <span className="font-serif italic text-sage">ti</span>
          </h2>
          <p className="mb-[26px] mt-4 max-w-[36ch] text-base font-light leading-[1.5] text-paper/[.78]">
            Recibe gratis tu guía «Equilibra tus hormonas», escrita por médicos
            colegiados para acompañarte en tu camino.
          </p>
          <div className="flex max-w-[380px] flex-col gap-3">
            <input
              placeholder="Correo electrónico"
              className="rounded-[14px] border border-paper/[.28] px-[18px] py-4 text-[15px] text-paper outline-none placeholder:text-paper/50"
              style={{ background: "rgba(246,240,230,.1)" }}
            />
            <QuizTrigger className="rounded-[14px] bg-paper py-4 text-base font-semibold text-ink">
              Conseguir la guía
            </QuizTrigger>
          </div>
          <p className="mt-4 max-w-[40ch] text-[11.5px] text-paper/50">
            Al introducir tu correo aceptas nuestros Términos y Condiciones y
            reconoces la Política de Privacidad.
          </p>
        </div>

        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0" style={{ background: "linear-gradient(200deg,#c98a4f 0%,#7a4a2b 50%,#2a2114 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 40% 25%,rgba(246,240,230,.4),transparent 55%)" }} />
          <div className="grain absolute inset-0" />
        </div>
      </Reveal>
    </section>
  );
}
