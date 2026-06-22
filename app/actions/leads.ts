"use server"

import { db } from "@/lib/db"
import { leads } from "@/lib/db/schema"
import { evaluateEligibility, type EligibilityStatus } from "@/lib/eligibility"

export type LeadInput = {
  name?: string
  email: string
  goal?: string
  glp1Experience?: string
  formatPreference?: string
  timeline?: string
  plan?: string
  heightCm?: number | null
  weightKg?: number | null
  age?: number | null
  sex?: string | null
  pregnancy?: string | null
  comorbidities?: string[]
  contraindications?: string[]
}

export type SaveLeadResult =
  | { ok: true; eligibility: EligibilityStatus; reasons: string[]; bmi: number | null }
  | { ok: false; error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function saveLead(input: LeadInput): Promise<SaveLeadResult> {
  const email = (input.email ?? "").trim().toLowerCase()

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Introduce un correo electrónico válido." }
  }

  const heightCm = input.heightCm && input.heightCm > 0 ? Math.round(input.heightCm) : null
  const weightKg = input.weightKg && input.weightKg > 0 ? Math.round(input.weightKg) : null
  const age = input.age && input.age > 0 ? Math.round(input.age) : null
  const comorbidities = Array.isArray(input.comorbidities) ? input.comorbidities : []
  const contraindications = Array.isArray(input.contraindications) ? input.contraindications : []

  // Re-evaluamos en el servidor: nunca confiamos solo en el cliente.
  const verdict = evaluateEligibility({
    age,
    heightCm,
    weightKg,
    pregnancy: input.pregnancy ?? null,
    comorbidities,
    contraindications,
  })
  const bmi = verdict.bmi != null ? verdict.bmi.toFixed(1) : null

  try {
    await db.insert(leads).values({
      name: input.name?.trim() || null,
      email,
      goal: input.goal || null,
      glp1Experience: input.glp1Experience || null,
      formatPreference: input.formatPreference || null,
      timeline: input.timeline || null,
      plan: input.plan || null,
      heightCm,
      weightKg,
      age,
      bmi,
      sex: input.sex || null,
      pregnancy: input.pregnancy || null,
      comorbidities: comorbidities.length ? JSON.stringify(comorbidities) : null,
      contraindications: contraindications.length ? JSON.stringify(contraindications) : null,
      eligibility: verdict.status,
      eligibilityReason: verdict.reasons.length ? JSON.stringify(verdict.reasons) : null,
      source: "quiz",
    })
    return { ok: true, eligibility: verdict.status, reasons: verdict.reasons, bmi: verdict.bmi }
  } catch (err) {
    console.log("[v0] saveLead error:", err instanceof Error ? err.message : err)
    return { ok: false, error: "No hemos podido guardar tus datos. Inténtalo de nuevo." }
  }
}
