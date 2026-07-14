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

/* ───────────────────────────────────────────────────────────
   Cluster de MÁXIMA INTENCIÓN: "clínica {fármaco} {municipio}"
   (clinica-ozempic-x, clinica-wegovy-x, clinica-mounjaro-x).
   Estas queries no estaban cubiertas por ningún otro cluster.
   ─────────────────────────────────────────────────────────── */

type ClinicDrug = {
  name: string;
  slug: string;
  active: string;
  dose: string;
  price: string;
  note: string;
};

const CLINIC_DRUGS: ClinicDrug[] = [
  {
    name: "Ozempic",
    slug: "ozempic",
    active: "semaglutida",
    dose: "inyección semanal (0,25 → 1 mg)",
    price: "120–170 €/mes",
    note: "Indicado para diabetes tipo 2; en obesidad los médicos valoran alternativas con indicación específica como Wegovy.",
  },
  {
    name: "Wegovy",
    slug: "wegovy",
    active: "semaglutida 2,4 mg",
    dose: "inyección semanal con escalado en 5 pasos",
    price: "200–300 €/mes",
    note: "Es el GLP‑1 con indicación específica para pérdida de peso: el candidato habitual si tu objetivo es adelgazar.",
  },
  {
    name: "Mounjaro",
    slug: "mounjaro",
    active: "tirzepatida",
    dose: "inyección semanal (2,5 → 15 mg)",
    price: "200–350 €/mes",
    note: "Doble agonista GIP/GLP‑1, el de mayor pérdida de peso media en ensayos clínicos (hasta ~20%).",
  },
];

function buildDrugMuniSections(d: ClinicDrug, m: Muni, dName: string, size: SizeKey): Section[] {
  const health = HEALTH[m.com] ?? "el servicio autonómico de salud";
  const pop = fmt(m.pop);
  const small = size === "pueblo" || size === "villa";

  const s1: Section = {
    h2: `Clínica ${d.name} en ${dName}: cómo empezar con valoración médica`,
    blocks: [
      {
        type: "p",
        text: small
          ? `Si buscas una clínica que trabaje con ${d.name} en ${dName} (${m.prov}, ${pop} habitantes), lo más probable es que no encuentres consulta especializada sin desplazarte: los municipios de este tamaño rara vez cuentan con unidad de obesidad. La solución práctica es la vía online de ${BRAND}: videoconsulta con endocrino colegiado, y si ${d.name} es adecuado para ti, receta electrónica válida en tu farmacia de ${dName} o de toda la provincia.`
          : `En ${dName} (${m.prov}, ${pop} habitantes) hay consultas privadas, pero pocas especializadas en tratamiento con ${d.name} (${d.active}) y las agendas van llenas. Con ${BRAND} no dependes de esperas: videoconsulta con endocrino colegiado y, si procede, receta electrónica de ${d.name} que puedes retirar en cualquier farmacia de la ciudad.`,
      },
      {
        type: "p",
        text: pick(
          [
            `${d.name} exige receta médica en España: ninguna web que lo ofrezca "sin receta" a vecinos de ${dName} es legal ni segura. ${d.note}`,
            `Recuerda: ${d.name} (${d.active}) solo se dispensa con prescripción. ${d.note} La valoración médica —online o presencial— es siempre el primer paso en ${dName}.`,
          ],
          d.slug + m.name + m.prov,
        ),
      },
    ],
  };

  const s2: Section = {
    h2: `${d.name} en ${dName}: pauta, precio y farmacias`,
    blocks: [
      {
        type: "table",
        caption: `Datos clave de ${d.name} para pacientes de ${dName} (${m.prov})`,
        head: ["Dato", "Detalle"],
        rows: [
          ["Principio activo", d.active],
          ["Pauta", d.dose],
          ["Precio orientativo", `${d.price} en farmacias de ${m.prov}`],
          ["Receta", "Obligatoria (electrónica privada válida en toda España)"],
          ["Primera consulta", `Gratis con ${BRAND}`],
        ],
      },
      {
        type: "p",
        text: `El precio de ${d.name} es prácticamente el mismo en las farmacias de ${dName} que en el resto de España. Si tu farmacia no lo tiene en stock, puede encargarlo y recibirlo normalmente en 24–48 h.`,
      },
    ],
  };

  const s3: Section = {
    h2: pick(
      [
        `Cómo conseguir ${d.name} desde ${dName} paso a paso`,
        `Empezar con ${d.name} viviendo en ${dName}: el proceso`,
      ],
      d.slug + m.name + "s3",
    ),
    blocks: [
      {
        type: "list",
        items: [
          `Reserva la primera consulta gratis online: sin desplazamientos ni volante de ${health}.`,
          `Videoconsulta con endocrino colegiado: historial, IMC, medicación actual y objetivos.`,
          `Si ${d.name} es adecuado (o una alternativa mejor para tu caso), receta electrónica al momento.`,
          `Retiras el medicamento en tu farmacia de ${dName} y sigues el escalado de dosis con la app.`,
        ],
      },
      {
        type: "p",
        text: small
          ? `Para un municipio como ${dName}, la telemedicina elimina la barrera real: la distancia. Todo el tratamiento —valoración, receta, seguimiento y ajustes— se hace sin salir del pueblo.`
          : `El seguimiento continuo por app (efectos secundarios, adherencia, ajuste de dosis) marca la diferencia frente a comprar el fármaco y usarlo sin control médico.`,
      },
    ],
  };

  return [s1, s2, s3];
}

function buildDrugMuniFaqs(d: ClinicDrug, m: Muni, dName: string): Faq[] {
  return [
    {
      q: `¿Hay alguna clínica de ${d.name} en ${dName}?`,
      a: `No necesitas una clínica física en ${dName}: la valoración para ${d.name} puede hacerse por videoconsulta con un endocrino colegiado de ${BRAND}, con receta electrónica válida en cualquier farmacia de ${m.prov}. La primera consulta es gratis.`,
    },
    {
      q: `¿Cuánto cuesta ${d.name} en ${dName}?`,
      a: `${d.name} (${d.active}) cuesta ${d.price} orientativos en farmacia, igual que en el resto de España. La consulta de valoración en ${BRAND} es gratuita.`,
    },
    {
      q: `¿Puedo conseguir ${d.name} sin receta en ${dName}?`,
      a: `No. ${d.name} exige prescripción médica en España. Cualquier web que ofrezca envío sin receta a ${dName} opera al margen de la ley y supone un riesgo real para tu salud.`,
    },
    {
      q: `¿La receta online vale en las farmacias de ${m.prov}?`,
      a: `Sí. La receta electrónica privada de un médico colegiado español es válida en todas las farmacias de España, incluidas las de ${dName} y la provincia de ${m.prov}.`,
    },
  ];
}

function buildDrugMuniPost(d: ClinicDrug, m: Muni, index: number, slug: string): Post {
  const dName = displayName(m.name);
  const size = sizeOf(m.pop);
  return {
    slug,
    title: `Clínica ${d.name} en ${dName}`,
    h1: `Clínica ${d.name} en ${dName}: valoración médica online y receta`,
    metaTitle: `Clínica ${d.name} en ${dName} (${m.prov}): Médico Online y Receta`,
    metaDescription: `¿Buscas clínica de ${d.name} en ${dName}? Endocrino colegiado por videoconsulta, receta electrónica válida en ${m.prov} y seguimiento por app. ¡Primera consulta gratis!`,
    excerpt: `Cómo empezar con ${d.name} (${d.active}) desde ${dName}: valoración con endocrino online, receta electrónica y seguimiento clínico sin desplazamientos.`,
    category: "Clínica",
    keyword: `clinica ${d.slug} ${dName.toLowerCase()}`,
    readMins: 5 + (hash(slug) % 3),
    date: isoDate(index),
    updated: "2026-07-01",
    cover: COVERS[hash(slug) % COVERS.length],
    coverAlt: `Clínica online de ${d.name} (${d.active}) para ${dName} (${m.prov})`,
    place: dName,
    sections: buildDrugMuniSections(d, m, dName, size),
    faqs: buildDrugMuniFaqs(d, m, dName),
  };
}

/** Prefijo de slug del cluster (usado también por el sitemap segmentado). */
export const MUNICIPIO_SLUG_PREFIX = "clinica-perdida-de-peso-";

/** Prefijos del cluster clínica×fármaco×municipio (para el sitemap). */
export const MUNICIPIO_DRUG_SLUG_PREFIXES = CLINIC_DRUGS.map(
  (d) => `clinica-${d.slug}-`,
);

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

    // Cluster de máxima intención: clínica {fármaco} {municipio}
    for (const d of CLINIC_DRUGS) {
      let dSlug = `clinica-${d.slug}-${base}`;
      if (seen.has(dSlug)) {
        dSlug = `clinica-${d.slug}-${base}-${slugify(m.prov)}`;
        if (seen.has(dSlug)) continue;
      }
      seen.add(dSlug);
      out.push(buildDrugMuniPost(d, m, index++, dSlug));
    }
  }
  return out;
}
