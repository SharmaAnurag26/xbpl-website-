import type { ReactNode } from "react";

/** Full-width dark panel used by the 404 and error pages. */
export function StatusPanel({
  code,
  title,
  body,
  children,
}: {
  code: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section className="surface-dark relative isolate overflow-hidden bg-hero">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark opacity-60" />
      <div className="container-site flex min-h-[60svh] flex-col justify-center py-20">
        <p className="text-gradient font-display text-7xl font-extrabold sm:text-8xl" aria-hidden>
          {code}
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-lg text-on-dark-muted">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}
