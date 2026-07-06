import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE_URL } from "@/lib/blog";

const PRODUCTION_HOST = "doctorlife.io";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")?.toLowerCase().split(":")[0] ?? "";
  const isProduction = host === PRODUCTION_HOST || host === `www.${PRODUCTION_HOST}`;

  // En dev/preview bloqueamos todo el crawl.
  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      // Buscadores y crawlers generales.
      { userAgent: "*", allow: "/" },
      // Asistentes de IA (GEO): permitimos indexar el contenido médico para
      // que nos citen como fuente. No exponemos áreas privadas.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "ClaudeBot",
          "Claude-User",
          "anthropic-ai",
          "Amazonbot",
          "Bytespider",
          "cohere-ai",
          "Meta-ExternalAgent",
        ],
        allow: "/",
        disallow: ["/medico", "/admin", "/portal", "/api", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
