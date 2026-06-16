import "server-only"

import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

/** Plataforma: comisión que retiene DoctorLife sobre cada pago al médico (%). */
export const PLATFORM_FEE_PERCENT = 15
