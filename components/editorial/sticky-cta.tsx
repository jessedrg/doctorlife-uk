"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { analytics } from "@/lib/analytics";

const PHONE = "711267223";
const WA_URL = `https://wa.me/34${PHONE}?text=${encodeURIComponent(
  "Hola, quiero empezar mi tratamiento para perder peso con DoctorLife.",
)}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17 43 20.4 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.3l-.6-.4-6.2 1.6 1.7-6-.4-.6C8.3 30 7.5 27.1 7.5 24 7.5 14.8 15 7.5 24 7.5S40.5 15 40.5 24 33 40 24 40zm10.8-13.4c-.6-.3-3.4-1.7-3.9-1.9-.5-.2-.9-.3-1.2.3-.4.6-1.4 1.9-1.7 2.2-.3.4-.6.4-1.1.1-.6-.3-2.4-.9-4.6-2.8-1.7-1.5-2.8-3.4-3.2-3.9-.3-.6 0-.9.3-1.1l.9-1.1c.2-.3.3-.6.5-.9.2-.3.1-.6 0-.9-.1-.2-1.2-2.9-1.6-3.9-.4-1-.8-.9-1.2-.9h-1c-.3 0-.9.1-1.4.7-.5.5-1.8 1.8-1.8 4.3s1.9 5 2.1 5.4c.3.3 3.7 5.7 9 8 1.3.5 2.3.8 3 1.1 1.3.4 2.4.3 3.3.2 1-.2 3.1-1.3 3.5-2.5.4-1.2.4-2.2.3-2.5-.1-.3-.5-.4-1-.7z" />
    </svg>
  );
}

/** Barra inferior sticky que va al grano: abre WhatsApp para empezar el tratamiento. */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openWhatsApp() {
    analytics.whatsappClicked("sticky_bar");
    window.open(WA_URL, "_blank");
  }

  if (dismissed || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-ink/10 bg-ink/95 px-3 py-2.5 text-paper shadow-[0_16px_40px_-12px_rgba(34,29,23,.5)] backdrop-blur-xl sm:rounded-full sm:px-4">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] sm:h-11 sm:w-11">
          <WhatsAppIcon className="h-6 w-6 fill-white sm:h-7 sm:w-7" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold leading-tight sm:text-[15px]">
            Empieza tu tratamiento hoy
          </p>
          <p className="truncate text-[12px] leading-tight text-paper/60 sm:text-[13px]">
            Primera visita 25 € · respuesta en minutos
          </p>
        </div>

        <button
          type="button"
          onClick={openWhatsApp}
          className="flex-shrink-0 rounded-full bg-[#25D366] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-5"
        >
          <span className="sm:hidden">Escribir</span>
          <span className="hidden sm:inline">Escríbenos por WhatsApp</span>
        </button>

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
