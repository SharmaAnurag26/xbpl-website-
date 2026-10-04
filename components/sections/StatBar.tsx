import { CountUp } from "@/components/motion/CountUp";
import type { Stat } from "@/content/types";
import { cn } from "@/lib/cn";

export function StatBar({ stats, label }: { stats: Stat[]; label: string }) {
  return (
    <section aria-label={label} className="relative z-10 bg-canvas">
      <div className="container-site">
        <dl className="grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4 lg:py-20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              // 2 columns on mobile (divider before the right column), 4 on desktop
              // (divider before every column but the first).
              className={cn(
                "flex flex-col gap-1 pr-4",
                i % 2 === 1 && "border-l border-line pl-4 sm:pl-6",
                i % 2 === 0 && i > 0 && "lg:border-l lg:border-line lg:pl-6",
              )}
            >
              <dt className="order-2 mt-2 max-w-[16rem] text-sm leading-snug text-muted sm:text-base">
                {stat.label}
              </dt>
              <dd
                className={cn(
                  "order-1 font-display leading-none font-medium tracking-[-0.03em] text-ink",
                  stat.kind === "number"
                    ? "text-[1.9rem] sm:text-4xl lg:text-[3.25rem]"
                    : "text-xl sm:text-2xl lg:text-[1.9rem] lg:leading-[1.1]",
                )}
              >
                {stat.kind === "number" ? (
                  <CountUp value={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.title
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
