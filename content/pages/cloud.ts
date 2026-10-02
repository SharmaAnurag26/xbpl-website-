import type { CloudPageContent } from "../types";

// Copy transcribed from reference/mockup.jpeg (03. Cloud page).
// TODO: verify wording against source copy.

export const cloud: CloudPageContent = {
  seo: {
    title: "Cloud Solutions",
    description:
      "XBPL helps organizations adopt, optimize and manage cloud environments aligned with their technology and business priorities.",
  },

  hero: {
    keyword: "Evolve",
    title: "Build a cloud environment ready to accelerate your business.",
    body: "XBPL helps organizations adopt, optimize and manage cloud environments aligned with their technology and business priorities.",
    ladder: ["Agile", "Scalable", "Resilient"],
    cta: { label: "Talk to Our Cloud Experts", href: "/contact?interest=cloud" },
    image: {
      slot: "cloud/hero",
      alt: "A glowing cloud of light above rows of data-centre servers",
    },
  },

  capabilities: {
    title: "Our Cloud Capabilities",
    intro: "End-to-end cloud solutions for your transformation journey.",
    items: [
      { icon: "file-search", title: "Cloud Advisory & Assessment" },
      { icon: "cloud-upload", title: "Cloud Migration" },
      { icon: "code", title: "Cloud Engineering" },
      { icon: "activity", title: "Cloud Operations" },
      { icon: "layers", title: "Managed Cloud Services" },
      { icon: "gauge", title: "Cloud Optimization" },
    ],
  },

  technologies: {
    title: "Leading Technologies",
    intro: "We work across leading cloud ecosystems to help you build, modernize and scale.",
    // TODO: confirm with client. Partner status and permission to show vendor logos.
    logos: [
      { key: "aws", name: "AWS" },
      { key: "azure", name: "Microsoft Azure" },
      { key: "google-cloud", name: "Google Cloud" },
      { key: "oracle", name: "Oracle Cloud" },
      { key: "vmware", name: "VMware" },
      { key: "redhat", name: "Red Hat" },
    ],
  },

  cta: {
    title: "From strategy to operations.\nWe help you evolve.",
    body: "Whether you are starting your cloud journey or looking to optimize an existing environment, XBPL can help.",
    cta: { label: "Discuss Your Cloud Strategy", href: "/contact?interest=cloud" },
    image: { slot: "cloud/cta", alt: "" },
  },
};
