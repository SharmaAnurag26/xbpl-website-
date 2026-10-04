import NextLink from "next/link";
import type { ReactNode } from "react";
import { SocialLinks } from "@/components/brand/SocialLinks";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/content/site";

const linkClass = "rounded-sm text-sm text-muted transition-colors hover:text-brand-text";

/** `extra` renders list items in the legal row (used for the cookie-settings control). */
export function Footer({ extra }: { extra?: ReactNode }) {
  const year = new Date().getFullYear();
  const [quick, solutions] = site.footer.groups;

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_1fr_0.7fr] lg:gap-8 lg:py-14">
        <div>
          <NextLink href="/" className="inline-block rounded-md" aria-label="XBPL home">
            <Logo id="footer-logo" variant="on-dark" title={null} className="h-12 w-auto" />
          </NextLink>
          <p className="mt-5 max-w-xs text-sm text-muted">{site.description}</p>
        </div>

        {quick ? (
          <nav aria-labelledby="footer-quick">
            <h2 id="footer-quick" className="text-sm font-semibold text-ink">
              {quick.title}
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {quick.links.map((l) => (
                <li key={l.href}>
                  <NextLink href={l.href} className={linkClass}>
                    {l.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {solutions ? (
          <nav aria-labelledby="footer-solutions">
            <h2 id="footer-solutions" className="text-sm font-semibold text-ink">
              {solutions.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {solutions.links.map((l) => (
                <li key={l.label}>
                  <NextLink href={l.href} className={linkClass}>
                    {l.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div>
          <h2 className="text-sm font-semibold text-ink">Follow Us</h2>
          <SocialLinks links={site.social} className="mt-4" />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.footer.copyright}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {site.footer.legal.map((l) => (
              <li key={l.href}>
                <NextLink href={l.href} className={linkClass}>
                  {l.label}
                </NextLink>
              </li>
            ))}
            {extra}
          </ul>
        </div>
      </div>
    </footer>
  );
}
