/**
 * CENTRALIZED SITE CONTENT & COPY CONFIGURATION — PHASE 02
 *
 * All marketing copy, headlines, navigation labels, and placeholders are stored here.
 * When official client copy and company history are received, edit the strings in this file.
 */

export interface NavLink {
  label: string;
  href: string;
  id: string;
}

/** A footer link; `soon` items have no page yet and render as plain text with a "soon" pill. */
export type FooterLink = { label: string; href: string; soon?: false } | { label: string; href?: undefined; soon: true };

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const siteContent = {
  company: {
    name: "[COMPANY NAME]",
    fullName: "[COMPANY NAME] Construction & Property Developments",
    tagline: "Architectural Precision. Enduring Craftsmanship. Luxury Living.",
    foundedYearPlaceholder: "[YEAR]",
    registrationNumberPlaceholder: "[RERA / REGISTRATION NO.]",
  },

  // Floating site nav (all public pages): Home · About Us (drop-down of the six pages) · Contact
  siteNav: {
    home: "Home",
    about: "About Us",
    contact: "Contact",
    contactHref: "/contact",
    menuHeading: "Explore",
    // Phones: three-line menu button that opens a side panel
    menuLabel: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  // Public website navigation — six independent content routes (used by the footer).
  // The Explore hub on the homepage is the primary navigation system.
  navigation: [
    { label: "About", href: "/about", id: "about" },
    { label: "Services", href: "/services", id: "services" },
    { label: "Construction Options", href: "/construction-options", id: "construction-options" },
    { label: "Gallery", href: "/gallery", id: "gallery" },
    { label: "Contact", href: "/contact", id: "contact" },
    { label: "Achievements", href: "/achievements", id: "achievements" },
  ] as NavLink[],

  // Homepage Section 02 — Explore hub (editorial index of the six content routes)
  explore: {
    tag: "INDEX / EXPLORE",
    title: "Explore Our World",
    // Section 02 bento cards (Contact lives in Section 03, so it is not repeated here). Keep lines ≤ 6 words.
    cards: [
      { id: "construction-options", label: "Construction Options", href: "/construction-options", line: "Choose what fits your plot." },
      { id: "services", label: "Services", href: "/services", line: "Homes, villas and commercial builds." },
      { id: "about", label: "About", href: "/about", line: "Who we are, how we build." },
      { id: "gallery", label: "Gallery", href: "/gallery", line: "Spaces we've shaped." },
      { id: "achievements", label: "Achievements", href: "/achievements", line: "Milestones, laid brick by brick." },
    ],
    // Full list with descriptions (used by the site nav's About Us menu)
    destinations: [
      {
        number: "01",
        label: "About",
        href: "/about",
        description: "Company philosophy, vision, and approach.",
      },
      {
        number: "02",
        label: "Services",
        href: "/services",
        description: "Our residential, commercial, and property development capabilities.",
      },
      {
        number: "03",
        label: "Construction Options",
        href: "/construction-options",
        description: "Explore plot dimensions, building formats, and construction possibilities.",
      },
      {
        number: "04",
        label: "Gallery",
        href: "/gallery",
        description: "A visual collection of architectural and construction imagery.",
      },
      {
        number: "05",
        label: "Contact",
        href: "/contact",
        description: "Connect with the company's architectural and development team.",
      },
      {
        number: "06",
        label: "Achievements",
        href: "/achievements",
        description: "Completed projects, company experience, and verified milestones.",
      },
    ],
  },

  hero: {
    // Headline: two serif lines, then a condensed line whose last word is set in orange
    titleSerif: ["Your Land.", "Your Vision."],
    titleLead: "Our",
    titleAccent: "Expertise.",
    subtitle: "Whether you're planning a home or a new development, let's bring your ideas to life.",
    primaryCta: "Let's Build",
    secondaryCta: "Explore Our Projects",
    ctaTarget: "enquiry",
    projectsTarget: "explore",
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
      "Completed projects, company experience, and verified milestones. Figures are published only once they have been confirmed by the company.",
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

  // About page (/about). Founder photo, name and signature are placeholders until the client supplies them
  // (the files go in siteAssets.aboutPage). The founder's message is a TEMPORARY draft — replace it with their own words.
  aboutPage: {
    hero: {
      eyebrow: "About us",
      title: "Building Better.",
      titleAccent: "Together.",
      lead: "At Lakshmi Builders & Developers, we turn land into lasting value, and ideas into homes and spaces people are proud of.",
      cta: { label: "Our story", href: "#our-story" },
    },
    founder: {
      eyebrow: "Founder\u2019s message",
      title: ["A Vision to", "Build a Better Tomorrow"],
      message:
        "With a deep passion for real estate and a commitment to excellence, I founded Lakshmi Builders & Developers to create quality spaces that stand the test of time.",
      name: "[Founder name]",
      role: "Founder & Managing Director",
      photoLabel: "Founder photo",
      signatureLabel: "Signature",
      goal: "Our goal is simple: to build better, for a brighter tomorrow.",
    },
    story: {
      eyebrow: "Our story",
      title: ["From a Vision", "to a Trusted Name"],
      body: "What began as a dream to create quality living spaces has grown into a name families trust with their land. Today we keep building with purpose, integrity and a long-term view.",
      cta: { label: "See our work", href: "/gallery" },
    },
    values: {
      eyebrow: "Our values",
      items: [
        { icon: "trust", label: "Trust & transparency" },
        { icon: "quality", label: "Quality in every detail" },
        { icon: "innovation", label: "Innovation in development" },
        { icon: "customer", label: "Customer first" },
      ] as { icon: "trust" | "quality" | "innovation" | "customer"; label: string }[],
    },
    vision: {
      eyebrow: "Our vision",
      title: ["Shaping Spaces.", "Creating Opportunities."],
      body: "To be a leading property developer, known for quality, innovation and the care we give every customer.",
    },
    mission: {
      eyebrow: "Our mission",
      title: ["Building Value,", "for Generations."],
      body: "To develop thoughtfully planned spaces that improve everyday life and keep their value for years to come.",
    },
  },

  // Site footer (homepage + the six pages). Links marked `soon` show a "soon" pill and are not clickable yet.
  footer: {
    brandName: "Lakshmi Builders & Developers",
    tagline: "We plan, design and build homes, villas and commercial spaces, from the first site visit to the handover.",
    registrationLabel: "RERA no.",
    columns: [
      {
        title: "Explore",
        links: [
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Construction options", href: "/construction-options" },
          { label: "Gallery", href: "/gallery" },
          { label: "Achievements", href: "/achievements" },
        ],
      },
      {
        title: "Get in touch",
        links: [
          { label: "Start an enquiry", href: "/#enquiry" },
          { label: "Contact details", href: "/contact" },
          { label: "Visit the studio", href: "/#design-desk" },
        ],
      },
      {
        title: "Portal",
        links: [
          { label: "Customer portal", soon: true },
          { label: "Studio login", href: "/login" },
        ],
      },
    ] as FooterColumn[],
    legal: [
      { label: "Privacy policy", soon: true },
      { label: "Terms of use", soon: true },
    ] as FooterLink[],
    rights: "All rights reserved.",
  },
};
