import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { ImageSlot } from "@/components/media/ImageSlot";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { insights } from "@/content/pages/insights";
import { formatDate } from "@/lib/format";
import { categoryLabel, getArticle, getArticles, getRelated } from "@/lib/insights";
import { articleLd, breadcrumbLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${slug}`,
    type: "article",
    publishedTime: article.date,
    image: {
      url: `/insights/${slug}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: article.title,
    },
  });
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { default: Body } = (await import(`@/content/insights/${slug}.mdx`)) as {
    default: ComponentType;
  };
  const related = getRelated(article);
  const label = categoryLabel(article.category);
  const copy = insights.article;

  return (
    <>
      <JsonLd
        data={[
          articleLd(article),
          breadcrumbLd([
            { name: insights.seo.title, path: "/insights" },
            { name: article.title, path: `/insights/${slug}` },
          ]),
        ]}
      />

      <article>
        <header className="surface-dark relative isolate overflow-hidden bg-hero">
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark opacity-60" />
          <div className="container-site max-w-4xl pt-10 pb-28 sm:pt-14 sm:pb-36">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-on-dark-muted">
                <li>
                  <NextLink
                    href="/insights"
                    className="inline-flex items-center gap-1.5 rounded-sm hover:text-white"
                  >
                    <ArrowLeft aria-hidden className="size-4" />
                    {copy.backLabel}
                  </NextLink>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <NextLink
                    href={`/insights?category=${article.category}`}
                    className="rounded-sm hover:text-white"
                  >
                    {label}
                  </NextLink>
                </li>
              </ol>
            </nav>
            <p className="mt-6 inline-flex rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-cyan-soft">
              {article.tag ?? label}
            </p>
            <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.12] font-bold text-white">
              {article.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-on-dark-muted sm:text-lg">
              {article.excerpt}
            </p>
            <p className="mt-6 text-sm text-on-dark-muted">
              <span className="text-white">{article.author}</span>
              <span aria-hidden> · </span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden> · </span>
              {article.readingMinutes} min read
            </p>
          </div>
        </header>

        <div className="container-site max-w-4xl">
          <div className="-mt-20 overflow-hidden rounded-band shadow-card-hover sm:-mt-28">
            <ImageSlot
              slot={article.cover}
              alt={article.coverAlt}
              priority
              sizes="(min-width: 960px) 896px, 100vw"
            />
          </div>
          <div className="mx-auto prose prose-lg max-w-[68ch] py-12 text-ink prose-slate lg:py-16 prose-headings:font-display prose-headings:text-ink prose-h2:mt-10 prose-h2:text-2xl prose-a:font-medium prose-a:text-brand-text prose-a:underline-offset-2 hover:prose-a:text-brand-deep prose-strong:text-ink prose-li:marker:text-brand">
            <Body />
          </div>
        </div>
      </article>

      <CTABand id="article-cta" title={copy.ctaTitle} body={copy.ctaBody} cta={copy.cta} />

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="bg-white pt-10 pb-16 lg:pb-24">
          <div className="container-site">
            <h2 id="related-title" className="font-display text-2xl font-bold text-ink">
              {copy.relatedTitle}
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} categoryLabel={categoryLabel(a.category)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
