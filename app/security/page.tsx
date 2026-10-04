import { Sticker3D } from "@/components/genz/Sticker3D";
import { Block } from "@/components/sections/Block";
import { CTABand } from "@/components/sections/CTABand";
import { DetailGrid } from "@/components/sections/DetailGrid";
import { PageHero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { security } from "@/content/pages/security";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/security";
export const metadata = buildMetadata({ ...security.seo, path: PATH });

export default function SecurityPage() {
  const { hero, intro, services, whyMatters, cta } = security;
  const { paragraphs, ...introHeading } = intro;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: security.seo.title, path: PATH }])} />
      <PageHero content={hero} />

      <section
        aria-labelledby="intro-title"
        className="border-t border-line bg-canvas py-20 lg:py-28"
      >
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="mb-3 text-eyebrow font-semibold text-brand-text uppercase">
              {introHeading.eyebrow}
            </p>
            <h2
              id="intro-title"
              className="font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-[2.6rem] lg:text-[3.2rem]"
            >
              {introHeading.title}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <Sticker3D
            name="shield"
            sizes="(min-width: 1024px) 360px, 60vw"
            className="mx-auto w-3/4 max-w-sm"
          />
        </div>
      </section>

      <Block id="capabilities" heading={services}>
        <DetailGrid items={services.items} columns={5} />
      </Block>

      <Block id="why" heading={whyMatters} tone="soft">
        <DetailGrid items={whyMatters.items} columns={5} numbered />
      </Block>

      <CTABand id="security-cta" {...cta} />
    </>
  );
}
