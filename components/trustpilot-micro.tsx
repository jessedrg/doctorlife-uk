"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Widgets de Trustpilot (TrustBox).
 *
 * Usa tu **Business Unit ID** (NO la clave de invitaciones `wUdA9FYxfifhoMPy`).
 * El motor del widget (tp.widget.bootstrap) ya se carga en el footer.
 */
const BUSINESS_UNIT_ID = "6a31f5806ee9de82cda0a274";
const REVIEW_URL = "https://es.trustpilot.com/review/doctorlife.io";

/**
 * Interruptor global. Mientras esté en `false`, los widgets NO se renderizan
 * en ningún sitio (hero, blogs, sección de reseñas) — no se ve nada, ni títulos
 * ni huecos vacíos.
 *
 * 👉 Cuando ya tengas reseñas publicadas en Trustpilot (en el dominio
 * doctorlife.io), cambia esto a `true` y aparecerá todo automáticamente.
 *
 * Nota: la detección automática no sirve porque Trustpilot inyecta el iframe
 * aunque no haya reseñas, así que este interruptor manual es la forma fiable
 * de mantenerlo oculto hasta que tengas opiniones.
 */
export const TRUSTPILOT_ENABLED = false;

// Templates oficiales de Trustpilot (iguales para todos los negocios).
const TEMPLATES = {
  // Micro Combo: estrellas + TrustScore + nº de reseñas.
  micro: "5419b6a8b0d04a076446a8b1",
  // Carrusel de reseñas.
  carousel: "53aa8912dec7e10d38f59f36",
} as const;

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void };
  }
}

/**
 * Carga el widget y detecta si Trustpilot renderiza realmente el iframe.
 * Devuelve `ready=true` solo cuando hay contenido real que mostrar.
 */
function useTrustpilot(
  ref: React.RefObject<HTMLDivElement | null>,
  onReady?: () => void,
) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const load = () => window.Trustpilot?.loadFromElement(el, true);
    load();
    const retry = setTimeout(load, 1500);

    // Trustpilot inyecta un <iframe> cuando consigue pintar las reseñas.
    const check = () => {
      const iframe = el.querySelector("iframe");
      if (iframe) {
        setReady(true);
        onReady?.();
      }
    };
    const observer = new MutationObserver(check);
    observer.observe(el, { childList: true, subtree: true });
    const settle = setTimeout(check, 3500);

    return () => {
      clearTimeout(retry);
      clearTimeout(settle);
      observer.disconnect();
    };
  }, [ref, onReady]);

  return ready;
}

type MicroProps = {
  className?: string;
  theme?: "light" | "dark";
  align?: "left" | "center" | "right";
};

/** Micro Combo: estrellas + valoración + nº de reseñas. */
export function TrustpilotMicro({
  className,
  theme = "light",
  align = "left",
}: MicroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = useTrustpilot(ref);

  if (!TRUSTPILOT_ENABLED) return null;

  return (
    <div
      ref={ref}
      className={`trustpilot-widget transition-opacity duration-500 ${
        ready ? "opacity-100" : "pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      } ${className ?? ""}`}
      aria-hidden={!ready}
      data-locale="es-ES"
      data-template-id={TEMPLATES.micro}
      data-businessunit-id={BUSINESS_UNIT_ID}
      data-style-height="20px"
      data-style-width="100%"
      data-theme={theme}
      data-text-color={theme === "dark" ? "#ffffff" : undefined}
      data-style-alignment={align}
    >
      <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}

type CarouselProps = {
  className?: string;
  theme?: "light" | "dark";
  onReady?: () => void;
};

/** Carrusel de reseñas de clientes. */
export function TrustpilotCarousel({ className, theme = "light", onReady }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = useTrustpilot(ref, onReady);

  if (!TRUSTPILOT_ENABLED) return null;

  return (
    <div
      ref={ref}
      className={`trustpilot-widget transition-opacity duration-500 ${
        ready ? "opacity-100" : "pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      } ${className ?? ""}`}
      aria-hidden={!ready}
      data-locale="es-ES"
      data-template-id={TEMPLATES.carousel}
      data-businessunit-id={BUSINESS_UNIT_ID}
      data-style-height="240px"
      data-style-width="100%"
      data-theme={theme}
      data-stars="4,5"
      data-review-languages="es"
    >
      <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}
