import { ArticleCard } from "@/components/insights/ArticleCard";
import { CategoryTabs } from "@/components/insights/CategoryTabs";
import { NewsletterForm } from "@/components/insights/NewsletterForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { insights } from "@/content/pages/insights";
import { categoryLabel, getArticles } from "@/lib/insights";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/insights";
export const metadata = buildMetadata({ ...insights.seo, path: PATH });

export default function InsightsPage() {
  const articles = getArticles();
  const { hero, categories, filterLabel, newsletter } = insights;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: insights.seo.title, path: PATH }])} />
      <PageHero content={hero} compact />

      <section aria-label="Articles" className="bg-white pt-10 pb-14 lg:pt-12 lg:pb-20">
        <div className="container-site">
          <CategoryTabs
            label={filterLabel}
            categories={categories}
            items={articles.map((article) => ({
              id: article.slug,
              category: article.category,
              card: (
                <ArticleCard
                  article={article}
                  categoryLabel={categoryLabel(article.category)}
                  headingLevel="h2"
                />
              ),
            }))}
          />
        </div>
      </section>

      <section aria-labelledby="newsletter-title" className="bg-white pb-16 lg:pb-24">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-col gap-6 rounded-band border border-line bg-soft px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-xl">
                <h2
                  id="newsletter-title"
                  className="font-display text-xl font-semibold text-ink sm:text-2xl"
                >
                  {newsletter.title}
                </h2>
                <p className="mt-1.5 text-sm text-muted sm:text-base">{newsletter.body}</p>
              </div>
              <NewsletterForm
                placeholder={newsletter.placeholder}
                submitLabel={newsletter.submitLabel}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
