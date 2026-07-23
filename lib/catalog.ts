/**
 * Central catalogue of everything DoctorLife UK charges for.
 *
 * Single source of truth for subscriptions, session packs and one-off payments.
 * To add a new sales model in the future, just add a row to `CATALOG`: the
 * checkout flow (`lib/checkout.ts`) turns it into a Stripe session and
 * automatically applies clinic routing + the platform fee. There is no need to
 * touch the payments logic.
 *
 * Prices are stored in pence (GBP). Medical care provided by healthcare
 * professionals is VAT-exempt in the UK, so the displayed price is the final
 * total, with no tax added on top.
 */

import type Stripe from "stripe"

export type PricingModel = "subscription" | "pack" | "one_time"

export type BillingInterval = "month" | "year"

export interface Product {
  /** Stable identifier used in Stripe metadata and in the code. */
  id: string
  /** Name shown at checkout and on the invoice. */
  name: string
  /** Description shown at checkout. */
  description: string
  /** Billing model. */
  model: PricingModel
  /** Recurring / unit price (pence). No VAT (VAT-exempt medical service). */
  priceCents: number
  /** ISO currency (defaults to GBP). */
  currency: string
  /** Whether it is available to purchase. */
  active: boolean
  /** Optional bullets for the UI. */
  features?: string[]
  /**
   * Months of treatment access granted by a one-off payment (pack / one_time).
   * Not applicable to subscriptions (access continues while active).
   */
  accessMonths?: number

  /* ── Subscription ── */
  /** Frequency of the recurring charge. */
  interval?: BillingInterval
  /** Promotional first-period price (pence). If set, a coupon is applied for the difference. */
  firstPeriodCents?: number

  /* ── Pack ── */
  /** Number of sessions/units included in the pack. */
  quantity?: number
  /** Pack expiry in days (informational). */
  expiresInDays?: number
}

/* ────────────────────────────────────────────────────────────
   CATALOGUE — edit/add rows here to create new products.
   ──────────────────────────────────────────────────────────── */
export const CATALOG: Product[] = [
  {
    id: "monthly-follow-up",
    name: "Monthly subscription",
    description:
      "Ongoing medical follow-up, a prescription where appropriate and one phone consultation a month. No lock-in, cancel whenever you like.",
    model: "subscription",
    priceCents: 13900, // £139/month
    currency: "gbp",
    active: true,
    interval: "month",
    features: [
      "Ongoing medical follow-up with your doctor",
      "Electronic prescription where appropriate",
      "One phone consultation a month",
      "No lock-in: cancel whenever you like",
    ],
  },
  {
    id: "pack-5-months",
    name: "5-month pack",
    description:
      "Complete 5-month programme in a single payment. The best value if you want to commit to your goal.",
    model: "one_time",
    priceCents: 44900, // £449 one-off
    currency: "gbp",
    active: true,
    accessMonths: 5,
    features: [
      "5 months of medical follow-up",
      "Electronic prescription where appropriate",
      "Monthly phone consultation included",
      "Fixed price: works out much cheaper",
    ],
  },
  {
    id: "dietitian-glp1",
    name: "Dietitian + GLP-1",
    description:
      "5-month programme with medical follow-up and dietitian support, in a single payment.",
    model: "one_time",
    priceCents: 64900, // £649 one-off
    currency: "gbp",
    active: true,
    accessMonths: 5,
    features: [
      "5 months of medical follow-up",
      "Dietitian support",
      "Electronic prescription where appropriate",
      "Monthly phone consultation included",
    ],
  },
]

/* ── Read helpers ── */

export function getProduct(id: string): Product | undefined {
  return CATALOG.find((p) => p.id === id)
}

export function activeProducts(): Product[] {
  return CATALOG.filter((p) => p.active)
}

export function activeSubscriptions(): Product[] {
  return activeProducts().filter((p) => p.model === "subscription")
}

export function activePacks(): Product[] {
  return activeProducts().filter((p) => p.model === "pack")
}

/** Active one-off payments (closed packs and single-payment programmes). */
export function activeOneTime(): Product[] {
  return activeProducts().filter((p) => p.model === "one_time" || p.model === "pack")
}

/**
 * All plans that can be offered to a patient (subscription + one-off
 * payments), ordered: recurring subscription first, then the packs.
 */
export function activeSellablePlans(): Product[] {
  return [...activeSubscriptions(), ...activeOneTime()]
}

/** Main subscription (first active subscription in the catalogue). */
export function mainSubscription(): Product | undefined {
  return activeSubscriptions()[0]
}

/** Formats pence as a price in pounds: 13900 → "£139.00". */
export function formatPrice(cents: number, currency = "gbp"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

/**
 * Price label based on the plan model:
 *  - Subscription → "£139.00/month"
 *  - One-off with access → "£449.00 · one-off · 5 months"
 *  - One-off with no defined access → "£649.00 · one-off"
 */
export function planPriceLabel(p: Product): string {
  const base = formatPrice(p.priceCents, p.currency)
  if (p.model === "subscription") return `${base}/month`
  if (p.accessMonths) return `${base} · one-off · ${p.accessMonths} months`
  return `${base} · one-off`
}

/** First-period discount of a subscription (pence), or 0. */
export function firstPeriodDiscountCents(product: Product): number {
  if (product.model !== "subscription" || product.firstPeriodCents == null) return 0
  return Math.max(0, product.priceCents - product.firstPeriodCents)
}

/** Stripe Checkout mode that matches the product model. */
export function stripeMode(product: Product): "subscription" | "payment" {
  return product.model === "subscription" ? "subscription" : "payment"
}

/**
 * Translates a catalogue product into a Stripe Checkout `line_item`,
 * uniform for any model (inline `price_data`, no fixed Price IDs).
 */
export function toStripeLineItem(
  product: Product,
): Stripe.Checkout.SessionCreateParams.LineItem {
  const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
    currency: product.currency,
    unit_amount: product.priceCents,
    product_data: {
      name: `${product.name} · DoctorLife`,
      description: product.description,
    },
  }
  if (product.model === "subscription") {
    priceData.recurring = { interval: product.interval ?? "month" }
  }
  return { quantity: 1, price_data: priceData }
}
