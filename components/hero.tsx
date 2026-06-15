import { Reveal } from "./reveal";
import { Parallax } from "./parallax";
import { QuizTrigger } from "./quiz-trigger";
import { LOSS_STAT } from "@/lib/data";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1280px] scroll-mt-[90px] px-[30px] pt-16">
      <h1 className="m-0 max-w-[14ch] text-[clamp(52px,9vw,138px)] font-light leading-[.93] tracking-[-.035em]">
        Tu cuerpo,
        <br />
        por fin <span className="font-serif font-normal italic">entendido</span>.
      </h1>
      <p className="mt-[26px] max-w-[46ch] text-[clamp(17px,1.5vw,20px)] font-light leading-[1.5] text-ink-soft">
        Cuidado del peso y hormonal dirigido por médicos, diseñado en torno a tu
        cuerpo — no a un protocolo único.
      </p>

      {/* big cards */}
      <div className="mt-12 grid grid-cols-1 gap-[18px] md:grid-cols-2">
        {/* card 1 */}
        <Reveal className="relative min-h-[372px] overflow-hidden rounded-[34px] p-[38px] text-paper" >
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(130% 120% at 88% 15%,#3a2c1c 0%,#241b12 60%,#171009 100%)" }}
          />
          <div className="relative z-[2] max-w-[60%]">
            <div className="text-[clamp(22px,2.2vw,30px)] font-light leading-[1.12]">
              Empieza tu
              <br />
              cuidado del peso
            </div>
          </div>
          <QuizTrigger className="absolute bottom-[34px] left-[38px] z-[2] inline-flex items-center gap-[10px] text-[17px] font-normal text-paper">
            Encuentra tu plan
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-paper/40">→</span>
          </QuizTrigger>
          <Parallax speed={34} className="pointer-events-none absolute bottom-0 right-0 top-[20px] w-[52%]">
            <img
              src="/products/maren-lineup.png"
              alt="Gama de productos Maren: plumas inyectoras y pastillas GLP‑1"
              className="anim-floatA absolute inset-0 h-full w-full object-contain object-right"
            />
          </Parallax>
        </Reveal>

        {/* card 2 — lifestyle */}
        <Reveal delay={0.08} className="grain relative min-h-[372px] overflow-hidden rounded-[34px] p-[38px] text-paper">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(155deg,#5f6a3e 0%,#3a4029 55%,#222716 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(80% 70% at 85% 75%,rgba(227,181,130,.5),transparent 60%),radial-gradient(60% 50% at 70% 20%,rgba(246,240,230,.28),transparent 55%)" }}
          />
          <div className="relative z-[2]">
            <div className="text-[clamp(22px,2.2vw,30px)] font-light leading-[1.12]">
              Descubre cuánto
              <br />
              puedes perder
            </div>
          </div>
          <Parallax speed={28} className="pointer-events-none absolute bottom-[64px] right-[24px] z-[2] w-[58%]">
            <img
              src="/products/maren-scale.png"
              alt="Báscula digital Maren"
              className="anim-floatA h-full w-full object-contain"
            />
          </Parallax>
          <div className="absolute bottom-[34px] left-[38px] z-[2] flex items-center gap-2 text-[18px] font-normal">
            <span className="text-xl">↓</span> Pierde hasta un {LOSS_STAT}%
            <span className="align-super text-[12px]">*</span>
          </div>
          <QuizTrigger
            className="absolute bottom-[30px] right-[30px] z-[2] flex h-[42px] w-[42px] items-center justify-center rounded-full border border-paper/40 text-lg text-paper"
            style={{ background: "rgba(246,240,230,.08)" }}
          >
            →
          </QuizTrigger>
        </Reveal>
      </div>

      {/* secondary cards */}
      <div className="mt-[18px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        <SecondaryCard label="Equilibra tus" accent="hormonas" delay={0.04} dot="rounded-[11px]" dotBg="radial-gradient(60% 60% at 38% 32%,#fff,#dcd0bb 60%,#b9aa8e)" />
        <SecondaryCard label="Sueño y" accent="energía" delay={0.1} dot="rounded-[11px]" dotBg="radial-gradient(60% 60% at 38% 32%,#f3c79a,#c98a4f 60%,#9a5a33)" />
        <SecondaryCard label="Pide tu" accent="analítica" delay={0.16} dot="rounded-full" dotBg="conic-gradient(from 140deg,#c98a4f,#9aa472,#8c8f9e,#c98a4f)" />
        <Reveal delay={0.22}>
          <QuizTrigger className="flex min-h-[120px] w-full items-center justify-between gap-[14px] rounded-[26px] bg-ink p-[28px] text-left text-paper">
            <span className="text-[19px] font-light leading-[1.2]">
              ¿No sabes por
              <br />
              dónde empezar? <span className="font-medium">Empieza aquí</span>
            </span>
            <span className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full border border-paper/40 text-xl">
              +
            </span>
          </QuizTrigger>
        </Reveal>
      </div>
    </section>
  );
}

function SecondaryCard({
  label,
  accent,
  delay,
  dot,
  dotBg,
}: {
  label: string;
  accent: string;
  delay: number;
  dot: string;
  dotBg: string;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex min-h-[120px] items-center justify-between gap-[14px] rounded-[26px] p-[28px]" style={{ background: "linear-gradient(135deg,#eee4d4,#e3d6c1)" }}>
        <div className="text-[19px] font-normal">
          {label} <span className="text-clay">{accent}</span>
        </div>
        <div className="flex items-center gap-[14px]">
          <div className={`h-[38px] w-[38px] ${dot}`} style={{ background: dotBg }} />
          <span className="text-xl text-ink-mute">›</span>
        </div>
      </div>
    </Reveal>
  );
}
