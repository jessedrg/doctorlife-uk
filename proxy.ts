import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Único dominio que SÍ debe ser indexado por Google.
const PRODUCTION_HOST = "doctorlife.io";

/**
 * En cualquier host que no sea producción (dev.doctorlife.io, previews de
 * Vercel *.vercel.app, localhost, etc.) añadimos la cabecera
 * `X-Robots-Tag: noindex, nofollow` a TODAS las respuestas. Así ningún
 * entorno de desarrollo se indexa aunque tenga contenido idéntico al de
 * producción (evita canibalización y contenido duplicado).
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];

  const isProduction = host === PRODUCTION_HOST || host === `www.${PRODUCTION_HOST}`;

  const response = NextResponse.next();

  if (!isProduction) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  // Aplica a todo excepto assets estáticos internos de Next.
  matcher: ["/((?!_next/static|_next/image|favicon.svg).*)"],
};
