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

/** 3D render names available in public/3d (kept in sync with components/genz/Sticker3D). */
export type StickerName =
  "x-mark" | "knot" | "blob" | "glass-cube" | "rings" | "shield" | "cloud" | "capsules";

export type BentoItem = {
  title: string;
  description: string;
  icon: IconName;
  tone: "surface" | "brand" | "volt" | "cyan";
  sticker?: StickerName;
  tag?: string;
};

export type BentoSection = SectionHeadingContent & { items: BentoItem[]; cta?: Cta };

export type Course = {
  slug: string;
  title: string;
  category: string;
  icon: IconName;
  image: ImageSlotKey;
  summary: string;
};

/** One audience card: organizations vs individual learners. */
export type Audience = {
  label: string;
  title: string;
  description: string;
  points: string[];
  image: ImageRef;
  cta: Cta;
};

export type FaqItem = { question: string; answer: string };
export type FaqSection = { title: string; items: FaqItem[] };

/** Real quotes only. The section stays hidden while the list is empty. */
export type Testimonial = { quote: string; name: string; role: string; company: string };
export type TestimonialSection = { title: string; items: Testimonial[] };

/** Real client logos only (with permission). Hidden while empty. */
export type ClientLogo = { name: string; src: string; width: number; height: number };
export type LogoSection = { title: string; logos: ClientLogo[] };

export type HomePageContent = {
  seo: Seo;
  hero: HomeHeroContent;
  stats: { label: string; items: Stat[] };
  priorities: SectionHeadingContent & { cards: ServiceCardContent[] };
  /** Solid tile that completes the featured grid's first row. */
  featuredCta: { eyebrow: string; title: string; href: string; linkLabel: string };
  /** Labels for the latest-insights row of the featured grid. */
  latestInsights: { eyebrow: string; linkLabel: string };
  connected: { title: string; subtitle: string; image: ImageRef; pillars: FeatureItem[] };
  tickerLabel: string;
  audiences: SectionHeadingContent & { items: Audience[] };
  popularCourses: SectionHeadingContent & { cta: Cta };
  formats: BentoSection;
  clients: LogoSection;
  testimonials: TestimonialSection;
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

/** Rich card: title, optional description and bullet points (services, reasons, values). */
export type DetailItem = {
  title: string;
  description?: string;
  bullets?: string[];
  icon?: IconName;
};
export type DetailSection = SectionHeadingContent & { items: DetailItem[] };

/** Numbered process step with optional sub-points. */
export type StepItem = { title: string; bullets?: string[] };
export type StepsSection = SectionHeadingContent & { steps: StepItem[] };

export type LearningPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  intro: SectionHeadingContent & { paragraphs: string[]; challenges: DetailItem[] };
  approach: BentoSection;
  courses: SectionHeadingContent & { items: Course[]; formats: string[] };
  areas: FeatureSection;
  whyChoose: DetailSection;
  engagement: StepsSection;
  process: CTABandContent & { stepsLabel: string; steps: ProcessStep[] };
  faq: FaqSection;
};

export type CloudPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  intro: SectionHeadingContent & { paragraphs: string[] };
  platforms: FeatureSection;
  services: DetailSection;
  framework: StepsSection & { outcomes: string[]; closing: string };
  partner: SectionHeadingContent & { points: string[] };
  technologies: SectionHeadingContent & { logos: TechLogo[] };
  engagement: StepsSection;
  cta: CTABandContent;
};

export type SecurityPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  intro: SectionHeadingContent & { paragraphs: string[] };
  services: DetailSection;
  whyMatters: DetailSection;
  cta: CTABandContent;
};

export type CoursesPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  catalogue: SectionHeadingContent & { filterLabel: string; enquireLabel: string };
  cta: CTABandContent;
};

export type ManagedServicesPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  intro: SectionHeadingContent & { paragraphs: string[] };
  features: DetailSection;
  cta: CTABandContent;
};

export type AboutPageContent = {
  seo: Seo;
  hero: PageHeroContent;
  story: SectionHeadingContent & { paragraphs: string[]; pillars: ServiceCardContent[] };
  missionVision: { title: string; body: string }[];
  values: DetailSection;
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

export type MegaLink = Link & { description?: string };

/** Top-level navigation item. Items with `menu` open a full-width dropdown panel. */
export type NavItem = Link & {
  menu?: { title: string; body: string; cta: Link; links: MegaLink[] };
};

export type SiteContent = {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  nav: NavItem[];
  search: { label: string; placeholder: string; empty: string; hint: string };
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
  social: { label: string; href: string; network: "linkedin" | "x" | "instagram" | "facebook" }[];
};
