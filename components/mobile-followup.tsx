"use client";

import { Reveal } from "./reveal";
import { QuizTrigger } from "./quiz-trigger";

const features = [
  { label: "Consultas por videollamada", icon: "▸" },
  { label: "Ajuste de dosis en tiempo real", icon: "▸" },
  { label: "Seguimiento semanal de progreso", icon: "▸" },
  { label: "Recetas renovadas automáticamente", icon: "▸" },
];

export function MobileFollowup() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* subtle warm glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 30% 50%, rgba(var(--color-amber-rgb, 205,160,80),.06) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">

          {/* — phone image — */}
          <Reveal className="flex flex-1 justify-center">
            <div className="relative w-[300px] sm:w-[360px]">
              {/* ambient glow behind phone */}
              <div
                aria-hidden
                className="absolute inset-[-12%] rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(205,160,80,.18), transparent)",
                  filter: "blur(32px)",
                }}
              />
              <img
                src="/doctor-mobile.webp"
                alt="Médico de DoctorLife en videollamada por móvil"
                className="relative w-full drop-shadow-2xl"
              />
            </div>
          </Reveal>

          {/* — copy — */}
          <div className="flex flex-1 flex-col items-start">
            <Reveal>
              <span className="mb-4 inline-block rounded-full border border-amber/40 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber">
                100% digital
              </span>
            </Reveal>

            <Reveal>
              <h2 className="m-0 text-[clamp(32px,4.5vw,62px)] font-light leading-[.96] tracking-[-0.03em] text-foreground">
                Seguimiento médico
                <br />
                <span className="font-serif italic text-sage">desde tu móvil</span>
              </h2>
            </Reveal>

            <Reveal>
              <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-foreground/60">
                Tu médico te acompaña en cada paso del tratamiento. Sin salas de espera,
                sin desplazamientos — todo desde la palma de tu mano.
              </p>
            </Reveal>

            <Reveal>
              <ul className="mt-7 space-y-3">
                {features.map((f) => (
                  <li key={f.label} className="flex items-center gap-3 text-sm text-foreground/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage text-xs">
                      ✓
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-10">
              <QuizTrigger className="rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-80">
                Comenzar ahora
              </QuizTrigger>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
