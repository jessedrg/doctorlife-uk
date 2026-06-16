/**
 * Plan único de DoctorLife.
 *
 * Hay un solo plan comprable: "Seguimiento con endocrino" (endocrino asignado,
 * videollamada mensual de seguimiento y chat en vivo con el médico durante toda
 * la suscripción). Precio: 65 € + IVA al mes. El resto de planes de marketing
 * están marcados como "Próximamente" (ver lib/data.ts).
 */

/** IVA general (España). */
export const IVA_RATE = 0.21

/** Precio base mensual, sin IVA, en céntimos. */
export const BASE_PRICE_CENTS = 6500

export interface PlanInfo {
  name: string
  /** Precio base sin IVA (céntimos). */
  basePriceCents: number
  /** IVA en céntimos. */
  ivaCents: number
  /** Total cobrado al mes (base + IVA) en céntimos. */
  priceCents: number
  /** Etiqueta corta del precio base, p. ej. "65 € + IVA". */
  priceLabel: string
  /** Total con IVA formateado, p. ej. "78,65 €/mes". */
  totalLabel: string
}

function eur(cents: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100)
}

function buildMainPlan(): PlanInfo {
  const ivaCents = Math.round(BASE_PRICE_CENTS * IVA_RATE)
  const priceCents = BASE_PRICE_CENTS + ivaCents
  return {
    name: "Seguimiento con endocrino",
    basePriceCents: BASE_PRICE_CENTS,
    ivaCents,
    priceCents,
    priceLabel: `${eur(BASE_PRICE_CENTS)} + IVA`,
    totalLabel: `${eur(priceCents)}/mes`,
  }
}

/** Único plan disponible para contratar. */
export const MAIN_PLAN: PlanInfo = buildMainPlan()

/**
 * Devuelve la info del plan. Como solo hay un plan activo, siempre devuelve
 * MAIN_PLAN (el parámetro se mantiene por compatibilidad con llamadas previas).
 */
export function getPlan(_name?: string | null): PlanInfo {
  return MAIN_PLAN
}

/** Plan por defecto (idéntico al único plan disponible). */
export function defaultPlan(): PlanInfo {
  return MAIN_PLAN
}
