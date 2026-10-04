import Image from "next/image";
import type { LogoSection, TestimonialSection } from "@/content/types";

/**
 * Client logo wall and testimonials. Both render nothing until real, approved content
 * is added to the content files, so the site never shows placeholder social proof.
 */
export function LogoWall({ section }: { section: LogoSection }) {
  if (section.logos.length === 0) return null;
  return (
    <section aria-label={section.title} className="border-t border-line bg-canvas py-16">
      <div className="container-site">
        <h2 className="text-center text-eyebrow font-semibold text-muted uppercase">
          {section.title}
        </h2>
        <ul className="mt-10 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {section.logos.map((logo) => (
            <li
              key={logo.name}
              className="flex justify-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-10 w-auto"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Testimonials({ section }: { section: TestimonialSection }) {
  if (section.items.length === 0) return null;
  return (
    <section
      aria-labelledby="testimonials-title"
      className="border-t border-line bg-canvas py-20 lg:py-28"
    >
      <div className="container-site">
        <h2
          id="testimonials-title"
          className="font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-5xl"
        >
          {section.title}
        </h2>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((t) => (
            <li
              key={t.name}
              className="flex flex-col justify-between gap-8 rounded-card border border-line bg-surface p-7"
            >
              <blockquote className="text-lg leading-relaxed text-white">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="text-sm">
                <span className="block font-semibold text-white">{t.name}</span>
                <span className="text-muted">
                  {t.role}, {t.company}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
