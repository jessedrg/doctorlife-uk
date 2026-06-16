import "server-only"

import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

/**
 * Reparto de ingresos DoctorLife:
 * - Primera consulta (pago único de 25 €): el importe íntegro va al médico
 *   asignado a esa llamada.
 * - Suscripción mensual: el médico asignado recibe SIEMPRE 25 € fijos por cada
 *   pago; el resto se queda en la cuenta de la empresa (plataforma).
 *
 * Importe fijo (en céntimos) que percibe el médico por cada pago de suscripción.
 */
export const DOCTOR_SHARE_CENTS = 2500
