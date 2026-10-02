import type { MDXComponents } from "mdx/types";
import NextLink from "next/link";
import type { ComponentProps } from "react";

/** Internal links use client-side navigation; external links open safely in a new tab. */
function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

// Typography itself comes from the `prose` wrapper on the article page.
const components: MDXComponents = { a: MdxLink };

export function useMDXComponents(): MDXComponents {
  return components;
}
