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

    // iOS Safari requires these to be set via JS, not just JSX attributes
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      if (!video.paused) return;
      // Re-ensure muted before every play attempt (iOS resets it sometimes)
      video.muted = true;
      video.play().catch(() => {});
    };

    // Fire on every data-ready event
    video.addEventListener("canplay", tryPlay, { passive: true });
    video.addEventListener("canplaythrough", tryPlay, { once: true });
    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("loadedmetadata", tryPlay, { once: true });

    // Attempt immediately
    tryPlay();

    // IntersectionObserver: re-play whenever the video enters viewport
    // (handles the case where iOS pauses background videos)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) tryPlay();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    // On first user touch anywhere on the page, try to play
    // (needed for iOS Low Power Mode and some restricted autoplay policies)
    const onTouch = () => tryPlay();
    document.addEventListener("touchstart", onTouch, { once: true, passive: true });
    document.addEventListener("touchend", onTouch, { once: true, passive: true });

    // Re-attempt when tab becomes visible again
    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Re-attempt on page focus (e.g. returning from another app on mobile)
    window.addEventListener("focus", tryPlay, { passive: true });

    // Force-load the video resource
    video.load();

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", onTouch);
      document.removeEventListener("touchend", onTouch);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", tryPlay);
    };
  }, []);

  return (
    <section
      id="product"
      className="grain relative scroll-mt-20 overflow-hidden text-paper"
      style={{
        marginTop: "clamp(16px, 3vw, 40px)",
        marginLeft: "clamp(12px, 1.5vw, 20px)",
        marginRight: "clamp(12px, 1.5vw, 20px)",
        borderRadius: "44px 44px 0 0",
        /*
         * Total offset from viewport top to where this section starts:
         *   announcement bar ~38px + navbar ~68px + marginTop ~40px + 16px gap = ~162px
         * Subtract that from 100svh so the bottom edge sits flush with the viewport.
         */
        height: "calc(100svh - 162px)",
      }}
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
        preload="metadata"
        x-webkit-airplay="deny"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center center" }}
      />
      {/* overlay oscuro para legibilidad del texto */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/40" />
      {/* fundido hacia el fondo de la sección siguiente */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #120c07)" }}
      />

      {/* contenido en flex column que ocupa toda la altura */}
      {/* pb-safe: extra bottom padding so metrics are never hidden behind mobile browser bar */}
      <div
        className="relative flex h-full flex-col items-center justify-between px-4 pt-10 text-center sm:px-6 sm:pt-14 lg:px-8"
        style={{ paddingBottom: "max(24px, calc(env(safe-area-inset-bottom, 0px) + 20px))" }}
      >

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
