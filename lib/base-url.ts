import { headers } from "next/headers"

/**
 * Resolves the app's public base URL across v0 preview, Vercel previews and prod.
 * Mirrors the cascade used by Better Auth in lib/auth.ts.
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
  if (process.env.V0_RUNTIME_URL) return process.env.V0_RUNTIME_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}

/**
 * Base URL del dominio donde está navegando el usuario AHORA (dev, preview o
 * prod), leído de las cabeceras de la petición. Es lo que se debe usar para los
 * `success_url`/`return_url` de Stripe: así el usuario vuelve al mismo dominio
 * desde el que pagó (p.ej. dev.doctorlife.io) y no a producción, evitando que la
 * página de retorno (y el aprovisionamiento) acaben en un 404 de otro deploy.
 *
 * Cae de vuelta a getBaseUrl() si no hay contexto de petición.
 */
export async function getRequestBaseUrl(): Promise<string> {
  try {
    const h = await headers()
    const host = h.get("x-forwarded-host") ?? h.get("host")
    if (host) {
      const proto =
        h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")
      return `${proto}://${host}`
    }
  } catch {
    // Sin contexto de petición (p.ej. desde el webhook): usar la canónica.
  }
  return getBaseUrl()
}
