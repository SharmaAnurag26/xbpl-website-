import { Bento } from "@/components/genz/Bento";
import { Faq } from "@/components/genz/Faq";
import { CourseCard } from "@/components/learning/CourseCard";
import { Reveal } from "@/components/motion/Reveal";
import { Block } from "@/components/sections/Block";
import { CTABand } from "@/components/sections/CTABand";
import { DetailGrid } from "@/components/sections/DetailGrid";
import { FeatureIconCard } from "@/components/sections/FeatureIconCard";
import { PageHero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { StepsTimeline } from "@/components/sections/StepsTimeline";
import { JsonLd } from "@/components/seo/JsonLd";
import { learning } from "@/content/pages/learning";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/learning";
export const metadata = buildMetadata({ ...learning.seo, path: PATH });

export default function LearningPage() {
  const { hero, intro, approach, courses, areas, whyChoose, engagement, process, faq } = learning;
  const { paragraphs, challenges, ...introHeading } = intro;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: learning.seo.title, path: PATH }])} />
      <PageHero content={hero} />

      <Block id="intro" heading={introHeading} paragraphs={paragraphs}>
        <DetailGrid items={challenges} columns={2} />
      </Block>

      <Block id="approach" heading={approach}>
        <Bento items={approach.items} />
      </Block>

      <Block id="courses" heading={courses}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.items.map((course, i) => (
            <li key={course.slug}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <CourseCard course={course} formats={courses.formats} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="areas" heading={areas}>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {areas.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={(i % 5) * 0.05} className="h-full">
                <FeatureIconCard item={item} bordered />
              </Reveal>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="why" heading={whyChoose}>
        <DetailGrid items={whyChoose.items} columns={5} numbered />
      </Block>

      <Block id="engagement" heading={engagement}>
        <StepsTimeline steps={engagement.steps} label={engagement.eyebrow ?? engagement.title} />
      </Block>

      <Faq faq={faq} id="learning-faq" />

      <CTABand id="capability" title={process.title} cta={process.cta} wideChildren>
        <ProcessSteps label={process.stepsLabel} steps={process.steps} />
      </CTABand>
    </>
  );
}
