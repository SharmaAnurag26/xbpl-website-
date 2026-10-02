import { CountUp } from "@/components/motion/CountUp";
import type { Stat } from "@/content/types";
import { cn } from "@/lib/cn";

export function StatBar({ stats, label }: { stats: Stat[]; label: string }) {
  return (
    <section aria-label={label} className="relative z-10 bg-white">
      <div className="container-site">
        <dl className="grid grid-cols-2 gap-y-8 border-b border-line py-9 lg:grid-cols-4 lg:py-10">
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
              <dt className="order-2 text-sm leading-snug text-muted">{stat.label}</dt>
              <dd className="order-1 font-display text-xl font-bold text-ink sm:text-2xl lg:text-[1.7rem]">
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
