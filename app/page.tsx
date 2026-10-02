import { Reveal } from "@/components/motion/Reveal";
import { CTABand } from "@/components/sections/CTABand";
import { FeatureIconCard } from "@/components/sections/FeatureIconCard";
import { HomeHero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { StatBar } from "@/components/sections/StatBar";
import { home } from "@/content/pages/home";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...home.seo, path: "/", absoluteTitle: true });

export default function HomePage() {
  const { hero, stats, priorities, connected, whyChoose, cta } = home;

  return (
    <>
      <HomeHero content={hero} />
      <StatBar label={stats.label} stats={stats.items} />

      {/* Three priorities */}
      <section id="solutions" aria-labelledby="solutions-title" className="bg-white section-y">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="solutions-title"
              eyebrow={priorities.eyebrow}
              title={priorities.title}
              intro={priorities.intro}
              align="center"
            />
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-7">
            {priorities.cards.map((card, i) => (
              <li key={card.keyword}>
                <Reveal delay={i * 0.08} className="h-full">
                  <ServiceCard card={card} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* People. Technology. Security. */}
      <Reveal>
        <CTABand id="connected" title={connected.title} image={connected.image} wideChildren>
          <ul className="grid max-w-3xl gap-6 sm:grid-cols-3">
            {connected.pillars.map((pillar) => (
              <li key={pillar.title}>
                <FeatureIconCard item={pillar} tone="dark" layout="inline" />
              </li>
            ))}
          </ul>
        </CTABand>
      </Reveal>

      {/* Why choose XBPL */}
      <section aria-labelledby="why-title" className="bg-white pt-16 pb-8 lg:pt-24 lg:pb-10">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="why-title" title={whyChoose.title} />
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 max-sm:[&>li:last-child:nth-child(odd)]:col-span-2">
            {whyChoose.items.map((item, i) => (
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
        <CTABand id="next-priority" {...cta} className="pb-16 lg:pb-24" />
      </Reveal>
    </>
  );
}
