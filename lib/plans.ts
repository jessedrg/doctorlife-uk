import { products } from "@/lib/data"

export interface PlanInfo {
  name: string
  priceCents: number
  /** Texto original, p. ej. "149€/mes". */
  priceLabel: string
}

/** Extrae los euros de una etiqueta tipo "149€/mes" → 14900 céntimos. */
function parseCents(label: string): number {
  const match = label.replace(/\./g, "").match(/(\d+)/)
  return match ? Number(match[1]) * 100 : 0
}

/** Catálogo de planes mensuales derivado de los productos de marketing. */
export const PLANS: PlanInfo[] = products.map((p) => ({
  name: p.name,
  priceLabel: p.price,
  priceCents: parseCents(p.price),
}))

/** Devuelve la info de un plan por nombre (o null si no existe / no tiene precio). */
export function getPlan(name: string | null | undefined): PlanInfo | null {
  if (!name) return null
  const plan = PLANS.find((p) => p.name.toLowerCase() === name.toLowerCase())
  return plan && plan.priceCents > 0 ? plan : null
}

/** Plan por defecto cuando el lead no eligió uno (el recomendado). */
export function defaultPlan(): PlanInfo {
  return getPlan("Weight Loss Plus") ?? PLANS[0]
}
