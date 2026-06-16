import { pgTable, serial, text, integer, numeric, timestamp, boolean, date } from "drizzle-orm/pg-core"

/* ------------------------------------------------------------------ */
/* Better Auth tables (do not rename columns — camelCase is required)  */
/* ------------------------------------------------------------------ */

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  // 'patient' | 'doctor' | 'admin'
  role: text("role").notNull().default("patient"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export type User = typeof user.$inferSelect

/* ------------------------------------------------------------------ */
/* App tables                                                          */
/* ------------------------------------------------------------------ */

/**
 * Perfil de cada médico + estado de su cuenta de Stripe Connect.
 * Se escala por `userId` en cada query (no hay RLS en Neon).
 */
export const doctorProfiles = pgTable("doctor_profiles", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull().unique(),
  fullName: text("fullName").notNull(),
  specialty: text("specialty"),
  licenseNumber: text("licenseNumber"),
  bio: text("bio"),
  stripeAccountId: text("stripeAccountId"),
  stripeOnboarded: boolean("stripeOnboarded").notNull().default(false),
  chargesEnabled: boolean("chargesEnabled").notNull().default(false),
  payoutsEnabled: boolean("payoutsEnabled").notNull().default(false),
  acceptingPatients: boolean("acceptingPatients").notNull().default(true),
  slotMinutes: integer("slotMinutes").notNull().default(30),
  timezone: text("timezone").notNull().default("Europe/Madrid"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export type DoctorProfile = typeof doctorProfiles.$inferSelect
export type NewDoctorProfile = typeof doctorProfiles.$inferInsert

/**
 * Disponibilidad semanal recurrente del médico.
 * dayOfWeek: 0 = domingo … 6 = sábado. Minutos desde medianoche (hora local del médico).
 */
export const doctorAvailability = pgTable("doctor_availability", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  dayOfWeek: integer("dayOfWeek").notNull(),
  startMinute: integer("startMinute").notNull(),
  endMinute: integer("endMinute").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export type DoctorAvailability = typeof doctorAvailability.$inferSelect

/** Fechas puntuales bloqueadas (vacaciones, festivos…). */
export const availabilityExceptions = pgTable("availability_exceptions", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  date: date("date").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export type AvailabilityException = typeof availabilityExceptions.$inferSelect

/**
 * Citas reservadas por pacientes.
 * status: 'pending_payment' | 'confirmed' | 'cancelled'
 * Se escala por patientId (paciente) o doctorId (médico) en cada query.
 */
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: text("patientId").notNull(),
  doctorId: text("doctorId").notNull(),
  startsAt: timestamp("startsAt", { withTimezone: true }).notNull(),
  endsAt: timestamp("endsAt", { withTimezone: true }).notNull(),
  status: text("status").notNull().default("pending_payment"),
  leadId: integer("leadId"),
  amountCents: integer("amountCents").notNull().default(2500),
  currency: text("currency").notNull().default("eur"),
  stripeSessionId: text("stripeSessionId"),
  stripePaymentIntentId: text("stripePaymentIntentId"),
  applicationFeeCents: integer("applicationFeeCents").notNull().default(0),
  meetingUrl: text("meetingUrl"),
  googleEventId: text("googleEventId"),
  createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
})

export type Appointment = typeof appointments.$inferSelect
export type NewAppointment = typeof appointments.$inferInsert

/** Hilo de conversación entre un paciente y un médico (uno por pareja). */
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  patientId: text("patientId").notNull(),
  doctorId: text("doctorId").notNull(),
  lastMessageAt: timestamp("lastMessageAt", { withTimezone: true }),
  createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
})

export type Conversation = typeof conversations.$inferSelect

/** Mensajes dentro de una conversación. */
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversationId").notNull(),
  senderId: text("senderId").notNull(),
  body: text("body").notNull(),
  readAt: timestamp("readAt", { withTimezone: true }),
  createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
})

export type Message = typeof messages.$inferSelect
export type NewMessage = typeof messages.$inferInsert

/** Recetas emitidas por un médico. El PDF se guarda en un blob privado. */
export const prescriptions = pgTable("prescriptions", {
  id: serial("id").primaryKey(),
  patientId: text("patientId").notNull(),
  doctorId: text("doctorId").notNull(),
  appointmentId: integer("appointmentId"),
  medication: text("medication").notNull(),
  dosage: text("dosage").notNull(),
  instructions: text("instructions"),
  blobPathname: text("blobPathname").notNull(),
  issuedAt: timestamp("issuedAt", { withTimezone: true }).notNull().defaultNow(),
})

export type Prescription = typeof prescriptions.$inferSelect
export type NewPrescription = typeof prescriptions.$inferInsert

/**
 * Suscripción mensual de tratamiento del paciente con su médico.
 * status refleja el estado de Stripe: incomplete | active | trialing | past_due | canceled.
 */
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  patientId: text("patientId").notNull(),
  doctorId: text("doctorId").notNull(),
  plan: text("plan").notNull(),
  priceCents: integer("priceCents").notNull(),
  currency: text("currency").notNull().default("eur"),
  stripeCustomerId: text("stripeCustomerId"),
  stripeSubscriptionId: text("stripeSubscriptionId"),
  status: text("status").notNull().default("incomplete"),
  currentPeriodEnd: timestamp("currentPeriodEnd", { withTimezone: true }),
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").notNull().default(false),
  createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
})

export type Subscription = typeof subscriptions.$inferSelect
export type NewSubscription = typeof subscriptions.$inferInsert

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
