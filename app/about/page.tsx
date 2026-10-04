import { Sticker3D } from "@/components/genz/Sticker3D";
import { Reveal } from "@/components/motion/Reveal";
import { Block } from "@/components/sections/Block";
import { DetailGrid } from "@/components/sections/DetailGrid";
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
  const { hero, story, missionVision, values, purpose, band } = about;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: about.seo.title, path: PATH }])} />
      <PageHero content={hero} />

      <section id="our-story" aria-labelledby="story-title" className="bg-canvas section-y">
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

      {/* Mission & vision */}
      <section
        aria-label="Mission and vision"
        className="border-t border-line bg-canvas py-20 lg:py-28"
      >
        <div className="container-site grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Sticker3D
            name="rings"
            sizes="(min-width: 1024px) 420px, 70vw"
            className="mx-auto w-4/5 max-w-md"
          />
          <div className="grid gap-5">
            {missionVision.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <article
                  className={
                    i === 0
                      ? "rounded-card bg-brand-deep-fill p-7 sm:p-9"
                      : "rounded-card border border-line bg-surface p-7 sm:p-9"
                  }
                >
                  <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl">
                    {item.title}
                  </h2>
                  <p
                    className={
                      i === 0
                        ? "mt-3 leading-relaxed text-white/90"
                        : "mt-3 leading-relaxed text-muted"
                    }
                  >
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Block id="values" heading={values}>
        <DetailGrid items={values.items} columns={3} />
      </Block>

      <section id="our-purpose" aria-labelledby="purpose-title" className="bg-soft py-16 lg:py-20">
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
        <CTABand id="performance" {...band} />
      </Reveal>
    </>
  );
}
