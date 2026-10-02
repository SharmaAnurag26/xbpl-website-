"use client";

import { useEffect } from "react";
import { StatusPanel } from "@/components/sections/StatusPanel";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPanel
      code="Oops"
      title="Something went wrong."
      body="An unexpected error occurred while loading this page. Please try again; if it keeps happening, let us know."
    >
      <Button size="lg" onClick={reset}>
        Try again
      </Button>
      <ButtonLink href="/" size="lg" variant="outline-light">
        Back to home
      </ButtonLink>
    </StatusPanel>
  );
}
