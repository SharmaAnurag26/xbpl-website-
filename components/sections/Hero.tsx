import { ImageSlot } from "@/components/media/ImageSlot";
import { ButtonLink } from "@/components/ui/Button";
import type { HomeHeroContent, PageHeroContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { RotatingBadge } from "@/components/genz/RotatingBadge";
import { Sticker3D } from "@/components/genz/Sticker3D";
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
   Home hero: oversized headline left, 3D brand composition right
   (extruded X, orbiting objects, spinning badge) on a glowing, grainy canvas.
   -------------------------------------------------------------------------- */
export function HomeHero({ content }: { content: HomeHeroContent }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="surface-dark relative isolate overflow-hidden bg-canvas"
    >
      {/* Background: faint skyline, colour glows, grain. */}
      <div className="absolute inset-0 -z-30 [mask-image:linear-gradient(180deg,transparent_0%,#000_40%,transparent_100%)] opacity-30">
        <ImageSlot
          slot={content.image.slot}
          alt={content.image.alt}
          fill
          sizes="100vw"
          position="70% 60%"
        />
      </div>
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] -z-20 size-[46rem] rounded-full bg-[radial-gradient(closest-side,rgb(8_121_249/0.55),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute bottom-[-20%] left-[-10%] -z-20 size-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(8_207_227/0.28),transparent)] blur-2xl"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grain opacity-[0.18]" />

      <div className="relative container-site grid items-center gap-6 py-14 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[1.15fr_0.85fr] lg:py-10">
        <div>
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur">
            <span
              aria-hidden
              className="size-2 rounded-full bg-volt shadow-[0_0_12px_var(--color-volt)]"
            />
            {content.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="font-display text-[clamp(3rem,min(10.5vw,calc((100svh-34rem)/2.4)),8.5rem)] leading-[0.9] font-medium tracking-[-0.05em] text-white"
          >
            {content.display.map((word, i) => (
              <span
                key={word}
                className={cn("block", i === content.display.length - 1 && "text-gradient")}
              >
                {word.replace(/\.$/, "")}
                <span className={i === content.display.length - 1 ? "text-volt" : "text-cyan"}>
                  .
                </span>
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-snug text-white sm:text-2xl [@media(min-height:900px)]:mt-8">
            <Highlighted text={content.headline} highlight={content.highlight} />
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">{content.body}</p>
          <div className="mt-7 flex flex-wrap gap-3 [@media(min-height:900px)]:mt-9">
            {content.ctas.map((cta) => (
              <ButtonLink
                key={cta.label}
                href={cta.href}
                size="lg"
                arrow={cta.variant !== "outline"}
                variant={cta.variant === "outline" ? "outline-light" : "primary"}
                className="rounded-full"
              >
                {cta.label}
              </ButtonLink>
            ))}
          </div>
        </div>

        {/* 3D composition (decorative). */}
        <div
          aria-hidden
          className="relative mx-auto aspect-square w-full max-w-[34rem] lg:w-[min(100%,calc(100svh-var(--header-h)-5rem))] lg:max-w-none"
        >
          <div className="absolute inset-[8%] rounded-full border border-white/10" />
          <div className="absolute inset-[20%] rounded-full border border-dashed border-white/10" />
          <Sticker3D
            name="x-mark"
            priority
            sizes="(min-width: 1024px) 40vw, 85vw"
            className="absolute top-1/2 left-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2"
          />
          <Sticker3D
            name="blob"
            sizes="160px"
            delay={1.2}
            className="absolute top-[6%] left-[8%] w-[15%]"
          />
          <Sticker3D
            name="capsules"
            sizes="180px"
            delay={2.4}
            className="absolute right-[4%] bottom-[10%] w-[18%]"
          />
          <RotatingBadge
            text={`${content.ladder.slice(0, 3).join(" • ")} • `}
            className="absolute bottom-[2%] left-[0%] hidden sm:grid"
          />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Page hero: black canvas, large title left, artwork filling the right side.
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
      className="surface-dark relative isolate overflow-hidden bg-canvas"
    >
      <div
        className={cn(
          "relative container-site grid items-center",
          compact ? "py-16 lg:min-h-[30rem] lg:py-20" : "py-16 lg:min-h-[38rem] lg:py-24",
        )}
      >
        <div className="max-w-2xl lg:max-w-[40rem]">
          <h1 id="hero-title" className="font-display text-white">
            {content.keyword ? (
              <span className="mb-6 block text-gradient text-eyebrow font-semibold tracking-[0.2em] uppercase">
                {content.keyword}
              </span>
            ) : null}
            <span className="block text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[1.02] font-medium tracking-[-0.035em]">
              {content.title}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {content.body}
          </p>
          {content.cta ? (
            <ButtonLink href={content.cta.href} size="lg" arrow className="mt-9">
              {content.cta.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>

      {/* One image: stacked under the copy on small screens, filling the right side
          (fading into black) from lg up. */}
      <div className="relative aspect-[16/9] max-h-96 w-full [mask-image:linear-gradient(180deg,transparent_0%,#000_25%)] lg:absolute lg:inset-y-0 lg:right-0 lg:-z-10 lg:aspect-auto lg:max-h-none lg:w-[60%] lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_40%)]">
        <ImageSlot
          slot={content.image.slot}
          alt={content.image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
      </div>
      {content.ladder ? (
        <KeywordLadder
          items={content.ladder}
          className="absolute right-4 bottom-5 sm:right-6 lg:right-10 lg:bottom-10"
        />
      ) : null}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line" />
    </section>
  );
}
