import { Reveal } from "./reveal";
import { Parallax } from "./parallax";
import { Counter } from "./counter";
import { QuizTrigger } from "./quiz-trigger";
import { PenArt, PillArt } from "./art";
import { ProductCarousel } from "./product-carousel";
import { metrics, LOSS_STAT } from "@/lib/data";

export function ImmersiveProduct() {
  return (
    <section
      id="product"
      className="grain relative mt-24 scroll-mt-20 overflow-hidden rounded-t-[44px] py-[104px] text-paper"
      style={{ background: "radial-gradient(120% 90% at 50% -5%,#33291c 0%,#1d160f 52%,#120c07 100%)" }}
    >
      <div className="anim-glow absolute left-1/2 top-[-10%] h-[80%] w-[60%] -translate-x-1/2" style={{ background: "radial-gradient(closest-side,rgba(227,181,130,.22),transparent)", filter: "blur(20px)" }} />

      <div className="relative mx-auto max-w-[1280px] px-[30px] text-center">
        <Reveal>
          <h2 className="m-0 text-[clamp(40px,6vw,86px)] font-light leading-[.96] tracking-[-.03em]">
            Una nueva era del
            <br />
            <span className="font-serif italic text-sage">cuidado del peso</span> ya está aquí
          </h2>
        </Reveal>

        {/* floating render */}
        <Parallax speed={46} className="relative mx-auto mt-[14px] h-[420px] w-[680px] max-w-[92vw]">
          <img
            src="/products/maren-lineup.png"
            alt="Gama de productos Maren: plumas inyectoras y pastillas GLP‑1"
            className="anim-floatA absolute inset-0 h-full w-full object-contain"
          />
        </Parallax>

        <Reveal className="mx-auto mt-2 max-w-[34ch]">
          <p className="text-[clamp(20px,2.2vw,28px)] font-light leading-[1.32]">
            <span className="text-sage">Pierde hasta un {LOSS_STAT}% de peso corporal</span>{" "}
            con GLP‑1 respaldado clínicamente — ahora con más opciones que nunca.
          </p>
          <QuizTrigger className="mt-[26px] rounded-full bg-sage px-[38px] py-[15px] text-base font-semibold text-ink">
            Empezar
          </QuizTrigger>
        </Reveal>

        {/* metrics */}
        <Reveal className="mx-auto mt-16 grid max-w-[880px] grid-cols-2 gap-[22px] text-left md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="border-t border-paper/[.18] pt-[18px]">
              <div className="text-[clamp(36px,4vw,54px)] font-light">
                <Counter to={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="mt-1 text-[14.5px] text-paper/70">{m.label}</div>
            </div>
          ))}
        </Reveal>

        <ProductCarousel />

        {/* two feature cards */}
        <div className="mt-[30px] grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal className="relative min-h-[300px] overflow-hidden rounded-[30px] p-[38px] text-left" >
            <div className="absolute inset-0" style={{ background: "linear-gradient(150deg,#2a2114,#171009)" }} />
            <div className="relative z-[2] flex items-start justify-between">
              <div className="text-[clamp(26px,2.6vw,36px)] font-light leading-[1.05]">
                La absorción
                <br />
                <span className="font-serif italic text-sage">perfecta</span>
              </div>
              <button type="button" className="rounded-full bg-sage px-5 py-[10px] text-sm font-semibold text-ink">
                Ver la ciencia
              </button>
            </div>
            <div className="absolute bottom-[34px] left-[38px] right-[38px] z-[2] flex items-end justify-between">
              <div className="max-w-[18ch] text-[13.5px] leading-[1.4] text-paper/70">
                Activa los receptores GLP‑1 que silencian el apetito
              </div>
              <div className="max-w-[18ch] text-right text-[13.5px] leading-[1.4] text-paper/70">
                Mayor absorción en el revestimiento del estómago
              </div>
            </div>
            <PillArt size={120} glyph={false} className="absolute -bottom-[30px] left-1/2 -translate-x-1/2" />
          </Reveal>

          <Reveal delay={0.08} className="relative min-h-[300px] overflow-hidden rounded-[30px] p-[38px] text-center">
            <div className="absolute inset-0" style={{ background: "radial-gradient(90% 80% at 50% 80%,#3a4029,#1d160f)" }} />
            <div className="relative z-[2]">
              <span className="rounded-full px-[14px] py-[5px] text-xs font-semibold text-sage" style={{ background: "rgba(205,217,160,.16)" }}>
                Nueva dosis alta
              </span>
              <div className="mt-[14px] text-[clamp(26px,2.8vw,38px)] font-light leading-[1.04]">
                Pierde hasta un {LOSS_STAT}%
                <br />
                <span className="font-serif italic text-sage">de peso corporal</span>
                <span className="align-super text-sm">*</span>
              </div>
              <div className="mt-[26px] flex items-center justify-center">
                <PenArt height={170} className="anim-floatA" />
              </div>
              <QuizTrigger className="mt-[22px] rounded-full bg-sage px-[26px] py-[11px] text-sm font-semibold text-ink">
                Conoce la pluma
              </QuizTrigger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
