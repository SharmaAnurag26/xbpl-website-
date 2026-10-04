import { Faq } from "@/components/genz/Faq";
import { Marquee } from "@/components/genz/Marquee";
import { CategoryTabs } from "@/components/insights/CategoryTabs";
import { CourseCard } from "@/components/learning/CourseCard";
import { Block } from "@/components/sections/Block";
import { CTABand } from "@/components/sections/CTABand";
import { PageHero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { courses } from "@/content/pages/courses";
import { learning } from "@/content/pages/learning";
import { absoluteUrl, breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/courses";
export const metadata = buildMetadata({ ...courses.seo, path: PATH });

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function CoursesPage() {
  const { hero, catalogue, cta } = courses;
  const items = learning.courses.items;
  const categories = [...new Set(items.map((c) => c.category))].map((label) => ({
    id: slug(label),
    label,
  }));

  // schema.org Course list helps search engines show the catalogue.
  const courseLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: c.title,
        description: c.summary,
        url: absoluteUrl(PATH),
        provider: { "@id": absoluteUrl("/#organization") },
      },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: courses.seo.title, path: PATH }]), courseLd]} />
      <PageHero content={hero} />
      <Marquee label="Technology areas" items={learning.areas.items.map((a) => a.title)} />

      <Block id="catalogue" heading={catalogue}>
        <CategoryTabs
          label={catalogue.filterLabel}
          noun={{ one: "course", many: "courses" }}
          categories={categories}
          items={items.map((course) => ({
            id: course.slug,
            category: slug(course.category),
            card: (
              <CourseCard
                course={course}
                formats={learning.courses.formats}
                enquireLabel={catalogue.enquireLabel}
                headingLevel="h3"
              />
            ),
          }))}
        />
      </Block>

      <Faq faq={learning.faq} id="courses-faq" />

      <CTABand id="courses-cta" {...cta} />
    </>
  );
}
