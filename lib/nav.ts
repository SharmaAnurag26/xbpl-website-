import type { NavItem } from "@/content/types";

/** Path part of an href ("/insights?category=x#y" → "/insights"). */
export const hrefPath = (href: string) => href.split(/[?#]/)[0] || "/";

/** True when `href` is the current page (or a parent section of it). */
export function isActivePath(pathname: string, href: string): boolean {
  const path = hrefPath(href);
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
}

/** A top-level item is active when the current page is the item or any page in its menu. */
export function isActiveItem(pathname: string, item: NavItem): boolean {
  if (isActivePath(pathname, item.href)) return true;
  return (item.menu?.links ?? []).some((l) => isActivePath(pathname, l.href));
}
