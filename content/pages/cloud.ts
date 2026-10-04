import type { CloudPageContent } from "../types";

// Sources: xbpl.in/cloud.php (live site, lightly edited for grammar) and the redesign mockup.

export const cloud: CloudPageContent = {
  seo: {
    title: "Cloud Solutions",
    description:
      "Tailored managed cloud services from XBPL: deployment, migration, security, monitoring, backup and disaster recovery, with cost optimization and workload management built in.",
  },

  hero: {
    keyword: "Evolve · XBPL | Cloud",
    title: "Build a cloud environment ready to accelerate your business.",
    body: "Advanced cloud solutions that unlock cost optimization and workload-management excellence, so you get the full potential of the cloud on a budget that works.",
    ladder: ["Agile", "Scalable", "Resilient"],
    cta: { label: "Talk to Our Cloud Experts", href: "/contact?interest=cloud" },
    image: {
      slot: "cloud/hero",
      alt: "A glowing cloud of light above rows of data-centre servers",
    },
  },

  intro: {
    eyebrow: "Tailored managed cloud services",
    title: "Empowering businesses through the cloud.",
    paragraphs: [
      "Businesses increasingly rely on cloud computing to drive innovation, scalability and efficiency. XBPL offers comprehensive, tailored managed cloud services to take your organization further.",
      "Our services fine-tune your cloud infrastructure for optimal resource utilization, cost efficiency and streamlined workload management. We craft strategies that minimize spend while maximizing performance.",
    ],
  },

  platforms: {
    title: "Explore our services on",
    items: [
      { icon: "server", title: "Compute" },
      { icon: "database", title: "Database" },
      { icon: "hard-drive", title: "Storage" },
      { icon: "boxes", title: "Containers" },
      { icon: "app-window", title: "Web & Mobile Apps" },
      { icon: "zap", title: "Serverless" },
      { icon: "brain", title: "Machine Learning" },
    ],
  },

  services: {
    eyebrow: "End-to-end managed cloud services",
    title: "Everything your cloud needs, managed.",
    items: [
      {
        title: "Cloud Deployment",
        icon: "cloud-upload",
        description:
          "Strategic planning and implementation of applications, data and services on cloud infrastructure, scalable for evolving business needs.",
        bullets: [
          "Tailored cloud architecture design",
          "Efficient migration of applications and data",
          "Fast deployment with minimal downtime",
        ],
      },
      {
        title: "Cloud Security",
        icon: "shield-check",
        description:
          "Robust security measures, continuous monitoring and proactive incident response for data and applications in the cloud.",
        bullets: [
          "Multi-layered security protocols",
          "Threat detection and vulnerability assessments",
          "Compliance with industry regulations",
        ],
      },
      {
        title: "Network & Storage Management",
        icon: "network",
        description:
          "Optimized connectivity and storage so resources communicate seamlessly and capacity is used efficiently.",
        bullets: [
          "Efficient network resource management",
          "Strategic storage for data optimization",
        ],
      },
      {
        title: "Cloud Monitoring & Reporting",
        icon: "activity",
        description:
          "Real-time tracking of resources and performance to spot bottlenecks and enable data-driven decisions.",
        bullets: ["Real-time monitoring of cloud resources", "Customizable performance reporting"],
      },
      {
        title: "Backup & Disaster Recovery",
        icon: "lifebuoy",
        description:
          "Comprehensive backups and recovery plans that keep data available and minimize downtime when the unexpected happens.",
        bullets: ["Regular data backups", "Tailored disaster recovery plans"],
      },
      {
        title: "Infrastructure Setup & Optimization",
        icon: "wrench",
        description:
          "End-to-end setup of cloud resources with continuous optimization as your requirements change.",
        bullets: ["Efficient resource allocation", "Ongoing infrastructure optimization"],
      },
      {
        title: "Business Continuity Planning",
        icon: "building",
        description:
          "Strategic measures that keep critical business functions running during disruptions.",
        bullets: ["Proactive risk mitigation", "Continuity plans for critical functions"],
      },
      {
        title: "Cloud Migration",
        icon: "repeat",
        description:
          "Seamless transfer of applications, data and workflows to the cloud, planned to minimize downtime.",
        bullets: ["Methodical migration planning", "Minimal disruption to ongoing operations"],
      },
    ],
  },

  framework: {
    eyebrow: "XBPL Cloud Financial Optimization Framework",
    title: "No more unproductive cloud spending.",
    steps: [
      { title: "Cloud resource assessment" },
      { title: "Dynamic scaling strategies" },
      { title: "Reserved instances and savings plans" },
      { title: "Cloud cost analytics" },
      { title: "Spot instance utilization" },
      { title: "Data transfer and storage optimization" },
      { title: "Finely tuned monitoring and alerts" },
      { title: "Continuous review and improvement" },
    ],
    outcomes: ["Streamlined oversight", "Effortless administration", "Simplified governance"],
    closing:
      "Immediate cost savings today, and a foundation for sustained efficiency and innovation tomorrow.",
  },

  partner: {
    eyebrow: "Your reliable managed cloud service partner",
    title: "What you get with XBPL.",
    points: [
      "Cost-optimized cloud architecture",
      "Intelligent workload management",
      "Reserved instances and savings plans management",
      "Dedicated expert team",
      "Spot instance optimization",
      "Tagging and cost allocation",
      "Data transfer and storage optimization",
      "Cloud governance and compliance",
      "Transparent reporting and cost-optimization workshops",
      "Continuous monitoring and alerts",
      "FinOps practices integration",
      "Collaboration with cloud providers",
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

  engagement: {
    eyebrow: "7-step process",
    title: "Accelerate innovation, unleash potential.",
    steps: [
      { title: "Initial consultation" },
      { title: "Needs assessment" },
      { title: "Proposal and customized solution" },
      { title: "Collaboration and agreement" },
      { title: "Onboarding and planning" },
      { title: "Implementation and deployment" },
      { title: "Continuous communication and reporting" },
    ],
  },

  cta: {
    title: "From strategy to operations.\nWe help you evolve.",
    body: "Whether you are starting your cloud journey or looking to optimize an existing environment, XBPL can help.",
    cta: { label: "Discuss Your Cloud Strategy", href: "/contact?interest=cloud" },
    image: { slot: "cloud/cta", alt: "" },
  },
};
