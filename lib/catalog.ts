/**
 * Catálogo central de todo lo que DoctorLife cobra.
 *
 * Única fuente de verdad para suscripciones, packs de sesiones y pagos únicos.
 * Para añadir un nuevo modelo de venta en el futuro, basta con añadir una fila a
 * `CATALOG`: el flujo de checkout (`lib/checkout.ts`) lo convierte en una sesión
 * de Stripe y aplica automáticamente el enrutado a la clínica + la comisión de
 * plataforma. No hace falta tocar la lógica de pagos.
 *
 * Los precios se guardan en céntimos (EUR) e incluyen IVA.
 */

export type PricingModel = "subscription" | "pack" | "one_time"

export type BillingInterval = "month" | "year"

export interface Product {
  /** Identificador estable usado en metadata de Stripe y en el código. */
  id: string
  /** Nombre visible en el checkout y la factura. */
  name: string
  /** Descripción visible en el checkout. */
  description: string
  /** Modelo de cobro. */
  model: PricingModel
  /** Precio recurrente / unitario con IVA incluido (céntimos). */
  priceCents: number
  /** Divisa ISO (por defecto EUR). */
  currency: string
  /** Si está disponible para contratar. */
  active: boolean
  /** Bullets opcionales para UI. */
  features?: string[]

  /* ── Suscripción ── */
  /** Periodicidad del cobro recurrente. */
  interval?: BillingInterval
  /** Precio promocional del primer periodo (céntimos). Si se define, se aplica un cupón por la diferencia. */
  firstPeriodCents?: number

  /* ── Pack ── */
  /** Nº de sesiones/unidades incluidas en el pack. */
  quantity?: number
  /** Caducidad del pack en días (informativo). */
  expiresInDays?: number
}

/* ────────────────────────────────────────────────────────────
   CATÁLOGO — edita/añade filas aquí para crear nuevos productos.
   ──────────────────────────────────────────────────────────── */
export const CATALOG: Product[] = [
  {
    id: "seguimiento-endocrino",
    name: "Seguimiento con endocrino",
    description:
      "Suscripción mensual con seguimiento médico. Oferta de lanzamiento: primer mes 60 € (después, 100 €/mes).",
    model: "subscription",
    priceCents: 10000, // 100 € IVA incl.
    currency: "eur",
    active: true,
    interval: "month",
    firstPeriodCents: 6000, // 60 € el primer mes
    features: [
      "Videoconsultas con tu endocrino",
      "Receta electrónica cuando proceda",
      "Seguimiento y ajuste por la app",
    ],
  },
  // Ejemplos listos para activar en el futuro (active: false → no se ofrecen aún):
  // {
  //   id: "pack-3-consultas",
  //   name: "Pack 3 consultas",
  //   description: "Tres videoconsultas de seguimiento para usar cuando quieras.",
  //   model: "pack",
  //   priceCents: 6000,
  //   currency: "eur",
  //   active: false,
  //   quantity: 3,
  //   expiresInDays: 365,
  // },
  // {
  //   id: "consulta-puntual",
  //   name: "Consulta puntual",
  //   description: "Una videoconsulta médica sin suscripción.",
  //   model: "one_time",
  //   priceCents: 2500,
  //   currency: "eur",
  //   active: false,
  // },
]

/* ── Helpers de lectura ── */

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

/** Descuento del primer periodo de una suscripción (céntimos), o 0. */
export function firstPeriodDiscountCents(product: Product): number {
  if (product.model !== "subscription" || product.firstPeriodCents == null) return 0
  return Math.max(0, product.priceCents - product.firstPeriodCents)
}

/** Modo de Stripe Checkout que corresponde al modelo del producto. */
export function stripeMode(product: Product): "subscription" | "payment" {
  return product.model === "subscription" ? "subscription" : "payment"
}

/**
 * Traduce un producto del catálogo a un `line_item` de Stripe Checkout,
 * uniforme para cualquier modelo (`price_data` inline, sin Price IDs fijos).
 */
export function toStripeLineItem(product: Product) {
  const base = {
    quantity: 1,
    price_data: {
      currency: product.currency,
      unit_amount: product.priceCents,
      product_data: {
        name: `${product.name} · DoctorLife`,
        description: product.description,
      },
    } as Record<string, unknown>,
  }
  if (product.model === "subscription") {
    base.price_data.recurring = { interval: product.interval ?? "month" }
  }
  return base
}
