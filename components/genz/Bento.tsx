import type { BentoItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import { Sticker3D } from "./Sticker3D";

const tones: Record<
  BentoItem["tone"],
  { card: string; title: string; text: string; icon: string }
> = {
  surface: {
    card: "border border-line bg-surface",
    title: "text-white",
    text: "text-muted",
    icon: "bg-white/10 text-cyan-soft",
  },
  brand: {
    card: "bg-brand-deep-fill",
    title: "text-white",
    text: "text-white/90",
    icon: "bg-white/15 text-white",
  },
  volt: {
    card: "bg-volt",
    title: "text-black",
    text: "text-black/75",
    icon: "bg-black/10 text-black",
  },
  cyan: {
    card: "bg-cyan",
    title: "text-black",
    text: "text-black/75",
    icon: "bg-black/10 text-black",
  },
};

// 4-column bento: one feature tile (2×2), then a mix of wide and square tiles.
const spans = [
  "sm:col-span-2 lg:row-span-2 min-h-[22rem] lg:min-h-0",
  "sm:col-span-2",
  "",
  "",
  "sm:col-span-2",
  "sm:col-span-2",
];

/** Mixed-size tile grid with optional 3D stickers. Used for learning formats. */
export function Bento({ items }: { items: BentoItem[] }) {
  return (
    <ul className="grid auto-rows-[minmax(13rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {items.map((item, i) => {
        const tone = tones[item.tone];
        const Icon = icons[item.icon];
        const feature = i === 0;
        return (
          <li
            key={item.title}
            className={cn(
              "group relative isolate flex flex-col justify-between overflow-hidden rounded-card p-6 transition-transform duration-500 ease-out-soft hover:-translate-y-1 sm:p-7",
              tone.card,
              spans[i % spans.length],
            )}
          >
            {item.sticker ? (
              <Sticker3D
                name={item.sticker}
                sizes={feature ? "240px" : "112px"}
                delay={i * 0.7}
                className={cn(
                  "absolute -z-10 transition-transform duration-700 group-hover:scale-105",
                  feature
                    ? "top-[24%] right-[5%] w-[40%] max-w-[15rem]"
                    : "-right-3 -bottom-4 w-28 opacity-95",
                )}
              />
            ) : null}
            <div className="flex items-start justify-between gap-4">
              <span className={cn("grid size-11 place-items-center rounded-full", tone.icon)}>
                <Icon aria-hidden className="size-5" strokeWidth={1.8} />
              </span>
              {item.tag ? (
                <span className="rounded-full bg-black px-3 py-1 text-[0.7rem] font-semibold tracking-[0.12em] text-volt uppercase">
                  {item.tag}
                </span>
              ) : null}
            </div>
            <div
              className={cn(
                "max-w-sm",
                feature && "lg:max-w-[58%]",
                item.sticker && !feature && "pr-20",
              )}
            >
              <h3
                className={cn(
                  "font-display font-medium tracking-[-0.02em]",
                  feature ? "text-3xl leading-[1.05] sm:text-4xl" : "text-xl leading-snug",
                  tone.title,
                )}
              >
                {item.title}
              </h3>
              <p
                className={cn("mt-2 leading-relaxed", feature ? "text-base" : "text-sm", tone.text)}
              >
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
