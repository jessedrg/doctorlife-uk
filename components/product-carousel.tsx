"use client";

import { useState } from "react";
import { PenArt, PillArt } from "./art";
import { products } from "@/lib/data";

const CARD_STEP = 320; // 300px card + 20px gap

export function ProductCarousel() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(products.length - 1, i + 1));

  return (
    <div className="mt-[84px] text-left">
      <div className="mb-6 flex items-end justify-between">
        <div className="text-[clamp(22px,2.4vw,30px)] font-light">
          Access our full <span className="font-serif italic">GLP‑1 lineup</span>
        </div>
        <div className="flex gap-[10px]">
          <button type="button" onClick={prev} aria-label="Previous" className="h-[46px] w-[46px] rounded-full border border-paper/[.28] text-lg text-paper" style={{ background: "rgba(246,240,230,.05)" }}>
            ‹
          </button>
          <button type="button" onClick={next} aria-label="Next" className="h-[46px] w-[46px] rounded-full border border-paper/[.28] text-lg text-paper" style={{ background: "rgba(246,240,230,.05)" }}>
            ›
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-[550ms] ease-[cubic-bezier(.16,.84,.44,1)]"
          style={{ transform: `translateX(${-index * CARD_STEP}px)` }}
        >
          {products.map((p) => (
            <div
              key={p.name}
              className="flex-[0_0_300px] rounded-[28px] border border-paper/[.12] p-6 backdrop-blur-sm"
              style={{ background: "rgba(246,240,230,.05)" }}
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-sage px-[11px] py-1 text-xs font-semibold text-ink">
                  {p.tag}
                </span>
                <span className="rounded-full border border-paper/20 px-[10px] py-[5px] text-[10.5px] uppercase tracking-[.12em] text-paper/70">
                  FDA‑approved
                </span>
              </div>
              <div className="flex h-[180px] items-center justify-center">
                {p.kind === "pen" ? (
                  <PenArt height={200} className="anim-floatA" />
                ) : (
                  <PillArt size={118} bg={p.pillBg} className="anim-floatA" />
                )}
              </div>
              <div className="text-[21px] font-normal">{p.name}</div>
              <div className="mb-[14px] mt-[3px] text-sm text-paper/70">{p.mol}</div>
              <div className="text-[15px] font-medium text-sage">{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-[22px] max-w-[80ch] text-center text-xs text-paper/50">
        *Price reflects medication only, if prescribed. An active Maren membership
        is required. Medication is only available if prescribed after a medical
        consultation.
      </p>
    </div>
  );
}
