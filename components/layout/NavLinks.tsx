"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { Link } from "@/content/types";
import { cn } from "@/lib/cn";

export function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ links }: { links: Link[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1 xl:gap-2">
      {links.map((link) => {
        const active = isActivePath(pathname, link.href);
        return (
          <li key={link.href}>
            <NextLink
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors",
                "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-left after:rounded-full after:bg-brand",
                "after:scale-x-0 after:transition-transform after:duration-300 after:ease-out-soft",
                active
                  ? "text-brand-text after:scale-x-100"
                  : "text-ink/80 hover:text-ink hover:after:scale-x-100 hover:after:bg-line",
              )}
            >
              {link.label}
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
}
