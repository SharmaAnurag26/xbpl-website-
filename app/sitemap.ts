import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/insights";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/learning", priority: 0.9 },
  { path: "/cloud", priority: 0.9 },
  { path: "/security", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/insights", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles();
  const latest = articles[0]?.date;

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified: path === "/insights" && latest ? latest : undefined,
      priority,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/insights/${a.slug}`),
      lastModified: a.date,
      priority: 0.6,
    })),
  ];
}
