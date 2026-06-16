/**
 * Capa de integración con Google Calendar + Google Meet.
 *
 * Estado actual: requiere credenciales OAuth de Google (GOOGLE_CLIENT_ID,
 * GOOGLE_CLIENT_SECRET) y que cada médico conecte su cuenta de Google. Mientras
 * no estén configuradas, las funciones degradan con elegancia: la cita se crea
 * igualmente y el enlace de Meet queda pendiente.
 *
 * Cuando se conecten las credenciales, implementar aquí:
 *  - intercambio OAuth y almacenamiento de tokens por médico (tabla `account`)
 *  - freebusy contra el Google Calendar del médico para descartar huecos
 *  - creación de evento con conferenceData (Meet) e invitados
 */

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

/**
 * Crea un evento en Google Calendar con enlace de Meet. Si Google no está
 * configurado o el médico no ha conectado su cuenta, devuelve enlaces nulos
 * sin lanzar error, para no bloquear la reserva.
 */
export async function maybeCreateMeeting(_input: MeetingInput): Promise<MeetingResult> {
  if (!isGoogleConfigured()) {
    return { meetingUrl: null, googleEventId: null }
  }
  // TODO: implementar cuando se conecten las credenciales de Google.
  // Aquí se usaría la API de Calendar (events.insert con conferenceDataVersion: 1).
  return { meetingUrl: null, googleEventId: null }
}
