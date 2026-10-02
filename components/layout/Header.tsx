import NextLink from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="header-shadow sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="container-site flex h-(--header-h) items-center justify-between gap-6">
        <NextLink href="/" className="-m-1 shrink-0 rounded-md p-1" aria-label="XBPL home">
          <Logo id="header-logo" title={null} className="h-10 w-auto sm:h-11" />
        </NextLink>
        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks links={site.nav} />
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href={site.headerCta.href} size="sm" className="hidden sm:inline-flex">
            {site.headerCta.label}
          </ButtonLink>
          <MobileNav links={site.nav} cta={site.headerCta} />
        </div>
      </div>
    </header>
  );
}
