/**
 * Plan único de DoctorLife.
 *
 * Precio mensual: 100 € IVA incluido.
 * La primera visita es GRATIS (0 €). Como oferta de lanzamiento de este mes, el
 * primer mes de suscripción cuesta 60 € (40 € de descuento); los meses
 * siguientes son 100 € completos.
 *
 * Reparto al médico:
 *  - Activación: 10 € (comisión por captación)
 *  - Renovación mensual: 35 € fijos
 */

/** Precio mensual total con IVA incluido (céntimos). */
export const SUBSCRIPTION_PRICE_CENTS = 10000   // 100 €

/** Pago único de la primera visita (céntimos). Ahora es GRATIS. */
export const FIRST_VISIT_CENTS = 0               // 0 € (gratis)

/** Precio promocional del primer mes de suscripción (céntimos). */
export const FIRST_MONTH_CENTS = 6000            // 60 € (oferta de lanzamiento)

/** Descuento aplicado al primer mes vía cupón (100 € − 60 € = 40 €). */
export const FIRST_MONTH_DISCOUNT_CENTS = SUBSCRIPTION_PRICE_CENTS - FIRST_MONTH_CENTS  // 40 €

/** Etiqueta del pago de la primera visita. */
export const FIRST_VISIT_LABEL = "gratis"

export interface PlanInfo {
  name: string
  /** Precio mensual total con IVA incluido (céntimos). */
  priceCents: number
  /** Primer mes con la oferta de lanzamiento (céntimos). */
  firstMonthCents: number
  /** Total formateado, p. ej. "100,00 €/mes". */
  totalLabel: string
  /** Primer mes formateado, p. ej. "60,00 € el primer mes". */
  firstMonthLabel: string
  /** Precio sin IVA para mostrar en facturación (céntimos). */
  basePriceCents: number
  /** IVA en céntimos. */
  ivaCents: number
}

function eur(cents: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100)
}

function buildMainPlan(): PlanInfo {
  // IVA invertido: precio con IVA = base × 1.21  →  base = precio / 1.21
  const basePriceCents = Math.round(SUBSCRIPTION_PRICE_CENTS / 1.21)
  const ivaCents = SUBSCRIPTION_PRICE_CENTS - basePriceCents
  return {
    name: "Seguimiento con endocrino",
    priceCents: SUBSCRIPTION_PRICE_CENTS,
    firstMonthCents: FIRST_MONTH_CENTS,
    totalLabel: `${eur(SUBSCRIPTION_PRICE_CENTS)}/mes`,
    firstMonthLabel: `${eur(FIRST_MONTH_CENTS)} el primer mes`,
    basePriceCents,
    ivaCents,
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
