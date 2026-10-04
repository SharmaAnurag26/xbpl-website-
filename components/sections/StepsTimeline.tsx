import type { StepItem } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Numbered process. Horizontal connected track on wide screens (≤ 4 per row),
 * vertical timeline on small screens. Semantic ordered list.
 */
export function StepsTimeline({ steps, label }: { steps: StepItem[]; label: string }) {
  return (
    <ol
      aria-label={label}
      className="relative grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-10"
    >
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-4 sm:flex-col sm:gap-5">
          {/* Number node + connector */}
          <div className="relative flex flex-col items-center sm:flex-row">
            <span
              className={cn(
                "relative z-10 grid size-12 shrink-0 place-items-center rounded-full font-display text-base font-semibold tabular-nums",
                i === steps.length - 1 ? "bg-volt text-black" : "bg-brand-deep-fill text-white",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 ? (
              <span
                aria-hidden
                className="w-px flex-1 bg-[linear-gradient(180deg,var(--color-brand),transparent)] sm:ml-3 sm:h-px sm:w-auto sm:bg-[linear-gradient(90deg,var(--color-brand),transparent)]"
              />
            ) : null}
          </div>
          <div className="pb-6 sm:pb-0">
            <h3 className="font-display text-lg leading-snug font-medium text-white first-letter:uppercase">
              {step.title}
            </h3>
            {step.bullets ? (
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {step.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span aria-hidden className="size-1 rounded-full bg-cyan-soft" />
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
