import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = { as?: T } & Omit<ComponentProps<T>, "as">;

export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cn("container-site", className)} {...props} />;
}

type SectionProps = ComponentProps<"section"> & {
  tone?: "white" | "soft";
};

/** Standard vertical rhythm for light content sections. */
export function Section({ tone = "white", className, ...props }: SectionProps) {
  return (
    <section
      className={cn("section-y", tone === "soft" ? "bg-soft" : "bg-white", className)}
      {...props}
    />
  );
}
