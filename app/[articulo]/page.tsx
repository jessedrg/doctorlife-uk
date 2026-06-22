import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/editorial/article-layout";
import { getArticle, articles, SITE_URL } from "@/lib/articles";

/* ── Static params: pre-render all 8 articles at build time ── */
export function generateStaticParams() {
  return articles.map((a) => ({ articulo: a.slug }));
}

/* ── Per-article <head> metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ articulo: string }>;
}): Promise<Metadata> {
  const { articulo } = await params;
  const article = getArticle(articulo);
  if (!article) return {};

  const url = `${SITE_URL}/${article.slug}`;
  const imageUrl = `${SITE_URL}${article.cover}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [`${SITE_URL}/autores/${article.authorSlug}`],
      images: [{ url: imageUrl, alt: article.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ articulo: string }>;
}) {
  const { articulo } = await params;
  const article = getArticle(articulo);
  if (!article) notFound();
  return <ArticleLayout article={article} />;
}
