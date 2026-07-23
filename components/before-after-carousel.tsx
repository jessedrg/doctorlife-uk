"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const ALL_CASES = [
  {
    src: "/landing/before-after-1.png",
    alt: "Before and after of a weight management case with GLP-1 treatment",
    lost: "−14 kg",
    weeks: "in 20 weeks",
  },
  {
    src: "/landing/before-after-2.png",
    alt: "Before and after of a weight management case with GLP-1 treatment",
    lost: "−18 kg",
    weeks: "in 24 weeks",
  },
  {
    src: "/landing/before-after-3.png",
    alt: "Before and after of a weight management case with GLP-1 treatment",
    lost: "−16 kg",
    weeks: "in 22 weeks",
  },
];

const INTERVAL = 3500;

export function BeforeAfterCarousel({
  variant = "dark",
  count = 3,
}: {
  variant?: "dark" | "light";
  count?: number;
}) {
  const CASES = ALL_CASES.slice(0, Math.max(1, Math.min(count, ALL_CASES.length)));
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const isLight = variant === "light";

  const go = useCallback((next: number) => {
    setIndex((next + CASES.length) % CASES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CASES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [index]);

  return (
    <div className="w-full">
      <div
        className={`relative overflow-hidden rounded-[24px] bg-ink/20 shadow-2xl ring-1 ${
          isLight ? "ring-ink/10" : "ring-paper/15"
        }`}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {/* Etiquetas antes / después */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex justify-between px-3 pt-3">
          <span className="rounded-full bg-ink/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[.12em] text-paper backdrop-blur-sm">
            Before
          </span>
          <span className="rounded-full bg-sage px-3 py-1 text-[11px] font-semibold uppercase tracking-[.12em] text-ink">
            After
          </span>
        </div>

        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {CASES.map((c) => (
            <div key={c.src} className="relative w-full flex-shrink-0">
              <Image
                src={c.src || "/placeholder.svg"}
                alt={c.alt}
                width={1536}
                height={1024}
                className="h-auto w-full object-cover"
                priority
              />
              {/* Cifra de resultado */}
              <div className="absolute bottom-3 left-3 z-[2] rounded-[14px] bg-ink/70 px-3.5 py-2 backdrop-blur-sm">
                <span className="block text-[20px] font-semibold leading-none text-sage">
                  {c.lost}
                </span>
                <span className="mt-0.5 block text-[11.5px] text-paper/80">
                  {c.weeks}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Puntos de navegación */}
      <div
        className={`mt-3 flex items-center justify-center gap-2 ${
          CASES.length <= 1 ? "hidden" : ""
        }`}
      >
        {CASES.map((c, i) => (
          <button
            key={c.src}
            type="button"
            aria-label={`View case ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? "w-6 bg-sage"
                : isLight
                  ? "w-2 bg-ink/25"
                  : "w-2 bg-paper/40"
            }`}
          />
        ))}
      </div>

      <p
        className={`mt-3 text-center text-[11px] leading-snug ${
          isLight ? "text-ink-mute" : "text-paper/60"
        }`}
      >
        Results achieved with GLP-1-based medical treatment. Illustrative images.
        Results depend on each individual and on the medical assessment; they are
        not guaranteed.
      </p>
    </div>
  );
}
