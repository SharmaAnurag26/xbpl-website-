import type { LegalPageContent } from "../types";
import { site } from "../site";

// TODO: confirm with client. Both documents are starting templates written for this website's
// actual data flows (contact form, newsletter, consent-based analytics). They must be reviewed
// by XBPL's legal counsel before launch.

const UPDATED = "2026-10-02";

export const privacy: LegalPageContent = {
  seo: {
    title: "Privacy Policy",
    description: "How XBPL collects, uses and protects personal information on this website.",
  },
  title: "Privacy Policy",
  updated: UPDATED,
  intro: `This policy explains how ${site.name} ("we", "us") handles personal information collected through this website. We collect only what we need to respond to you and to run the site.`,
  sections: [
    {
      heading: "Information we collect",
      paragraphs: ["We collect information in the following ways:"],
      list: [
        "Contact form: your name, company, work email, phone number (optional), area of interest and message.",
        "Newsletter: your email address, if you choose to subscribe.",
        "Analytics: if, and only if, you accept analytics cookies, aggregated usage data such as pages visited, referring site, device type and approximate location derived from your IP address.",
        "Server logs: our hosting provider processes technical data (such as IP address and browser type) to deliver and secure the website.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We use your information to respond to enquiries, send the insights you subscribed to, understand how the website is used so we can improve it, and protect the website against abuse. We do not sell your personal information.",
      ],
    },
    {
      heading: "Legal basis and consent",
      paragraphs: [
        "We process enquiry and newsletter data on the basis of your consent and our legitimate interest in responding to you. Analytics run only after you give consent through the cookie banner, and you can withdraw consent at any time using the “Cookie settings” link in the footer.",
      ],
    },
    {
      heading: "Service providers",
      paragraphs: [
        "We use trusted providers to operate the website: website hosting, an email delivery service to transmit form submissions, and (with your consent) a web analytics service. These providers process data on our behalf and only for these purposes.",
      ],
    },
    {
      heading: "Retention",
      paragraphs: [
        "We keep enquiry information only as long as needed to respond and to maintain a record of our correspondence, and newsletter data until you unsubscribe.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Subject to applicable law, including India's Digital Personal Data Protection Act, 2023, you may request access to, correction of, or erasure of your personal information, and withdraw consent. Contact us using the details below.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "We protect this website with encrypted connections (HTTPS), strict security headers, server-side validation and rate limiting. No method of transmission over the internet is completely secure, but we work to protect your information.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`For privacy questions or requests, email ${site.contact.email}.`],
    },
  ],
};

export const terms: LegalPageContent = {
  seo: {
    title: "Terms of Use",
    description: "The terms that apply to your use of the XBPL website.",
  },
  title: "Terms of Use",
  updated: UPDATED,
  intro: `These terms apply to your use of this website, operated by ${site.name}. By using the website you agree to them.`,
  sections: [
    {
      heading: "Use of the website",
      paragraphs: [
        "You may browse and share content from this website for informational purposes. You must not misuse the website, attempt to gain unauthorized access, interfere with its operation, or submit unlawful or harmful content through its forms.",
      ],
    },
    {
      heading: "Content and intellectual property",
      paragraphs: [
        `The XBPL name, logo and website content are owned by or licensed to ${site.name}. Third-party names and trademarks referenced on the website belong to their respective owners and are used for identification only.`,
      ],
    },
    {
      heading: "No professional advice",
      paragraphs: [
        "Insights and other content are provided for general information. They do not constitute professional advice for your specific situation.",
      ],
    },
    {
      heading: "Links to other websites",
      paragraphs: [
        "The website may link to third-party websites. We are not responsible for their content or practices.",
      ],
    },
    {
      heading: "Disclaimer and liability",
      paragraphs: [
        "The website is provided “as is”. To the extent permitted by law, we are not liable for any loss arising from your use of, or inability to use, the website.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "We may update these terms from time to time. The date at the top of this page shows when they were last revised.",
      ],
    },
    {
      heading: "Governing law and contact",
      paragraphs: [
        `These terms are governed by the laws of India. Questions about them can be sent to ${site.contact.email}.`,
      ],
    },
  ],
};
