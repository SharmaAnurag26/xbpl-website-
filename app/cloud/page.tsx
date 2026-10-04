import { Reveal } from "@/components/motion/Reveal";
import { Block } from "@/components/sections/Block";
import { Checklist } from "@/components/sections/Checklist";
import { CTABand } from "@/components/sections/CTABand";
import { DetailGrid } from "@/components/sections/DetailGrid";
import { FeatureIconCard } from "@/components/sections/FeatureIconCard";
import { PageHero } from "@/components/sections/Hero";
import { StepsTimeline } from "@/components/sections/StepsTimeline";
import { TechLogoStrip } from "@/components/sections/TechLogoStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { cloud } from "@/content/pages/cloud";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/cloud";
export const metadata = buildMetadata({ ...cloud.seo, path: PATH });

export default function CloudPage() {
  const { hero, intro, platforms, services, framework, partner, technologies, engagement, cta } =
    cloud;
  const { paragraphs, ...introHeading } = intro;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: cloud.seo.title, path: PATH }])} />
      <PageHero content={hero} />

      <Block id="intro" heading={introHeading} paragraphs={paragraphs}>
        <h3 className="text-eyebrow font-semibold text-cyan-soft uppercase">{platforms.title}</h3>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {platforms.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.04} className="h-full">
                <FeatureIconCard item={item} bordered />
              </Reveal>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="capabilities" heading={services}>
        <DetailGrid items={services.items} columns={4} />
      </Block>

      <Block id="framework" heading={framework} tone="soft">
        <StepsTimeline steps={framework.steps} label={framework.eyebrow ?? framework.title} />
        <div className="mt-14 flex flex-wrap items-center gap-3">
          {framework.outcomes.map((o) => (
            <span
              key={o}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold tracking-[0.08em] text-white uppercase"
            >
              {o}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-lg text-muted">{framework.closing}</p>
      </Block>

      <Block id="partner" heading={partner}>
        <Checklist items={partner.points} />
      </Block>

      <Block id="technologies" heading={technologies}>
        <TechLogoStrip label={technologies.title} logos={technologies.logos} />
      </Block>

      <Block id="process" heading={engagement}>
        <StepsTimeline steps={engagement.steps} label={engagement.eyebrow ?? engagement.title} />
      </Block>

      <CTABand id="cloud-cta" {...cta} />
    </>
  );
}
