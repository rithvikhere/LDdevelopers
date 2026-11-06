/**
 * CENTRALIZED SITE CONTENT & COPY CONFIGURATION
 *
 * All marketing copy, headlines, navigation labels, and placeholders are stored here.
 * When official client copy and company history are received, edit the strings in this file.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const siteContent = {
  company: {
    name: "[COMPANY NAME]",
    fullName: "[COMPANY NAME] Construction & Property Developments",
    tagline: "Architectural Precision. Enduring Craftsmanship. Luxury Living.",
    foundedYearPlaceholder: "[YEAR]",
    registrationNumberPlaceholder: "[RERA / REGISTRATION NO.]",
  },

  navigation: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Options", href: "#options" },
    { label: "Projects", href: "#projects" },
    { label: "Amenities", href: "#amenities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],

  hero: {
    badge: "Architectural Excellence &amp; Turnkey Construction",
    titleLine1: "Sculpting Enduring Spaces,",
    titleLine2: "Defining Modern Living.",
    subtitle:
      "A distinguished property developer and master builder dedicated to crafting bespoke independent houses, duplex residences, luxury villas, and commercial landmarks.",
    primaryCta: "Let's Build",
    secondaryCta: "Explore Our Projects",
    ctaTarget: "#contact",
    projectsTarget: "#projects",
  },

  about: {
    tag: "02 / ABOUT US",
    title: "Rooted in Craftsmanship, Driven by Vision",
    lead:
      "At [COMPANY NAME], we believe every structure is an enduring dialogue between architectural ambition and human emotion.",
    paragraphs: [
      "[Company Overview Placeholder: Company was founded with a foundational commitment to architectural integrity, uncompromising structural engineering, and transparent client partnerships.]",
      "We transcend conventional construction by coordinating every discipline—from initial topographical soil analysis and architectural spatial modeling to artisanal interior detailing and final handover—under one unified standard of perfection.",
      "Whether envisioning a private multi-generational villa, a contemporary duplex with dramatic light volumes, or an iconic commercial address, our multidisciplinary team transforms raw land into landmarks of lasting value.",
    ],
    pillars: [
      {
        title: "Architectural Integrity",
        description:
          "Harmonious proportions, natural lighting, and climate-responsive facades designed without aesthetic compromise.",
      },
      {
        title: "Engineering Rigor",
        description:
          "High-performance structural frameworks, seismic-resistant engineering, and third-party certified building materials.",
      },
      {
        title: "Transparent Governance",
        description:
          "Milestone-based progress reporting, clear documentation, and ethical client consultation from day one.",
      },
    ],
  },

  services: {
    tag: "03 / CAPABILITIES",
    title: "Holistic Architectural & Development Services",
    subtitle:
      "From bespoke residential sanctuaries to corporate commercial hubs and strategic land acquisitions, our expertise encompasses the full spectrum of modern construction.",
  },

  constructionOptions: {
    tag: "04 / CONSTRUCTION OPTIONS",
    title: "Tailored Plot & Building Formats",
    subtitle:
      "Every plot possesses unique topography and orientation. Explore our engineered construction options tailored to various land dimensions and spatial requirements.",
    disclaimer:
      "* All construction timelines and specifications are customized to individual site topography, municipal approvals, and architectural finishes.",
  },

  projects: {
    tag: "05 / FEATURED WORKS",
    title: "Architectural Showcase",
    subtitle:
      "A curated preview of our design sensibilities and construction craftsmanship. Note: The projects displayed below are sample architectural concepts for visual demonstration.",
    sampleNotice:
      "CONCEPT SHOWCASE: These sample projects illustrate our design and build standards. Official company-executed projects will be inserted upon verification.",
  },

  amenities: {
    tag: "06 / QUALITY ASSURANCE",
    title: "The Pillars of Enduring Craft",
    subtitle:
      "Uncompromising material selections, advanced building science, and generational durability built into every square foot.",
  },

  gallery: {
    tag: "07 / VISUAL ARCHIVE",
    title: "Architectural Perspectives",
    subtitle:
      "Immerse yourself in the interplay of light, shadow, natural stone, and sculptural modern geometry.",
  },

  achievements: {
    tag: "08 / PROVEN METRICS",
    title: "Milestones in Concrete & Craft",
    subtitle:
      "Our verified track record of delivering excellence. All statistics below reflect strictly verified figures once confirmed.",
    verificationNotice:
      "* Verified performance figures will be displayed upon official client audit. No unsubstantiated claims are made.",
  },

  contact: {
    tag: "09 / INITIATE CONSULTATION",
    title: "Let's Shape Your Vision Into Reality",
    subtitle:
      "Whether you possess land ready for construction or are seeking turnkey development services, connect with our principal team for a confidential architectural consultation.",
    enquiryNotice:
      "Looking for a detailed project quotation? Submit an architectural enquiry or reach us directly via WhatsApp.",
  },
};
