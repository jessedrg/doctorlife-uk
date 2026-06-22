"use client";

import { useEffect, useState } from "react";
import { X, Stethoscope } from "lucide-react";
import { QuizTrigger } from "@/components/quiz-trigger";

/** Barra inferior sticky no intrusiva hacia la reserva de la primera visita (25 €). */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-ink/10 bg-ink/95 px-4 py-2.5 text-paper shadow-[0_16px_40px_-12px_rgba(34,29,23,.5)] backdrop-blur-xl sm:px-5">
        <Stethoscope aria-hidden className="hidden h-5 w-5 flex-shrink-0 text-sage sm:block" />
        <p className="min-w-0 flex-1 truncate text-[13.5px] font-medium sm:text-[14.5px]">
          Primera visita 25 €, con médicos colegiados.
        </p>
        <QuizTrigger
          plan="sticky-articulo"
          className="flex-shrink-0 rounded-full bg-sage px-4 py-2 text-[13.5px] font-semibold text-ink sm:px-5"
        >
          Reservar
        </QuizTrigger>
        <button
          type="button"
          aria-label="Cerrar aviso"
          onClick={() => setDismissed(true)}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
