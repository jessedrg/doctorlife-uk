/**
 * DoctorLife UK main plan.
 *
 * The definition now lives in the central catalogue (`lib/catalog.ts`), the
 * source of truth for all products (subscriptions, packs, one-off payments).
 * This module exposes the main plan in the `PlanInfo` format the app already
 * consumed, so existing calls keep working.
 *
 * The first visit (assessment) is FREE (£0) and works as a hook. The
 * subscription has no first-month offer: the price is flat from the start.
 * Medical services are VAT-exempt in the UK.
 */
import { getProduct, mainSubscription, type Product } from "./catalog"

/** Main product (monthly follow-up subscription). */
const MAIN_PRODUCT: Product =
  mainSubscription() ??
  getProduct("monthly-follow-up") ??
  ({
    id: "monthly-follow-up",
    name: "Monthly subscription",
    description: "Monthly subscription with medical follow-up.",
    model: "subscription",
    priceCents: 13900,
    currency: "gbp",
    active: true,
    interval: "month",
  } satisfies Product)

/** Monthly price (pence). No VAT (VAT-exempt medical service). */
export const SUBSCRIPTION_PRICE_CENTS = MAIN_PRODUCT.priceCents   // £139

/** One-off payment for the first visit (pence). It is FREE. */
export const FIRST_VISIT_CENTS = 0               // £0 (free)

/** Id of the main product in the catalogue (for checkout). */
export const MAIN_PRODUCT_ID = MAIN_PRODUCT.id

/** Label for the first-visit payment. */
export const FIRST_VISIT_LABEL = "free"

export interface PlanInfo {
  name: string
  /** Monthly price (pence). No VAT. */
  priceCents: number
  /** Formatted total, e.g. "£139.00/month". */
  totalLabel: string
}

function gbp(cents: number): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(cents / 100)
}

function buildMainPlan(): PlanInfo {
  return {
    name: MAIN_PRODUCT.name,
    priceCents: SUBSCRIPTION_PRICE_CENTS,
    totalLabel: `${gbp(SUBSCRIPTION_PRICE_CENTS)}/month`,
  }
}

/** The only plan available to purchase. */
export const MAIN_PLAN: PlanInfo = buildMainPlan()

/**
 * Returns the plan info. As there is only one active plan, it always returns
 * MAIN_PLAN (the parameter is kept for compatibility with previous calls).
 */
export function getPlan(_name?: string | null): PlanInfo {
  return MAIN_PLAN
}

/** Default plan (identical to the only available plan). */
export function defaultPlan(): PlanInfo {
  return MAIN_PLAN
}
