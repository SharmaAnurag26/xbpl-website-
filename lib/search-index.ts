import "server-only";
import { about } from "@/content/pages/about";
import { cloud } from "@/content/pages/cloud";
import { contact } from "@/content/pages/contact";
import { insights } from "@/content/pages/insights";
import { learning } from "@/content/pages/learning";
import { managedServices } from "@/content/pages/managed-services";
import { security } from "@/content/pages/security";
import { categoryLabel, getArticles } from "@/lib/insights";

export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  kind: string;
  /** Extra words that should match (capability names, categories…), not displayed. */
  keywords: string;
};

/**
 * Small static index of every page and article, built at build time and handed to the
 * (lazy-loaded) search dialog. A few KB, so no search service is needed.
 */
export function getSearchIndex(): SearchEntry[] {
  const words = (items: { title: string }[]) => items.map((i) => i.title).join(" ");

  const pages: SearchEntry[] = [
    {
      title: "Courses",
      description: "Browse the XBPL | Learnings course catalogue.",
      href: "/courses",
      kind: "Page",
      keywords: `${words(learning.courses.items)} catalogue training`,
    },
    {
      title: learning.seo.title,
      description: learning.seo.description,
      href: "/learning",
      kind: "Page",
      keywords: `${words(learning.approach.items)} ${words(learning.areas.items)} ${words(learning.courses.items)} training skills courses`,
    },
    {
      title: cloud.seo.title,
      description: cloud.seo.description,
      href: "/cloud",
      kind: "Page",
      keywords: `${words(cloud.services.items)} ${words(cloud.platforms.items)} ${cloud.technologies.logos.map((l) => l.name).join(" ")} finops cost optimization`,
    },
    {
      title: security.seo.title,
      description: security.seo.description,
      href: "/security",
      kind: "Page",
      keywords: `${words(security.services.items)} ${words(security.whyMatters.items)} soc ciso threat`,
    },
    {
      title: managedServices.seo.title,
      description: managedServices.seo.description,
      href: "/managed-services",
      kind: "Page",
      keywords: `${words(managedServices.features.items)} managed it services support`,
    },
    {
      title: about.seo.title,
      description: about.seo.description,
      href: "/about",
      kind: "Page",
      keywords: `${words(about.purpose.items)} story purpose company`,
    },
    {
      title: insights.seo.title,
      description: insights.seo.description,
      href: "/insights",
      kind: "Page",
      keywords: `${insights.categories.map((c) => c.label).join(" ")} articles blog`,
    },
    {
      title: contact.seo.title,
      description: contact.seo.description,
      href: "/contact",
      kind: "Page",
      keywords: "enquiry email phone office bengaluru talk expert",
    },
  ];

  const articles: SearchEntry[] = getArticles().map((a) => ({
    title: a.title,
    description: a.excerpt,
    href: `/insights/${a.slug}`,
    kind: `Insight · ${a.tag ?? categoryLabel(a.category)}`,
    keywords: categoryLabel(a.category),
  }));

  const courseEntries: SearchEntry[] = learning.courses.items.map((c) => ({
    title: c.title,
    description: c.summary,
    href: `/contact?interest=learning&course=${encodeURIComponent(c.title)}`,
    kind: `Course · ${c.category}`,
    keywords: "course training programme certification learn",
  }));

  return [...pages, ...courseEntries, ...articles];
}
