/**
 * CENTRALIZED ASSET CONFIGURATION
 *
 * All temporary and production images, logos, and visual assets are defined here.
 * DO NOT hardcode image URLs directly into components.
 *
 * When actual company photographs and logos are supplied by the client:
 * 1. Place project photos in `/public/assets/images/` or upload to your CDN/storage.
 * 2. Update the corresponding URL paths in this file.
 * 3. All landing-page sections and cards will automatically reflect the new assets.
 *
 * NOTE: All temporary imagery currently used is strictly labeled "Sample Project / Architecture Concept"
 * and does not represent verified completed works of the company.
 */

export interface ProjectAsset {
  id: string;
  title: string;
  category: "Residential" | "Villas" | "Commercial" | "Duplex";
  tagline: string;
  description: string;
  locationPlaceholder: string;
  image: string;
  isSample: true;
  specifications: {
    area: string;
    style: string;
    completionYear?: string;
  };
}

export interface ServiceAsset {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
}

export interface ConstructionOptionAsset {
  id: string;
  type: string;
  recommendedPlotSize: string;
  idealFor: string;
  description: string;
  image: string;
  features: string[];
}

export const siteAssets = {
  // Brand Logos
  brand: {
    logoLight: "/assets/brand/logo-light.svg",
    logoDark: "/assets/brand/logo-dark.svg",
    placeholderNotice: "Temporary Logo Mark [COMPANY NAME]",
  },

  // Section 1: Hero
  hero: {
    // Architectural, warm dusk facade with ambient interior lighting
    mainBackground:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
    alt: "Sample Architectural Landmark Facade - Hero",
    label: "Sample Architectural Concept",
  },

  // Section 2: About
  about: {
    // Minimalist concrete, glass, and landscaped courtyard
    primaryImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    altPrimary: "Architectural Craftsmanship - Minimalist Structure",
    altSecondary: "Refined Interior Proportions and Natural Light",
  },

  // Section 3: Services (6 Categories)
  services: [
    {
      id: "independent-houses",
      title: "Independent Houses",
      category: "Bespoke Residential",
      tagline: "Sanctuaries of individuality and enduring permanence",
      description:
        "Custom single-family residences meticulously drafted around your lifestyle, microclimate, and spatial preferences with bespoke detailing.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Architectural site orientation",
        "Vastu-harmonized layouts",
        "Private landscaped courtyards",
        "Custom interior joinery",
      ],
    },
    {
      id: "duplex-houses",
      title: "Duplex Houses",
      category: "Multi-Level Living",
      tagline: "Dramatic vertical volumes with functional zoning",
      description:
        "Interconnecting double-height living spaces that balance communal entertainment floors with secluded private family quarters.",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Double-height living rooms",
        "Mezzanine lounges & balconies",
        "Reinforced acoustic insulation",
        "Private internal elevator readiness",
      ],
    },
    {
      id: "villas",
      title: "Villas",
      category: "Luxury Estates",
      tagline: "Grand architectural statements set in expansive grounds",
      description:
        "Opulent private estates combining sculptural exterior forms, expansive fenestration, infinity pools, and resort-grade amenities.",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Cantilevered terraces",
        "Integrated lap pool & water walls",
        "Smart climate automation",
        "Landscaped outdoor entertainment pavilions",
      ],
    },
    {
      id: "commercial-buildings",
      title: "Commercial Buildings",
      category: "Corporate & Retail",
      tagline: "Functional corporate landmarks designed for commerce and enterprise",
      description:
        "High-performance office complexes, corporate headquarters, and retail structures built to highest commercial codes and tenant flexibility.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Flexible column grids",
        "High-efficiency curtain wall glazing",
        "Dedicated multi-tier parking",
        "Advanced fire & life safety systems",
      ],
    },
    {
      id: "land-investment",
      title: "Land Investment",
      category: "Strategic Real Estate",
      tagline: "High-growth corridors and verified land acquisitions",
      description:
        "Advisory and procurement of premium, legally vetted parcels with high appreciation potential and clear development permissions.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      features: [
        "100% legal title verification",
        "Topographical & soil condition analysis",
        "Strategic master-planning insights",
        "Infrastructure roadmap evaluation",
      ],
    },
    {
      id: "property-buying-selling",
      title: "Property Buying & Selling",
      category: "Brokerage & Advisory",
      tagline: "Transparent transactions for premium properties",
      description:
        "Bespoke brokerage services connecting discerning buyers and investors with high-caliber residential and commercial properties.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Fair valuation modeling",
        "Discreet private treaty sales",
        "End-to-end documentation handling",
        "Post-purchase advisory support",
      ],
    },
  ] as ServiceAsset[],

  // Section 4: Construction Options
  constructionOptions: [
    {
      id: "opt-independent",
      type: "Independent Residence",
      recommendedPlotSize: "1,200 – 3,000 sq.ft",
      idealFor: "Individual families seeking complete autonomy & privacy",
      description:
        "Ground or G+1 independent homes built with robust foundation engineering, private car porches, and custom rooftop terrace gardens.",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80",
      features: ["Custom floor configurations", "Private compound perimeter", "Solar-ready roof deck"],
    },
    {
      id: "opt-duplex",
      type: "Modern Duplex",
      recommendedPlotSize: "1,500 – 4,000 sq.ft",
      idealFor: "Modern families desiring dramatic spatial volume and entertainment zones",
      description:
        "G+1 or G+2 interconnected levels with central light wells, floating staircases, and acoustic separation between active and rest zones.",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
      features: ["Double-height ceilings", "Multi-car sheltered garage", "Private media/study rooms"],
    },
    {
      id: "opt-villa",
      type: "Luxury Villa",
      recommendedPlotSize: "3,000 – 10,000+ sq.ft",
      idealFor: "Exclusive estates, multi-generational luxury living, and bespoke leisure",
      description:
        "Grand bespoke estates featuring expansive courtyards, luxury master suites with walk-in dressing rooms, and outdoor infinity plunge pools.",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
      features: ["Private swimming pool & cabana", "Landscaped manicured grounds", "Home automation suite"],
    },
    {
      id: "opt-commercial",
      type: "Commercial Complex",
      recommendedPlotSize: "4,000 – 25,000+ sq.ft",
      idealFor: "Corporate offices, retail outlets, banks, and healthcare facilities",
      description:
        "Reinforced concrete frame structures engineered for heavy floor loads, wide unobstructed spans, and energy-efficient building envelopes.",
      image:
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
      features: ["High-speed passenger lifts", "Underground parking capacity", "Modern glass facade treatment"],
    },
    {
      id: "opt-custom",
      type: "Bespoke / Custom Development",
      recommendedPlotSize: "Custom dimensions",
      idealFor: "Unconventional plots, mixed-use buildings, and complex architectural briefs",
      description:
        "Collaborative turnkey architectural design and construction tailored strictly to your specific topographical constraints and spatial vision.",
      image:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=80",
      features: ["Turnkey design-and-build", "Engineered soil stabilization", "Specialized artisanal finishes"],
    },
  ] as ConstructionOptionAsset[],

  // Section 5: Projects (Showcase)
  // IMPORTANT: All items are strictly identified as "Sample Project" placeholders
  projects: [
    {
      id: "project-01",
      title: "The Monolith Pavilion",
      category: "Residential",
      tagline: "Minimalist concrete, brass accents, and serene water courtyards",
      description:
        "A striking residential pavilion featuring exposed board-formed concrete, brass louver detailing, and floor-to-ceiling glass pavilions opening to internal reflective ponds.",
      locationPlaceholder: "[Location Placeholder — e.g. North Enclave]",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      isSample: true,
      specifications: {
        area: "4,850 sq.ft",
        style: "Contemporary Brutalism",
        completionYear: "Sample Showcase",
      },
    },
    {
      id: "project-02",
      title: "Verdant Horizon Villa",
      category: "Villas",
      tagline: "Seamless indoor-outdoor living framed by cascading green terraces",
      description:
        "A multi-level luxury villa built into sloping terrain, integrating indigenous stone walls, cantilevered teak balconies, and an infinity pool overlooking the horizon.",
      locationPlaceholder: "[Location Placeholder — e.g. Highland Hills]",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      isSample: true,
      specifications: {
        area: "6,200 sq.ft",
        style: "Modern Tropical Luxury",
        completionYear: "Sample Showcase",
      },
    },
    {
      id: "project-03",
      title: "The Zenith Commercial Center",
      category: "Commercial",
      tagline: "Sustainable curtain-wall architecture with high-performance floorplates",
      description:
        "A state-of-the-art multi-tier commercial tower equipped with double-glazed solar-control facade, column-free office layouts, and a biophilic atrium lobby.",
      locationPlaceholder: "[Location Placeholder — e.g. Central Business District]",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      isSample: true,
      specifications: {
        area: "32,000 sq.ft",
        style: "High-Performance Commercial",
        completionYear: "Sample Showcase",
      },
    },
    {
      id: "project-04",
      title: "Aura Courtyard Residence",
      category: "Duplex",
      tagline: "A sculptural double-height sanctuary focused around an ancient olive tree",
      description:
        "A duplex home conceptualized around a central micro-climate lightwell, featuring custom floating oak stairs, travertine finishes, and automated louvers.",
      locationPlaceholder: "[Location Placeholder — e.g. Emerald Valley]",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      isSample: true,
      specifications: {
        area: "3,750 sq.ft",
        style: "Warm Editorial Modern",
        completionYear: "Sample Showcase",
      },
    },
  ] as ProjectAsset[],

  // Section 6: Amenities & Quality
  amenities: [
    {
      id: "amenity-foundation",
      title: "Engineered Seismic Foundations",
      subtitle: "Structural Superiority",
      description:
        "High-grade Fe-550D TMT steel and M25/M30 ready-mix concrete tested across deep soil cores to guarantee multi-decade seismic and structural integrity.",
      icon: "ShieldCheck",
    },
    {
      id: "amenity-finishes",
      title: "Artisanal Architectural Finishes",
      subtitle: "Tactile Luxury",
      description:
        "Hand-selected Italian travertine, imported Burmese teak, honed granite slabs, and German thermal-break aluminum fenestration.",
      icon: "Gem",
    },
    {
      id: "amenity-climate",
      title: "Thermal & Acoustic Insulation",
      subtitle: "Sensory Comfort",
      description:
        "Dual-cavity walls, low-emissivity double-glazing, and specialized acoustic underlays ensuring serene interior spaces shielded from external noise.",
      icon: "Sparkles",
    },
    {
      id: "amenity-smart",
      title: "Intelligent Home Automation",
      subtitle: "Modern Infrastructure",
      description:
        "Integrated KNX/Zigbee infrastructure for motorized solar louvers, smart climate zones, biometric access, and app-controlled lighting scenes.",
      icon: "Cpu",
    },
    {
      id: "amenity-water",
      title: "Sustainable Water & Solar Systems",
      subtitle: "Eco-Responsibility",
      description:
        "Multi-stage automated rainwater harvesting, subterranean recharge pits, and hybrid solar photovoltaic grid-tie integration.",
      icon: "Leaf",
    },
    {
      id: "amenity-warranty",
      title: "Comprehensive Structural Assurance",
      subtitle: "Client Protection",
      description:
        "Rigorous 100-point quality audit checklists at every stage, supported by certified structural engineering warranties and complete build documentation.",
      icon: "Award",
    },
  ],

  // Section 7: Gallery (Curated Photography Grid)
  gallery: [
    {
      id: "gal-01",
      title: "Double-Height Cantilever Lounge",
      category: "Interior Architecture",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      aspect: "wide",
    },
    {
      id: "gal-02",
      title: "Minimalist Stone Facade Detail",
      category: "Exterior Detail",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      aspect: "tall",
    },
    {
      id: "gal-03",
      title: "Travertine Master Ensuite",
      category: "Bath Architecture",
      image:
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
      aspect: "square",
    },
    {
      id: "gal-04",
      title: "Reflective Courtyard Pool",
      category: "Landscape Design",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      aspect: "wide",
    },
    {
      id: "gal-05",
      title: "Architectural Staircase Geometry",
      category: "Structural Detail",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      aspect: "tall",
    },
    {
      id: "gal-06",
      title: "Executive Commercial Boardroom Suite",
      category: "Commercial Spaces",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      aspect: "square",
    },
  ],

  // Section 8: Achievements
  // STRICT RULE: No fake or made-up numbers. All values use clearly marked placeholders until verified by client.
  achievements: [
    {
      id: "achieve-projects",
      metric: "--",
      label: "Completed Projects",
      statusNote: "[Awaiting Verified Client Metric]",
      description: "Custom residential and commercial developments delivered to exacting specifications.",
    },
    {
      id: "achieve-experience",
      metric: "--",
      label: "Years of Craftsmanship",
      statusNote: "[Awaiting Verified Client Metric]",
      description: "Dedicated to architectural innovation, engineering precision, and client trust.",
    },
    {
      id: "achieve-clients",
      metric: "--",
      label: "Satisfied Homeowners",
      statusNote: "[Awaiting Verified Client Metric]",
      description: "Families and businesses settled into thoughtfully engineered spaces.",
    },
    {
      id: "achieve-sqft",
      metric: "--",
      label: "Sq.Ft Built-Up Area",
      statusNote: "[Awaiting Verified Client Metric]",
      description: "Total architectural footprint planned, engineered, and executed.",
    },
  ],

  // Section 9: Contact & Footer
  contact: {
    phonePlaceholder: "+[COUNTRY CODE] [PHONE NUMBER]",
    whatsappPlaceholder: "+[COUNTRY CODE] [WHATSAPP NUMBER]",
    emailPlaceholder: "contact@[companydomain].com",
    addressPlaceholder: "[Company Office Suite / Building Name, Street Address, City, State, PIN]",
    businessHoursPlaceholder: "Monday – Saturday: 9:00 AM – 7:00 PM (By Appointment)",
    whatsappDefaultMessage:
      "Hello [Company Name], I am interested in building a new project with you and would like to schedule a consultation.",
  },
};
