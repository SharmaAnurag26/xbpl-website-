import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { LocationsMap } from "@/components/contact/LocationsMap";
import { PageHero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { contact } from "@/content/pages/contact";
import { site } from "@/content/site";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/contact";
export const metadata = buildMetadata({ ...contact.seo, path: PATH });

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: contact.seo.title, path: PATH }])} />
      <PageHero content={contact.hero} compact />

      <section aria-labelledby="form-title" className="bg-soft py-14 lg:py-20">
        <div className="container-site grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
          <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
            <h2 id="form-title" className="mb-1 font-display text-xl font-semibold text-ink">
              {contact.form.title}
            </h2>
            <ContactForm content={contact.form} />
          </div>
          <div className="space-y-8 rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
            <ContactDetails
              content={contact.details}
              contact={site.contact}
              linkedin={site.social.linkedin}
            />
            <LocationsMap title={contact.details.locationsTitle} locations={contact.locations} />
          </div>
        </div>
      </section>
    </>
  );
}
