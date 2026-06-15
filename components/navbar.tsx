"use client";

import { useEffect, useState } from "react";
import { QuizTrigger } from "./quiz-trigger";

const links = [
  { label: "Cómo funciona", href: "#product" },
  { label: "Planes y precios", href: "#planes" },
  { label: "Resultados", href: "#transform" },
  { label: "Empezar", href: "#cta" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="sticky top-4 z-[90] mx-auto mt-4 w-full max-w-[1180px] px-[18px]">
      <div
        className="flex h-[64px] items-center justify-between gap-4 rounded-full border border-ink/10 pl-6 pr-[10px] shadow-[0_12px_40px_-12px_rgba(34,29,23,.28)] backdrop-blur-xl sm:h-[68px] sm:pl-7"
        style={{ background: "rgba(246,240,230,.82)" }}
      >
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-serif text-[24px] leading-none tracking-[-.01em] text-ink no-underline sm:text-[26px]"
        >
          maren
        </a>

        {/* enlaces desktop */}
        <div className="hidden items-center gap-[28px] whitespace-nowrap text-[15px] font-medium md:flex">
          {links.slice(0, 3).map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-ink no-underline opacity-80 transition-opacity hover:opacity-100"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <QuizTrigger className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-ink px-[22px] py-[13px] text-[15px] font-medium text-paper sm:inline-flex">
            Comenzar
            <span className="text-[13px]">↗</span>
          </QuizTrigger>

          {/* botón menú móvil */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-ink text-paper md:hidden"
          >
            <span className="relative flex h-[14px] w-[18px] flex-col justify-between">
              <span
                className="h-[2px] w-full rounded bg-paper transition-transform"
                style={open ? { transform: "translateY(6px) rotate(45deg)" } : undefined}
              />
              <span
                className="h-[2px] w-full rounded bg-paper transition-opacity"
                style={open ? { opacity: 0 } : undefined}
              />
              <span
                className="h-[2px] w-full rounded bg-paper transition-transform"
                style={open ? { transform: "translateY(-6px) rotate(-45deg)" } : undefined}
              />
            </span>
          </button>
        </div>
      </div>

      {/* panel móvil */}
      {open && (
        <div
          className="mt-3 overflow-hidden rounded-[28px] border border-ink/10 p-3 shadow-[0_20px_50px_-20px_rgba(34,29,23,.4)] backdrop-blur-xl md:hidden"
          style={{ background: "rgba(246,240,230,.95)" }}
        >
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-5 py-[14px] text-[17px] font-medium text-ink no-underline transition-colors hover:bg-ink/5"
              >
                {l.label}
              </a>
            ))}
          </div>
          <QuizTrigger className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[16px] font-medium text-paper">
            Comenzar
            <span className="text-[13px]">↗</span>
          </QuizTrigger>
        </div>
      )}
    </nav>
  );
}
