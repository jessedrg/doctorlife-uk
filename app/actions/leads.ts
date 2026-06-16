"use server"

import { db } from "@/lib/db"
import { leads } from "@/lib/db/schema"

export type LeadInput = {
  name?: string
  email: string
  goal?: string
  glp1Experience?: string
  formatPreference?: string
  timeline?: string
}

export type SaveLeadResult = { ok: true } | { ok: false; error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function saveLead(input: LeadInput): Promise<SaveLeadResult> {
  const email = (input.email ?? "").trim().toLowerCase()

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Introduce un correo electrónico válido." }
  }

  try {
    await db.insert(leads).values({
      name: input.name?.trim() || null,
      email,
      goal: input.goal || null,
      glp1Experience: input.glp1Experience || null,
      formatPreference: input.formatPreference || null,
      timeline: input.timeline || null,
      source: "quiz",
    })
    return { ok: true }
  } catch (err) {
    console.log("[v0] saveLead error:", err instanceof Error ? err.message : err)
    return { ok: false, error: "No hemos podido guardar tus datos. Inténtalo de nuevo." }
  }
}
