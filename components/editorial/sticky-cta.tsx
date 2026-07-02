"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { analytics } from "@/lib/analytics";

const INCLUYE = [
  "Valoración médica online",
  "Receta si procede",
  "Sin cita ni desplazamientos",
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
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-ink/10 bg-warm/95 px-3 py-3 text-ink shadow-[0_20px_50px_-16px_rgba(34,29,23,.45)] ring-1 ring-white/40 backdrop-blur-xl sm:gap-4 sm:rounded-3xl sm:px-5 sm:py-4">
        {/* Avatar de la médico/paciente con badge de WhatsApp */}
        <div className="relative flex-shrink-0">
          <span className="block h-14 w-14 overflow-hidden rounded-full bg-ink ring-2 ring-amber/40 sm:h-16 sm:w-16">
            <Image
              src="/hero/woman.png"
              alt=""
              width={128}
              height={128}
              className="h-full w-full scale-110 object-cover object-[50%_18%]"
            />
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] ring-2 ring-warm sm:h-7 sm:w-7">
            <WhatsAppIcon className="h-4 w-4 fill-white sm:h-4.5 sm:w-4.5" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p className="text-[14px] font-semibold leading-tight text-ink sm:text-[18px]">
              Consulta médica online
            </p>
            <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[12px] font-bold text-clay sm:text-[13px]">
              25 €
            </span>
          </div>
          <p className="mt-0.5 hidden text-[12px] leading-tight text-ink-mute sm:block sm:text-[13px]">
            Se descuenta del tratamiento · respuesta en minutos
          </p>

          {/* Qué incluye — en línea en desktop */}
          <ul className="mt-2 hidden flex-wrap gap-x-4 gap-y-1 sm:flex">
            {INCLUYE.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-[12.5px] text-ink-soft">
                <Check aria-hidden className="h-3.5 w-3.5 flex-shrink-0 text-olive" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={openWhatsApp}
          className="flex flex-shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2.5 text-[13.5px] font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-transform duration-200 hover:scale-[1.03] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-warm sm:px-6 sm:py-3 sm:text-[15px]"
        >
          <WhatsAppIcon className="h-5 w-5 fill-white" />
          <span className="hidden min-[420px]:inline sm:inline">Empieza</span>
          <span className="hidden sm:inline">&nbsp;ahora</span>
        </button>

        <button
          type="button"
          aria-label="Cerrar aviso"
          onClick={() => setDismissed(true)}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center self-start rounded-full text-ink-mute transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
