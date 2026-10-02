import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  [
    "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap",
    "transition-[background,box-shadow,color,border-color,transform] duration-200 ease-out-soft",
    "disabled:pointer-events-none disabled:opacity-60",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-white shadow-[0_8px_20px_-10px_rgb(6_99_212/0.7)] [background:var(--gradient-primary)]",
          "hover:-translate-y-px hover:shadow-glow hover:[background:var(--gradient-primary-hover)]",
        ],
        outline:
          "border border-ink/20 bg-white text-ink hover:border-brand-text hover:text-brand-text",
        "outline-light":
          "border border-white/45 bg-white/5 text-white backdrop-blur-sm hover:border-cyan hover:bg-white/10",
        link: "rounded-sm px-0 text-brand-text hover:text-brand-deep",
        "link-light": "rounded-sm px-0 text-cyan-soft hover:text-white",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[0.95rem]",
      },
    },
    compoundVariants: [{ variant: ["link", "link-light"], className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
    />
  );
}

type ButtonProps = ComponentProps<"button"> & Variants & { arrow?: boolean };

export function Button({ variant, size, arrow, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> &
  Variants & { href: string; arrow?: boolean; children: ReactNode };

/** A link styled as a button. External links open in the same tab unless `target` is set. */
export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <NextLink className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </NextLink>
  );
}
