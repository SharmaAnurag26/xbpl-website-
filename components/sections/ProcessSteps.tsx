import type { ProcessStep } from "@/content/types";
import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";

// Chevron outlines: pointing down when stacked (mobile), right when in a row (sm+).
const shapeMobile =
  "[clip-path:polygon(0_0,50%_14px,100%_0,100%_calc(100%-14px),50%_100%,0_calc(100%-14px))]";
const shapeFirstMobile =
  "[clip-path:polygon(0_0,100%_0,100%_calc(100%-14px),50%_100%,0_calc(100%-14px))]";
const shapeRow =
  "sm:[clip-path:polygon(0_0,calc(100%-18px)_0,100%_50%,calc(100%-18px)_100%,0_100%,18px_50%)]";
const shapeFirstRow =
  "sm:[clip-path:polygon(0_0,calc(100%-18px)_0,100%_50%,calc(100%-18px)_100%,0_100%)]";

/** Learn > Practice > Apply > Assess > Reinforce, as connected chevrons on a dark band. */
export function ProcessSteps({ steps, label }: { steps: ProcessStep[]; label: string }) {
  return (
    <ol aria-label={label} className="grid gap-1 sm:grid-cols-5 sm:gap-0">
      {steps.map((step, i) => {
        const Icon = icons[step.icon];
        const shape = i === 0 ? cn(shapeFirstMobile, shapeFirstRow) : cn(shapeMobile, shapeRow);
        return (
          <li key={step.label} className={cn("relative bg-cyan/45 sm:-ml-2 sm:first:ml-0", shape)}>
            <div
              className={cn(
                "relative m-[1.5px] flex items-center justify-center gap-3 bg-[linear-gradient(180deg,#0b2a55,#081d3d)] px-6 py-5 sm:flex-col sm:gap-2 sm:py-6",
                shape,
              )}
            >
              <Icon
                aria-hidden
                className="size-7 text-cyan-soft drop-shadow-[0_0_10px_rgb(8_207_227/0.6)]"
                strokeWidth={1.5}
              />
              <span className="font-display text-sm font-semibold text-cyan-soft">
                <span className="sr-only">Step {i + 1}: </span>
                {step.label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
