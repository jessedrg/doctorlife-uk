"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { analytics } from "@/lib/analytics";

const INCLUDES = [
  "Up to 22.5% weight loss",
  "Private prescription within 3 working hours",
  "Assessment and follow-up with a GMC-registered doctor",
  "No appointments or travel needed",
] as const;

const PHONE = "7700900123";
const WA_URL = `https://wa.me/44${PHONE}?text=${encodeURIComponent(
  "I'd like more information about GLP-1 treatment.",
)}`;

function openWhatsApp(source: "sticky_bar") {
  analytics.whatsappClicked(source);
  window.open(WA_URL, "_blank");
}

/** Sticky bottom bar (always visible) with background video that opens WhatsApp. */
export function StickyCTA() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl text-paper shadow-[0_20px_50px_-16px_rgba(34,29,23,.55)] ring-1 ring-white/10 sm:rounded-3xl">
        {/* vídeo de las plumas de fondo (como en la landing) */}
        <video
          src="/products/pills-pen.mp4"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 35%" }}
        />
        {/* overlay para legibilidad */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/82 to-ink/55"
        />

        <button
          type="button"
          aria-label="Close notice"
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-paper/70 backdrop-blur-sm transition-colors hover:bg-black/40 hover:text-paper"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>

        <div className="relative flex items-center gap-3 px-3 py-3 sm:gap-6 sm:px-6 sm:py-5">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <p className="text-[17px] font-semibold leading-tight sm:text-[21px]">
                Online medical consultation for weight loss
              </p>
              <span className="rounded-full bg-[#6B774A] px-2.5 py-0.5 text-[14px] font-bold text-white sm:text-[15px]">
                Free
              </span>
            </div>
            <p className="mt-1 text-[13.5px] leading-snug text-paper/75 sm:text-[14px]">
              <span className="font-semibold text-[#8fa663]">Lose weight safely</span>{" "}
              · first consultation free · reply in minutes
            </p>

            {/* What's included — large on desktop */}
            <ul className="mt-3 hidden gap-x-6 gap-y-2 sm:grid sm:grid-cols-2">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[15px] font-medium text-paper/95">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#6B774A]">
                    <Check aria-hidden className="h-3.5 w-3.5 text-white" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => openWhatsApp("sticky_bar")}
            className="flex-shrink-0 rounded-full bg-[#6B774A] px-4 py-3 text-[13.5px] font-semibold text-white shadow-lg shadow-[#6B774A]/30 transition-transform duration-200 hover:scale-[1.03] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B774A] focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-8 sm:py-4 sm:text-[16px]"
          >
            Start now
          </button>
        </div>

        {/* What's included — chips on mobile */}
        <ul className="relative flex flex-wrap gap-1.5 px-3 pb-3 sm:hidden">
          {INCLUDES.map((item) => (
            <li
              key={item}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1.5 text-[13px] font-medium leading-none text-paper/95 backdrop-blur-sm"
            >
              <Check aria-hidden className="h-3.5 w-3.5 flex-shrink-0 text-[#8fa663]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
