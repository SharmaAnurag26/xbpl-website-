import { Reveal } from "@/components/motion/Reveal";
import { CTABand } from "@/components/sections/CTABand";
import { FeatureIconCard } from "@/components/sections/FeatureIconCard";
import { PageHero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { learning } from "@/content/pages/learning";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/learning";
export const metadata = buildMetadata({ ...learning.seo, path: PATH });

export default function LearningPage() {
  const { hero, approach, areas, process } = learning;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: learning.seo.title, path: PATH }])} />
      <PageHero content={hero} />

      <section aria-labelledby="approach-title" className="bg-white pt-16 pb-6 lg:pt-20">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="approach-title" title={approach.title} intro={approach.intro} />
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {approach.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 0.05} className="h-full">
                  <FeatureIconCard item={item} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="areas-title" className="bg-white pt-14 pb-10 lg:pt-16 lg:pb-14">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="areas-title" title={areas.title} intro={areas.intro} />
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {areas.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 5) * 0.05} className="h-full">
                  <FeatureIconCard item={item} bordered />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Reveal>
        <CTABand
          id="capability"
          title={process.title}
          cta={process.cta}
          wideChildren
          className="pb-16 lg:pb-24"
        >
          <ProcessSteps label={process.stepsLabel} steps={process.steps} />
        </CTABand>
      </Reveal>
    </>
  );
}
