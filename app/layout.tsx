import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { ConsentManager } from "@/components/privacy/ConsentManager";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { publicEnv } from "@/lib/env";
import { organizationLd, websiteLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#06162e",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`}>
      <body className="flex min-h-svh flex-col">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer extra={<CookieSettingsButton />} />
        <ConsentManager />
      </body>
    </html>
  );
}
