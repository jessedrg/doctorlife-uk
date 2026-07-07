import "server-only"

import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

/**
 * Reparto de ingresos DoctorLife:
 *
 * Suscripción mensual (100 € IVA incl.):
 *  - Primer pago (activación): oferta de lanzamiento, el paciente paga 60 €.
 *    El médico recibe 10 € como comisión de captación.
 *  - Renovaciones mensuales: el paciente paga 100 €.
 *    El médico recibe 35 € fijos; el resto (65 €) se queda en la plataforma.
 *
 * Primera visita: gratis (0 €), sin pago; la cuenta y la cita se crean directamente.
 */

/** Comisión al médico en la activación (primer pago de suscripción). */
export const DOCTOR_ACTIVATION_CENTS = 1000   // 10 €

/** Comisión al médico en cada renovación mensual. */
export const DOCTOR_SHARE_CENTS = 3500         // 35 €
