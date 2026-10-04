import type { FeatureItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";

const tones = [
  { bg: "bg-brand-deep-fill", text: "text-white", sub: "text-white/90" },
  { bg: "bg-cyan", text: "text-black", sub: "text-black/75" },
  { bg: "bg-navy-2", text: "text-white", sub: "text-white/75" },
];

// Staggered placement on wide screens (editorial "scattered tiles" layout).
const placement = [
  "lg:col-start-2 lg:col-end-6 lg:row-start-1",
  "lg:col-start-7 lg:col-end-11 lg:row-start-1 lg:mt-40",
  "lg:col-start-4 lg:col-end-8 lg:row-start-2 lg:-mt-10",
];

/** Three colour tiles (e.g. People / Technology / Security) scattered across the grid. */
export function PillarTiles({ items }: { items: FeatureItem[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-3 lg:grid-cols-12 lg:gap-6">
      {items.slice(0, 3).map((item, i) => {
        const Icon = icons[item.icon];
        const tone = tones[i % tones.length] ?? tones[0];
        return (
          <li
            key={item.title}
            className={cn(
              "relative isolate flex aspect-[16/11] flex-col justify-between overflow-hidden rounded-card p-6 sm:p-7",
              tone?.bg,
              placement[i],
            )}
          >
            <svg
              aria-hidden
              className={cn("absolute inset-0 -z-10 h-full w-full", tone?.sub, "opacity-30")}
              viewBox="0 0 320 220"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="60" cy="40" r="70" />
              <circle cx="270" cy="190" r="90" />
              <path d="M0 150 C 90 90, 170 210, 320 120" />
            </svg>
            <Icon aria-hidden className={cn("size-8", tone?.text)} strokeWidth={1.4} />
            <div>
              <h3
                className={cn("font-display text-2xl font-medium tracking-[-0.02em]", tone?.text)}
              >
                {item.title}
              </h3>
              {item.description ? (
                <p className={cn("mt-1 text-base", tone?.sub)}>{item.description}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
