import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { CategoryTabs } from "@/components/insights/CategoryTabs";
import { Container, Section } from "@/components/layout/Container";
import { DetailGrid } from "@/components/sections/DetailGrid";
import { CTABand } from "@/components/sections/CTABand";
import { FeatureIconCard } from "@/components/sections/FeatureIconCard";
import { HomeHero, PageHero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { StatBar } from "@/components/sections/StatBar";
import { TechLogoStrip } from "@/components/sections/TechLogoStrip";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { ArticleMeta } from "@/content/types";

/**
 * Development-only component gallery (404 in production builds). Sample copy here is
 * illustrative; real page copy lives in /content.
 */
export const metadata: Metadata = { title: "Styleguide", robots: { index: false, follow: false } };

const swatches = [
  ["navy", "#06162e"],
  ["navy-2", "#0a2448"],
  ["brand", "#0879f9"],
  ["brand-text", "#0663d4"],
  ["cyan", "#08cfe3"],
  ["ink", "#07182f"],
  ["muted", "#56667e"],
  ["line", "#e4eaf2"],
  ["soft", "#f5f8fc"],
] as const;

const sampleArticle: ArticleMeta = {
  slug: "sample",
  title: "5 Key Considerations for a Successful Cloud Migration",
  category: "cloud",
  date: "2026-09-01",
  excerpt:
    "Planning to move to the cloud? Here is what to consider for a secure and scalable cloud journey.",
  cover: "insights/cloud-migration-key-considerations",
  coverAlt: "",
  author: "XBPL",
  readingMinutes: 6,
};

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <Section>
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Design system"
            title="XBPL styleguide"
            intro="Every reusable component, at a glance."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-card border border-line p-6">
              <Logo id="sg-color" className="h-16 w-auto" />
            </div>
            <div className="rounded-card bg-navy p-6">
              <Logo id="sg-dark" variant="on-dark" className="h-16 w-auto" />
            </div>
            <div className="rounded-card bg-brand-text p-6">
              <Logo id="sg-mono" variant="mono-white" className="h-16 w-auto" />
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-9">
            {swatches.map(([name, hex]) => (
              <li key={name} className="text-xs">
                <span
                  className="block h-14 rounded-tile border border-line"
                  style={{ background: hex }}
                />
                <span className="mt-1 block font-semibold">{name}</span>
                <span className="text-muted">{hex}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button arrow>With arrow</Button>
            <Button variant="outline">Outline</Button>
            <ButtonLink href="/styleguide" variant="link" arrow>
              Explore Learning
            </ButtonLink>
            <div className="surface-dark flex gap-3 rounded-tile bg-navy p-3">
              <Button variant="outline-light">Outline light</Button>
              <ButtonLink href="/styleguide" variant="link-light" arrow>
                Link light
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <HomeHero
        content={{
          eyebrow: "People • Technology • Security",
          ladder: ["People", "Technology", "Security", "A brighter tomorrow"],
          display: ["Build.", "Evolve.", "Lead."],
          headline:
            "Technology that builds capability, accelerates transformation and secures what's next.",
          highlight: "transformation",
          body: "XBPL helps organizations strengthen their people, modernize their technology landscape and build resilient digital environments.",
          ctas: [
            { label: "Explore Our Solutions", href: "#" },
            { label: "Talk to Us", href: "#", variant: "outline" },
          ],
          image: { slot: "home/hero", alt: "" },
        }}
      />
      <StatBar
        label="XBPL at a glance"
        stats={[
          { kind: "number", value: 2500, suffix: "+", label: "Technology Experts & Consultants" },
          { kind: "number", value: 1500, suffix: "+", label: "Technology & Skill Areas" },
          {
            kind: "text",
            title: "Enterprise Ready",
            label: "From Growing Businesses to Global Enterprises",
          },
          {
            kind: "text",
            title: "Future Focused",
            label: "AI • Cloud • Cybersecurity Emerging Technologies",
          },
        ]}
      />

      <Section tone="soft">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <ServiceCard
              card={{
                keyword: "Build",
                title: "Learning & Capability",
                description:
                  "Build the skills your workforce needs for today's technologies and tomorrow's opportunities.",
                image: { slot: "home/build", alt: "" },
                link: { label: "Explore Learning", href: "#" },
              }}
            />
            <ArticleCard article={sampleArticle} categoryLabel="Cloud" />
            <div className="grid grid-cols-2 gap-4">
              <DetailGrid
                columns={2}
                items={[
                  {
                    icon: "cloud-upload",
                    title: "Cloud Migration",
                    bullets: ["Planning", "Minimal downtime"],
                  },
                ]}
              />
              <FeatureIconCard item={{ icon: "target", title: "Business-Aligned Solutions" }} />
            </div>
          </div>
        </Container>
      </Section>

      <CTABand
        title={"People. Technology. Security.\nConnected for a stronger tomorrow."}
        image={{ slot: "home/band", alt: "" }}
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <FeatureIconCard
            tone="dark"
            layout="inline"
            item={{ icon: "users", title: "People", description: "Build capability" }}
          />
          <FeatureIconCard
            tone="dark"
            layout="inline"
            item={{ icon: "cpu", title: "Technology", description: "Modernize and scale" }}
          />
          <FeatureIconCard
            tone="dark"
            layout="inline"
            item={{ icon: "shield", title: "Security", description: "Protect what matters" }}
          />
        </div>
      </CTABand>

      <CTABand
        title={"Knowledge isn't the outcome.\nCapability is."}
        wideChildren
        cta={{ label: "Explore Learning Solutions", href: "#" }}
      >
        <ProcessSteps
          label="Learning process"
          steps={[
            { icon: "book-open", label: "Learn" },
            { icon: "repeat", label: "Practice" },
            { icon: "pointer", label: "Apply" },
            { icon: "clipboard-check", label: "Assess" },
            { icon: "refresh", label: "Reinforce" },
          ]}
        />
      </CTABand>

      <Section>
        <Container className="space-y-10">
          <TechLogoStrip
            label="Technologies"
            logos={[
              { key: "aws", name: "AWS" },
              { key: "azure", name: "Microsoft Azure" },
              { key: "google-cloud", name: "Google Cloud" },
              { key: "oracle", name: "Oracle Cloud" },
              { key: "vmware", name: "VMware" },
              { key: "redhat", name: "Red Hat" },
            ]}
          />
          <CategoryTabs
            categories={[
              { id: "cloud", label: "Cloud" },
              { id: "learning", label: "Learning" },
            ]}
            items={[
              {
                id: "a",
                category: "cloud",
                card: <ArticleCard article={sampleArticle} categoryLabel="Cloud" />,
              },
              {
                id: "b",
                category: "learning",
                card: (
                  <ArticleCard
                    article={{ ...sampleArticle, slug: "b", category: "learning" }}
                    categoryLabel="Learning"
                  />
                ),
              },
            ]}
          />
        </Container>
      </Section>

      <PageHero
        content={{
          keyword: "Evolve",
          title: "Build a cloud environment ready to accelerate your business.",
          body: "XBPL helps organizations adopt, optimize and manage cloud environments aligned with their technology and business priorities.",
          ladder: ["Agile", "Scalable", "Resilient"],
          cta: { label: "Talk to Our Cloud Experts", href: "#" },
          image: { slot: "cloud/hero", alt: "" },
        }}
      />
    </>
  );
}
