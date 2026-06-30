"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./reveal";
import { Counter } from "./counter";
import { QuizTrigger } from "./quiz-trigger";
import { metrics, LOSS_STAT } from "@/lib/data";

export function ImmersiveProduct() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Set height precisely: measure the sticky header stack once and on every resize.
  // We measure the first sticky/fixed element above this section in the DOM.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const setHeight = () => {
      // offsetTop is the element's distance from the top of its offsetParent,
      // but we need distance from the page top. Walk the offsetParent chain.
      let el: HTMLElement | null = section;
      let topFromPage = 0;
      while (el) {
        topFromPage += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
      }
      // The sticky header always occupies the top of the viewport.
      // When the section is scrolled into view flush with the header bottom,
      // visible height = viewport - headerHeight.
      // But we want the card to fit exactly within the viewport when it first
      // enters: height = viewport - topFromPage + scrollY_at_that_moment.
      // Simplest correct formula: height = viewport - (topFromPage % viewport)
      // Actually: when section is at top of scroll, top of card = header height.
      // So just: height = viewport - headerHeight - marginTop - gap.
      // We sum all sticky/fixed elements heights instead.
      const stickyEls = Array.from(
        document.querySelectorAll<HTMLElement>('[class*="sticky"], [class*="fixed"]')
      ).filter((e) => e !== section && section.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
      const headerH = stickyEls.reduce((sum, e) => sum + e.offsetHeight, 0) || 106;
      const mt = parseFloat(getComputedStyle(section).marginTop) || 0;
      const h = window.innerHeight - headerH - mt - 12;
      section.style.height = `${Math.max(h, 400)}px`;
    };

    // Small delay to let layout settle (fonts, images)
    const t = setTimeout(setHeight, 100);
    window.addEventListener("resize", setHeight, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", setHeight);
    };
  }, []);



  return (
    <section
      ref={sectionRef}
      id="product"
      className="grain relative scroll-mt-20 overflow-hidden text-paper"
      style={{
        margin: "clamp(12px, 1.5vw, 20px) clamp(12px, 1.5vw, 20px) 0",
        borderRadius: "44px 44px 0 0",
        // Height is overwritten by JS useEffect above; fallback for SSR
        height: "calc(100svh - 120px)",
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
        style={{ objectPosition: "center top" }}
      />
      {/* overlay oscuro para legibilidad del texto */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/40" />
      {/* fundido suave hacia la sección siguiente */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: "55%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(18,12,7,0.55) 50%, #120c07 100%)",
        }}
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
