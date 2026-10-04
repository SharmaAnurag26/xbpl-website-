import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { ImageSlot } from "@/components/media/ImageSlot";
import type { ArticleMeta } from "@/content/types";
import { formatDate } from "@/lib/format";

type ArticleCardProps = {
  article: ArticleMeta;
  categoryLabel: string;
  headingLevel?: "h2" | "h3";
};

/** Whole card is clickable through the title's stretched link (one tab stop per card). */
export function ArticleCard({ article, categoryLabel, headingLevel: H = "h3" }: ArticleCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover has-[a:focus-visible]:shadow-card-hover">
      <div className="relative">
        <ImageSlot
          slot={article.cover}
          alt={article.coverAlt}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          imageClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-md bg-navy/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {article.tag ?? categoryLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden> · </span>
          {article.readingMinutes} min read
        </p>
        <H className="mt-2 font-display text-[1.02rem] leading-snug font-semibold text-ink">
          <NextLink
            href={`/insights/${article.slug}`}
            className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-text"
          >
            {article.title}
          </NextLink>
        </H>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <span
          aria-hidden
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text"
        >
          Read More
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
