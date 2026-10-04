"use client";

import { X } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { Logo } from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/Button";
import type { Link, NavItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/nav";

export type MobileDrawerProps = {
  items: NavItem[];
  cta: Link;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Where focus goes when the drawer closes (the menu button). */
  onCloseFocus: () => void;
};

/**
 * Slide-in drawer (Radix Dialog: focus trap, Escape to close, inert background).
 * Loaded on demand by MobileNav so its JS is not part of the initial page bundle.
 */
export default function MobileDrawer({
  items,
  cta,
  open,
  onOpenChange,
  onCloseFocus,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const close = () => onOpenChange(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=closed]:animate-[fade-out_200ms] data-[state=open]:animate-[fade-in_200ms]" />
        <Dialog.Content
          id="mobile-drawer"
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col bg-surface shadow-2xl outline-none",
            "data-[state=closed]:animate-[drawer-out_220ms_ease-in] data-[state=open]:animate-[drawer-in_280ms_var(--ease-out-soft)]",
          )}
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            onCloseFocus();
          }}
        >
          <div className="flex h-(--header-h) items-center justify-between border-b border-line px-4">
            <Logo id="drawer-logo" variant="on-dark" className="h-10 w-auto" />
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-lg text-white hover:bg-white/10"
              aria-label="Close menu"
            >
              <X aria-hidden className="size-6" />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Main menu</Dialog.Title>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-6">
              {items.map((item) => {
                const links = item.menu ? item.menu.links : [item];
                return (
                  <li key={item.label}>
                    {item.menu ? (
                      <p className="mb-2 px-3 text-eyebrow font-semibold text-cyan-soft uppercase">
                        {item.label}
                      </p>
                    ) : null}
                    <ul className="space-y-0.5">
                      {links.map((link) => {
                        const active = !/[?#]/.test(link.href) && isActivePath(pathname, link.href);
                        return (
                          <li key={link.href}>
                            <NextLink
                              href={link.href}
                              onClick={close}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex min-h-12 items-center rounded-lg px-3 font-display font-medium",
                                item.menu ? "text-lg" : "text-xl",
                                active ? "bg-tile text-brand-text" : "text-ink hover:bg-white/5",
                              )}
                            >
                              {link.label}
                            </NextLink>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-line p-4">
            <NextLink
              href={cta.href}
              onClick={close}
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              {cta.label}
            </NextLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
