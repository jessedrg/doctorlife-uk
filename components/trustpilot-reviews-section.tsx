import { TrustpilotCarousel, TRUSTPILOT_ENABLED } from "./trustpilot-micro";

type Props = {
  /** Fondo claro (por defecto) u oscuro. */
  theme?: "light" | "dark";
  className?: string;
};

/** Sección de opiniones de clientes con título + carrusel de reseñas. */
export function TrustpilotReviewsSection({ theme = "light", className }: Props) {
  const dark = theme === "dark";

  if (!TRUSTPILOT_ENABLED) return null;

  return (
    <section
      className={`px-5 py-12 sm:py-16 ${className ?? ""}`}
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-[1200px]">
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
            Personas reales que ya confían en DoctorLife para su tratamiento
            médico de pérdida de peso. Estas son sus valoraciones en Trustpilot.
          </p>
        </div>

        <TrustpilotCarousel theme={theme} className="mt-8" />
      </div>
    </section>
  );
}
