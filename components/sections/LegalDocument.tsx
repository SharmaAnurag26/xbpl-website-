import type { LegalPageContent } from "@/content/types";
import { formatDate } from "@/lib/format";

export function LegalDocument({ doc }: { doc: LegalPageContent }) {
  return (
    <>
      <header className="surface-dark bg-hero">
        <div className="container-site max-w-4xl py-14 lg:py-20">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">{doc.title}</h1>
          <p className="mt-3 text-sm text-on-dark-muted">
            Last updated <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
          </p>
        </div>
      </header>
      <div className="container-site max-w-4xl py-12 lg:py-16">
        <div className="prose max-w-[70ch] text-ink prose-slate prose-headings:font-display prose-headings:text-ink prose-a:text-brand-text">
          <p className="lead">{doc.intro}</p>
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.list ? (
                <ul>
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
