"use client";

import { QuizTrigger } from "./quiz-trigger";

export function MobileFollowup() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div
        className="relative overflow-hidden rounded-[28px] border border-paper/10 p-6 sm:p-8"
        style={{
          background:
            "radial-gradient(120% 80% at 60% 110%, #33291c 0%, #1d160f 52%, #120c07 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">

          {/* phone image */}
          <div className="relative shrink-0 w-[160px] sm:w-[200px]">
            <img
              src="/doctor-mobile.webp"
              alt="Médico de DoctorLife en videollamada por móvil"
              className="relative w-full"
            />
            {/* fundido derecho — hacia el interior de la card */}
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
              style={{ background: "linear-gradient(to right, transparent, #1a1108)" }}
            />
            {/* fundido inferior */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent, #1a1108)" }}
            />
            {/* fundido superior */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1/4 pointer-events-none"
              style={{ background: "linear-gradient(to top, transparent, #1a1108)" }}
            />
            {/* fundido izquierdo */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1/4 pointer-events-none"
              style={{ background: "linear-gradient(to left, transparent, #1a1108)" }}
            />
          </div>

          {/* copy */}
          <div className="flex flex-1 flex-col gap-3 text-paper">
            <span className="inline-block w-fit rounded-full border border-amber/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-amber">
              100% digital
            </span>
            <h2 className="m-0 text-[clamp(22px,3vw,36px)] font-light leading-[1.05] tracking-[-0.03em]">
              Seguimiento médico{" "}
              <span className="font-serif italic text-sage">desde tu móvil</span>
            </h2>
            <p className="max-w-[38ch] text-sm leading-relaxed text-paper/60">
              Tu médico te acompaña en cada etapa del tratamiento — sin salas de espera.
            </p>
            <QuizTrigger className="mt-2 w-fit rounded-full bg-paper px-6 py-2.5 text-sm font-medium text-[#1d160f] transition-opacity hover:opacity-85">
              Empezar ahora
            </QuizTrigger>
          </div>

        </div>
      </div>
    </section>
  );
}
