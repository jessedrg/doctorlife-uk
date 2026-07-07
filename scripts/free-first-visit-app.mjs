import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

// Collect all .tsx under app/, skipping backend dirs (comments there describe
// real money flows and must not be touched).
const SKIP = ["app/actions", "app/api", "app/portal"]
function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (SKIP.some((s) => p.startsWith(s))) continue
    const st = statSync(p)
    if (st.isDirectory()) walk(p, acc)
    else if (p.endsWith(".tsx")) acc.push(p)
  }
  return acc
}

const files = walk("app")

const rules = [
  [/La primera visita cuesta 25 € y es descontable\. Si decides\s+continuar, una única suscripción de 100 €\/mes cubre/g,
    "La primera visita es gratis. Si decides continuar, oferta de lanzamiento: el primer mes 60 € y, después, una suscripción de 100 €/mes que cubre"],
  ["La primera visita cuesta 25 € (descontables). Después, una única suscripción de 100 €/mes que incluye seguimiento por chat con tu médico y ajuste del plan. Sin permanencia.",
    "La primera visita es gratis. Oferta de lanzamiento: el primer mes 60 € y, después, una única suscripción de 100 €/mes que incluye seguimiento por chat con tu médico y ajuste del plan. Sin permanencia."],
  ["Su importe (25 €) se descuenta de tu suscripción si continúas.", "La primera visita es gratis, sin compromiso."],
  ["Reservar primera visita · 25 €", "Reservar primera visita gratis"],
  ["Importe descontable · sin compromiso", "Gratis · sin compromiso"],
  ["Empieza por 25 € y decide con calma", "Empieza gratis y decide con calma"],
  [/Reserva tu primera visita por 25 €\. Sin desplazamientos/g, "Reserva tu primera visita gratis. Sin desplazamientos"],
  [/<span className="text-\[48px\] font-light leading-none">25 €<\/span>/g,
    '<span className="text-[48px] font-light leading-none">Gratis</span>'],
  [/<span className="mb-1 text-\[14px\] text-paper\/70">descontable<\/span>/g,
    '<span className="mb-1 text-[14px] text-paper/70">sin compromiso</span>'],
  [/>Después, si continúas</g, ">Si continúas · oferta de lanzamiento<"],
  [/<span className="text-\[32px\] font-light leading-none">\s*100 €\s*<\/span>/g,
    '<span className="text-[32px] font-light leading-none">60 €</span>'],
  [/<span className="mb-1 text-\[14px\] text-paper\/70">\/mes<\/span>/g,
    '<span className="mb-1 text-[14px] text-paper/70">primer mes, luego 100 €/mes</span>'],
  [/por\s+25 € \(descontables del tratamiento\)/g, "gratis"],
  [/primera visita \(descontables del tratamiento\)/g, "primera visita gratis"],
  [/primera visita \(descontable del tratamiento\)/g, "primera visita gratis"],
  ["Primera visita 25 €, sin permanencia.", "Primera visita gratis, sin permanencia."],
  [/Primera visita 25 €\./g, "Primera visita gratis."],
  [/Primera visita 25 €/g, "Primera visita gratis"],
]

for (const file of files) {
  let text = readFileSync(file, "utf8")
  const before = text
  for (const [from, to] of rules) text = text.replaceAll(from, to)
  if (text !== before) {
    writeFileSync(file, text)
    console.log(`[v0] updated ${file}`)
  }
}
