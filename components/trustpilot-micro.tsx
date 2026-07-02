"use client";

import { useEffect, useRef } from "react";

/**
 * Widget "Micro Star" de Trustpilot (estrellas + valoración + nº de reseñas).
 *
 * IMPORTANTE: el widget necesita tu **Business Unit ID** (NO la clave de invitaciones
 * `wUdA9FYxfifhoMPy`, que es para enviar invitaciones de reseña).
 *
 * Cómo obtenerlo:
 *   Trustpilot Business → Integrations → TrustBox → elige "Micro Star" →
 *   copia el valor de `data-businessunit-id` (algo tipo "5f3a1b2c3d4e5f0001abcd12").
 *
 * Pega ese valor en la constante BUSINESS_UNIT_ID de abajo.
 * El motor del widget (tp.widget.bootstrap) ya se carga en el footer.
 */
const BUSINESS_UNIT_ID = "REEMPLAZA_CON_TU_BUSINESS_UNIT_ID";

// Template del widget "Micro Star" (fijo para todos los negocios).
const TEMPLATE_ID = "5419b6ffb0d04a076446a9af";

type TrustpilotMicroProps = {
  className?: string;
  /** "light" o "dark" según el fondo donde se coloca. */
  theme?: "light" | "dark";
  /** Alineación del contenido del widget. */
  align?: "left" | "center" | "right";
};

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void };
  }
}

export function TrustpilotMicro({
  className,
  theme = "light",
  align = "left",
}: TrustpilotMicroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  if (BUSINESS_UNIT_ID === "REEMPLAZA_CON_TU_BUSINESS_UNIT_ID") {
    // Placeholder visible solo en desarrollo para recordar que falta el ID.
    if (process.env.NODE_ENV !== "production") {
      return (
        <div
          className={className}
          style={{ fontSize: 12, opacity: 0.6 }}
          aria-hidden
        >
          [Trustpilot: añade tu Business Unit ID en components/trustpilot-micro.tsx]
        </div>
      );
    }
    return null;
  }

  return (
    <div
      ref={ref}
      className={`trustpilot-widget ${className ?? ""}`}
      data-locale="es-ES"
      data-template-id={TEMPLATE_ID}
      data-businessunit-id={BUSINESS_UNIT_ID}
      data-style-height="24px"
      data-style-width="100%"
      data-theme={theme}
      data-text-color={theme === "dark" ? "#ffffff" : undefined}
      data-style-alignment={align}
    >
      <a
        href={`https://es.trustpilot.com/review/doctorlife.io`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
}
