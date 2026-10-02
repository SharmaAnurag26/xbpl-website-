import { Reveal } from "@/components/motion/Reveal";
import { CapabilityCard } from "@/components/sections/CapabilityCard";
import { CTABand } from "@/components/sections/CTABand";
import { FeatureIconCard } from "@/components/sections/FeatureIconCard";
import { PageHero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { security } from "@/content/pages/security";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/security";
export const metadata = buildMetadata({ ...security.seo, path: PATH });

export default function SecurityPage() {
  const { hero, capabilities, whyMatters, cta } = security;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: security.seo.title, path: PATH }])} />
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

      <section aria-labelledby="why-title" className="bg-white pt-14 pb-10 lg:pt-16 lg:pb-14">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="why-title" title={whyMatters.title} />
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {whyMatters.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <FeatureIconCard item={item} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Reveal>
        <CTABand id="security-cta" {...cta} className="pb-16 lg:pb-24" />
      </Reveal>
    </>
  );
}
