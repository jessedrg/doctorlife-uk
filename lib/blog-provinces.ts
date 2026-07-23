/* ───────────────────────────────────────────────────────────
   SEO guide generator per COUNTY (UK counties and council areas).
   Unlike the town pages, each county page includes REAL, UNIQUE
   DATA (main city, population, main towns, nation and indicative
   adult obesity prevalence), so every article is long, informative
   and never thin content.

   Goal: rank for broad purchase-intent searches
   ("buy ozempic in {county}", "wegovy {county}",
   "weight loss treatment {county}", "endocrinologist {county}")
   and act as a funnel to the DoctorLife medical consultation.
   ─────────────────────────────────────────────────────────── */

import type { Post, Section, Faq, Block } from "./blog";

const BRAND = "DoctorLife";

const PRICE_NOTE =
  "At DoctorLife your first medical consultation is free, with no obligation. All follow-up is managed from our in-app platform.";

const SERVICE_CTA =
  "At DoctorLife, a GMC-registered doctor assesses your case by video consultation and, if the treatment is right for you, prescribes it with a private prescription and follow-up from the app. The first consultation is free.";

/* ── deterministic utilities ── */
function hash(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return n;
}
function pick<T>(arr: T[], seed: string): T {
  return arr[hash(seed) % arr.length];
}
function tpl(s: string, vars: Record<string, string>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
function isoDate(offset: number): string {
  const d = new Date(Date.UTC(2025, 5, 1));
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}
function listToText(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
}

/* ── indicative GLP-1 prices (consistent with the rest of the blog) ── */
const DRUG_PRICING = [
  { name: "Wegovy", inn: "semaglutide 2.4 mg", freq: "Weekly injection", use: "Weight loss", price: "£150–£200/month" },
  { name: "Mounjaro", inn: "tirzepatide", freq: "Weekly injection", use: "Weight loss", price: "£120–£250/month" },
  { name: "Ozempic", inn: "semaglutide", freq: "Weekly injection", use: "Type 2 diabetes", price: "£130–£180/month" },
  { name: "Saxenda", inn: "liraglutide", freq: "Daily injection", use: "Weight loss", price: "£150–£220/month" },
];

const COVERS = [
  "/blog/wegovy-sevilla.png",
  "/blog/mounjaro-valencia.png",
  "/blog/ozempic-madrid.png",
  "/products/maren-lineup.png",
  "/hero/woman.png",
];

/* ═══════════════════════════════════════════════════════════
   REAL DATA BY NATION
   Indicative adult obesity prevalence (%), in line with the
   available UK health surveys. Always presented as approximate.
   ═══════════════════════════════════════════════════════════ */
type Nation = { obesity: number; health: string };
const NATIONS: Record<string, Nation> = {
  "England": { obesity: 26, health: "the NHS in England" },
  "Scotland": { obesity: 30, health: "NHS Scotland" },
  "Wales": { obesity: 25, health: "NHS Wales (GIG Cymru)" },
  "Northern Ireland": { obesity: 27, health: "Health and Social Care (HSC)" },
};

/* ═══════════════════════════════════════════════════════════
   REAL DATA FOR UK COUNTIES / COUNCIL AREAS
   pop = approximate population. capitalSlug is only filled in when
   the main city has its own town pages (to link without 404s).
   ═══════════════════════════════════════════════════════════ */
type Province = {
  name: string;
  slug: string;
  capital: string;
  capitalSlug?: string;
  community: string;
  pop: number;
  cities: string[];
};

const PROVINCES: Province[] = [
  { name: "Greater London", slug: "greater-london", capital: "London", capitalSlug: "london", community: "England", pop: 8900000, cities: ["Croydon", "Ealing", "Enfield", "Barnet", "Bromley", "Hillingdon"] },
  { name: "Greater Manchester", slug: "greater-manchester", capital: "Manchester", capitalSlug: "manchester", community: "England", pop: 2870000, cities: ["Salford", "Bolton", "Stockport", "Oldham", "Wigan", "Rochdale"] },
  { name: "West Midlands", slug: "west-midlands", capital: "Birmingham", capitalSlug: "birmingham", community: "England", pop: 2920000, cities: ["Coventry", "Wolverhampton", "Dudley", "Walsall", "Solihull"] },
  { name: "West Yorkshire", slug: "west-yorkshire", capital: "Leeds", capitalSlug: "leeds", community: "England", pop: 2320000, cities: ["Bradford", "Wakefield", "Huddersfield", "Halifax", "Dewsbury"] },
  { name: "Merseyside", slug: "merseyside", capital: "Liverpool", capitalSlug: "liverpool", community: "England", pop: 1420000, cities: ["Birkenhead", "St Helens", "Southport", "Bootle", "Wallasey"] },
  { name: "South Yorkshire", slug: "south-yorkshire", capital: "Sheffield", capitalSlug: "sheffield", community: "England", pop: 1400000, cities: ["Rotherham", "Doncaster", "Barnsley"] },
  { name: "Tyne and Wear", slug: "tyne-and-wear", capital: "Newcastle upon Tyne", capitalSlug: "newcastle-upon-tyne", community: "England", pop: 1130000, cities: ["Sunderland", "Gateshead", "South Shields", "Washington"] },
  { name: "Kent", slug: "kent", capital: "Maidstone", capitalSlug: "maidstone", community: "England", pop: 1850000, cities: ["Canterbury", "Gillingham", "Dartford", "Margate", "Ashford"] },
  { name: "Essex", slug: "essex", capital: "Chelmsford", capitalSlug: "chelmsford", community: "England", pop: 1830000, cities: ["Southend-on-Sea", "Colchester", "Basildon", "Harlow"] },
  { name: "Hampshire", slug: "hampshire", capital: "Southampton", capitalSlug: "southampton", community: "England", pop: 1850000, cities: ["Portsmouth", "Basingstoke", "Winchester", "Aldershot"] },
  { name: "Lancashire", slug: "lancashire", capital: "Preston", capitalSlug: "preston", community: "England", pop: 1500000, cities: ["Blackpool", "Blackburn", "Burnley", "Lancaster"] },
  { name: "Surrey", slug: "surrey", capital: "Guildford", capitalSlug: "guildford", community: "England", pop: 1200000, cities: ["Woking", "Epsom"] },
  { name: "Hertfordshire", slug: "hertfordshire", capital: "Hemel Hempstead", capitalSlug: "hemel-hempstead", community: "England", pop: 1190000, cities: ["Watford", "St Albans", "Stevenage"] },
  { name: "Nottinghamshire", slug: "nottinghamshire", capital: "Nottingham", capitalSlug: "nottingham", community: "England", pop: 1150000, cities: ["Mansfield", "Worksop", "Newark-on-Trent"] },
  { name: "Cheshire", slug: "cheshire", capital: "Warrington", capitalSlug: "warrington", community: "England", pop: 1080000, cities: ["Chester", "Crewe", "Macclesfield"] },
  { name: "Staffordshire", slug: "staffordshire", capital: "Stoke-on-Trent", capitalSlug: "stoke-on-trent", community: "England", pop: 1130000, cities: ["Stafford", "Burton upon Trent"] },
  { name: "Leicestershire", slug: "leicestershire", capital: "Leicester", capitalSlug: "leicester", community: "England", pop: 1050000, cities: ["Loughborough", "Hinckley", "Melton Mowbray"] },
  { name: "Derbyshire", slug: "derbyshire", capital: "Derby", capitalSlug: "derby", community: "England", pop: 1050000, cities: ["Chesterfield", "Swadlincote"] },
  { name: "Devon", slug: "devon", capital: "Plymouth", capitalSlug: "plymouth", community: "England", pop: 1200000, cities: ["Exeter", "Torquay"] },
  { name: "Berkshire", slug: "berkshire", capital: "Reading", capitalSlug: "reading", community: "England", pop: 910000, cities: ["Slough", "Bracknell", "Maidenhead", "Windsor"] },
  { name: "Norfolk", slug: "norfolk", capital: "Norwich", capitalSlug: "norwich", community: "England", pop: 910000, cities: ["Great Yarmouth", "King's Lynn"] },
  { name: "Suffolk", slug: "suffolk", capital: "Ipswich", capitalSlug: "ipswich", community: "England", pop: 760000, cities: ["Lowestoft", "Bury St Edmunds"] },
  { name: "Lincolnshire", slug: "lincolnshire", capital: "Lincoln", capitalSlug: "lincoln", community: "England", pop: 1090000, cities: ["Grimsby", "Scunthorpe", "Boston"] },
  { name: "Cambridgeshire", slug: "cambridgeshire", capital: "Cambridge", capitalSlug: "cambridge", community: "England", pop: 860000, cities: ["Peterborough"] },
  { name: "Oxfordshire", slug: "oxfordshire", capital: "Oxford", capitalSlug: "oxford", community: "England", pop: 730000, cities: ["Banbury", "Bicester"] },
  { name: "Buckinghamshire", slug: "buckinghamshire", capital: "Milton Keynes", capitalSlug: "milton-keynes", community: "England", pop: 810000, cities: ["High Wycombe", "Aylesbury"] },
  { name: "Bedfordshire", slug: "bedfordshire", capital: "Luton", capitalSlug: "luton", community: "England", pop: 690000, cities: ["Bedford"] },
  { name: "Northamptonshire", slug: "northamptonshire", capital: "Northampton", capitalSlug: "northampton", community: "England", pop: 750000, cities: ["Kettering", "Corby"] },
  { name: "Worcestershire", slug: "worcestershire", capital: "Worcester", capitalSlug: "worcester", community: "England", pop: 600000, cities: ["Redditch", "Kidderminster"] },
  { name: "Warwickshire", slug: "warwickshire", capital: "Warwick", capitalSlug: "warwick", community: "England", pop: 570000, cities: ["Nuneaton", "Rugby"] },
  { name: "Gloucestershire", slug: "gloucestershire", capital: "Gloucester", capitalSlug: "gloucester", community: "England", pop: 640000, cities: ["Cheltenham"] },
  { name: "Somerset", slug: "somerset", capital: "Taunton", capitalSlug: "taunton", community: "England", pop: 940000, cities: ["Bath", "Weston-super-Mare", "Yeovil"] },
  { name: "Dorset", slug: "dorset", capital: "Bournemouth", capitalSlug: "bournemouth", community: "England", pop: 780000, cities: ["Poole", "Weymouth"] },
  { name: "Cornwall", slug: "cornwall", capital: "Truro", capitalSlug: "truro", community: "England", pop: 570000, cities: ["St Austell", "Newquay"] },
  { name: "Wiltshire", slug: "wiltshire", capital: "Swindon", capitalSlug: "swindon", community: "England", pop: 720000, cities: ["Salisbury"] },
  { name: "East Sussex", slug: "east-sussex", capital: "Brighton and Hove", capitalSlug: "brighton-and-hove", community: "England", pop: 850000, cities: ["Eastbourne", "Hastings"] },
  { name: "West Sussex", slug: "west-sussex", capital: "Crawley", capitalSlug: "crawley", community: "England", pop: 860000, cities: ["Worthing", "Chichester"] },
  { name: "Cumbria", slug: "cumbria", capital: "Carlisle", capitalSlug: "carlisle", community: "England", pop: 500000, cities: ["Barrow-in-Furness", "Kendal"] },
  { name: "Shropshire", slug: "shropshire", capital: "Shrewsbury", capitalSlug: "shrewsbury", community: "England", pop: 500000, cities: ["Telford"] },
  { name: "North Yorkshire", slug: "north-yorkshire", capital: "York", capitalSlug: "york", community: "England", pop: 820000, cities: ["Harrogate", "Scarborough", "Middlesbrough"] },
  { name: "County Durham", slug: "county-durham", capital: "Durham", capitalSlug: "durham", community: "England", pop: 870000, cities: ["Darlington", "Hartlepool", "Stockton-on-Tees"] },
  { name: "Bristol", slug: "bristol", capital: "Bristol", capitalSlug: "bristol", community: "England", pop: 470000, cities: [] },
  { name: "Glasgow City", slug: "glasgow-city", capital: "Glasgow", capitalSlug: "glasgow", community: "Scotland", pop: 635000, cities: [] },
  { name: "City of Edinburgh", slug: "city-of-edinburgh", capital: "Edinburgh", capitalSlug: "edinburgh", community: "Scotland", pop: 530000, cities: [] },
  { name: "Fife", slug: "fife", capital: "Kirkcaldy", capitalSlug: "kirkcaldy", community: "Scotland", pop: 375000, cities: ["Dunfermline"] },
  { name: "Aberdeen City", slug: "aberdeen-city", capital: "Aberdeen", capitalSlug: "aberdeen", community: "Scotland", pop: 200000, cities: [] },
  { name: "Highland", slug: "highland", capital: "Inverness", capitalSlug: "inverness", community: "Scotland", pop: 235000, cities: [] },
  { name: "Cardiff", slug: "cardiff", capital: "Cardiff", capitalSlug: "cardiff", community: "Wales", pop: 362000, cities: [] },
  { name: "Swansea", slug: "swansea", capital: "Swansea", capitalSlug: "swansea", community: "Wales", pop: 246000, cities: [] },
  { name: "Rhondda Cynon Taf", slug: "rhondda-cynon-taf", capital: "Aberdare", community: "Wales", pop: 240000, cities: ["Pontypridd"] },
  { name: "Belfast", slug: "belfast", capital: "Belfast", capitalSlug: "belfast", community: "Northern Ireland", pop: 345000, cities: [] },
  { name: "County Antrim", slug: "county-antrim", capital: "Lisburn", capitalSlug: "lisburn", community: "Northern Ireland", pop: 620000, cities: ["Ballymena", "Antrim"] },
];

/* ── population formatting (UK English) ── */
function formatPop(n: number): string {
  if (n >= 1000000) {
    const m = (n / 1000000).toFixed(1);
    return `${m} million people`;
  }
  return `about ${Math.round(n / 1000)},000 people`;
}

/* ── reusable blocks ── */
function pricingTable(): Block {
  return {
    type: "table",
    caption: "Indicative GLP-1 treatment prices at UK pharmacies (2026)",
    head: ["Treatment", "Active ingredient", "Administration", "Indication", "Indicative price"],
    rows: DRUG_PRICING.map((d) => [d.name, d.inn, d.freq, d.use, d.price]),
  };
}

function glp1Links(): Block {
  return {
    type: "links",
    title: "Keep reading",
    items: [
      { label: "Buy GLP-1 online in the UK", href: "/blog/buy-glp1-online-uk" },
      { label: "Wegovy: UK price per dose", href: "/blog/wegovy-price-uk" },
      { label: "Ozempic vs Wegovy vs Mounjaro: which to choose", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
      { label: "Online endocrinologist: how it works", href: "/blog/online-endocrinologist" },
    ],
  };
}

function capitalLinks(p: Province): Block | null {
  if (!p.capitalSlug) return null;
  return {
    type: "links",
    title: `Local guides for ${p.capital}`,
    items: [
      { label: `Buy Wegovy in ${p.capital}`, href: `/blog/buy-wegovy-${p.capitalSlug}` },
      { label: `Buy Mounjaro in ${p.capital}`, href: `/blog/buy-mounjaro-${p.capitalSlug}` },
      { label: `Weight loss clinic in ${p.capital}`, href: `/blog/weight-loss-clinic-${p.capitalSlug}` },
      { label: `Endocrinologist in ${p.capital}`, href: `/blog/endocrinologist-${p.capitalSlug}` },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════
   TEXT POOLS (deterministic variants per slug → uniqueness)
   ═══════════════════════════════════════════════════════════ */
const INTRO_P1 = [
  "The county of {Name}, with around {pop} and {capital} as its main city, has growing demand for medical weight-loss treatment. More and more people are looking into how to start a GLP-1 medication (Wegovy, Mounjaro, Ozempic or Saxenda) legally, safely and with genuine medical follow-up.",
  "Around {pop} live in {Name}, spread across {capital} and a wide range of towns. Across the county, interest in GLP-1 weight-loss treatment has increased, and with it the need for reliable information about prices, prescriptions and how to start safely.",
  "With a population of around {pop} and {capital} as its main city, {Name} is one of the areas where searches for medical weight-loss treatment have grown the most. The key is doing it properly: with a professional assessment, a prescription and follow-up, not through unregulated channels.",
];
const INTRO_P2 = [
  "At {BRAND} we treat patients across {Name} through online consultation: you do not need to travel to {capital} or wait weeks for an appointment. A GMC-registered doctor assesses your case and, if appropriate, prescribes the treatment with a private prescription valid at any pharmacy.",
  "{BRAND} covers the whole of {Name} with a 100% online model. Whether you live in {capital} or anywhere else, you get the same medical assessment, a prescription if indicated and follow-up, with no queues and no travel.",
  "At {BRAND} we serve the whole of {Name} by video consultation. Wherever you live — in {capital} or a smaller town — the process is the same: assessment by a GMC-registered doctor, a private prescription if appropriate and continuous follow-up from the app.",
];
const INTRO_P3 = [
  "This guide brings together what you need to know in {Name}: which treatments exist, how much they cost, how to get a prescription, what happens with NHS waiting lists and how to get started step by step.",
  "Below you will find, applied to {Name}, the indicative prices of each medicine, the options for getting a prescription, the local health context and the full process to get started safely.",
  "In the next sections we set out, for {Name}, the prices of each GLP-1, how to get a prescription, the obesity picture in the area and the safest way to start treatment.",
];

const PRICE_P = [
  "GLP-1 prices in {Name} are the same as in the rest of the UK, because they depend on the medicine and the dose, not the town. What changes between options is the strength, the indication and how often it is administered.",
  "In {Name}, as across the UK, the price of these treatments is set by the pharmacy and the dose, not the city. It is worth comparing carefully, because the cost varies a lot from one medicine to another.",
  "The cost of GLP-1 treatments in {Name} does not depend on where you live, but on the medicine prescribed and the stage of treatment. This table summarises the available options.",
];
const PRICE_P2 = [
  "Keep in mind that the pharmacy price of the medicine is only one part: a serious treatment includes the medical consultation, the prescription, dose adjustments and monitoring of side effects. Without that, buying the pen on your own is risky and ineffective.",
  "Remember these figures are for the medicine only. The real value is in the medical support: the assessment, the dose escalation and the follow-up that stop you starting and stopping — which is what really drives up the cost (and ruins the results) of a poorly managed treatment.",
  "These amounts are for the medicine alone. A complete, safe treatment adds the consultation and medical follow-up, which are what ensure the money you invest translates into sustained results.",
];

const RECETA_P1 = [
  "In {Name} there are two routes to a prescription for Wegovy, Mounjaro or Ozempic: {health} and private medicine. On the NHS, these medicines are rarely funded for weight loss and access to a specialist can take weeks or months.",
  "To get a prescription in {Name} you can go through {health} or private healthcare. The problem with the NHS route is twofold: these treatments are not usually funded for weight loss and the specialist waiting list is often long.",
  "Getting a prescription in {Name} means going through {health} or a private consultation. The reality is that, on the NHS, GLP-1 medicines are almost never funded for weight loss and a specialist appointment can take a long time.",
];
const RECETA_P2 = [
  "The {BRAND} online consultation is the fast route: a doctor assesses your case quickly and, if the treatment is appropriate, issues a private prescription valid at any pharmacy in {Name}. No travel and no endless waiting.",
  "With {BRAND} you avoid that wait: the assessment is online, carried out by a GMC-registered doctor and, if appropriate, you receive a private prescription to collect at your pharmacy in {Name}. All without leaving home.",
  "That is why many patients in {Name} choose the {BRAND} online route: the same expertise, a GMC-registered doctor, no queues and a private prescription valid across the county.",
];

const OBESITY_INTRO = [
  "Overweight and obesity are a public-health issue across the UK, and {community} is no exception. According to the available health surveys, around {obesity}% of the adult population lives with obesity (an indicative figure that does not include overweight, which is considerably more common).",
  "Obesity affects a significant share of the population in {community}. Health surveys put adult obesity at around {obesity}% as an indicative figure; adding overweight, the number of people carrying excess weight is notably higher.",
  "In {community}, as across the country, excess weight is very common. Roughly around {obesity}% of adults live with obesity according to the health surveys, not counting overweight.",
];
const OBESITY_P2 = [
  "These figures explain why demand for effective treatment has grown so much in {Name}. Obesity is a chronic disease with a biological basis, not a matter of willpower, which is why the most effective approach combines habits, medical support and, when indicated, GLP-1 medication.",
  "Faced with these figures, more and more people in {Name} are looking for a genuine medical approach. The evidence is clear: obesity responds best to treatment that combines lifestyle change with professional follow-up and, if appropriate, medication.",
  "That context is why a medical approach to weight makes complete sense in {Name}. Obesity is a chronic, multifactorial condition; treating it with clinical judgement — not miracle products — is what makes the difference in the long term.",
];

const ENDO_P = [
  "The endocrinologist is the specialist in metabolism and therefore in weight management. In {Name}, accessing one on the NHS can take time; that is why video consultation has become a convenient alternative for assessing the case, adjusting the treatment and following up.",
  "To treat weight with GLP-1, the ideal is an assessment by a specialist. In {Name}, getting an NHS appointment with one is not always quick, and that is where an online consultation adds speed without giving up clinical rigour.",
  "A GMC-registered doctor is who should assess whether a GLP-1 is right for you. In {Name}, the online option gives access to that assessment without the usual NHS waiting times.",
];

const SAFETY_P = [
  "These medicines are safe and effective when used under medical supervision, starting at low doses that are increased gradually. The most common side effects are digestive (nausea, slow digestion), are usually mild and are managed by adjusting the regimen. Buying the pen without a prescription or follow-up is illegal and dangerous.",
  "Safety depends on follow-up. Correctly indicated and with a gradual dose escalation, GLP-1s have a good profile; the initial digestive effects usually settle. What is risky is self-medicating or buying through unauthorised channels, which in {Name} — as across the UK — is illegal.",
  "Used with clinical judgement, these treatments are safe: the key is adjusting the dose gradually and monitoring tolerance. The usual side effects are mild and temporary. What you should never do is buy them without a prescription or professional supervision.",
];

/* ═══════════════════════════════════════════════════════════
   MAIN BUILDER
   ═══════════════════════════════════════════════════════════ */
function buildProvincePost(p: Province, index: number): Post {
  const slug = `weight-loss-treatment-county-${p.slug}`;
  const nation = NATIONS[p.community] ?? { obesity: 26, health: "the NHS" };
  const popText = formatPop(p.pop);
  const allMunis = [p.capital, ...p.cities];
  const vars: Record<string, string> = {
    Name: p.name,
    capital: p.capital,
    community: p.community,
    health: nation.health,
    pop: popText,
    obesity: String(nation.obesity),
    BRAND,
  };

  const sections: Section[] = [
    {
      h2: tpl("GLP-1 weight-loss treatment in {Name}", vars),
      blocks: [
        { type: "p", text: tpl(pick(INTRO_P1, slug), vars) },
        { type: "p", text: tpl(pick(INTRO_P2, slug), vars) },
        { type: "p", text: tpl(pick(INTRO_P3, slug), vars) },
      ],
    },
    {
      h2: tpl("Wegovy, Mounjaro, Ozempic and Saxenda prices in {Name} (2026)", vars),
      blocks: [
        { type: "p", text: tpl(pick(PRICE_P, slug), vars) },
        pricingTable(),
        { type: "p", text: tpl(pick(PRICE_P2, slug), vars) },
        { type: "quote", text: PRICE_NOTE },
      ],
    },
    {
      h2: tpl("Coverage across the whole of {Name}", vars),
      blocks: [
        {
          type: "p",
          text: tpl(
            `We treat patients in {capital} and across every town in the county. Among the areas with the highest local demand are ${listToText(allMunis)}, but as it is an online consultation we reach anywhere in {Name}, including rural areas.`,
            vars,
          ),
        },
        {
          type: "list",
          items: allMunis.map((m) =>
            tpl(`{drug} with a prescription and medical follow-up in ${m}`, { drug: "GLP-1 treatment" }),
          ),
        },
        {
          type: "p",
          text: tpl(
            "It does not matter whether you live in the main city or a small town: the private prescription the doctor issues is valid at any pharmacy in {Name} and across the UK.",
            vars,
          ),
        },
      ],
    },
    {
      h2: tpl("Obesity and overweight in {community}", vars),
      blocks: [
        { type: "p", text: tpl(pick(OBESITY_INTRO, slug), vars) },
        {
          type: "table",
          caption: tpl("Background data for {Name}", vars),
          head: ["Data point", "Value"],
          rows: [
            ["Main city", p.capital],
            ["Nation", p.community],
            ["Approximate population", popText],
            ["Public health service", nation.health],
            ["Adult obesity (indicative)", `~${nation.obesity}%`],
            ["Main towns", listToText(allMunis)],
          ],
        },
        { type: "p", text: tpl(pick(OBESITY_P2, slug), vars) },
      ],
    },
    {
      h2: tpl("How to get a prescription for Wegovy, Mounjaro or Ozempic in {Name}?", vars),
      blocks: [
        { type: "p", text: tpl(pick(RECETA_P1, slug), vars) },
        { type: "p", text: tpl(pick(RECETA_P2, slug), vars) },
        {
          type: "quote",
          text: "Any website or individual offering these medicines 'without a prescription' in the UK is acting illegally and putting your health at risk. A prescription always requires a prior medical assessment.",
        },
      ],
    },
    {
      h2: tpl("Endocrinologist in {Name}: NHS vs online consultation", vars),
      blocks: [
        { type: "p", text: tpl(pick(ENDO_P, slug), vars) },
        {
          type: "list",
          items: [
            tpl("No waiting lists: an assessment in a short time, compared with the weeks on the NHS in {Name}.", vars),
            tpl("No travel to {capital} or to referral hospitals.", vars),
            "A private prescription valid at any pharmacy in the UK.",
            "Continuous follow-up by chat, not only during the appointment.",
            "The same rigour: GMC-registered doctors and personalised treatment.",
          ],
        },
      ],
    },
    {
      h2: "Which treatments the doctor can consider",
      blocks: [
        {
          type: "p",
          text: tpl(
            "If, after the assessment, drug treatment is indicated, the doctor chooses the most suitable option for you based on your goal, your tolerance and your budget. These are the main options available to patients in {Name}:",
            vars,
          ),
        },
        {
          type: "list",
          items: [
            "Wegovy (semaglutide 2.4 mg): a weekly injection specifically for weight loss, with extensive clinical experience.",
            "Mounjaro (tirzepatide): dual GIP/GLP-1 action, one weekly injection, with the greatest average weight loss in studies.",
            "Ozempic (semaglutide): a weekly injection licensed for type 2 diabetes; its use for weight loss is off-label and decided by the doctor.",
            "Saxenda (liraglutide): a daily injection for weight management, useful for certain profiles.",
          ],
        },
        glp1Links(),
      ],
    },
    {
      h2: tpl("How to start your treatment in {Name}, step by step", vars),
      blocks: [
        {
          type: "list",
          items: [
            tpl("Book your first consultation online for free from anywhere in {Name}.", vars),
            "Complete your medical history and goals in the app, with no travel.",
            "A GMC-registered doctor assesses your case and, if appropriate, sets the treatment and starting dose.",
            tpl("You receive the private prescription, valid at any pharmacy in {Name}.", vars),
            "You do the follow-up and dose adjustments from the app, with no new waits.",
          ],
        },
        { type: "p", text: tpl(SERVICE_CTA, vars) },
      ],
    },
    {
      h2: "Safety and medical support",
      blocks: [
        { type: "p", text: tpl(pick(SAFETY_P, slug), vars) },
        { type: "p", text: tpl("At {BRAND} we do not sell you a box and leave you on your own: we support you through every dose adjustment and with your habits, so the results last and you avoid the rebound effect.", vars) },
      ],
    },
  ];

  // Internal linking to the main-city guides (when they exist)
  const capLinks = capitalLinks(p);
  const nearbyBlocks: Block[] = [
    {
      type: "p",
      text: tpl(
        `If you are looking for more local information, we also have guides focused on ${p.capitalSlug ? p.capital : "the main towns"} and other areas. {Name} is part of {community}, where we provide full coverage.`,
        vars,
      ),
    },
  ];
  if (capLinks) nearbyBlocks.push(capLinks);
  nearbyBlocks.push(glp1Links());
  sections.push({
    h2: tpl("{Name} and nearby areas", vars),
    blocks: nearbyBlocks,
  });

  const faqs: Faq[] = [
    {
      q: tpl("Can you buy Ozempic or Wegovy without a prescription in {Name}?", vars),
      a: "No. Across the UK, including this county, these medicines require a prescription. Buying them without one is illegal and dangerous; there must always be a prior medical assessment.",
    },
    {
      q: tpl("How much does weight-loss treatment cost in {Name}?", vars),
      a: "The medicine at the pharmacy ranges from around £120 to £250/month depending on the medicine and dose. At DoctorLife the first medical consultation is free and follow-up is managed from the app.",
    },
    {
      q: tpl("Do you cover the whole of {Name}?", vars),
      a: tpl(`Yes. As it is an online consultation, we cover {capital} and the rest of the county (${listToText(p.cities.length ? p.cities : [p.capital])} and many more), including rural areas. The private prescription is valid at any pharmacy.`, vars),
    },
    {
      q: tpl("Do I have to travel to {capital}?", vars),
      a: "No. The whole assessment, the prescription and the follow-up are online. You only go to your usual pharmacy to collect the treatment.",
    },
    {
      q: tpl("How quick is it compared with the NHS waiting list in {Name}?", vars),
      a: tpl("Through the DoctorLife online route, the assessment is carried out quickly, compared with the weeks or months a specialist appointment can take on {health}.", vars),
    },
    {
      q: "Which GLP-1 medicine is best for me?",
      a: "There is no universal 'best': it depends on your goal, your history and your tolerance. That is why the choice must always be medical and individual, never based on what worked for someone else.",
    },
  ];

  const cover = COVERS[hash(slug) % COVERS.length];

  return {
    slug,
    title: tpl("Weight-loss treatment in {Name}", vars),
    h1: tpl("Losing weight with GLP-1 in {Name}: prices, prescription and how to start", vars),
    metaTitle: tpl("Weight-Loss Treatment in {Name}: Wegovy, Mounjaro & Ozempic | DoctorLife", vars),
    metaDescription: tpl(
      "How to start GLP-1 weight-loss treatment in {Name}: Wegovy, Mounjaro and Ozempic prices, how to get a prescription, an online endocrinologist and coverage in {capital} and across the county. First consultation free!",
      vars,
    ),
    excerpt: tpl(
      "A complete guide to medical weight-loss treatment (GLP-1) in {Name}: prices, prescriptions, an online endocrinologist and coverage in {capital} and beyond.",
      vars,
    ),
    category: "Weight loss",
    keyword: tpl("weight loss treatment {Name}", vars),
    readMins: 9 + (hash(slug) % 3),
    date: isoDate(index),
    updated: "2026-06-21",
    cover,
    coverAlt: tpl("Medical GLP-1 weight-loss treatment in {Name}", vars),
    place: p.name,
    sections,
    faqs,
  };
}

/* ── public API: returns the county guides ── */
export function buildProvincePosts(startIndex: number): Post[] {
  return PROVINCES.map((p, i) => buildProvincePost(p, startIndex + i));
}

/* ═══════════════════════════════════════════════════════════
   GEO HUB NETWORK BY INTENT (county + nation)

   Goal: rank for geolocated high-intent searches
   ("ozempic clinic", "buy wegovy", "glp1 endocrinologist") where the
   user does NOT type the town but Google filters by their area.
   Instead of one URL per town, we create HUBS by county and by nation
   that mention their towns naturally → they capture the relevance of
   dozens of places without thin content.
   ═══════════════════════════════════════════════════════════ */
type GeoUnit = {
  kind: "county" | "nation";
  name: string;
  slug: string;
  capital: string;
  capitalSlug?: string;
  community: string;
  pop: number;
  cities: string[];
  health: string;
  obesity: number;
};

function communitySlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* Aggregate the counties into their nations (data derived from PROVINCES
   to keep it consistent: summed population, main cities as representative
   towns). */
function buildCommunityUnits(): GeoUnit[] {
  const map = new Map<string, Province[]>();
  for (const p of PROVINCES) {
    const arr = map.get(p.community) ?? [];
    arr.push(p);
    map.set(p.community, arr);
  }
  const units: GeoUnit[] = [];
  for (const [community, provs] of map) {
    const nation = NATIONS[community] ?? { obesity: 26, health: "the NHS" };
    const sorted = [...provs].sort((a, b) => b.pop - a.pop);
    const main = sorted[0];
    const cities = sorted.slice(0, 6).map((p) => p.capital);
    units.push({
      kind: "nation",
      name: community,
      slug: communitySlug(community),
      capital: main.capital,
      capitalSlug: main.capitalSlug,
      community,
      pop: provs.reduce((n, p) => n + p.pop, 0),
      cities,
      health: nation.health,
      obesity: nation.obesity,
    });
  }
  return units;
}

function provinceUnit(p: Province): GeoUnit {
  const nation = NATIONS[p.community] ?? { obesity: 26, health: "the NHS" };
  return {
    kind: "county",
    name: p.name,
    slug: p.slug,
    capital: p.capital,
    capitalSlug: p.capitalSlug,
    community: p.community,
    pop: p.pop,
    cities: p.cities,
    health: nation.health,
    obesity: nation.obesity,
  };
}

/* Natural geographic label: "Kent" / "England". */
function geoLabel(g: GeoUnit): string {
  return g.name;
}
function geoShort(g: GeoUnit): string {
  return g.name;
}

/* ── Hub intents (high purchase/service intent) ── */
type HubIntent = {
  key: string; // slug prefix
  drug?: { name: string; inn: string };
  category: string;
  keyword: (g: GeoUnit) => string;
  h1: (g: GeoUnit) => string;
  metaTitle: (g: GeoUnit) => string;
  metaDescription: (g: GeoUnit) => string;
  title: (g: GeoUnit) => string;
  excerpt: (g: GeoUnit) => string;
  lead: string[]; // intent-specific intro pools
};

const HUB_INTENTS: HubIntent[] = [
  {
    key: "buy-ozempic",
    drug: { name: "Ozempic", inn: "semaglutide" },
    category: "Ozempic",
    keyword: (g) => `buy ozempic ${geoShort(g).toLowerCase()}`,
    h1: (g) => `Buy Ozempic in ${geoShort(g)}: online prescription and price`,
    metaTitle: (g) => `Buy Ozempic in ${geoShort(g)} | Online Medical Prescription`,
    metaDescription: (g) =>
      `How to buy Ozempic (semaglutide) in ${geoLabel(g)} legally: an assessment with a GMC-registered doctor online, a private prescription valid at your pharmacy and an indicative price. First consultation free!`,
    title: (g) => `Buy Ozempic in ${geoShort(g)}`,
    excerpt: (g) =>
      `A guide to buying Ozempic with a prescription in ${geoLabel(g)}: how to get the prescription online, the pharmacy price and coverage in ${g.capital} and across the area.`,
    lead: [
      "Buying Ozempic (semaglutide) in {geo} requires a prescription: it is a prescription-only medicine across the UK. The legal, safe way to get it is with a prior medical assessment, and at {BRAND} we do it online for the whole of {short}.",
      "In {geo} more and more people are looking into how to buy Ozempic to manage their weight or diabetes. The key is doing it properly: without a prescription it is illegal and risky. With {BRAND}, a GMC-registered doctor assesses your case by video consultation and, if appropriate, issues the private prescription.",
      "Ozempic is not sold without a prescription at any pharmacy in {geo}. To buy it safely you need a prescription; at {BRAND} the assessment is done online and the private prescription is valid at any pharmacy in {short}.",
    ],
  },
  {
    key: "buy-wegovy",
    drug: { name: "Wegovy", inn: "semaglutide 2.4 mg" },
    category: "Wegovy",
    keyword: (g) => `buy wegovy ${geoShort(g).toLowerCase()}`,
    h1: (g) => `Buy Wegovy in ${geoShort(g)}: online prescription and price`,
    metaTitle: (g) => `Buy Wegovy in ${geoShort(g)} | Online Medical Prescription`,
    metaDescription: (g) =>
      `Buy Wegovy (semaglutide 2.4 mg) in ${geoLabel(g)} with a prescription: an online medical assessment, a private prescription for your pharmacy and an indicative price. First consultation free with a GMC-registered doctor!`,
    title: (g) => `Buy Wegovy in ${geoShort(g)}`,
    excerpt: (g) =>
      `How to buy Wegovy with a prescription in ${geoLabel(g)}: online prescription, price per dose and medical coverage in ${g.capital} and beyond.`,
    lead: [
      "Wegovy (semaglutide 2.4 mg) is the GLP-1 specifically approved for weight loss, and in {geo} it can only be bought with a prescription. At {BRAND} a doctor assesses your case online and, if indicated, prescribes it with a private prescription valid across {short}.",
      "To buy Wegovy in {geo} you need a prescription: it is not dispensed without one. With {BRAND} you get an assessment by video consultation from any town in {short} and, if appropriate, the prescription and follow-up from the app.",
      "In {geo}, buying Wegovy legally always goes through a medical consultation. {BRAND} serves the whole of {short} online: an assessment by a GMC-registered doctor, a private prescription if the treatment is right and support through the dose escalation.",
    ],
  },
  {
    key: "buy-mounjaro",
    drug: { name: "Mounjaro", inn: "tirzepatide" },
    category: "Mounjaro",
    keyword: (g) => `buy mounjaro ${geoShort(g).toLowerCase()}`,
    h1: (g) => `Buy Mounjaro in ${geoShort(g)}: online prescription and price`,
    metaTitle: (g) => `Buy Mounjaro in ${geoShort(g)} | Online Prescription`,
    metaDescription: (g) =>
      `Buy Mounjaro (tirzepatide) in ${geoLabel(g)} with a prescription: an online assessment with a GMC-registered doctor, a private prescription for your pharmacy and an indicative price. First consultation free!`,
    title: (g) => `Buy Mounjaro in ${geoShort(g)}`,
    excerpt: (g) =>
      `How to buy Mounjaro with a prescription in ${geoLabel(g)}: online prescription, pharmacy price and coverage in ${g.capital} and across the area.`,
    lead: [
      "Mounjaro (tirzepatide) is one of the most powerful GLP-1 treatments and, like the rest, in {geo} it requires a prescription. At {BRAND} a GMC-registered doctor assesses your case online and, if suitable, prescribes it with a private prescription valid at any pharmacy in {short}.",
      "Buying Mounjaro in {geo} without a prescription is neither possible nor safe. The right route is a medical assessment: {BRAND} carries it out by video consultation for the whole of {short} and, if appropriate, issues the prescription and follows up the treatment.",
      "In {geo}, Mounjaro is only bought with a prescription. With {BRAND} you get the assessment online, the private prescription if the medicine fits your case and support with every dose adjustment, without travelling to {capital}.",
    ],
  },
  {
    key: "glp1-price",
    category: "Weight loss",
    keyword: (g) => `glp1 treatment price ${geoShort(g).toLowerCase()}`,
    h1: (g) => `GLP-1 treatment price in ${geoShort(g)}: Wegovy, Mounjaro and Ozempic`,
    metaTitle: (g) => `GLP-1 Price in ${geoShort(g)}: Wegovy, Mounjaro, Ozempic`,
    metaDescription: (g) =>
      `Indicative prices for GLP-1 treatments (Wegovy, Mounjaro, Ozempic, Saxenda) in ${geoLabel(g)}, how to get a prescription and what the medical follow-up includes. First consultation free!`,
    title: (g) => `GLP-1 treatment price in ${geoShort(g)}`,
    excerpt: (g) =>
      `How much a GLP-1 weight-loss treatment costs in ${geoLabel(g)}: prices per medicine and dose, an online prescription and coverage in ${g.capital} and beyond.`,
    lead: [
      "The price of GLP-1 treatments in {geo} is the same as in the rest of the UK: it depends on the medicine and the dose, not the town. What really makes the difference is the medical support the treatment includes.",
      "In {geo}, the cost of Wegovy, Mounjaro or Ozempic is set by the pharmacy according to the dose, not the city. Here are the indicative prices and what a serious treatment should include so the money is well spent.",
      "How much does it cost to lose weight with GLP-1 in {geo}? The price of the medicine is only one part; the assessment, the dose escalation and the follow-up are what stop you starting and stopping. At {BRAND} the first consultation is free.",
    ],
  },
  {
    key: "glp1-clinic",
    category: "Weight loss",
    keyword: (g) => `glp1 clinic ${geoShort(g).toLowerCase()}`,
    h1: (g) => `GLP-1 weight-loss clinic in ${geoShort(g)}: online assessment`,
    metaTitle: (g) => `GLP-1 Clinic in ${geoShort(g)} | Weight-Loss Treatment`,
    metaDescription: (g) =>
      `GLP-1 weight-loss clinic in ${geoLabel(g)}: an online assessment with a GMC-registered doctor, a private prescription and follow-up from the app. Coverage across ${geoLabel(g)}. First consultation free!`,
    title: (g) => `GLP-1 weight-loss clinic in ${geoShort(g)}`,
    excerpt: (g) =>
      `Medical GLP-1 weight-loss treatment in ${geoLabel(g)} with an online assessment, prescription and follow-up. Coverage in ${g.capital} and across the area.`,
    lead: [
      "Looking for a GLP-1 weight-loss clinic in {geo} no longer means travelling or waiting weeks. {BRAND} works like an online clinic serving the whole of {short}: an assessment by a GMC-registered doctor, a treatment plan and follow-up from the app.",
      "In {geo}, a GLP-1 weight-loss clinic should offer the essentials: a serious medical assessment, a prescription if appropriate and follow-up. {BRAND} does it 100% online for every town in {short}, with no waiting lists.",
      "{BRAND} is the online alternative to a weight-loss clinic in {geo}: a GMC-registered doctor assesses your case, sets the GLP-1 treatment if it is right and supports you through every adjustment, whether you live in {capital} or any town in {short}.",
    ],
  },
  {
    key: "online-endocrinologist",
    category: "Weight loss",
    keyword: (g) => `online endocrinologist ${geoShort(g).toLowerCase()}`,
    h1: (g) => `Online endocrinologist in ${geoShort(g)}: fast appointment and weight treatment`,
    metaTitle: (g) => `Online Endocrinologist in ${geoShort(g)} | Fast, No Waiting`,
    metaDescription: (g) =>
      `Online endocrinologist in ${geoLabel(g)} with no waiting lists: a video-consultation assessment, GLP-1 treatment if appropriate and a private prescription valid at your pharmacy. First consultation free!`,
    title: (g) => `Online endocrinologist in ${geoShort(g)}`,
    excerpt: (g) =>
      `How to get an online endocrinologist in ${geoLabel(g)} with no waiting: a video consultation, weight treatment and a prescription. Coverage in ${g.capital} and beyond.`,
    lead: [
      "Getting a specialist appointment in {geo} on the NHS can take weeks or months. With {BRAND} you get a GMC-registered doctor online from anywhere in {short}, with a quick assessment and a private prescription if the treatment is indicated.",
      "An online endocrinologist in {geo} saves you waiting lists and travel to {capital}. {BRAND} serves the whole of {short} by video consultation: a weight assessment, GLP-1 treatment if appropriate and continuous follow-up from the app.",
      "In {geo}, an online consultation solves the main problem: time. Against the waits on {health}, {BRAND} offers a fast assessment with a GMC-registered doctor and, if appropriate, a prescription and follow-up of the weight treatment.",
    ],
  },
];

/* Builds a hub (intent × geo unit) with unique content. */
function buildGeoHubPost(intent: HubIntent, g: GeoUnit, index: number): Post {
  const slug = `${intent.key}-${g.kind}-${g.slug}`;
  const vars: Record<string, string> = {
    BRAND,
    geo: geoLabel(g),
    short: geoShort(g),
    capital: g.capital,
    community: g.community,
    health: g.health,
    Name: g.name,
  };

  const sections: Section[] = [];

  // 1) Intent-specific intro
  sections.push({
    h2: tpl(`${intent.h1(g)}`.replace(/:.*$/, ""), vars),
    blocks: [
      { type: "p", text: tpl(pick(intent.lead, slug), vars) },
      {
        type: "p",
        text: tpl(
          "Whether you live in {capital} or any other town in {geo}, the process is the same: an online consultation with a GMC-registered doctor, with no travel and no waiting lists. We cover the whole area.",
          vars,
        ),
      },
    ],
  });

  // 2) Prices (shared real table)
  sections.push({
    h2: tpl("GLP-1 treatment prices in {short}", vars),
    blocks: [
      { type: "p", text: tpl(pick(PRICE_P, slug), vars) },
      pricingTable(),
      { type: "p", text: tpl(pick(PRICE_P2, slug + "b"), vars) },
      { type: "quote", text: PRICE_NOTE },
    ],
  });

  // 3) How to get the prescription / start
  sections.push({
    h2: tpl("How to start in {geo}, step by step", vars),
    blocks: [
      {
        type: "list",
        items: [
          tpl("Book your first consultation online for free from anywhere in {geo}.", vars),
          "Complete your medical history and goals in the app, with no travel.",
          "A GMC-registered doctor assesses your case and, if appropriate, sets the treatment and starting dose.",
          tpl("You receive the private prescription, valid at any pharmacy in {short}.", vars),
          "You do the follow-up and dose adjustments from the app, with no new waits.",
        ],
      },
      { type: "p", text: tpl(SERVICE_CTA, vars) },
    ],
  });

  // 4) Town coverage (captures local relevance without a URL per town)
  const cityList = listToText(g.cities);
  sections.push({
    h2: tpl("Coverage in {geo}", vars),
    blocks: [
      {
        type: "p",
        text: tpl(
          `We treat patients across the whole of ${geoLabel(g)}: ${g.capital}${g.cities.length ? `, ${cityList}` : ""} and the rest of the towns, including rural areas. As it is an online consultation, it does not matter how far you are from a large hospital: the assessment, the prescription and the follow-up are equally accessible.`,
          vars,
        ),
      },
      {
        type: "p",
        text: tpl(
          "{geo} is part of {community}, where the indicative adult obesity prevalence is around {obesity}%. Against the waits in the public system ({health}), the online route lets you start quickly when the treatment is indicated.",
          { ...vars, obesity: String(g.obesity) },
        ),
      },
      glp1Links(),
    ],
  });

  // 5) Safety
  sections.push({
    h2: "Safety and medical support",
    blocks: [
      { type: "p", text: tpl(pick(SAFETY_P, slug + "s"), vars) },
      {
        type: "p",
        text: "These medicines are not for everyone: there are contraindications (pregnancy, a history of pancreatitis, certain thyroid problems) that the doctor always reviews before prescribing. That is why a professional assessment is essential.",
      },
    ],
  });

  const faqs: Faq[] = [
    {
      q: tpl(`Can you buy ${intent.drug?.name ?? "a GLP-1"} without a prescription in {short}?`, vars),
      a: `No. Across the UK, including ${geoLabel(g)}, these medicines require a prescription. Buying them without one is illegal and dangerous; there must always be a prior medical assessment.`,
    },
    {
      q: tpl("Do you cover the whole of {geo}?", vars),
      a: tpl(
        `Yes. As it is an online consultation, we cover ${g.capital} and the rest of the towns (${cityList || g.capital} and many more), including rural areas. The private prescription is valid at any pharmacy.`,
        vars,
      ),
    },
    {
      q: tpl("How quick is it compared with the NHS waiting list in {short}?", vars),
      a: tpl(
        "Through the {BRAND} online route, the assessment is carried out quickly, compared with the weeks or months a specialist appointment can take on {health}.",
        vars,
      ),
    },
    {
      q: tpl("Do I have to travel to {capital}?", vars),
      a: "No. The whole assessment, the prescription and the follow-up are online. You only go to your usual pharmacy to collect the treatment.",
    },
    {
      q: "Which GLP-1 medicine is best for me?",
      a: "There is no universal 'best': it depends on your goal, your history and your tolerance. That is why the choice must always be medical and individual, never based on what worked for someone else.",
    },
  ];

  return {
    slug,
    title: intent.title(g),
    h1: intent.h1(g),
    metaTitle: intent.metaTitle(g),
    metaDescription: intent.metaDescription(g),
    excerpt: intent.excerpt(g),
    category: intent.category,
    keyword: intent.keyword(g),
    readMins: 8 + (hash(slug) % 4),
    date: isoDate(index),
    updated: "2026-06-22",
    cover: COVERS[hash(slug) % COVERS.length],
    coverAlt: `${intent.title(g)} — medical GLP-1 treatment with ${BRAND}`,
    place: geoLabel(g),
    sections,
    faqs,
  };
}

/* ── public API: full geo hub network (county + nation) ── */
export function buildGeoHubPosts(startIndex: number): Post[] {
  const units: GeoUnit[] = [
    ...PROVINCES.map(provinceUnit),
    ...buildCommunityUnits(),
  ];
  const out: Post[] = [];
  let i = startIndex;
  for (const intent of HUB_INTENTS) {
    for (const g of units) {
      out.push(buildGeoHubPost(intent, g, i++));
    }
  }
  return out;
}
