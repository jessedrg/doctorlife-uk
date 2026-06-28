/* ───────────────────────────────────────────────────────────
   Enlazado interno geográfico para el blog de DoctorLife.

   Objetivo SEO: eliminar páginas huérfanas y crear silos densos
   (provincia → comunidad → nacional) para que Googlebot descubra
   e indexe las miles de páginas de ciudad. Cada página enlaza a:
     1. El mismo tratamiento en ciudades cercanas (silo geográfico)
     2. Otros tratamientos en la misma ciudad (silo temático local)
     3. Guías nacionales / comparativas (enlaces hacia los pilares)
   Las páginas pilar enlazan hacia abajo a las grandes ciudades para
   repartir autoridad e impulsar la indexación de la cola larga.
   ─────────────────────────────────────────────────────────── */

import { posts } from "./blog";
import { CITIES } from "./blog-content";
import { CITY_FACTS } from "./blog-city-facts";

export type LinkItem = { label: string; href: string };
export type LinkGroup = { title: string; intro?: string; items: LinkItem[] };

/* Fármacos GLP‑1 con páginas geográficas */
const DRUG_KEYS = ["wegovy", "mounjaro", "ozempic", "saxenda"] as const;
type DrugKey = (typeof DRUG_KEYS)[number];
const DRUG_NAME: Record<DrugKey, string> = {
  wegovy: "Wegovy",
  mounjaro: "Mounjaro",
  ozempic: "Ozempic",
  saxenda: "Saxenda",
};

/* Plantillas de página por ciudad */
type Kind = "buy" | "price" | "availability";
const KIND_PREFIX: Record<Kind, string> = { buy: "comprar-", price: "precio-", availability: "" };

/* ── Índices construidos una vez (en build/SSG) ── */
const NAME_BY_SLUG: Record<string, string> = Object.fromEntries(
  CITIES.map((c) => [c.slug, c.name]),
);
const SLUG_SET: Set<string> = new Set(posts.map((p) => p.slug));

/** Ciudades agrupadas por provincia y por comunidad, ordenadas por población desc. */
const byProvince = new Map<string, string[]>();
const byCommunity = new Map<string, string[]>();
for (const slug of Object.keys(CITY_FACTS)) {
  const f = CITY_FACTS[slug];
  if (!f) continue;
  (byProvince.get(f.province) ?? byProvince.set(f.province, []).get(f.province)!).push(slug);
  (byCommunity.get(f.community) ?? byCommunity.set(f.community, []).get(f.community)!).push(slug);
}
const popDesc = (a: string, b: string) =>
  (CITY_FACTS[b]?.pop ?? 0) - (CITY_FACTS[a]?.pop ?? 0);
for (const list of byProvince.values()) list.sort(popDesc);
for (const list of byCommunity.values()) list.sort(popDesc);

/* Mayores hubs nacionales para repartir autoridad hacia la cola larga */
const NATIONAL_HUBS = ["madrid", "barcelona", "valencia", "sevilla", "zaragoza", "malaga", "bilbao", "murcia"];

/* ── Parser de slug → ciudad/fármaco/plantilla ── */
type Parsed = { kind: Kind; drug: DrugKey; city: string };

function parseCitySlug(slug: string): Parsed | null {
  // comprar-{drug}-{city} | precio-{drug}-{city}
  for (const kind of ["buy", "price"] as const) {
    const prefix = KIND_PREFIX[kind];
    if (slug.startsWith(prefix)) {
      const rest = slug.slice(prefix.length);
      for (const drug of DRUG_KEYS) {
        if (rest.startsWith(drug + "-")) {
          const city = rest.slice(drug.length + 1);
          if (CITY_FACTS[city]) return { kind, drug, city };
        }
      }
    }
  }
  // {drug}-{city}  (disponibilidad)
  for (const drug of DRUG_KEYS) {
    if (slug.startsWith(drug + "-")) {
      const city = slug.slice(drug.length + 1);
      if (CITY_FACTS[city]) return { kind: "availability", drug, city };
    }
  }
  return null;
}

/* ── Constructores de enlaces (solo a páginas que existen) ── */
function cityHref(kind: Kind, drug: DrugKey, city: string): string {
  return `/blog/${KIND_PREFIX[kind]}${drug}-${city}`;
}
function cityLabel(kind: Kind, drug: DrugKey, city: string): string {
  const name = NAME_BY_SLUG[city] ?? city;
  const d = DRUG_NAME[drug];
  if (kind === "buy") return `Comprar ${d} en ${name}`;
  if (kind === "price") return `Precio de ${d} en ${name}`;
  return `${d} en ${name}`;
}
function pushIfExists(items: LinkItem[], kind: Kind, drug: DrugKey, city: string) {
  const slug = `${KIND_PREFIX[kind]}${drug}-${city}`;
  if (SLUG_SET.has(slug)) items.push({ label: cityLabel(kind, drug, city), href: cityHref(kind, drug, city) });
}

/* Guías nacionales / pilares por fármaco (se filtran contra SLUG_SET) */
const PILLARS: Record<DrugKey, LinkItem[]> = {
  wegovy: [
    { label: "Comprar Wegovy online en España", href: "/blog/comprar-wegovy-online" },
    { label: "Precio de Wegovy en España", href: "/blog/wegovy-precio-espana" },
    { label: "Receta de Wegovy online con médico", href: "/blog/receta-wegovy-online" },
    { label: "Wegovy vs Mounjaro: comparativa", href: "/blog/wegovy-vs-mounjaro" },
  ],
  mounjaro: [
    { label: "Comprar Mounjaro online en España", href: "/blog/comprar-mounjaro-online" },
    { label: "Precio de Mounjaro en España", href: "/blog/mounjaro-precio-espana" },
    { label: "Receta de Mounjaro online con médico", href: "/blog/receta-mounjaro-online" },
    { label: "Wegovy vs Mounjaro: comparativa", href: "/blog/wegovy-vs-mounjaro" },
  ],
  ozempic: [
    { label: "Comprar Ozempic online en España", href: "/blog/comprar-ozempic-online" },
    { label: "Precio de Ozempic en España", href: "/blog/ozempic-precio-espana" },
    { label: "Ozempic vs Wegovy: comparativa", href: "/blog/ozempic-vs-wegovy" },
    { label: "Receta de Ozempic online con médico", href: "/blog/receta-ozempic-online" },
  ],
  saxenda: [
    { label: "Comprar Saxenda online en España", href: "/blog/comprar-saxenda-online" },
    { label: "Precio de Saxenda en España", href: "/blog/saxenda-precio-espana" },
    { label: "Saxenda vs Wegovy: comparativa", href: "/blog/saxenda-vs-wegovy" },
    { label: "Receta de Saxenda online con médico", href: "/blog/receta-saxenda-online" },
  ],
};
function pillarsFor(drug: DrugKey): LinkItem[] {
  return PILLARS[drug].filter((l) => SLUG_SET.has(l.href.replace("/blog/", "")));
}

/** Vecinas: misma provincia primero, luego comunidad, luego hubs nacionales. */
function neighborCities(parsed: Parsed, max: number): string[] {
  const f = CITY_FACTS[parsed.city];
  const ordered: string[] = [];
  const seen = new Set<string>([parsed.city]);
  const add = (slug: string) => {
    if (!seen.has(slug)) {
      seen.add(slug);
      ordered.push(slug);
    }
  };
  if (f) {
    for (const s of byProvince.get(f.province) ?? []) add(s);
    for (const s of byCommunity.get(f.community) ?? []) add(s);
  }
  for (const s of NATIONAL_HUBS) add(s);
  return ordered.slice(0, max);
}

/**
 * Devuelve los grupos de enlaces internos para un post.
 * - Páginas de ciudad → silos geográfico + temático + pilares.
 * - Páginas pilar/otras → enlaces descendentes a grandes ciudades.
 */
export function getInternalLinks(slug: string): LinkGroup[] {
  const parsed = parseCitySlug(slug);

  if (parsed) {
    const f = CITY_FACTS[parsed.city];
    const cityName = NAME_BY_SLUG[parsed.city] ?? parsed.city;
    const drugName = DRUG_NAME[parsed.drug];
    const groups: LinkGroup[] = [];

    // 1) Mismo tratamiento en ciudades cercanas (silo geográfico)
    const geo: LinkItem[] = [];
    for (const city of neighborCities(parsed, 18)) {
      pushIfExists(geo, parsed.kind, parsed.drug, city);
      if (geo.length >= 8) break;
    }
    if (geo.length) {
      const scope = f ? `de ${f.province}` : "cercanas";
      groups.push({
        title: `${drugName} en otras ciudades ${scope}`,
        intro: `Consulta médica online y receta electrónica para ${drugName} también en estas localidades.`,
        items: geo,
      });
    }

    // 2) Otros tratamientos en la misma ciudad (silo temático local)
    const local: LinkItem[] = [];
    for (const drug of DRUG_KEYS) {
      if (drug !== parsed.drug) pushIfExists(local, "buy", drug, parsed.city);
    }
    // y otras plantillas del mismo fármaco en esta ciudad
    (["buy", "price", "availability"] as Kind[])
      .filter((k) => k !== parsed.kind)
      .forEach((k) => pushIfExists(local, k, parsed.drug, parsed.city));
    if (local.length) {
      groups.push({
        title: `Otros tratamientos para adelgazar en ${cityName}`,
        items: local.slice(0, 6),
      });
    }

    // 3) Guías nacionales (enlaces hacia los pilares)
    const pillars = pillarsFor(parsed.drug);
    if (pillars.length) {
      groups.push({ title: `Guías de ${drugName} en España`, items: pillars });
    }

    return groups;
  }

  // Páginas no geográficas (pilares, comparativas…): reparten autoridad
  // hacia abajo enlazando a las grandes ciudades de cada fármaco.
  const drug = DRUG_KEYS.find((d) => slug.includes(d)) ?? "wegovy";
  const drugName = DRUG_NAME[drug];
  const down: LinkItem[] = [];
  for (const city of NATIONAL_HUBS) pushIfExists(down, "buy", drug, city);
  if (!down.length) return [];
  return [
    {
      title: `Comprar ${drugName} por ciudad`,
      intro: `Reserva tu consulta médica online estés donde estés. Estas son nuestras ciudades con más demanda de ${drugName}.`,
      items: down.slice(0, 8),
    },
  ];
}
