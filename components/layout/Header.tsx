import { Mail } from "lucide-react";
import NextLink from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SearchButton } from "@/components/search/SearchButton";
import { site } from "@/content/site";
import { getSearchIndex } from "@/lib/search-index";
import { MegaNav } from "./MegaNav";
import { MobileNav } from "./MobileNav";

/** Sticky solid-black header: logo with the menus beside it; search and contact on the right. */
export function Header() {
  return (
    <header className="header-shadow sticky top-0 z-40 border-b border-white/10 bg-black">
      <div className="container-site flex h-(--header-h) items-center justify-between gap-6">
        <div className="flex items-center gap-6 xl:gap-10">
          <NextLink href="/" className="-m-1 shrink-0 rounded-md p-1" aria-label="XBPL home">
            <Logo id="header-logo" variant="on-dark" title={null} className="h-10 w-auto sm:h-11" />
          </NextLink>
          <nav aria-label="Main" className="hidden lg:block">
            <MegaNav items={site.nav} />
          </nav>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <SearchButton index={getSearchIndex()} copy={site.search} />
          <NextLink
            href={site.headerCta.href}
            aria-label={site.headerCta.label}
            title={site.headerCta.label}
            className="hidden size-11 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 sm:inline-flex"
          >
            <Mail aria-hidden className="size-[1.35rem]" strokeWidth={1.6} />
          </NextLink>
          <MobileNav items={site.nav} cta={site.headerCta} />
        </div>
      </div>
    </header>
  );
}
