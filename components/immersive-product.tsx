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
            A new era of
            <br />
            <span className="font-serif italic text-sage">weight care</span> is here
          </h2>
        </Reveal>

        {/* floating render */}
        <Parallax speed={46} className="relative mx-auto mt-[14px] h-[420px] w-[520px] max-w-[90vw]">
          <PenArt height={340} className="anim-floatB absolute left-[42%] top-[8%]" />
          <PillArt size={150} className="anim-floatA absolute left-[14%] top-[30%]" />
          <PillArt
            size={96}
            glyph={false}
            bg="radial-gradient(60% 60% at 38% 32%,#f3c79a,#d49a63 55%,#a65f3b)"
            className="anim-floatC absolute right-[9%] top-[46%]"
          />
        </Parallax>

        <Reveal className="mx-auto mt-2 max-w-[34ch]">
          <p className="text-[clamp(20px,2.2vw,28px)] font-light leading-[1.32]">
            <span className="text-sage">Lose up to {LOSS_STAT}% body weight</span>{" "}
            with clinically‑backed GLP‑1 — now with more options than ever.
          </p>
          <QuizTrigger className="mt-[26px] rounded-full bg-sage px-[38px] py-[15px] text-base font-semibold text-ink">
            Get started
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
                The perfect
                <br />
                <span className="font-serif italic text-sage">absorption</span>
              </div>
              <button type="button" className="rounded-full bg-sage px-5 py-[10px] text-sm font-semibold text-ink">
                See the science
              </button>
            </div>
            <div className="absolute bottom-[34px] left-[38px] right-[38px] z-[2] flex items-end justify-between">
              <div className="max-w-[18ch] text-[13.5px] leading-[1.4] text-paper/70">
                Activates GLP‑1 receptors that quiet appetite signals
              </div>
              <div className="max-w-[18ch] text-right text-[13.5px] leading-[1.4] text-paper/70">
                Enhanced uptake in the stomach lining
              </div>
            </div>
            <PillArt size={120} glyph={false} className="absolute -bottom-[30px] left-1/2 -translate-x-1/2" />
          </Reveal>

          <Reveal delay={0.08} className="relative min-h-[300px] overflow-hidden rounded-[30px] p-[38px] text-center">
            <div className="absolute inset-0" style={{ background: "radial-gradient(90% 80% at 50% 80%,#3a4029,#1d160f)" }} />
            <div className="relative z-[2]">
              <span className="rounded-full px-[14px] py-[5px] text-xs font-semibold text-sage" style={{ background: "rgba(205,217,160,.16)" }}>
                New high dose
              </span>
              <div className="mt-[14px] text-[clamp(26px,2.8vw,38px)] font-light leading-[1.04]">
                Lose up to {LOSS_STAT}%
                <br />
                <span className="font-serif italic text-sage">body weight</span>
                <span className="align-super text-sm">*</span>
              </div>
              <div className="mt-[26px] flex items-center justify-center">
                <PenArt height={170} className="anim-floatA" />
              </div>
              <QuizTrigger className="mt-[22px] rounded-full bg-sage px-[26px] py-[11px] text-sm font-semibold text-ink">
                Explore the pen
              </QuizTrigger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
