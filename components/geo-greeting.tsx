"use client";

import { useEffect, useState } from "react";

/**
 * Saludo local basado en la geolocalización del visitante (cookie `user_geo`
 * fijada por el edge en proxy.ts a partir de la IP de Vercel).
 *
 * No es cloaking: el HTML que indexa Google no cambia. Este componente solo
 * añade, en el navegador del usuario, un saludo con su ciudad real para
 * reforzar la relevancia local ("Atendemos en {tu ciudad}") sin que tenga
 * que escribir el municipio. Si no hay geo disponible, no renderiza nada.
 */
export function GeoGreeting({ className = "" }: { className?: string }) {
  const [geo, setGeo] = useState<{ city: string; region: string } | null>(null);

  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_geo="));
    if (!match) return;
    try {
      const raw = decodeURIComponent(match.split("=").slice(1).join("="));
      const parsed = JSON.parse(raw) as { city?: string; region?: string };
      if (parsed.city) {
        setGeo({ city: parsed.city, region: parsed.region ?? "" });
      }
    } catch {
      // cookie malformada: ignoramos silenciosamente
    }
  }, []);

  if (!geo) return null;

  return (
    <div
      className={`flex items-center gap-2 rounded-full border border-sage/40 bg-sage/10 px-4 py-2 text-[13.5px] text-ink ${className}`}
      role="note"
    >
      <span aria-hidden className="h-2 w-2 flex-shrink-0 rounded-full bg-sage" />
      <span className="text-pretty">
        Atendemos en <span className="font-semibold">{geo.city}</span> y toda la
        zona — consulta médica online, sin desplazamientos.
      </span>
    </div>
  );
}
