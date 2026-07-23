/* ───────────────────────────────────────────────────────────
   Internal geographic linking for the DoctorLife blog (UK).

   SEO goal: remove orphan pages and build dense silos (town →
   treatment → national pillars) so Googlebot discovers and indexes
   the town-level pages. Each page links to:
     1. The same town with other GLP-1 treatments (local topical silo)
     2. Nearby / popular town clinic pages (geographic silo)
     3. National guides / comparisons (links up to the pillars)
   Pillar pages link down to the largest cities to spread authority
   and speed up indexing of the long tail.
   ─────────────────────────────────────────────────────────── */

import { posts } from "./blog";
import {
  MUNICIPIO_SLUG_PREFIX,
  MUNICIPIO_DRUG_SLUG_PREFIXES,
} from "./blog-municipios";

export type LinkItem = { label: string; href: string };
export type LinkGroup = { title: string; intro?: string; items: LinkItem[] };

const SLUG_SET = new Set(posts.map((p) => p.slug));
const PLACE_BY_SLUG = new Map(posts.map((p) => [p.slug, p.place ?? ""]));

/* Drug clinic prefixes → drug name */
const DRUG_BY_PREFIX: Record<string, string> = {
  "ozempic-clinic-": "Ozempic",
  "wegovy-clinic-": "Wegovy",
  "mounjaro-clinic-": "Mounjaro",
};

/* National pillar guides (filtered against SLUG_SET so we never link to 404s) */
const PILLARS: LinkItem[] = [
  { label: "Buy Wegovy in the UK", href: "/blog/buy-wegovy-uk" },
  { label: "Buy Mounjaro in the UK", href: "/blog/buy-mounjaro-uk" },
  { label: "Buy Ozempic in the UK", href: "/blog/buy-ozempic-uk" },
  { label: "Ozempic vs Wegovy vs Mounjaro", href: "/blog/ozempic-vs-wegovy-vs-mounjaro" },
  { label: "Wegovy prescription online", href: "/blog/wegovy-prescription-online" },
];
function pillarLinks(): LinkItem[] {
  return PILLARS.filter((l) => SLUG_SET.has(l.href.replace("/blog/", "")));
}

/* Largest UK cities we know have town pages, in priority order. */
const POPULAR_TOWNS = [
  "london",
  "birmingham",
  "leeds",
  "glasgow",
  "sheffield",
  "manchester",
  "liverpool",
  "bristol",
  "edinburgh",
  "cardiff",
  "leicester",
  "coventry",
  "nottingham",
  "belfast",
];

/* Town clinic slugs indexed once at build time. */
const TOWN_CLINIC_SLUGS: string[] = posts
  .map((p) => p.slug)
  .filter((s) => s.startsWith(MUNICIPIO_SLUG_PREFIX));

/** Parse a slug into { base, drug } if it is a town/clinic page. */
type Parsed = { base: string; drug: string | null };
function parseTownSlug(slug: string): Parsed | null {
  for (const prefix of MUNICIPIO_DRUG_SLUG_PREFIXES) {
    if (slug.startsWith(prefix)) {
      return { base: slug.slice(prefix.length), drug: DRUG_BY_PREFIX[prefix] ?? null };
    }
  }
  if (slug.startsWith(MUNICIPIO_SLUG_PREFIX)) {
    return { base: slug.slice(MUNICIPIO_SLUG_PREFIX.length), drug: null };
  }
  return null;
}

function townLabel(base: string): string {
  const place = PLACE_BY_SLUG.get(`${MUNICIPIO_SLUG_PREFIX}${base}`);
  if (place) return place;
  return base.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function pushIfExists(items: LinkItem[], slug: string, label: string) {
  if (SLUG_SET.has(slug)) items.push({ label, href: `/blog/${slug}` });
}

/** Popular town clinic pages (for spreading authority downward). */
function popularTownLinks(max: number): LinkItem[] {
  const items: LinkItem[] = [];
  for (const town of POPULAR_TOWNS) {
    const slug = `${MUNICIPIO_SLUG_PREFIX}${town}`;
    pushIfExists(items, slug, `Weight loss clinic in ${townLabel(town)}`);
    if (items.length >= max) break;
  }
  return items;
}

export function getInternalLinks(slug: string): LinkGroup[] {
  const parsed = parseTownSlug(slug);

  if (parsed) {
    const groups: LinkGroup[] = [];
    const townName = townLabel(parsed.base);

    // 1) Other GLP-1 treatments in the same town (local topical silo)
    const local: LinkItem[] = [];
    for (const prefix of MUNICIPIO_DRUG_SLUG_PREFIXES) {
      const drug = DRUG_BY_PREFIX[prefix];
      const drugSlug = `${prefix}${parsed.base}`;
      if (drugSlug !== slug) pushIfExists(local, drugSlug, `${drug} clinic in ${townName}`);
    }
    const mainSlug = `${MUNICIPIO_SLUG_PREFIX}${parsed.base}`;
    if (mainSlug !== slug) pushIfExists(local, mainSlug, `Weight loss clinic in ${townName}`);
    if (local.length) {
      groups.push({
        title: `More weight-loss options in ${townName}`,
        intro: `Online medical consultation and a private prescription for these treatments in ${townName} too.`,
        items: local,
      });
    }

    // 2) Popular UK cities (geographic silo)
    const geo = popularTownLinks(8).filter((l) => l.href !== `/blog/${slug}`);
    if (geo.length) {
      groups.push({
        title: `Weight loss clinics in other UK cities`,
        items: geo.slice(0, 8),
      });
    }

    // 3) National guides (links up to the pillars)
    const pillars = pillarLinks();
    if (pillars.length) {
      groups.push({ title: `GLP-1 guides for the UK`, items: pillars });
    }

    return groups;
  }

  // Non-geographic pages (pillars, comparisons…): spread authority down
  // by linking to the largest cities' clinic pages.
  const down = popularTownLinks(8);
  if (!down.length) return [];
  return [
    {
      title: `Weight loss clinics by city`,
      intro: `Book your online medical consultation wherever you are. These are our most in-demand UK cities.`,
      items: down.slice(0, 8),
    },
  ];
}

// Keep a stable reference so tree-shakers don't flag the index as unused.
void TOWN_CLINIC_SLUGS;
