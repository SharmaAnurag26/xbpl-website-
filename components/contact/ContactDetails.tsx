import { Mail, MapPin, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/brand/LinkedInIcon";
import type { ContactPageContent, SiteContent } from "@/content/types";

type ContactDetailsProps = {
  content: ContactPageContent["details"];
  contact: SiteContent["contact"];
  linkedin: string;
};

const iconWrap = "grid size-10 shrink-0 place-items-center rounded-tile bg-tile text-brand";

export function ContactDetails({ content, contact, linkedin }: ContactDetailsProps) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">{content.title}</h2>
      <p className="mt-1.5 text-sm text-muted">{content.intro}</p>

      <address className="mt-6 space-y-4 not-italic">
        <p className="flex gap-3">
          <span className={iconWrap}>
            <MapPin aria-hidden className="size-5" />
          </span>
          <span className="text-sm">
            <span className="block font-semibold text-ink">{contact.office.label}</span>
            {contact.office.lines.map((line) => (
              <span key={line} className="block text-muted">
                {line}
              </span>
            ))}
          </span>
        </p>
        <p className="flex items-center gap-3">
          <span className={iconWrap}>
            <Phone aria-hidden className="size-5" />
          </span>
          <a
            href={contact.phone.href}
            className="text-sm font-medium text-ink hover:text-brand-text"
          >
            <span className="sr-only">Phone: </span>
            {contact.phone.display}
          </a>
        </p>
        <p className="flex items-center gap-3">
          <span className={iconWrap}>
            <Mail aria-hidden className="size-5" />
          </span>
          <a
            href={`mailto:${contact.email}`}
            className="text-sm font-medium text-ink hover:text-brand-text"
          >
            <span className="sr-only">Email: </span>
            {contact.email}
          </a>
        </p>
      </address>

      <h3 className="mt-8 text-sm font-semibold text-ink">{content.followTitle}</h3>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex size-10 items-center justify-center rounded-lg bg-navy text-white transition-colors hover:bg-brand-text"
      >
        <LinkedInIcon className="size-[18px]" />
        <span className="sr-only">XBPL on LinkedIn (opens in a new tab)</span>
      </a>
    </div>
  );
}
