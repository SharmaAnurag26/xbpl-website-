import type { TechLogo } from "@/content/types";

/**
 * Technology ecosystem strip. Renders neutral typographic names by default; to show
 * official marks, add `src` (e.g. "/tech/aws.svg") once usage rights are confirmed.
 */
export function TechLogoStrip({ logos, label }: { logos: TechLogo[]; label: string }) {
  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {logos.map((logo) => (
        <li
          key={logo.key}
          className="flex h-20 items-center justify-center rounded-tile border border-line bg-white px-4 text-center shadow-card transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand/30"
        >
          {logo.src ? (
            // Plain <img>: vendor SVGs are tiny and need no optimisation.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.src}
              alt={logo.name}
              className="max-h-9 w-auto max-w-full"
              loading="lazy"
            />
          ) : (
            <span className="font-display text-[0.95rem] font-semibold tracking-tight text-ink/75">
              {logo.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
