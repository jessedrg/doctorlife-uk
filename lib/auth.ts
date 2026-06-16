import { betterAuth } from "better-auth"
import { pool } from "@/lib/db"
import { sendResetPasswordEmail } from "@/lib/email"

/** Scopes de Google Calendar que pide el médico al conectar su cuenta. */
const GOOGLE_CALENDAR_SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.readonly",
]

const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

export const auth = betterAuth({
  database: pool,
  baseURL:
    process.env.BETTER_AUTH_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.V0_RUNTIME_URL),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail({ to: user.email, name: user.name, url })
    },
  },
  // Google se usa SOLO como cuenta enlazable por los médicos (Calendar/Meet),
  // no como método de inicio de sesión. Se omite si faltan las credenciales.
  ...(googleConfigured
    ? {
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            scope: GOOGLE_CALENDAR_SCOPES,
            // offline + consent garantizan que recibimos un refresh_token.
            accessType: "offline" as const,
            prompt: "consent" as const,
          },
        },
      }
    : {}),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
      // El email de Google del médico puede diferir del de su cuenta DoctorLife.
      allowDifferentEmails: true,
    },
  },
  user: {
    additionalFields: {
      // 'patient' | 'doctor' | 'admin'. Defaults to patient and is NOT
      // settable from the client sign-up payload (input: false) so a user
      // cannot self-assign the doctor/admin role.
      role: {
        type: "string",
        required: false,
        defaultValue: "patient",
        input: false,
      },
    },
  },
  trustedOrigins: [
    ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
    ...(process.env.NODE_ENV === "development"
      ? ["http://localhost:3000", "http://127.0.0.1:3000"]
      : []),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  ...(process.env.NODE_ENV === "development"
    ? {
        advanced: {
          // In dev (v0 preview iframe), force cross-site cookies so the
          // session cookie is stored by the browser.
          defaultCookieAttributes: {
            sameSite: "none" as const,
            secure: true,
          },
        },
      }
    : {}),
})
