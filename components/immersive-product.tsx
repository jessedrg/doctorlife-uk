"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./reveal";
import { Counter } from "./counter";
import { QuizTrigger } from "./quiz-trigger";
import { metrics, LOSS_STAT } from "@/lib/data";

export function ImmersiveProduct() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Forzar muted y autoplay — necesario en iOS Safari
    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    const play = () => video.play().catch(() => {});
    play();
    // Reintentar si el documento gana foco (Safari background tab)
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) play();
    });
  }, []);

  return (
    <section
      id="product"
      className="grain relative mt-24 scroll-mt-20 overflow-hidden rounded-t-[44px] text-paper"
      style={{ height: "100svh" }}
    >
      {/* video de fondo a pantalla completa */}
      <video
        ref={videoRef}
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

      {/* contenido en flex column que ocupa toda la altura */}
      <div className="relative flex h-full flex-col items-center justify-between px-4 pb-6 pt-10 text-center sm:px-6 sm:pb-10 sm:pt-14 lg:px-8">

        {/* título + párrafo + CTA */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <Reveal>
            <h2 className="m-0 text-[clamp(28px,5vw,78px)] font-light leading-[.96] tracking-[-.03em]">
              Una nueva era del
              <br />
              <span className="font-serif italic text-sage">cuidado del peso</span> ya está aquí
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-[32ch] text-[clamp(14px,1.8vw,22px)] font-light leading-[1.35] text-paper/80">
              <span className="text-sage">Pierde hasta un {LOSS_STAT}% de peso corporal</span>{" "}
              con GLP‑1 respaldado clínicamente.
            </p>
          </Reveal>
          <Reveal>
            <QuizTrigger className="rounded-full bg-sage px-8 py-3 text-sm font-semibold text-ink sm:px-[38px] sm:py-[15px] sm:text-base">
              Empezar
            </QuizTrigger>
          </Reveal>
        </div>

        {/* métricas */}
        <Reveal className="w-full max-w-[880px]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left sm:grid-cols-4 sm:gap-[22px]">
            {metrics.map((m) => (
              <div key={m.label} className="border-t border-paper/[.18] pt-3 sm:pt-[18px]">
                <div className="text-[clamp(24px,3.5vw,54px)] font-light leading-none">
                  <Counter to={m.value} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <div className="mt-1 text-[clamp(10px,1.1vw,14px)] leading-tight text-paper/70">{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
