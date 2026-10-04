import { Block } from "@/components/sections/Block";
import { CTABand } from "@/components/sections/CTABand";
import { DetailGrid } from "@/components/sections/DetailGrid";
import { PageHero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { managedServices } from "@/content/pages/managed-services";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/managed-services";
export const metadata = buildMetadata({ ...managedServices.seo, path: PATH });

export default function ManagedServicesPage() {
  const { hero, intro, features, cta } = managedServices;
  const { paragraphs, ...introHeading } = intro;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: managedServices.seo.title, path: PATH }])} />
      <PageHero content={hero} />

      <Block id="intro" heading={introHeading} paragraphs={paragraphs}>
        <DetailGrid items={features.items} columns={4} numbered />
      </Block>

      <CTABand id="managed-cta" {...cta} />
    </>
  );
}
