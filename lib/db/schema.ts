import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

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
  source: text("source").default("quiz"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
