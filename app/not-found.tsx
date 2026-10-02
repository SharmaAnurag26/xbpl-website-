import type { Metadata } from "next";
import { StatusPanel } from "@/components/sections/StatusPanel";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <StatusPanel
      code="404"
      title="This page has moved on."
      body="The page you're looking for doesn't exist or may have been moved. Let's get you back on track."
    >
      <ButtonLink href="/" size="lg" arrow>
        Back to home
      </ButtonLink>
      <ButtonLink href="/contact" size="lg" variant="outline-light">
        Contact us
      </ButtonLink>
    </StatusPanel>
  );
}
