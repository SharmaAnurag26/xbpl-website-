import { LegalDocument } from "@/components/sections/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { privacy } from "@/content/pages/legal";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

const PATH = "/privacy";
export const metadata = buildMetadata({ ...privacy.seo, path: PATH });

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: privacy.title, path: PATH }])} />
      <LegalDocument doc={privacy} />
    </>
  );
}
