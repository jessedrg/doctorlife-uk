/* ───────────────────────────────────────────────────────────
   Town-level CLINIC page generator (UK towns and cities).

   Each page uses REAL, UNIQUE data for the town (population, size,
   county, nation and NHS body) to avoid thin content: the copy
   changes depending on whether it is a small town, a mid-sized town
   or a large city.

   Goal: rank for "weight loss clinic {town}", "ozempic clinic {town}",
   "mounjaro {town}"… and funnel to the DoctorLife online consultation
   (first consultation free).
   ─────────────────────────────────────────────────────────── */

import type { Post, Section, Faq } from "./blog";
import rawMunicipios from "./data/municipios-raw";

const BRAND = "DoctorLife";

/* ── deterministic helpers ── */
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
  return n.toLocaleString("en-GB");
}

/* Names like "Town (The)" → "The Town" for natural reading */
function displayName(name: string): string {
  const m = name.match(/^(.+) \((.+)\)$/);
  return m ? `${m[2]} ${m[1]}` : name;
}

/* ── NHS body by nation (unique data point per page) ── */
const HEALTH: Record<string, string> = {
  "England": "the NHS in England",
  "Scotland": "NHS Scotland",
  "Wales": "NHS Wales (GIG Cymru)",
  "Northern Ireland": "Health and Social Care (HSC)",
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

/* Size bucket → completely different copy per town type */
type SizeKey = "village" | "town" | "large-town" | "city" | "large-city";
function sizeOf(pop: number): SizeKey {
  if (pop >= 250000) return "large-city";
  if (pop >= 100000) return "city";
  if (pop >= 40000) return "large-town";
  if (pop >= 15000) return "town";
  return "village";
}

function buildSections(m: Muni, dName: string, size: SizeKey): Section[] {
  const health = HEALTH[m.com] ?? "the NHS";
  const pop = fmt(m.pop);

  const introBySize: Record<SizeKey, string> = {
    "village": `${dName} (${m.prov}) has around ${pop} residents and, like most smaller towns in ${m.com}, does not have a dedicated weight-loss clinic: the nearest specialist obesity service is often miles away and NHS waiting lists are long. That is no longer a barrier: with ${BRAND} you get a GMC-registered doctor by video consultation from home, with a private prescription valid at any UK pharmacy.`,
    "town": `In ${dName} (around ${pop} residents, ${m.prov}) getting seen by a specialist weight-management service usually means travelling and waiting months on ${health}. The alternative: an online consultation with a GMC-registered doctor, a private prescription that works at your local ${dName} pharmacy, and follow-up from your phone.`,
    "large-town": `${dName} is a town of around ${pop} people in ${m.prov}. Although there is some private healthcare locally, very few clinics specialise in medical weight loss with GLP-1 treatment. ${BRAND} connects you by video consultation with GMC-registered doctors who specialise in this area, with no travel and a prescription valid at pharmacies in ${dName}.`,
    "city": `With around ${pop} residents, ${dName} (${m.prov}) has private healthcare, but dedicated obesity units that prescribe GLP-1 medication are still scarce and have waiting lists. At ${BRAND} the assessment with a GMC-registered doctor is by video consultation, with no waiting, and the private prescription is valid at any pharmacy in the city.`,
    "large-city": `${dName} is one of the major cities in ${m.com}, with around ${pop} residents. There are clinics available, but the cost of in-person private medicine and the ${health} waiting lists mean more and more patients are choosing the online route: a GMC-registered doctor by video consultation, a private prescription and continuous follow-up from the app.`,
  };

  const s1: Section = {
    h2: `Weight loss clinic in ${dName}: your online option`,
    blocks: [
      { type: "p", text: introBySize[size] },
      {
        type: "p",
        text: pick(
          [
            `Treatment with GLP-1 medicines (Wegovy, Mounjaro, Ozempic or Saxenda) always requires a prescription in the UK. Any website offering these medicines "without a prescription" to residents of ${dName} is neither legal nor safe.`,
            `In the UK, GLP-1 medicines such as Wegovy, Mounjaro or Ozempic are prescription-only. If you see adverts selling them "without a prescription" aimed at ${dName} or nearby, be wary: it is illegal and dangerous.`,
            `Wegovy, Mounjaro, Ozempic and Saxenda all require a prescription. The right route in ${dName} is a genuine medical assessment — in person or online — never websites that promise delivery without a prescription.`,
          ],
          m.name + m.prov,
        ),
      },
    ],
  };

  const s2: Section = {
    h2: `How the online consultation works from ${dName}`,
    blocks: [
      {
        type: "list",
        items: [
          `Book your first consultation free from your phone or computer, with no travel.`,
          `Video consultation with a GMC-registered doctor: medical history, BMI and goals.`,
          `If appropriate, a GLP-1 prescription with a private prescription valid at any pharmacy in ${m.prov}.`,
          `Continuous follow-up in the app: dosing, side effects and adjustments without leaving ${dName}.`,
        ],
      },
      {
        type: "p",
        text: pick(
          [
            `The whole process follows UK telemedicine and private prescribing standards, complementing the care you receive from ${health}.`,
            `A private prescription is accepted UK-wide: you collect it at your usual pharmacy in ${dName} or any other in the UK.`,
            `You do not need a GP referral from ${health}: the private online route is direct and legal.`,
          ],
          m.prov + m.name,
        ),
      },
    ],
  };

  const s3: Section = {
    h2: `GLP-1 treatment prices (typical at UK pharmacies)`,
    blocks: [
      {
        type: "table",
        caption: `Typical private prices at pharmacies serving ${m.prov}`,
        head: ["Medicine", "Active ingredient", "Regimen", "Price/month"],
        rows: [
          ["Wegovy", "semaglutide 2.4 mg", "Weekly injection", "£150–£200"],
          ["Mounjaro", "tirzepatide", "Weekly injection", "£120–£250"],
          ["Ozempic", "semaglutide", "Weekly injection", "£130–£180"],
          ["Saxenda", "liraglutide", "Daily injection", "£150–£220"],
        ],
      },
      {
        type: "p",
        text: `The price of the medicine is broadly the same at pharmacies in ${dName} as in the rest of the UK (free pricing with small variations). What changes is the cost of the consultation: at ${BRAND} your first medical consultation is free, with no obligation.`,
      },
    ],
  };

  const s4: Section = {
    h2: pick(
      [
        `Why choose an online clinic when you live in ${dName}?`,
        `Benefits of telemedicine for patients in ${dName}`,
        `Online clinic vs in-person consultation in ${m.prov}`,
      ],
      m.name + "s4",
    ),
    blocks: [
      {
        type: "list",
        items: [
          size === "village" || size === "town"
            ? `No travel: you are not limited by the distance between ${dName} and the nearest city to see a specialist.`
            : `No waiting rooms: the video consultation fits your schedule, not the other way around.`,
          `GMC-registered doctors in the UK, specialising in obesity and GLP-1 treatment.`,
          `Private prescription valid at any pharmacy (including yours in ${dName}).`,
          `Weekly follow-up in the app: adherence, side effects and dose adjustment.`,
          `First consultation free: you only continue if the doctor confirms the treatment is right for you.`,
        ],
      },
    ],
  };

  return [s1, s2, s3, s4];
}

function buildFaqs(m: Muni, dName: string): Faq[] {
  return [
    {
      q: `Is there a weight loss clinic in ${dName}?`,
      a: `${dName} (${m.prov}) does not need a physical specialist clinic to access treatment: with ${BRAND} the assessment with a GMC-registered doctor is by video consultation and the private prescription can be dispensed at any pharmacy. The first consultation is free.`,
    },
    {
      q: `Can I get Ozempic or Wegovy in ${dName}?`,
      a: `Yes, with a prescription. Any pharmacy in ${dName} or across ${m.prov} can dispense or order Wegovy, Mounjaro, Ozempic or Saxenda with a valid prescription, such as the one a ${BRAND} doctor issues if the treatment is right for you.`,
    },
    {
      q: `How much does treatment cost from ${dName}?`,
      a: `The medicine costs the same as in the rest of the UK (Ozempic around £130–£180/month; Wegovy or Saxenda £150–£220/month; Mounjaro £120–£250/month, indicative). At ${BRAND}, the first medical consultation is free.`,
    },
    {
      q: `Is the online prescription valid at pharmacies in ${m.prov}?`,
      a: `Yes. A private prescription issued by a GMC-registered UK doctor is valid at every pharmacy in the UK, including those in ${dName} and the rest of ${m.prov}.`,
    },
  ];
}

function buildMunicipioPost(m: Muni, index: number, slug: string): Post {
  const dName = displayName(m.name);
  const size = sizeOf(m.pop);
  return {
    slug,
    title: `Weight loss clinic in ${dName}`,
    h1: `Weight loss clinic in ${dName}: GLP-1 with an online doctor`,
    metaTitle: `Weight Loss Clinic in ${dName} (${m.prov}): GLP-1 Online`,
    metaDescription: `Online weight loss clinic for ${dName} (${m.prov}): GMC-registered doctor, prescriptions for Wegovy, Ozempic or Mounjaro and app-based follow-up. First consultation free!`,
    excerpt: `Medical weight-loss treatment in ${dName} without travelling: video-consultation assessment, a private prescription valid at your pharmacy and continuous clinical follow-up.`,
    category: "Clinic",
    keyword: `weight loss clinic ${dName.toLowerCase()}`,
    readMins: 6 + (hash(slug) % 3),
    date: isoDate(index),
    updated: "2026-07-01",
    cover: COVERS[hash(slug) % COVERS.length],
    coverAlt: `Online weight-loss clinic with GLP-1 for ${dName} (${m.prov})`,
    place: dName,
    sections: buildSections(m, dName, size),
    faqs: buildFaqs(m, dName),
  };
}

/* ───────────────────────────────────────────────────────────
   HIGH-INTENT cluster: "clinic {drug} {town}"
   (clinic-ozempic-x, clinic-wegovy-x, clinic-mounjaro-x).
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
    active: "semaglutide",
    dose: "weekly injection (0.25 → 1 mg)",
    price: "£130–£180/month",
    note: "Licensed for type 2 diabetes; for weight loss, doctors usually consider alternatives with a specific licence such as Wegovy.",
  },
  {
    name: "Wegovy",
    slug: "wegovy",
    active: "semaglutide 2.4 mg",
    dose: "weekly injection with a 5-step dose escalation",
    price: "£150–£200/month",
    note: "It is the GLP-1 specifically licensed for weight loss: the usual candidate if your goal is losing weight.",
  },
  {
    name: "Mounjaro",
    slug: "mounjaro",
    active: "tirzepatide",
    dose: "weekly injection (2.5 → 15 mg)",
    price: "£120–£250/month",
    note: "A dual GIP/GLP-1 agonist, with the greatest average weight loss in clinical trials (up to ~20%).",
  },
];

function buildDrugMuniSections(d: ClinicDrug, m: Muni, dName: string, size: SizeKey): Section[] {
  const health = HEALTH[m.com] ?? "the NHS";
  const pop = fmt(m.pop);
  const small = size === "village" || size === "town";

  const s1: Section = {
    h2: `${d.name} clinic in ${dName}: how to start with a medical assessment`,
    blocks: [
      {
        type: "p",
        text: small
          ? `If you are looking for a clinic that works with ${d.name} in ${dName} (${m.prov}, around ${pop} residents), you probably will not find a specialist service without travelling: towns this size rarely have an obesity unit. The practical solution is the online route with ${BRAND}: a video consultation with a GMC-registered doctor and, if ${d.name} is right for you, a private prescription valid at your pharmacy in ${dName} or anywhere in the county.`
          : `In ${dName} (${m.prov}, around ${pop} residents) there is some private healthcare, but few clinics specialise in treatment with ${d.name} (${d.active}) and diaries fill up fast. With ${BRAND} you do not depend on waiting lists: a video consultation with a GMC-registered doctor and, if appropriate, a private ${d.name} prescription you can collect at any pharmacy in the city.`,
      },
      {
        type: "p",
        text: pick(
          [
            `${d.name} requires a prescription in the UK: no website offering it "without a prescription" to residents of ${dName} is legal or safe. ${d.note}`,
            `Remember: ${d.name} (${d.active}) is only dispensed with a prescription. ${d.note} A medical assessment — online or in person — is always the first step in ${dName}.`,
          ],
          d.slug + m.name + m.prov,
        ),
      },
    ],
  };

  const s2: Section = {
    h2: `${d.name} in ${dName}: regimen, price and pharmacies`,
    blocks: [
      {
        type: "table",
        caption: `Key facts about ${d.name} for patients in ${dName} (${m.prov})`,
        head: ["Detail", "Information"],
        rows: [
          ["Active ingredient", d.active],
          ["Regimen", d.dose],
          ["Indicative price", `${d.price} at pharmacies in ${m.prov}`],
          ["Prescription", "Required (private prescription valid UK-wide)"],
          ["First consultation", `Free with ${BRAND}`],
        ],
      },
      {
        type: "p",
        text: `The price of ${d.name} is broadly the same at pharmacies in ${dName} as in the rest of the UK. If your pharmacy does not have it in stock, they can usually order it in and receive it within 24–48 hours.`,
      },
    ],
  };

  const s3: Section = {
    h2: pick(
      [
        `How to get ${d.name} from ${dName}, step by step`,
        `Starting ${d.name} while living in ${dName}: the process`,
      ],
      d.slug + m.name + "s3",
    ),
    blocks: [
      {
        type: "list",
        items: [
          `Book the first consultation free online: no travel and no GP referral from ${health}.`,
          `Video consultation with a GMC-registered doctor: history, BMI, current medication and goals.`,
          `If ${d.name} is right (or a better alternative for your case), a private prescription right away.`,
          `Collect the medicine at your pharmacy in ${dName} and follow the dose escalation with the app.`,
        ],
      },
      {
        type: "p",
        text: small
          ? `For a town like ${dName}, telemedicine removes the real barrier: distance. The whole treatment — assessment, prescription, follow-up and adjustments — is done without leaving town.`
          : `Continuous follow-up in the app (side effects, adherence, dose adjustment) is what makes the difference compared with buying the medicine and using it without medical supervision.`,
      },
    ],
  };

  return [s1, s2, s3];
}

function buildDrugMuniFaqs(d: ClinicDrug, m: Muni, dName: string): Faq[] {
  return [
    {
      q: `Is there a ${d.name} clinic in ${dName}?`,
      a: `You do not need a physical clinic in ${dName}: the assessment for ${d.name} can be done by video consultation with a GMC-registered ${BRAND} doctor, with a private prescription valid at any pharmacy in ${m.prov}. The first consultation is free.`,
    },
    {
      q: `How much does ${d.name} cost in ${dName}?`,
      a: `${d.name} (${d.active}) costs around ${d.price} at the pharmacy, the same as in the rest of the UK. The assessment consultation at ${BRAND} is free.`,
    },
    {
      q: `Can I get ${d.name} without a prescription in ${dName}?`,
      a: `No. ${d.name} requires a prescription in the UK. Any website offering delivery without a prescription to ${dName} is operating outside the law and is a real risk to your health.`,
    },
    {
      q: `Is the online prescription valid at pharmacies in ${m.prov}?`,
      a: `Yes. A private prescription from a GMC-registered UK doctor is valid at every pharmacy in the UK, including those in ${dName} and the county of ${m.prov}.`,
    },
  ];
}

function buildDrugMuniPost(d: ClinicDrug, m: Muni, index: number, slug: string): Post {
  const dName = displayName(m.name);
  const size = sizeOf(m.pop);
  return {
    slug,
    title: `${d.name} clinic in ${dName}`,
    h1: `${d.name} clinic in ${dName}: online medical assessment and prescription`,
    metaTitle: `${d.name} Clinic in ${dName} (${m.prov}): Online Doctor & Prescription`,
    metaDescription: `Looking for a ${d.name} clinic in ${dName}? GMC-registered doctor by video consultation, a private prescription valid across ${m.prov} and app-based follow-up. First consultation free!`,
    excerpt: `How to start ${d.name} (${d.active}) from ${dName}: assessment with an online doctor, a private prescription and clinical follow-up with no travel.`,
    category: "Clinic",
    keyword: `${d.slug} clinic ${dName.toLowerCase()}`,
    readMins: 5 + (hash(slug) % 3),
    date: isoDate(index),
    updated: "2026-07-01",
    cover: COVERS[hash(slug) % COVERS.length],
    coverAlt: `Online ${d.name} clinic (${d.active}) for ${dName} (${m.prov})`,
    place: dName,
    sections: buildDrugMuniSections(d, m, dName, size),
    faqs: buildDrugMuniFaqs(d, m, dName),
  };
}

/** Slug prefix of the town cluster (also used by the segmented sitemap). */
export const MUNICIPIO_SLUG_PREFIX = "weight-loss-clinic-";

/** Prefixes of the clinic×drug×town cluster (for the sitemap). */
export const MUNICIPIO_DRUG_SLUG_PREFIXES = CLINIC_DRUGS.map(
  (d) => `${d.slug}-clinic-`,
);

export function generateMunicipioPosts(existing: Set<string>): Post[] {
  const out: Post[] = [];
  const seen = new Set<string>(existing);
  const munis = parseMunicipios();
  let index = 0;
  for (const m of munis) {
    // Slug from the natural name: "Town (The)" → "the-town"
    const base = slugify(displayName(m.name));
    let slug = `${MUNICIPIO_SLUG_PREFIX}${base}`;
    if (seen.has(slug)) {
      // Towns with the same name in different counties → county suffix
      slug = `${MUNICIPIO_SLUG_PREFIX}${base}-${slugify(m.prov)}`;
      if (seen.has(slug)) continue; // exact duplicate, skip
    }
    seen.add(slug);
    out.push(buildMunicipioPost(m, index++, slug));

    // High-intent cluster: clinic {drug} {town}
    for (const d of CLINIC_DRUGS) {
      let dSlug = `${d.slug}-clinic-${base}`;
      if (seen.has(dSlug)) {
        dSlug = `${d.slug}-clinic-${base}-${slugify(m.prov)}`;
        if (seen.has(dSlug)) continue;
      }
      seen.add(dSlug);
      out.push(buildDrugMuniPost(d, m, index++, dSlug));
    }
  }
  return out;
}
