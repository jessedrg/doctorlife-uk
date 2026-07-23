import "server-only"

import type Stripe from "stripe"
import { stripe, PLATFORM_FEE_PERCENT, platformFeeCents } from "@/lib/stripe"
import { getDoctorChargeContext } from "@/lib/clinic"
import {
  type Product,
  stripeMode,
  toStripeLineItem,
  firstPeriodDiscountCents,
} from "@/lib/catalog"

export interface BuildCheckoutInput {
  product: Product
  customerEmail: string
  /** Médico/clínica que cobra este acto (su cuenta Connect es el destino). */
  doctorId: string
  successUrl: string
  cancelUrl: string
  /** Metadata extra que se adjunta a la sesión (y al PI/suscripción). */
  metadata?: Record<string, string>
}

/**
 * Crea una sesión de Stripe Checkout para CUALQUIER producto del catálogo y
 * SIEMPRE enruta el cobro a la clínica (compliance):
 *  - La clínica es el comerciante de liquidación: `on_behalf_of` + `transfer_data.destination`.
 *  - DoctorLife retiene su comisión de servicio tecnológico:
 *    · Suscripción → `application_fee_percent`.
 *    · Pago único / pack → `application_fee_amount` (calculado sobre el importe).
 *
 * Si la clínica no ha completado el onboarding de Connect, NO se cobra: se
 * devuelve un error controlado (así el dinero nunca cae en la plataforma).
 */
export async function buildClinicCheckoutSession(
  input: BuildCheckoutInput,
): Promise<{ url: string } | { error: string }> {
  const { product, customerEmail, doctorId, successUrl, cancelUrl } = input
  const meta = input.metadata ?? {}

  const clinic = await getDoctorChargeContext(doctorId)
  if (!clinic) {
    return {
      error:
        "The clinic cannot process payments yet. Complete the clinic verification in Stripe before enabling payments.",
    }
  }

  const mode = stripeMode(product)
  const productMeta = { ...meta, productId: product.id }

  const params: Stripe.Checkout.SessionCreateParams = {
    mode,
    customer_email: customerEmail,
    line_items: [toStripeLineItem(product)],
    metadata: productMeta,
    success_url: successUrl,
    cancel_url: cancelUrl,
  }

  if (mode === "subscription") {
    // Oferta de primer periodo (si la hay) vía cupón de un solo uso.
    const discount = firstPeriodDiscountCents(product)
    if (discount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: discount,
        currency: product.currency,
        duration: "once",
        name: `Welcome offer (−£${(discount / 100).toFixed(0)})`,
      })
      params.discounts = [{ coupon: coupon.id }]
    }
    params.subscription_data = {
      on_behalf_of: clinic.accountId,
      transfer_data: { destination: clinic.accountId },
      application_fee_percent: PLATFORM_FEE_PERCENT,
      metadata: productMeta,
    }
  } else {
    // Pago único / pack: fee fijo calculado sobre el importe.
    params.payment_intent_data = {
      on_behalf_of: clinic.accountId,
      transfer_data: { destination: clinic.accountId },
      application_fee_amount: platformFeeCents(product.priceCents),
      metadata: productMeta,
    }
  }

  try {
    const session = await stripe.checkout.sessions.create(params)
    if (!session.url) return { error: "Payment could not be started." }
    return { url: session.url }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Payment could not be started." }
  }
}
