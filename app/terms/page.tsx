import { LegalDocument } from "@/components/sections/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { terms } from "@/content/pages/legal";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/terms";
export const metadata = buildMetadata({ ...terms.seo, path: PATH });

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: terms.title, path: PATH }])} />
      <LegalDocument doc={terms} />
    </>
  );
}
