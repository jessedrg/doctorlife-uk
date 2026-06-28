/**
 * Plan único de DoctorLife.
 *
 * Precio mensual: 100 € IVA incluido.
 * La primera visita (25 €) ya se cobró en el quiz, por lo que el primer pago
 * de la suscripción es 100 - 25 = 75 €. Los meses siguientes son 100 € completos.
 *
 * Reparto al médico:
 *  - Activación: 10 € (comisión por captación)
 *  - Renovación mensual: 35 € fijos
 */

/** Precio mensual total con IVA incluido (céntimos). */
export const SUBSCRIPTION_PRICE_CENTS = 10000   // 100 €

/** Pago único de la primera visita (céntimos). Se abona en la landing. */
export const FIRST_VISIT_CENTS = 2500            // 25 €

/** Primer pago real de la suscripción = precio - primera visita ya cobrada. */
export const FIRST_MONTH_CENTS = SUBSCRIPTION_PRICE_CENTS - FIRST_VISIT_CENTS  // 75 €

/** Etiqueta del pago único de la primera visita. */
export const FIRST_VISIT_LABEL = "25 €"

export interface PlanInfo {
  name: string
  /** Precio mensual total con IVA incluido (céntimos). */
  priceCents: number
  /** Primer mes con descuento de la primera visita (céntimos). */
  firstMonthCents: number
  /** Total formateado, p. ej. "100,00 €/mes". */
  totalLabel: string
  /** Primer mes formateado, p. ej. "75,00 € el primer mes". */
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
