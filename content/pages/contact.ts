import type { ContactPageContent } from "../types";

// Copy transcribed from reference/mockup.jpeg (07. Contact page).
// TODO: verify wording against source copy.

export const contact: ContactPageContent = {
  seo: {
    title: "Contact Us",
    description:
      "Have a technology challenge, capability requirement or transformation initiative? Talk to XBPL about where you are today and where you want to go next.",
  },

  hero: {
    title: "Let's build what's next.",
    body: "Have a technology challenge, capability requirement or transformation initiative? Let's talk about where you are today, and where you want to go next.",
    image: {
      slot: "contact/hero",
      alt: "A city skyline at night with light trails on a highway",
    },
  },

  form: {
    title: "Send us a message",
    interestPlaceholder: "Select an option",
    // `value`s are stable ids used in URLs (/contact?interest=cloud) and emails.
    interests: [
      { value: "learning", label: "Learning & Capability" },
      { value: "cloud", label: "Cloud Solutions" },
      { value: "security", label: "Cybersecurity" },
      { value: "managed-services", label: "Managed Services" },
      { value: "general", label: "General Enquiry" },
    ],
    labels: {
      name: "Name",
      company: "Company",
      email: "Work Email",
      phone: "Phone",
      interest: "I'm interested in",
      message: "Message",
      consent:
        "I agree to XBPL processing my details to respond to this enquiry, as described in the",
    },
    placeholders: {
      name: "Your name",
      company: "Your company name",
      email: "Your email address",
      phone: "Your phone number",
      message: "Tell us about your requirement",
    },
    submitLabel: "Submit Enquiry",
    submittingLabel: "Sending…",
    successTitle: "Thank you. Your enquiry has been sent.",
    successBody: "Our team will get back to you shortly.",
  },

  details: {
    title: "Get in touch",
    intro: "Our team will be happy to connect with you.",
    followTitle: "Follow Us",
    locationsTitle: "Explore Our Locations",
  },

  locations: [{ name: "Noida, India (Head Office)", lon: 77.36, lat: 28.57 }],
};
