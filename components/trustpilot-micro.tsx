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

function useTrustpilot(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const load = () => {
      if (ref.current && window.Trustpilot) {
        window.Trustpilot.loadFromElement(ref.current, true);
      }
    };
    load();
    // Reintenta por si el script del bootstrap aún no ha cargado.
    const t = setTimeout(load, 1500);
    return () => clearTimeout(t);
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

  return (
    <div
      ref={ref}
      className={`trustpilot-widget ${className ?? ""}`}
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
};

/** Carrusel de reseñas de clientes. */
export function TrustpilotCarousel({ className, theme = "light" }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  useTrustpilot(ref);

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
      data-stars="4,5"
      data-review-languages="es"
    >
      <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}
