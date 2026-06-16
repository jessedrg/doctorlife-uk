import { pgTable, serial, text, integer, numeric, timestamp } from "drizzle-orm/pg-core"

/**
 * Leads capturados desde el quiz "Comenzar".
 * Son envíos públicos (sin cuenta de usuario), por eso no hay userId.
 */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  goal: text("goal"),
  glp1Experience: text("glp1_experience"),
  formatPreference: text("format_preference"),
  timeline: text("timeline"),
  plan: text("plan"),
  heightCm: integer("height_cm"),
  weightKg: integer("weight_kg"),
  age: integer("age"),
  bmi: numeric("bmi", { precision: 4, scale: 1 }),
  source: text("source").default("quiz"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
