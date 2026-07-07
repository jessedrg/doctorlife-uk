import { readFileSync, writeFileSync } from "node:fs"

const files = [
  "lib/blog.ts",
  "lib/blog-content.ts",
  "lib/blog-provinces.ts",
  "lib/blog-keywords.ts",
]

// Ordered replacements: most specific first. `€` may be preceded by a normal or
// non-breaking space, so we use \s* before the euro sign.
const E = "25\\s*€"
const rules = [
  // Full sentences with "se descuentan íntegramente"
  [new RegExp(`son solo ${E} y se descuentan íntegramente del tratamiento si decides empezar`, "g"), "es gratis, sin compromiso"],
  [new RegExp(`Sí\\. Los ${E} de la primera visita se descuentan íntegramente del tratamiento si decides empezar\\.`, "g"), "No, la primera visita es gratis, sin compromiso."],
  [new RegExp(`Los ${E} de la primera visita se descuentan íntegramente del tratamiento si decides empezar\\.`, "g"), "La primera visita es gratis, sin compromiso."],
  [new RegExp(`la primera visita \\(${E}\\) se descuenta íntegramente del tratamiento`, "g"), "la primera visita es gratis"],
  // "son 25 € y se descuentan del tratamiento ..."
  [new RegExp(`son ${E} y se descuentan del tratamiento si decides empezar`, "g"), "es gratis"],
  [new RegExp(`son ${E} y se descuentan del tratamiento`, "g"), "es gratis"],
  [new RegExp(`cuesta ${E}, descontables del tratamiento`, "g"), "es gratis"],
  // consulta online (25 €, descontables)
  [new RegExp(`online \\(${E}, descontables\\)`, "g"), "online gratis"],
  // "por 25 € (...)"
  [new RegExp(`por ${E} \\(descontables del tratamiento\\)`, "g"), "gratis"],
  [new RegExp(`por ${E} \\(se descuentan del tratamiento\\)`, "g"), "gratis"],
  [new RegExp(`por ${E} \\(descontables\\)`, "g"), "gratis"],
  // parentheticals
  [new RegExp(`\\(${E}, descontables del tratamiento\\)`, "g"), "(gratis)"],
  [new RegExp(`\\(${E} en DoctorLife, descontables\\)`, "g"), "(gratis en DoctorLife)"],
  [new RegExp(`\\(${E}, se descuentan del tratamiento\\)`, "g"), "(gratis)"],
  [new RegExp(`\\(${E}, descontables\\)`, "g"), "(gratis)"],
  [new RegExp(`\\(${E}\\)`, "g"), "(gratis)"],
  // "son 25 € (descontables)" / "son 25 €"
  [new RegExp(`son ${E} \\(descontables\\)`, "g"), "es gratis"],
  [new RegExp(`son ${E}`, "g"), "es gratis"],
  // meta / labels
  [new RegExp(`1ª visita ${E}`, "g"), "1ª visita gratis"],
  [new RegExp(`Primera visita ${E}`, "g"), "Primera visita gratis"],
  [new RegExp(`primera visita de ${E}`, "g"), "primera visita gratis"],
  [new RegExp(`Empieza por ${E} la primera visita`, "g"), "La primera visita es gratis"],
  [new RegExp(`Valoración médica desde ${E}`, "g"), "Primera visita gratis"],
  [new RegExp(`Valoración online por ${E}`, "g"), "Primera visita gratis"],
  // generic price phrases
  [new RegExp(`desde ${E}`, "g"), "gratis"],
  [new RegExp(`por ${E}`, "g"), "gratis"],
  [new RegExp(`de ${E}`, "g"), "gratis"],
  // FAQ questions about the discount
  [/¿La primera visita se descuenta del tratamiento\?/g, "¿La primera visita tiene algún coste?"],
  [/¿La primera visita en DoctorLife se descuenta\?/g, "¿La primera visita tiene algún coste?"],
  // safety: leftover discount parentheticals
  [/ \(descontables del tratamiento\)/g, ""],
  [/ \(descontables\)/g, ""],
]

for (const file of files) {
  let text = readFileSync(file, "utf8")
  const before = text
  for (const [from, to] of rules) text = text.replace(from, to)
  if (text !== before) {
    writeFileSync(file, text)
    console.log(`[v0] updated ${file}`)
  } else {
    console.log(`[v0] no change ${file}`)
  }
}
