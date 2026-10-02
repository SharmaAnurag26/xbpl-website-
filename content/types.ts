import type { IconName } from "@/lib/icons";
import type { ImageSlotKey } from "@/lib/images";

/**
 * Content schema. Every page's copy is typed against these shapes, so a typo in a
 * content file fails the build instead of shipping a broken page.
 */

export type Link = { label: string; href: string };

export type Cta = Link & { variant?: "primary" | "outline" };

export type ImageRef = { slot: ImageSlotKey; alt: string };

export type Seo = { title: string; description: string };

export type SectionHeadingContent = {
  eyebrow?: string;
  title: string;
  intro?: string;
};

export type FeatureItem = {
  icon: IconName;
  title: string;
  /** Optional supporting line. Only shown when provided. */
  description?: string;
};

export type Stat =
  | { kind: "number"; value: number; suffix: string; label: string }
  | { kind: "text"; title: string; label: string };

export type ServiceCardContent = {
  keyword: string;
  title: string;
  description: string;
  image: ImageRef;
  link: Link;
};

export type HomeHeroContent = {
  /** Shown as a single line on small screens. */
  eyebrow: string;
  /** Stacked keyword ladder on large screens. */
  ladder: string[];
  /** Display words, rendered with a gradient full stop: BUILD. EVOLVE. LEAD. */
  display: string[];
  /** Sub-headline; the `highlight` substring is rendered in the brand gradient. */
  headline: string;
  highlight?: string;
  body: string;
  ctas: Cta[];
  image: ImageRef;
};

export type PageHeroContent = {
  /** Large gradient keyword above the title (BUILD / EVOLVE / LEAD). */
  keyword?: string;
  title: string;
  body: string;
  ladder?: string[];
  cta?: Cta;
  image: ImageRef;
};

export type CTABandContent = {
  title: string;
  body?: string;
  cta: Cta;
  image?: ImageRef;
};

export type ProcessStep = { icon: IconName; label: string };

export type HomePageContent = {
  seo: Seo;
  hero: HomeHeroContent;
  stats: { label: string; items: Stat[] };
  priorities: SectionHeadingContent & { cards: ServiceCardContent[] };
  connected: { title: string; image: ImageRef; pillars: FeatureItem[] };
  whyChoose: SectionHeadingContent & { items: FeatureItem[] };
  cta: CTABandContent;
};

export type TechLogoKey = "aws" | "azure" | "google-cloud" | "oracle" | "vmware" | "redhat";
/** `src`: optional official mark in /public/tech, used only once usage rights are confirmed. */
export type TechLogo = { key: TechLogoKey; name: string; src?: string };

export type InsightCategory =
  "ai-genai" | "cloud" | "cybersecurity" | "learning" | "enterprise-technology";

export type ArticleMeta = {
  slug: string;
  title: string;
  category: InsightCategory;
  /** Optional display tag shown on the card instead of the category (e.g. "Perspectives"). */
  tag?: string;
  date: string;
  excerpt: string;
  cover: ImageSlotKey;
  coverAlt: string;
  author: string;
  readingMinutes: number;
};

type FeatureSection = SectionHeadingContent & { items: FeatureItem[] };

export type LearningPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  approach: FeatureSection;
  areas: FeatureSection;
  process: CTABandContent & { stepsLabel: string; steps: ProcessStep[] };
};

export type CloudPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  capabilities: FeatureSection;
  technologies: SectionHeadingContent & { logos: TechLogo[] };
  cta: CTABandContent;
};

export type SecurityPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  capabilities: FeatureSection;
  whyMatters: FeatureSection;
  cta: CTABandContent;
};

export type AboutPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  story: SectionHeadingContent & { paragraphs: string[]; pillars: ServiceCardContent[] };
  purpose: FeatureSection;
  band: CTABandContent;
};

export type InsightCategoryDef = { id: InsightCategory; label: string };

export type InsightsPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  filterLabel: string;
  categories: InsightCategoryDef[];
  newsletter: { title: string; body: string; placeholder: string; submitLabel: string };
  article: { backLabel: string; relatedTitle: string; ctaTitle: string; ctaBody: string; cta: Cta };
};

export type InterestOption = { value: string; label: string };

export type ContactPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  form: {
    title: string;
    interestPlaceholder: string;
    interests: InterestOption[];
    labels: {
      name: string;
      company: string;
      email: string;
      phone: string;
      interest: string;
      message: string;
      consent: string;
    };
    placeholders: { name: string; company: string; email: string; phone: string; message: string };
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successBody: string;
  };
  details: { title: string; intro: string; followTitle: string; locationsTitle: string };
  /** Map pins; lon/lat in degrees. */
  locations: { name: string; lon: number; lat: number }[];
};

export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };
export type LegalPageContent = {
  seo: Seo;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export type FooterGroup = { title: string; links: Link[] };

export type SiteContent = {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  nav: Link[];
  headerCta: Link;
  footer: {
    blurb: string;
    groups: FooterGroup[];
    legal: Link[];
    copyright: string;
  };
  contact: {
    office: { label: string; lines: string[] };
    phone: { display: string; href: string };
    email: string;
  };
  social: { linkedin: string };
};
