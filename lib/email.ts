import { Resend } from "resend"
import { getBaseUrl } from "@/lib/base-url"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

/**
 * Remitente. Por defecto usa el sandbox de Resend (onboarding@resend.dev), que
 * solo entrega al email de la cuenta. Para producción, verifica un dominio en
 * Resend y define RESEND_FROM_EMAIL="DoctorLife <hola@tudominio.com>".
 */
const FROM = process.env.RESEND_FROM_EMAIL ?? "DoctorLife <onboarding@resend.dev>"

const BRAND = "#0E7C66"
const INK = "#14201d"
const SOFT = "#5b6b66"

function shell(title: string, body: string) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;background:#f3f6f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};">
  <div style="max-width:520px;margin:0 auto;padding:32px 20px;">
    <div style="font-size:20px;font-weight:600;letter-spacing:-.02em;color:${BRAND};margin-bottom:20px;">DoctorLife</div>
    <div style="background:#ffffff;border:1px solid #e6ece9;border-radius:16px;padding:28px;">
      <h1 style="margin:0 0 12px;font-size:20px;font-weight:600;letter-spacing:-.02em;color:${INK};">${title}</h1>
      ${body}
    </div>
    <p style="margin:20px 4px 0;font-size:12px;line-height:1.6;color:${SOFT};">
      Este es un correo automático de DoctorLife. Si no esperabas este mensaje, puedes ignorarlo.
    </p>
  </div>
</body></html>`
}

function button(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:10px;">${label}</a>`
}

function p(text: string) {
  return `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${SOFT};">${text}</p>`
}

async function send(to: string, subject: string, html: string) {
  if (!resend) {
    console.log("[v0] RESEND_API_KEY ausente; email no enviado:", subject, "->", to)
    return { skipped: true as const }
  }
  const { data, error } = await resend.emails.send({ from: FROM, to, subject, html })
  if (error) {
    console.log("[v0] Error enviando email:", subject, error)
    throw new Error(error.message ?? "No se pudo enviar el correo")
  }
  return { id: data?.id }
}

/** Credenciales de acceso tras el pago de la suscripción. */
export async function sendCredentialsEmail(opts: {
  to: string
  name: string
  tempPassword: string
}) {
  const loginUrl = `${getBaseUrl()}/sign-in`
  const firstName = opts.name.split(" ")[0] || "hola"
  const body = `
    ${p(`Hola ${firstName}, tu plan de seguimiento con endocrino ya está activo. Hemos creado tu cuenta para acceder a tu panel privado.`)}
    <div style="background:#f3f6f5;border:1px solid #e6ece9;border-radius:12px;padding:16px;margin:0 0 18px;">
      <p style="margin:0 0 6px;font-size:13px;color:${SOFT};">Usuario (tu email)</p>
      <p style="margin:0 0 14px;font-size:15px;font-weight:600;color:${INK};">${opts.to}</p>
      <p style="margin:0 0 6px;font-size:13px;color:${SOFT};">Contraseña temporal</p>
      <p style="margin:0;font-size:18px;font-weight:700;letter-spacing:.04em;color:${INK};font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${opts.tempPassword}</p>
    </div>
    ${p("Por seguridad, cámbiala desde <strong>Mi cuenta</strong> la primera vez que entres.")}
    <div style="margin:22px 0 4px;">${button(loginUrl, "Entrar a mi panel")}</div>
  `
  return send(opts.to, "Tus credenciales de acceso a DoctorLife", shell("Tu cuenta está lista", body))
}

/** Confirmación de pago y de la primera cita. */
export async function sendBookingConfirmationEmail(opts: {
  to: string
  name: string
  doctorName?: string | null
  startsAt: Date
  amountLabel: string
}) {
  const firstName = opts.name.split(" ")[0] || "hola"
  const when = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  }).format(opts.startsAt)
  const body = `
    ${p(`Hola ${firstName}, hemos recibido tu pago correctamente y tu suscripción está activa.`)}
    <div style="background:#f3f6f5;border:1px solid #e6ece9;border-radius:12px;padding:16px;margin:0 0 18px;">
      <p style="margin:0 0 6px;font-size:13px;color:${SOFT};">Tu primera consulta</p>
      <p style="margin:0 0 12px;font-size:15px;font-weight:600;color:${INK};text-transform:capitalize;">${when}</p>
      ${opts.doctorName ? `<p style="margin:0 0 6px;font-size:13px;color:${SOFT};">Endocrino asignado</p><p style="margin:0 0 12px;font-size:15px;font-weight:600;color:${INK};">${opts.doctorName}</p>` : ""}
      <p style="margin:0 0 6px;font-size:13px;color:${SOFT};">Importe</p>
      <p style="margin:0;font-size:15px;font-weight:600;color:${INK};">${opts.amountLabel}</p>
    </div>
    ${p("Encontrarás el enlace de la videollamada y tu chat con el médico en tu panel.")}
    <div style="margin:22px 0 4px;">${button(`${getBaseUrl()}/portal`, "Ir a mi panel")}</div>
  `
  return send(opts.to, "Confirmación de tu suscripción y cita — DoctorLife", shell("Pago confirmado", body))
}

/** Credenciales de acceso para un médico creado por el admin. */
export async function sendDoctorWelcomeEmail(opts: {
  to: string
  name: string
  tempPassword: string
}) {
  const loginUrl = `${getBaseUrl()}/sign-in`
  const firstName = opts.name.split(" ")[0] || "hola"
  const body = `
    ${p(`Hola ${firstName}, el equipo de DoctorLife ha creado tu cuenta de médico. Desde tu panel podrás gestionar tu agenda, tus pacientes y el chat.`)}
    <div style="background:#f3f6f5;border:1px solid #e6ece9;border-radius:12px;padding:16px;margin:0 0 18px;">
      <p style="margin:0 0 6px;font-size:13px;color:${SOFT};">Usuario (tu email)</p>
      <p style="margin:0 0 14px;font-size:15px;font-weight:600;color:${INK};">${opts.to}</p>
      <p style="margin:0 0 6px;font-size:13px;color:${SOFT};">Contraseña temporal</p>
      <p style="margin:0;font-size:18px;font-weight:700;letter-spacing:.04em;color:${INK};font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${opts.tempPassword}</p>
    </div>
    ${p("Por seguridad, cámbiala desde <strong>Mi cuenta</strong> la primera vez que entres.")}
    <div style="margin:22px 0 4px;">${button(loginUrl, "Entrar a mi panel")}</div>
  `
  return send(opts.to, "Tu acceso de médico en DoctorLife", shell("Tu cuenta de médico está lista", body))
}

/** Restablecer contraseña (usado por Better Auth). */
export async function sendResetPasswordEmail(opts: { to: string; name?: string; url: string }) {
  const firstName = opts.name?.split(" ")[0] || "hola"
  const body = `
    ${p(`Hola ${firstName}, recibimos una solicitud para restablecer tu contraseña.`)}
    ${p("Pulsa el botón para crear una nueva. El enlace caduca en 1 hora.")}
    <div style="margin:18px 0 8px;">${button(opts.url, "Restablecer contraseña")}</div>
    ${p("Si no fuiste tú, ignora este correo y tu contraseña seguirá igual.")}
  `
  return send(opts.to, "Restablece tu contraseña — DoctorLife", shell("Restablecer contraseña", body))
}
