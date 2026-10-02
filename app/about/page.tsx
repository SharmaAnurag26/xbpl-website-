import { Reveal } from "@/components/motion/Reveal";
import { CTABand } from "@/components/sections/CTABand";
import { FeatureIconCard } from "@/components/sections/FeatureIconCard";
import { PageHero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { about } from "@/content/pages/about";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/about";
export const metadata = buildMetadata({ ...about.seo, path: PATH });

export default function AboutPage() {
  const { hero, story, purpose, band } = about;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: about.seo.title, path: PATH }])} />
      <PageHero content={hero} />

      <section id="our-story" aria-labelledby="story-title" className="bg-white section-y">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="story-title" eyebrow={story.eyebrow} title={story.title} />
            <div className="mt-5 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-muted">
              {story.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <ul className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-7">
            {story.pillars.map((card, i) => (
              <li key={card.keyword}>
                <Reveal delay={i * 0.08} className="h-full">
                  <ServiceCard card={card} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="purpose-title" className="bg-soft py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="purpose-title" eyebrow={purpose.eyebrow} title={purpose.title} />
          </Reveal>
          <ol className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 max-sm:[&>li:last-child:nth-child(odd)]:col-span-2">
            {purpose.items.map((item, i) => (
              <li key={item.title} className="relative">
                {/* Connector between steps on wide screens. */}
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="absolute top-6 right-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-[linear-gradient(90deg,transparent,var(--color-brand)_50%,transparent)] opacity-40 lg:block"
                  />
                ) : null}
                <Reveal delay={i * 0.06} className="h-full">
                  <FeatureIconCard item={item} />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Reveal>
        <CTABand id="performance" {...band} className="pt-10 pb-16 lg:pt-14 lg:pb-24" />
      </Reveal>
    </>
  );
}
