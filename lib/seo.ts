import type { Metadata } from "next";
import { site } from "@/content/site";
import type { ArticleMeta } from "@/content/types";
import { publicEnv } from "@/lib/env";

export const absoluteUrl = (path = "/") => new URL(path, `${publicEnv.siteUrl}/`).toString();

const DEFAULT_OG = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name}: ${site.tagline}`,
};

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Route path, used for the canonical URL. */
  path: string;
  /** Use the title as-is instead of the "%s | XBPL" template. */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/** One place that sets title, description, canonical, Open Graph and Twitter for a page. */
export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = DEFAULT_OG,
  type = "website",
  publishedTime,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      title: fullTitle,
      description,
      images: [image],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* --------------------------------------------------------------------------
   JSON-LD builders (schema.org)
   -------------------------------------------------------------------------- */
type JsonLd = Record<string, unknown>;

export function organizationLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/icon-512.png"),
    slogan: site.tagline,
    description: site.description,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    sameAs: [site.social.linkedin],
  };
}

export function websiteLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    url: absoluteUrl("/"),
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-IN",
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleLd(article: ArticleMeta): JsonLd {
  const url = absoluteUrl(`/insights/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: url,
    url,
    image: absoluteUrl(`/insights/${article.slug}/opengraph-image`),
    author: { "@type": "Organization", name: article.author },
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-IN",
  };
}
