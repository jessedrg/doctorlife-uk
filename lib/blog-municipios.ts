/* ───────────────────────────────────────────────────────────
   Generador de páginas de CLÍNICA por MUNICIPIO (~8.100 de España,
   del CSV de localidades del usuario, datos INE).

   Cada página usa DATOS REALES Y ÚNICOS del municipio (población,
   tamaño, provincia, comunidad autónoma y servicio de salud) para
   evitar thin content: la redacción cambia según sea un pueblo
   pequeño, un municipio mediano o una ciudad.

   Objetivo: rankear "clínica pérdida de peso {municipio}",
   "clínica ozempic {municipio}", "adelgazar {municipio}"…
   y llevar a la consulta online de DoctorLife (1ª consulta gratis).
   ─────────────────────────────────────────────────────────── */

import type { Post, Section, Faq } from "./blog";
import rawMunicipios from "./data/municipios-raw";

const BRAND = "DoctorLife";

/* ── utilidades deterministas ── */
function hash(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return n;
}
function pick<T>(arr: T[], seed: string): T {
  return arr[hash(seed) % arr.length];
}
function isoDate(offset: number): string {
  const d = new Date(Date.UTC(2025, 8, 1));
  d.setUTCDate(d.getUTCDate() + (offset % 300));
  return d.toISOString().slice(0, 10);
}
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function fmt(n: number): string {
  return n.toLocaleString("es-ES");
}

/* Nombres tipo "Ejido (El)" → "El Ejido" para redactar con naturalidad */
function displayName(name: string): string {
  const m = name.match(/^(.+) \((.+)\)$/);
  return m ? `${m[2]} ${m[1]}` : name;
}

/* ── servicio de salud por comunidad (dato único por página) ── */
const HEALTH: Record<string, string> = {
  "Andalucía": "Servicio Andaluz de Salud (SAS)",
  "Aragón": "Servicio Aragonés de Salud (SALUD)",
  "Principado de Asturias": "SESPA",
  "Asturias": "SESPA",
  "Islas Baleares": "IB-Salut",
  "Baleares": "IB-Salut",
  "Canarias": "Servicio Canario de la Salud (SCS)",
  "Cantabria": "Servicio Cántabro de Salud",
  "Castilla y León": "Sacyl",
  "Castilla-La Mancha": "SESCAM",
  "Cataluña": "CatSalut",
  "Comunidad Valenciana": "Conselleria de Sanitat",
  "Extremadura": "Servicio Extremeño de Salud (SES)",
  "Galicia": "Sergas",
  "Comunidad de Madrid": "SERMAS",
  "Madrid": "SERMAS",
  "Región de Murcia": "Servicio Murciano de Salud (SMS)",
  "Murcia": "Servicio Murciano de Salud (SMS)",
  "Comunidad Foral de Navarra": "Osasunbidea",
  "Navarra": "Osasunbidea",
  "País Vasco": "Osakidetza",
  "La Rioja": "Servicio Riojano de Salud (Seris)",
  "Ceuta": "INGESA",
  "Melilla": "INGESA",
};

const COVERS = [
  "/blog/wegovy-sevilla.png",
  "/blog/mounjaro-valencia.png",
  "/blog/ozempic-madrid.png",
  "/products/maren-lineup.png",
  "/hero/woman.png",
];

type Muni = { com: string; prov: string; name: string; pop: number };

function parseMunicipios(): Muni[] {
  const out: Muni[] = [];
  for (const line of rawMunicipios.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    const parts = t.split(";");
    if (parts.length < 4) continue;
    const pop = Number(parts[3]);
    if (!parts[2] || !Number.isFinite(pop)) continue;
    out.push({ com: parts[0], prov: parts[1], name: parts[2], pop });
  }
  return out;
}

/* Bucket de tamaño → redacción totalmente distinta por tipo de municipio */
type SizeKey = "pueblo" | "villa" | "mediano" | "ciudad" | "gran-ciudad";
function sizeOf(pop: number): SizeKey {
  if (pop >= 100000) return "gran-ciudad";
  if (pop >= 20000) return "ciudad";
  if (pop >= 5000) return "mediano";
  if (pop >= 1000) return "villa";
  return "pueblo";
}

function buildSections(m: Muni, dName: string, size: SizeKey): Section[] {
  const health = HEALTH[m.com] ?? "el servicio autonómico de salud";
  const pop = fmt(m.pop);

  const introBySize: Record<SizeKey, string> = {
    "pueblo": `${dName} (${m.prov}) tiene ${pop} habitantes y, como en la mayoría de municipios pequeños de ${m.com}, no cuenta con una clínica especializada en obesidad: la consulta de endocrinología más cercana suele estar a bastantes kilómetros. Eso ya no es un impedimento: con ${BRAND} tienes un endocrino colegiado por videoconsulta desde casa, con receta electrónica válida en cualquier farmacia de ${m.prov}.`,
    "villa": `En ${dName} (${pop} habitantes, provincia de ${m.prov}) el acceso a una unidad de obesidad implica normalmente desplazarse y esperar semanas por ${health}. La alternativa: consulta online con endocrino colegiado, receta electrónica que funciona en tu farmacia habitual de ${dName} y seguimiento desde el móvil.`,
    "mediano": `${dName} es un municipio de ${pop} habitantes de la provincia de ${m.prov}. Aunque hay consultas médicas privadas en la zona, pocas están especializadas en tratamiento farmacológico de la obesidad con GLP‑1. ${BRAND} te conecta por videoconsulta con endocrinos colegiados especializados, sin desplazamientos y con receta válida en las farmacias de ${dName}.`,
    "ciudad": `Con ${pop} habitantes, ${dName} (${m.prov}) dispone de sanidad privada, pero las unidades específicas de obesidad con prescripción de GLP‑1 siguen siendo escasas y con lista de espera. En ${BRAND} la valoración con endocrino colegiado es por videoconsulta, sin esperas, y la receta electrónica te sirve en cualquier farmacia de la ciudad.`,
    "gran-ciudad": `${dName} es una de las grandes ciudades de ${m.com}, con ${pop} habitantes. Hay oferta de clínicas, pero los precios de la medicina privada presencial y las listas de espera de ${health} hacen que cada vez más pacientes elijan la vía online: endocrino colegiado por videoconsulta, receta electrónica y seguimiento continuo desde la app.`,
  };

  const s1: Section = {
    h2: `Clínica de pérdida de peso en ${dName}: tu opción online`,
    blocks: [
      { type: "p", text: introBySize[size] },
      {
        type: "p",
        text: pick(
          [
            `El tratamiento con análogos del GLP‑1 (Wegovy, Mounjaro, Ozempic o Saxenda) requiere siempre receta médica en España. Ningún portal que ofrezca estos fármacos "sin receta" a vecinos de ${dName} es legal ni seguro.`,
            `En España, los medicamentos GLP‑1 como Wegovy, Mounjaro u Ozempic solo se dispensan con receta. Si ves anuncios de venta "sin receta" dirigidos a ${dName} o alrededores, desconfía: es ilegal y peligroso.`,
            `Wegovy, Mounjaro, Ozempic y Saxenda exigen prescripción médica. La vía correcta en ${dName} es una valoración médica real —presencial u online— nunca webs que prometen envío sin receta.`,
          ],
          m.name + m.prov,
        ),
      },
    ],
  };

  const s2: Section = {
    h2: `Cómo funciona la consulta online desde ${dName}`,
    blocks: [
      {
        type: "list",
        items: [
          `Reserva tu primera consulta gratis desde el móvil u ordenador, sin desplazarte.`,
          `Videoconsulta con un endocrino colegiado: historia clínica, IMC y objetivos.`,
          `Si procede, prescripción de GLP‑1 con receta electrónica válida en cualquier farmacia de ${m.prov}.`,
          `Seguimiento continuo por la app: dosis, efectos secundarios y ajustes sin salir de ${dName}.`,
        ],
      },
      {
        type: "p",
        text: pick(
          [
            `Todo el proceso cumple la normativa española de telemedicina y receta electrónica privada, complementando la atención de ${health}.`,
            `La receta electrónica privada es interoperable: la retiras en tu farmacia de siempre en ${dName} o en cualquier otra de España.`,
            `No necesitas volante ni derivación de ${health}: la vía privada online es directa y legal.`,
          ],
          m.prov + m.name,
        ),
      },
    ],
  };

  const s3: Section = {
    h2: `Precios del tratamiento GLP‑1 (orientativos en farmacias de ${m.prov})`,
    blocks: [
      {
        type: "table",
        caption: `Precios orientativos de farmacia en la provincia de ${m.prov}`,
        head: ["Medicamento", "Principio activo", "Pauta", "Precio/mes"],
        rows: [
          ["Wegovy", "semaglutida 2,4 mg", "Inyección semanal", "200–300 €"],
          ["Mounjaro", "tirzepatida", "Inyección semanal", "200–350 €"],
          ["Ozempic", "semaglutida", "Inyección semanal", "120–170 €"],
          ["Saxenda", "liraglutida", "Inyección diaria", "200–300 €"],
        ],
      },
      {
        type: "p",
        text: `El precio del medicamento es el mismo en las farmacias de ${dName} que en el resto de España (precio libre con pequeñas variaciones). Lo que cambia es el coste de la consulta: en ${BRAND} tu primera consulta médica es gratis, sin compromiso.`,
      },
    ],
  };

  const s4: Section = {
    h2: pick(
      [
        `¿Por qué elegir una clínica online viviendo en ${dName}?`,
        `Ventajas de la telemedicina para pacientes de ${dName}`,
        `Clínica online vs consulta presencial en ${m.prov}`,
      ],
      m.name + "s4",
    ),
    blocks: [
      {
        type: "list",
        items: [
          size === "pueblo" || size === "villa"
            ? `Sin desplazamientos: no dependes de la distancia entre ${dName} y la capital de provincia para ver a un especialista.`
            : `Sin salas de espera: la videoconsulta se adapta a tu horario, no al revés.`,
          `Endocrinos colegiados en España, especializados en obesidad y GLP‑1.`,
          `Receta electrónica válida en cualquier farmacia (también en la tuya de ${dName}).`,
          `Seguimiento semanal por app: adherencia, efectos secundarios y ajuste de dosis.`,
          `Primera consulta gratis: solo continúas si el médico confirma que el tratamiento es adecuado.`,
        ],
      },
    ],
  };

  return [s1, s2, s3, s4];
}

function buildFaqs(m: Muni, dName: string): Faq[] {
  return [
    {
      q: `¿Hay una clínica de pérdida de peso en ${dName}?`,
      a: `${dName} (${m.prov}) no necesita una clínica física especializada para acceder al tratamiento: con ${BRAND} la valoración con endocrino colegiado es por videoconsulta y la receta electrónica se dispensa en cualquier farmacia. La primera consulta es gratis.`,
    },
    {
      q: `¿Puedo conseguir Ozempic o Wegovy en ${dName}?`,
      a: `Sí, con receta médica. Cualquier farmacia de ${dName} o de la provincia de ${m.prov} puede dispensar u encargar Wegovy, Mounjaro, Ozempic o Saxenda con una receta electrónica válida, como la que emite el endocrino de ${BRAND} si el tratamiento es adecuado para ti.`,
    },
    {
      q: `¿Cuánto cuesta el tratamiento desde ${dName}?`,
      a: `El medicamento cuesta lo mismo que en el resto de España (Ozempic 120–170 €/mes; Wegovy o Saxenda 200–300 €/mes; Mounjaro 200–350 €/mes, orientativos). En ${BRAND}, la primera consulta médica es gratis.`,
    },
    {
      q: `¿La receta online es válida en las farmacias de ${m.prov}?`,
      a: `Sí. La receta electrónica privada emitida por un médico colegiado español es válida en todas las farmacias de España, incluidas las de ${dName} y el resto de la provincia de ${m.prov}.`,
    },
  ];
}

function buildMunicipioPost(m: Muni, index: number, slug: string): Post {
  const dName = displayName(m.name);
  const size = sizeOf(m.pop);
  return {
    slug,
    title: `Clínica pérdida de peso en ${dName}`,
    h1: `Clínica de pérdida de peso en ${dName}: GLP‑1 con médico online`,
    metaTitle: `Clínica Pérdida de Peso en ${dName} (${m.prov}): GLP‑1 Online`,
    metaDescription: `Clínica online de pérdida de peso para ${dName} (${m.prov}): endocrino colegiado, receta de Wegovy, Ozempic o Mounjaro y seguimiento por app. ¡Primera consulta gratis!`,
    excerpt: `Tratamiento médico para adelgazar en ${dName} sin desplazarte: valoración por videoconsulta, receta electrónica válida en tu farmacia y seguimiento clínico continuo.`,
    category: "Clínica",
    keyword: `clinica perdida de peso ${dName.toLowerCase()}`,
    readMins: 6 + (hash(slug) % 3),
    date: isoDate(index),
    updated: "2026-07-01",
    cover: COVERS[hash(slug) % COVERS.length],
    coverAlt: `Clínica online de pérdida de peso con GLP‑1 para ${dName} (${m.prov})`,
    place: dName,
    sections: buildSections(m, dName, size),
    faqs: buildFaqs(m, dName),
  };
}

/** Prefijo de slug del cluster (usado también por el sitemap segmentado). */
export const MUNICIPIO_SLUG_PREFIX = "clinica-perdida-de-peso-";

export function generateMunicipioPosts(existing: Set<string>): Post[] {
  const out: Post[] = [];
  const seen = new Set<string>(existing);
  const munis = parseMunicipios();
  let index = 0;
  for (const m of munis) {
    // Slug con el nombre natural: "Ejido (El)" → "el-ejido"
    const base = slugify(displayName(m.name));
    let slug = `${MUNICIPIO_SLUG_PREFIX}${base}`;
    if (seen.has(slug)) {
      // Municipios homónimos en distintas provincias → sufijo de provincia
      slug = `${MUNICIPIO_SLUG_PREFIX}${base}-${slugify(m.prov)}`;
      if (seen.has(slug)) continue; // duplicado exacto, se omite
    }
    seen.add(slug);
    out.push(buildMunicipioPost(m, index++, slug));
  }
  return out;
}
