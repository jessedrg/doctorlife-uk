"use client";

import { useEffect, useRef } from "react";

/**
 * Widgets de Trustpilot (TrustBox).
 *
 * Usa tu **Business Unit ID** (NO la clave de invitaciones `wUdA9FYxfifhoMPy`).
 * El motor del widget (tp.widget.bootstrap) ya se carga en el footer.
 */
const BUSINESS_UNIT_ID = "6a31f5806ee9de82cda0a274";
const REVIEW_URL = "https://es.trustpilot.com/review/doctorlife.io";

/**
 * Interruptor global. Ponlo en `false` para ocultar TODOS los widgets de
 * Trustpilot de golpe (hero, blogs y sección de reseñas).
 */
export const TRUSTPILOT_ENABLED = true;

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

/** Pide a Trustpilot que pinte el widget dentro del elemento. */
function useTrustpilot(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const load = () => window.Trustpilot?.loadFromElement(el, true);
    load();
    // Reintentos por si el script del bootstrap aún no ha cargado.
    const t1 = setTimeout(load, 1200);
    const t2 = setTimeout(load, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [ref]);
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
  useTrustpilot(ref);

  if (!TRUSTPILOT_ENABLED) return null;

  return (
    <div
      ref={ref}
      className={`trustpilot-widget ${className ?? ""}`}
      data-locale="es-ES"
      data-template-id={TEMPLATES.micro}
      data-businessunit-id={BUSINESS_UNIT_ID}
      data-style-height="24px"
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
};

/** Carrusel de reseñas de clientes. */
export function TrustpilotCarousel({ className, theme = "light" }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  useTrustpilot(ref);

  if (!TRUSTPILOT_ENABLED) return null;

  return (
    <div
      ref={ref}
      className={`trustpilot-widget ${className ?? ""}`}
      data-locale="es-ES"
      data-template-id={TEMPLATES.carousel}
      data-businessunit-id={BUSINESS_UNIT_ID}
      data-style-height="240px"
      data-style-width="100%"
      data-theme={theme}
      data-stars="1,2,3,4,5"
    >
      <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}
