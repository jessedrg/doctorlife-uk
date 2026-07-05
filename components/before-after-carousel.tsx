"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const CASES = [
  {
    src: "/landing/before-after-1.png",
    alt: "Antes y después de un caso de control de peso con tratamiento GLP-1",
    lost: "−14 kg",
    weeks: "en 20 semanas",
  },
  {
    src: "/landing/before-after-2.png",
    alt: "Antes y después de un caso de control de peso con tratamiento GLP-1",
    lost: "−18 kg",
    weeks: "en 24 semanas",
  },
  {
    src: "/landing/before-after-3.png",
    alt: "Antes y después de un caso de control de peso con tratamiento GLP-1",
    lost: "−16 kg",
    weeks: "en 22 semanas",
  },
];

const INTERVAL = 3500;

export function BeforeAfterCarousel() {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

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
        className="relative overflow-hidden rounded-[24px] bg-ink/20 shadow-2xl ring-1 ring-paper/15"
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
            Antes
          </span>
          <span className="rounded-full bg-sage px-3 py-1 text-[11px] font-semibold uppercase tracking-[.12em] text-ink">
            Después
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
      <div className="mt-3 flex items-center justify-center gap-2">
        {CASES.map((c, i) => (
          <button
            key={c.src}
            type="button"
            aria-label={`Ver caso ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-sage" : "w-2 bg-paper/40"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-[11px] leading-snug text-paper/60">
        Resultados obtenidos con tratamiento médico basado en GLP-1. Imágenes
        ilustrativas. Los resultados dependen de cada persona y de la valoración
        médica; no están garantizados.
      </p>
    </div>
  );
}
