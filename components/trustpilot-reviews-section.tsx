"use client";

import { useState } from "react";
import {
  TrustpilotMicro,
  TrustpilotCarousel,
  TRUSTPILOT_ENABLED,
} from "./trustpilot-micro";

type Props = {
  /** Fondo claro (por defecto) u oscuro. */
  theme?: "light" | "dark";
  className?: string;
};

/**
 * Sección de opiniones de clientes con valoración + carrusel de reseñas.
 *
 * El carrusel se mantiene montado (fuera de pantalla) para que Trustpilot
 * pueda intentar renderizar; el título y el espacio de la sección solo
 * aparecen cuando hay reseñas reales. Si no hay, la sección ocupa 0 px.
 */
export function TrustpilotReviewsSection({ theme = "light", className }: Props) {
  const dark = theme === "dark";
  const [hasReviews, setHasReviews] = useState(false);

  if (!TRUSTPILOT_ENABLED) return null;

  return (
    <section
      className={hasReviews ? `px-5 py-12 sm:py-16 ${className ?? ""}` : "sr-only"}
      aria-labelledby="reviews-heading"
      aria-hidden={!hasReviews}
    >
      <div className="mx-auto max-w-[1200px]">
        {hasReviews && (
          <div className="flex flex-col items-center gap-3 text-center">
            <h2
              id="reviews-heading"
              className={`text-balance text-[clamp(24px,3vw,36px)] font-semibold leading-tight ${
                dark ? "text-paper" : "text-ink"
              }`}
            >
              Lo que dicen nuestros pacientes
            </h2>
            <p
              className={`max-w-[52ch] text-pretty text-[15px] leading-relaxed ${
                dark ? "text-paper/70" : "text-ink-mute"
              }`}
            >
              Miles de personas ya confían en DoctorLife para su tratamiento
              médico de pérdida de peso. Estas son sus valoraciones reales en
              Trustpilot.
            </p>
            <TrustpilotMicro theme={theme} align="center" className="mt-1" />
          </div>
        )}

        <TrustpilotCarousel
          theme={theme}
          className={hasReviews ? "mt-8" : ""}
          onReady={() => setHasReviews(true)}
        />
      </div>
    </section>
  );
}
