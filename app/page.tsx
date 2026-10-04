import { Bento } from "@/components/genz/Bento";
import { AudienceSplit } from "@/components/learning/AudienceSplit";
import { CourseCard } from "@/components/learning/CourseCard";
import { Block } from "@/components/sections/Block";
import { Marquee } from "@/components/genz/Marquee";
import { LogoWall, Testimonials } from "@/components/genz/SocialProof";
import { Reveal } from "@/components/motion/Reveal";
import { CTABand } from "@/components/sections/CTABand";
import { FeatureTile } from "@/components/sections/FeatureTile";
import { HomeHero } from "@/components/sections/Hero";
import { PillarTiles } from "@/components/sections/PillarTiles";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { StatBar } from "@/components/sections/StatBar";
import { home } from "@/content/pages/home";
import { learning } from "@/content/pages/learning";
import { icons } from "@/lib/icons";
import { categoryLabel, getArticles } from "@/lib/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...home.seo, path: "/", absoluteTitle: true });

export default function HomePage() {
  const {
    hero,
    stats,
    priorities,
    featuredCta,
    latestInsights,
    connected,
    whyChoose,
    cta,
    tickerLabel,
    audiences,
    popularCourses,
    formats,
    clients,
    testimonials,
  } = home;
  const insights = getArticles().slice(0, 4);

  return (
    <>
      <HomeHero content={hero} />
      <Marquee label={tickerLabel} items={learning.areas.items.map((a) => a.title)} />

      <Block id="learn" heading={audiences}>
        <AudienceSplit items={audiences.items} />
      </Block>

      <Block id="popular-courses" heading={popularCourses}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {learning.courses.items.map((course, i) => (
            <li key={course.slug}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <CourseCard course={course} formats={learning.courses.formats} />
              </Reveal>
            </li>
          ))}
        </ul>
        <ButtonLink href={popularCourses.cta.href} variant="outline-light" arrow className="mt-10">
          {popularCourses.cta.label}
        </ButtonLink>
      </Block>

      {/* Featured grid: three priorities + a call to action, then the latest insights. */}
      <section
        id="solutions"
        aria-labelledby="solutions-title"
        className="bg-canvas pt-20 pb-16 lg:pt-28"
      >
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="solutions-title"
              eyebrow={priorities.eyebrow}
              title={priorities.title}
              intro={priorities.intro}
            />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {priorities.cards.map((card, i) => (
              <li key={card.keyword}>
                <Reveal delay={i * 0.06} className="h-full">
                  <FeatureTile
                    eyebrow={`${card.keyword} · ${card.title}`}
                    title={card.description}
                    href={card.link.href}
                    image={card.image}
                    linkLabel={card.link.label}
                  />
                </Reveal>
              </li>
            ))}
            <li>
              <Reveal delay={0.18} className="h-full">
                <FeatureTile
                  eyebrow={featuredCta.eyebrow}
                  title={featuredCta.title}
                  href={featuredCta.href}
                  linkLabel={featuredCta.linkLabel}
                  tone="brand"
                />
              </Reveal>
            </li>
            {insights.map((article, i) => (
              <li key={article.slug}>
                <Reveal delay={i * 0.06} className="h-full">
                  <FeatureTile
                    eyebrow={`${latestInsights.eyebrow} · ${article.tag ?? categoryLabel(article.category)}`}
                    title={article.title}
                    href={`/insights/${article.slug}`}
                    image={i === 2 ? undefined : { slot: article.cover, alt: article.coverAlt }}
                    tone="cyan"
                    linkLabel={latestInsights.linkLabel}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="border-y border-line">
        <StatBar label={stats.label} stats={stats.items} />
      </div>

      {/* Ways to learn: bento grid with 3D visuals. */}
      <section aria-labelledby="formats-title" className="bg-canvas py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading
                id="formats-title"
                eyebrow={formats.eyebrow}
                title={formats.title}
                intro={formats.intro}
              />
            </Reveal>
            {formats.cta ? (
              <ButtonLink
                href={formats.cta.href}
                variant="outline-light"
                arrow
                className="rounded-full"
              >
                {formats.cta.label}
              </ButtonLink>
            ) : null}
          </div>
          <div className="mt-12">
            <Bento items={formats.items} />
          </div>
        </div>
      </section>

      {/* People. Technology. Security. */}
      <section aria-labelledby="connected-title" className="bg-canvas py-24 lg:py-32">
        <div className="container-site">
          <Reveal>
            <h2
              id="connected-title"
              className="mx-auto max-w-4xl text-center font-display text-[2.4rem] leading-[1.02] font-medium tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.5rem]"
            >
              {connected.title}
              <span className="mt-3 block text-gradient">{connected.subtitle}</span>
            </h2>
          </Reveal>
          <div className="mt-16 lg:mt-24">
            <PillarTiles items={connected.pillars} />
          </div>
        </div>
      </section>

      {/* Why organizations choose XBPL: numbered editorial list. */}
      <section
        aria-labelledby="why-title"
        className="border-t border-line bg-canvas py-20 lg:py-28"
      >
        <div className="container-site">
          <Reveal>
            <SectionHeading id="why-title" title={whyChoose.title} />
          </Reveal>
          <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
            {whyChoose.items.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <li
                  key={item.title}
                  className="flex flex-col gap-10 border-b border-line py-8 sm:pr-6 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-medium text-brand-text tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon aria-hidden className="size-6 text-muted" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl leading-snug font-medium tracking-[-0.01em] text-ink">
                    {item.title}
                  </h3>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <LogoWall section={clients} />
      <Testimonials section={testimonials} />
      <CTABand id="next-priority" {...cta} />
    </>
  );
}
