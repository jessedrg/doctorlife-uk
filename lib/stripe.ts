import "server-only"

import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

/**
 * Reparto de ingresos DoctorLife:
 *
 * Suscripción mensual (100 € IVA incl.):
 *  - Primer pago (activación): el paciente paga 75 € (100 - 25 ya abonados).
 *    El médico recibe 10 € como comisión de captación.
 *  - Renovaciones mensuales: el paciente paga 100 €.
 *    El médico recibe 35 € fijos; el resto (65 €) se queda en la plataforma.
 *
 * Primera visita (pago único de 25 €): el importe íntegro va al médico.
 */

/** Comisión al médico en la activación (primer pago de suscripción). */
export const DOCTOR_ACTIVATION_CENTS = 1000   // 10 €

/** Comisión al médico en cada renovación mensual. */
export const DOCTOR_SHARE_CENTS = 3500         // 35 €
