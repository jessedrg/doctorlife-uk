/**
 * Capa de integración con Google Calendar + Google Meet (sin dependencias).
 *
 * Cada médico conecta su cuenta de Google desde su panel (Better Auth
 * `linkSocial`). Los tokens (access + refresh) se guardan en la tabla `account`
 * con providerId = "google". Aquí los usamos para:
 *  - freebusy: descartar huecos que choquen con eventos ya existentes
 *  - events.insert: crear el evento con enlace de Meet e invitar a médico y paciente
 *
 * Todo degrada con elegancia: si Google no está configurado o el médico no ha
 * conectado su cuenta, las funciones devuelven valores neutros sin lanzar error
 * para no bloquear la reserva.
 */

import { db } from "@/lib/db"
import { account } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
const GOOGLE_CALENDAR_BASE = "https://www.googleapis.com/calendar/v3"

/** Scopes que pedimos al médico al conectar Google. */
export const GOOGLE_CALENDAR_SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.readonly",
]

export function isGoogleConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
}

export interface MeetingInput {
  doctorId: string
  doctorEmail: string
  patientEmail: string
  summary: string
  startUtc: Date
  endUtc: Date
}

export interface MeetingResult {
  meetingUrl: string | null
  googleEventId: string | null
}

export interface BusyInterval {
  /** Inicio del intervalo ocupado (ms epoch). */
  start: number
  /** Fin del intervalo ocupado (ms epoch). */
  end: number
}

interface GoogleAccountRow {
  id: string
  accessToken: string | null
  refreshToken: string | null
  accessTokenExpiresAt: Date | null
}

/** Cuenta de Google enlazada del médico (o null si no la ha conectado). */
async function getDoctorGoogleAccount(doctorId: string): Promise<GoogleAccountRow | null> {
  const [row] = await db
    .select({
      id: account.id,
      accessToken: account.accessToken,
      refreshToken: account.refreshToken,
      accessTokenExpiresAt: account.accessTokenExpiresAt,
    })
    .from(account)
    .where(and(eq(account.userId, doctorId), eq(account.providerId, "google")))
    .limit(1)
  return row ?? null
}

/** ¿El médico tiene Google Calendar conectado y utilizable? */
export async function isDoctorGoogleConnected(doctorId: string): Promise<boolean> {
  if (!isGoogleConfigured()) return false
  const acc = await getDoctorGoogleAccount(doctorId)
  return Boolean(acc?.refreshToken || acc?.accessToken)
}

/**
 * Devuelve un access token válido para el médico, refrescándolo contra Google
 * si ha caducado. Persiste el token nuevo en la tabla `account`. Devuelve null
 * si no se puede obtener (sin refresh token, error de red, etc.).
 */
async function getFreshAccessToken(acc: GoogleAccountRow): Promise<string | null> {
  const stillValid =
    acc.accessToken &&
    acc.accessTokenExpiresAt &&
    acc.accessTokenExpiresAt.getTime() > Date.now() + 60_000
  if (stillValid) return acc.accessToken

  if (!acc.refreshToken) return acc.accessToken ?? null

  try {
    const res = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID ?? "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        grant_type: "refresh_token",
        refresh_token: acc.refreshToken,
      }),
    })
    if (!res.ok) {
      console.log("[v0] google token refresh failed:", res.status, await res.text())
      return acc.accessToken ?? null
    }
    const data = (await res.json()) as { access_token?: string; expires_in?: number }
    if (!data.access_token) return acc.accessToken ?? null

    const expiresAt = new Date(Date.now() + (data.expires_in ?? 3600) * 1000)
    await db
      .update(account)
      .set({ accessToken: data.access_token, accessTokenExpiresAt: expiresAt, updatedAt: new Date() })
      .where(eq(account.id, acc.id))
    return data.access_token
  } catch (e) {
    console.log("[v0] google token refresh error:", e instanceof Error ? e.message : e)
    return acc.accessToken ?? null
  }
}

/**
 * Intervalos ocupados en el Google Calendar principal del médico entre `from`
 * y `to`. Devuelve [] si Google no está configurado, el médico no está conectado
 * o la llamada falla (nunca lanza, para no bloquear la generación de huecos).
 */
export async function getBusyIntervals(doctorId: string, from: Date, to: Date): Promise<BusyInterval[]> {
  if (!isGoogleConfigured()) return []
  try {
    const acc = await getDoctorGoogleAccount(doctorId)
    if (!acc) return []
    const token = await getFreshAccessToken(acc)
    if (!token) return []

    const res = await fetch(`${GOOGLE_CALENDAR_BASE}/freeBusy`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        timeMin: from.toISOString(),
        timeMax: to.toISOString(),
        items: [{ id: "primary" }],
      }),
    })
    if (!res.ok) {
      console.log("[v0] google freebusy failed:", res.status)
      return []
    }
    const data = (await res.json()) as {
      calendars?: Record<string, { busy?: { start: string; end: string }[] }>
    }
    const busy = data.calendars?.primary?.busy ?? []
    return busy
      .map((b) => ({ start: new Date(b.start).getTime(), end: new Date(b.end).getTime() }))
      .filter((b) => Number.isFinite(b.start) && Number.isFinite(b.end))
  } catch (e) {
    console.log("[v0] google freebusy error:", e instanceof Error ? e.message : e)
    return []
  }
}

/**
 * Crea un evento en Google Calendar con enlace de Meet e invita al médico y al
 * paciente. Si Google no está configurado o el médico no ha conectado su cuenta,
 * devuelve enlaces nulos sin lanzar error, para no bloquear la reserva.
 */
export async function maybeCreateMeeting(input: MeetingInput): Promise<MeetingResult> {
  if (!isGoogleConfigured()) return { meetingUrl: null, googleEventId: null }

  try {
    const acc = await getDoctorGoogleAccount(input.doctorId)
    if (!acc) return { meetingUrl: null, googleEventId: null }
    const token = await getFreshAccessToken(acc)
    if (!token) return { meetingUrl: null, googleEventId: null }

    const attendees = [input.doctorEmail, input.patientEmail]
      .filter((e) => e && e.includes("@"))
      .map((email) => ({ email }))

    const requestId = `doctorlife-${input.doctorId}-${input.startUtc.getTime()}`
    const res = await fetch(
      `${GOOGLE_CALENDAR_BASE}/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: input.summary,
          description: "Videoconsulta reservada a través de DoctorLife.",
          start: { dateTime: input.startUtc.toISOString(), timeZone: "UTC" },
          end: { dateTime: input.endUtc.toISOString(), timeZone: "UTC" },
          attendees,
          conferenceData: {
            createRequest: {
              requestId,
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
        }),
      },
    )
    if (!res.ok) {
      console.log("[v0] google event insert failed:", res.status, await res.text())
      return { meetingUrl: null, googleEventId: null }
    }
    const event = (await res.json()) as {
      id?: string
      hangoutLink?: string
      conferenceData?: { entryPoints?: { entryPointType?: string; uri?: string }[] }
    }
    const meetEntry = event.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")
    const meetingUrl = event.hangoutLink ?? meetEntry?.uri ?? null
    return { meetingUrl, googleEventId: event.id ?? null }
  } catch (e) {
    console.log("[v0] maybeCreateMeeting error:", e instanceof Error ? e.message : e)
    return { meetingUrl: null, googleEventId: null }
  }
}
