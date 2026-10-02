import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { insights } from "@/content/pages/insights";
import type { ArticleMeta, InsightCategory } from "@/content/types";
import { isImageSlotKey } from "@/lib/images";

const DIR = path.join(process.cwd(), "content", "insights");
const WORDS_PER_MINUTE = 220;

const categoryIds = insights.categories.map((c) => c.id) as [InsightCategory, ...InsightCategory[]];

/** Frontmatter contract. An invalid article fails the build with a clear message. */
const frontmatterSchema = z.object({
  title: z.string().min(5),
  category: z.enum(categoryIds),
  tag: z.string().optional(),
  // YAML parses bare dates into Date objects; accept both and normalise to YYYY-MM-DD.
  date: z
    .union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()])
    .transform((d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d)),
  excerpt: z.string().min(20).max(220),
  cover: z.string().refine(isImageSlotKey, "cover must be an image slot key from lib/images.ts"),
  coverAlt: z.string().default(""),
  author: z.string().default("XBPL"),
  draft: z.boolean().default(false),
});

function load(): ArticleMeta[] {
  const files = readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const { data, content } = matter(readFileSync(path.join(DIR, file), "utf8"));
    const parsed = frontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/insights/${file}:\n${z.prettifyError(parsed.error)}`,
      );
    }
    const { draft, cover, ...meta } = parsed.data;
    const words = content.split(/\s+/).filter(Boolean).length;
    return {
      draft,
      article: {
        ...meta,
        slug,
        cover: cover as ArticleMeta["cover"],
        readingMinutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
      } satisfies ArticleMeta,
    };
  });

  return articles
    .filter((a) => !a.draft || process.env.NODE_ENV !== "production")
    .map((a) => a.article)
    .sort((a, b) => b.date.localeCompare(a.date));
}

let cache: ArticleMeta[] | null = null;

/** All published articles, newest first. */
export function getArticles(): ArticleMeta[] {
  cache ??= load();
  return cache;
}

export function getArticle(slug: string): ArticleMeta | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export function categoryLabel(id: InsightCategory): string {
  return insights.categories.find((c) => c.id === id)?.label ?? id;
}

/** Same-category articles first, then most recent, excluding the current one. */
export function getRelated(article: ArticleMeta, count = 3): ArticleMeta[] {
  const others = getArticles().filter((a) => a.slug !== article.slug);
  const same = others.filter((a) => a.category === article.category);
  const rest = others.filter((a) => a.category !== article.category);
  return [...same, ...rest].slice(0, count);
}
