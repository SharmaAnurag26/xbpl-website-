import { categoryLabel, getArticle, getArticles } from "@/lib/insights";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "XBPL Insights article";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return renderOgImage({
    eyebrow: article ? `Insights · ${article.tag ?? categoryLabel(article.category)}` : "Insights",
    title: article?.title ?? "XBPL Insights",
  });
}
