import { cn } from "@/lib/cn";
import { icons, type IconName } from "@/lib/icons";

/** The small rounded icon square used across the site. */
export function IconTile({
  icon,
  tone = "light",
  size = "md",
  className,
}: {
  icon: IconName;
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}) {
  const Icon = icons[icon];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-tile transition-colors duration-300",
        size === "lg" ? "size-14" : "size-12",
        tone === "dark"
          ? "border border-cyan/30 bg-white/5 text-cyan-soft shadow-[inset_0_0_16px_rgb(8_207_227/0.15)]"
          : "bg-tile text-brand",
        className,
      )}
    >
      <Icon className={size === "lg" ? "size-7" : "size-6"} strokeWidth={1.6} />
    </span>
  );
}
