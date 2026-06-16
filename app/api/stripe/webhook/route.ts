import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { finalizeAppointment } from "@/app/actions/booking"

/**
 * Webhook de Stripe. Confirma la cita cuando el pago se completa.
 * Requiere STRIPE_WEBHOOK_SECRET; mientras no esté configurado, la confirmación
 * se hace igualmente desde la página de éxito (confirmAppointmentBySession).
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: "Webhook no configurado" }, { status: 400 })
  }

  const body = await req.text()
  const signature = req.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ error: "Falta firma" }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret)
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Firma inválida" },
      { status: 400 },
    )
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const appointmentId = Number(session.metadata?.appointmentId)
    if (appointmentId && session.payment_status === "paid") {
      await finalizeAppointment(appointmentId, session.payment_intent as string | null)
    }
  }

  return NextResponse.json({ received: true })
}
