import { Reveal } from "@/components/motion/Reveal";
import { CapabilityCard } from "@/components/sections/CapabilityCard";
import { CTABand } from "@/components/sections/CTABand";
import { PageHero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TechLogoStrip } from "@/components/sections/TechLogoStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { cloud } from "@/content/pages/cloud";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/cloud";
export const metadata = buildMetadata({ ...cloud.seo, path: PATH });

export default function CloudPage() {
  const { hero, capabilities, technologies, cta } = cloud;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: cloud.seo.title, path: PATH }])} />
      <PageHero content={hero} />

      <section
        id="capabilities"
        aria-labelledby="capabilities-title"
        className="bg-white pt-16 pb-6 lg:pt-20"
      >
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="capabilities-title"
              title={capabilities.title}
              intro={capabilities.intro}
            />
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {capabilities.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <CapabilityCard item={item} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="tech-title" className="bg-white pt-14 pb-10 lg:pt-16 lg:pb-14">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="tech-title" title={technologies.title} intro={technologies.intro} />
          </Reveal>
          <Reveal className="mt-8">
            <TechLogoStrip label={technologies.title} logos={technologies.logos} />
          </Reveal>
        </div>
      </section>

      <Reveal>
        <CTABand id="cloud-cta" {...cta} className="pb-16 lg:pb-24" />
      </Reveal>
    </>
  );
}
