import type { FeatureItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { IconTile } from "./IconTile";

/** Borderless icon + short label (approach steps, reasons, pillars). */
export function FeatureIconCard({
  item,
  tone = "light",
  layout = "stacked",
  bordered = false,
}: {
  item: FeatureItem;
  tone?: "light" | "dark";
  /** `stacked`: icon above, centred. `inline`: icon left of text (band pillars). */
  layout?: "stacked" | "inline";
  bordered?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "group flex h-full",
        layout === "stacked"
          ? "flex-col items-center gap-3 text-center"
          : "items-center gap-4 text-left",
        bordered &&
          "rounded-card border border-line bg-white px-3 py-6 shadow-card transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover",
      )}
    >
      <IconTile
        icon={item.icon}
        tone={tone}
        className={cn(
          !dark && "group-hover:bg-brand group-hover:text-white",
          layout === "inline" && dark && "rounded-full",
        )}
      />
      <div>
        <h3
          className={cn(
            "font-display text-[0.92rem] leading-snug font-semibold",
            dark ? "text-white" : "text-ink",
          )}
        >
          {item.title}
        </h3>
        {item.description ? (
          <p
            className={cn(
              "mt-1 text-[0.82rem] leading-snug",
              dark ? "text-on-dark-muted" : "text-muted",
            )}
          >
            {item.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
