import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { articles, authors, SITE_URL, PILLAR } from "@/lib/articles";

export const revalidate = 86400; // regenerar cada shard una vez al día

/* ───────────────────────────────────────────────────────────
   Sitemap SHARDEADO (Google impone 50.000 URLs por archivo).
   Con el catálogo pSEO creciendo hacia 50k+ páginas, dividimos
   en trozos de 10.000 URLs: /sitemap/0.xml, /sitemap/1.xml, …
   robots.ts declara todos los shards para su descubrimiento.
   ─────────────────────────────────────────────────────────── */
export const SITEMAP_CHUNK = 10000;

function allRoutes(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${SITE_URL}/${PILLAR.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    { url: `${SITE_URL}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal/terms-of-services`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/herramientas/calculadora-imc`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/herramientas/calculadora-tdee`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/herramientas/calculadora-deficit-calorico`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/herramientas/calculadora-proteina-diaria`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Cluster editorial: pillar + articles
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/${a.slug}`,
    lastModified: new Date(a.dateModified),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Author bio pages
  const authorRoutes: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${SITE_URL}/autores/${a.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...articleRoutes, ...authorRoutes];
}

/** Número total de shards según el catálogo actual. */
export function sitemapShardCount(): number {
  // 12 estáticas + posts + articles + authors (aprox. barata de calcular)
  const total = 12 + posts.length + articles.length + authors.length;
  return Math.max(1, Math.ceil(total / SITEMAP_CHUNK));
}

export async function generateSitemaps(): Promise<Array<{ id: number }>> {
  return Array.from({ length: sitemapShardCount() }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  // En Next.js 16 el `id` del shard llega como Promise<string> y DEBE
  // resolverse con await. Tratarlo como número (Number(id)) daba NaN y
  // producía shards con el <urlset> vacío en producción.
  id: Promise<string> | string | number;
}): Promise<MetadataRoute.Sitemap> {
  const resolved = await id;
  const index = Number(resolved);
  const start = (Number.isFinite(index) ? index : 0) * SITEMAP_CHUNK;
  return allRoutes().slice(start, start + SITEMAP_CHUNK);
}
