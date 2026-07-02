"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { analytics } from "@/lib/analytics";

const INCLUYE = [
  "Valoración médica online",
  "Receta si procede",
  "Sin cita previa ni desplazamientos",
] as const;

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
      <div className="relative mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-ink/95 px-3 py-3 text-paper shadow-[0_16px_40px_-12px_rgba(34,29,23,.5)] backdrop-blur-xl sm:px-5 sm:py-4">
        <button
          type="button"
          aria-label="Cerrar aviso"
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-paper/60 transition-colors hover:bg-paper/10 hover:text-paper"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] sm:flex">
            <WhatsAppIcon className="h-7 w-7 fill-white" />
          </span>

          <div className="min-w-0 flex-1 pr-6 sm:pr-0">
            <p className="text-[15px] font-semibold leading-tight sm:text-[17px]">
              Consulta médica online para adelgazar{" "}
              <span className="text-[#4ade80]">25 €</span>
            </p>
            <p className="mt-0.5 text-[12px] leading-tight text-paper/55 sm:text-[13px]">
              Se descuenta del tratamiento · respuesta en minutos
            </p>

            {/* Qué incluye — visible en desktop */}
            <ul className="mt-2 hidden flex-wrap gap-x-4 gap-y-1 sm:flex">
              {INCLUYE.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-[12.5px] text-paper/80">
                  <Check aria-hidden className="h-3.5 w-3.5 flex-shrink-0 text-[#4ade80]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={openWhatsApp}
            className="flex flex-shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-6 sm:py-3 sm:text-[15px]"
          >
            <WhatsAppIcon className="h-5 w-5 fill-white sm:hidden" />
            <span className="sm:hidden">Empieza ahora</span>
            <span className="hidden sm:inline">Empieza por WhatsApp</span>
          </button>
        </div>

        {/* Qué incluye — chips compactos en móvil */}
        <ul className="mt-2.5 flex flex-wrap gap-1.5 sm:hidden">
          {INCLUYE.map((item) => (
            <li
              key={item}
              className="flex items-center gap-1 rounded-full bg-paper/10 px-2 py-1 text-[11px] leading-none text-paper/80"
            >
              <Check aria-hidden className="h-3 w-3 flex-shrink-0 text-[#4ade80]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
