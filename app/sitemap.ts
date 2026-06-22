import type { MetadataRoute } from "next";
import { posts, SITE_URL as BLOG_SITE_URL } from "@/lib/blog";
import { articles, authors, SITE_URL, PILLAR } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
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
    { url: `${SITE_URL}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
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

  // Cluster editorial: pillar + 8 articles
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
