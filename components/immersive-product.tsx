import { Reveal } from "./reveal";
import { Counter } from "./counter";
import { QuizTrigger } from "./quiz-trigger";
import { ProductCarousel } from "./product-carousel";
import { metrics, LOSS_STAT } from "@/lib/data";

export function ImmersiveProduct() {
  return (
    <section
      id="product"
      className="grain relative mt-24 scroll-mt-20 overflow-hidden rounded-t-[44px] py-16 text-paper md:py-[104px]"
      style={{ minHeight: "100svh" }}
    >
      {/* video de fondo a pantalla completa */}
      <video
        src="/products/pills-pen.mp4"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center center" }}
      />
      {/* overlay oscuro para legibilidad del texto */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/40" />

      <div className="relative mx-auto max-w-none px-3 text-center sm:px-4 lg:px-5">
        <Reveal>
          <h2 className="m-0 text-[clamp(40px,6vw,86px)] font-light leading-[.96] tracking-[-.03em]">
            Una nueva era del
            <br />
            <span className="font-serif italic text-sage">cuidado del peso</span> ya está aquí
          </h2>
        </Reveal>

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
      </div>
    </section>
  );
}
