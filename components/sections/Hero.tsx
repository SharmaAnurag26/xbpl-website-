import { ImageSlot } from "@/components/media/ImageSlot";
import { ButtonLink } from "@/components/ui/Button";
import type { HomeHeroContent, PageHeroContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { KeywordLadder } from "./KeywordLadder";

/** Renders `text` with the first occurrence of `highlight` in the brand gradient. */
function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, ...rest] = text.split(highlight);
  return (
    <>
      {before}
      <span className="text-gradient">{highlight}</span>
      {rest.join(highlight)}
    </>
  );
}

/* --------------------------------------------------------------------------
   Home hero: full-bleed photograph with a left scrim, giant display type.
   -------------------------------------------------------------------------- */
export function HomeHero({ content }: { content: HomeHeroContent }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="surface-dark relative isolate flex min-h-[clamp(36rem,88svh,48rem)] items-center overflow-hidden bg-navy"
    >
      <ImageSlot
        slot={content.image.slot}
        alt={content.image.alt}
        fill
        priority
        sizes="100vw"
        position="70% 50%"
        className="-z-20"
      />
      {/* Scrim keeps the copy readable on any photograph. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(6_22_46/0.94)_0%,rgb(6_22_46/0.82)_38%,rgb(6_22_46/0.25)_70%,rgb(6_22_46/0.1)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(6_22_46/0.55)_0%,rgb(6_22_46/0.88)_55%,rgb(6_22_46/0.95)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark opacity-40" />

      <div className="relative container-site py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-5 text-eyebrow font-semibold text-cyan-soft uppercase lg:hidden">
            {content.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.9rem,9vw,5.6rem)] leading-[0.95] font-extrabold tracking-tight text-white uppercase"
          >
            {content.display.map((word) => (
              <span key={word} className="block">
                {word.replace(/\.$/, "")}
                <span className="text-cyan">.</span>
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-xl font-display text-xl leading-snug font-semibold text-white sm:text-2xl">
            <Highlighted text={content.headline} highlight={content.highlight} />
          </p>
          <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-on-dark-muted sm:text-base">
            {content.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {content.ctas.map((cta) => (
              <ButtonLink
                key={cta.label}
                href={cta.href}
                size="lg"
                variant={cta.variant === "outline" ? "outline-light" : "primary"}
              >
                {cta.label}
              </ButtonLink>
            ))}
          </div>
        </div>
        <KeywordLadder
          items={content.ladder}
          className="absolute top-16 right-(--gutter) hidden lg:block"
        />
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Page hero: navy gradient, copy left, image right fading into the gradient.
   -------------------------------------------------------------------------- */
export function PageHero({
  content,
  compact = false,
}: {
  content: PageHeroContent;
  compact?: boolean;
}) {
  return (
    <section
      aria-labelledby="hero-title"
      className="surface-dark relative isolate overflow-hidden bg-hero"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark opacity-60" />
      <div
        aria-hidden
        className="absolute -top-1/3 right-0 -z-10 h-[140%] w-2/3 animate-glow-drift rounded-full bg-[radial-gradient(closest-side,rgb(8_121_249/0.35),transparent)] motion-reduce:animate-none"
      />

      <div
        className={cn(
          "relative container-site grid items-center lg:min-h-[30rem]",
          compact ? "py-14 lg:py-16" : "py-14 lg:py-20",
        )}
      >
        <div className="max-w-xl lg:max-w-[34rem]">
          <h1 id="hero-title" className="font-display font-bold text-white">
            {content.keyword ? (
              <span className="mb-2 block text-gradient text-[clamp(2.75rem,7vw,4.25rem)] leading-none font-extrabold tracking-tight uppercase">
                {content.keyword}
              </span>
            ) : null}
            <span
              className={cn(
                "block leading-tight",
                content.keyword
                  ? "text-[clamp(1.5rem,3.2vw,2.1rem)]"
                  : "text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.1]",
              )}
            >
              {content.title}
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-on-dark-muted sm:text-base">
            {content.body}
          </p>
          {content.cta ? (
            <ButtonLink href={content.cta.href} size="lg" arrow className="mt-8">
              {content.cta.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>

      {/* One image: stacked under the copy on small screens, filling the right side
          (fading into the gradient) from lg up. */}
      <div className="relative aspect-[16/9] max-h-80 w-full [mask-image:linear-gradient(180deg,transparent_0%,#000_30%)] lg:absolute lg:inset-y-0 lg:right-0 lg:-z-10 lg:aspect-auto lg:max-h-none lg:w-[58%] lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_32%)]">
        <ImageSlot
          slot={content.image.slot}
          alt={content.image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
      </div>
      {content.ladder ? (
        <KeywordLadder
          items={content.ladder}
          className="absolute right-4 bottom-5 sm:right-6 lg:right-10 lg:bottom-10"
        />
      ) : null}
    </section>
  );
}
