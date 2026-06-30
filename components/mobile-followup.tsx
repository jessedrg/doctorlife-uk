"use client";

import { QuizTrigger } from "./quiz-trigger";

export function MobileFollowup() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        className="relative overflow-hidden rounded-[24px] border border-paper/10"
        style={{
          background:
            "radial-gradient(120% 80% at 60% 110%, #33291c 0%, #1d160f 52%, #120c07 100%)",
        }}
      >
        <div className="flex items-stretch">

          {/* phone image — flush left, no padding */}
          <div className="relative shrink-0 w-[120px] sm:w-[160px] self-end">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(205,160,80,.18), transparent)",
                filter: "blur(28px)",
              }}
            />
            <img
              src="/doctor-mobile.webp"
              alt="Médico de DoctorLife en videollamada por móvil"
              className="relative w-full object-contain"
            />
          </div>

          {/* copy */}
          <div className="flex flex-1 flex-col justify-center gap-2.5 py-6 pr-6 pl-4 text-paper sm:py-8 sm:pr-8">
            <span className="inline-block w-fit rounded-full border border-amber/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber">
              100% digital
            </span>
            <h2 className="m-0 text-[clamp(18px,2.4vw,30px)] font-light leading-[1.08] tracking-[-0.03em]">
              Seguimiento<br />
              <span className="font-serif italic text-sage">desde tu móvil</span>
            </h2>
            <p className="text-xs leading-relaxed text-paper/55 max-w-[28ch]">
              Tu médico te acompaña en cada etapa — sin salas de espera.
            </p>
            <QuizTrigger className="mt-1 w-fit rounded-full bg-paper px-5 py-2 text-xs font-medium text-[#1d160f] transition-opacity hover:opacity-85">
              Empezar ahora
            </QuizTrigger>
          </div>

        </div>
      </div>
    </section>
  );
}
