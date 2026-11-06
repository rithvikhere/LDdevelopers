# [COMPANY NAME] — Construction & Property Development Platform

A premium, bespoke website and lead-management platform designed for a construction and property development company. Built with an editorial architectural magazine aesthetic, utilizing modern web standards, strong typography, and genuine database integration.

---

## 1. Project Overview

The project is structured into three integrated applications:
1. **Public Architectural Company Website (Phase 03 Completed):** A nine-section, cinematic single-page experience showcasing services, plot construction options, sample concepts, amenities, photography archive, verified achievements, and direct contact channels with restrained motion, active indicator navigation, and refined micro-interactions.
2. **Customer Portal (`/dashboard`):** Client registration, authentication, multi-step construction enquiry submission, and live status tracking (Planned for later phases).
3. **Admin Lead-Management Console (`/admin/dashboard`):** Isolated administrative login, real database statistics, comprehensive enquiry table with search/filtering, detailed lead viewer, and manual click-to-chat WhatsApp, call, and email integration (Planned for later phases).

---

## 2. Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography:**
  - Display Font: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Google Fonts)
  - Supporting Font: [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Google Fonts)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) with complete `prefers-reduced-motion` compliance
- **Database & Auth (Subsequent Phases):** Supabase PostgreSQL with Row Level Security (RLS)
- **Forms & Validation:** React Hook Form with Zod

---

## 3. Brand Identity & Color System

The visual identity follows the creative direction defined in `PHASE_01_BRAND_IDENTITY_AND_CREATIVE_DIRECTION_README.md`. It translates the company's foundational black, gold, and green identity into refined, editorial architectural tones:

| Color Name | Hex Value | Role & Application |
|---|---|---|
| **Deep Charcoal** | `#202622` | Navigation, dark sections, hero overlay, footer |
| **Warm Ivory** | `#F3F0E8` | Primary page backgrounds and spacious reading surfaces |
| **Muted Forest** | `#526653` | Primary action buttons, CTA elements, and selected states |
| **Champagne Brass** | `#B49A68` | Subtle borders, badges, dividers, and active indicators |
| **Stone Beige** | `#D9D2C4` | Secondary cards, subtle containers, and hover fills |
| **Olive Charcoal** | `#343B33` | Dark elevation, secondary borders, and deep surfaces |

---

## 4. Phase 03 Motion, Interactions & Navigation

- **Desktop Navigation:**
  - **Transparent to Solid Transition:** Blends naturally into the cinematic hero; smoothly shifts into solid Deep Charcoal (`#202622`) upon scrolling.
  - **Sliding Champagne Brass Indicator:** An animated indicator (`layoutId="activeNavbarIndicator"`) tracks the in-view section without flicker.
  - **Sticky Navbar Offset Scrolling:** Click-to-scroll handler calculates the sticky header offset (~72px) for exact section alignment.
  - **Primary CTA:** Muted Forest (`#526653`) *"Let's Build"* button leading directly to `#contact`.
- **Mobile Navigation:**
  - Full-screen Deep Charcoal (`#202622`) overlay with staggered link entrance.
  - Locks background page scrolling while open and restores it when closed.
  - Escape key listener and visible focus handling.
  - Closes automatically upon section selection.
- **Section Entrance Motion (`MotionReveal`):**
  - Restrained, once-only reveal animations (16px upward displacement, 600ms duration, architectural cubic bezier).
  - Strictly respects `prefers-reduced-motion`.
- **Interactive Lightbox:**
  - Accessible dialog (`role="dialog"`, `aria-modal="true"`) for the gallery archive.
  - Keyboard navigation (Left/Right arrow keys for previous/next image, Escape to close).
  - Body scroll lock during inspection.
- **Card & Button Micro-Interactions:**
  - Tactile pressed feedback (`active:scale-[0.98]`).
  - High-contrast `:focus-visible` rings in Champagne Brass (`#B49A68`).

---

## 5. The Exactly 9 Landing-Page Sections

1. **Section 1 — Home / Hero (`#home`):** Full-screen architectural photography with layered charcoal gradient overlay, temporary logo badge, headline (*"Sculpting Enduring Spaces, Defining Modern Living"*), primary *"Let's Build"* CTA, and secondary *"Explore Our Projects"* navigation.
2. **Section 2 — About (`#about`):** Craftsmanship philosophy, vision, dual-photo architectural layout, clearly marked placeholder notices, and three foundational pillars (*Architectural Integrity, Engineering Rigor, Transparent Governance*).
3. **Section 3 — Services (`#services`):** Six key disciplines:
   - *Houses / Independent Houses*
   - *Duplexes*
   - *Villas*
   - *Commercial Buildings*
   - *Land Investing*
   - *Property Buying and Selling*
4. **Section 4 — Construction Options (`#options`):** Deep charcoal section detailing recommended plot dimensions, house types, duplex/villa formats, commercial frameworks, and custom turnkey briefs.
5. **Section 5 — Projects (`#projects`):** Curated architectural concept gallery with category filters (*All, Residential, Villas, Commercial, Duplex*), specifications, and prominent *"Sample Project"* identification.
6. **Section 6 — Amenities & Quality (`#amenities`):** Six engineering benchmarks: Seismic foundations, artisanal finishes, thermal/acoustic insulation, intelligent infrastructure, rainwater harvesting, and certified structural assurance.
7. **Section 7 — Gallery (`#gallery`):** Responsive architectural photography grid with an interactive, accessible lightbox modal with keyboard navigation.
8. **Section 8 — Achievements (`#achievements`):** Transparent milestone metrics with strict `"--"` placeholders awaiting verified client figures (zero fake metrics).
9. **Section 9 — Contact (`#contact`):** Telephone, email, corporate office address, consultation hours placeholders, manual WhatsApp click-to-chat action with prefilled message, and an interactive preliminary enquiry intake card.

---

## 6. Replacing Placeholder Assets & Logo

All temporary assets are centralized in single-point configuration files. **You do not need to edit multiple components to change assets.**

### To Replace the Company Logo:
1. Place your vector logos in `public/assets/brand/`:
   - `public/assets/brand/logo-dark.svg` (for dark backgrounds)
   - `public/assets/brand/logo-light.svg` (for light backgrounds)
2. Or adjust the SVG mark directly inside `src/components/brand/CompanyLogo.tsx`.

### To Replace Project & Section Photographs:
1. Open `src/config/site-assets.ts`.
2. Update the image URLs or local paths for:
   - `siteAssets.hero.mainBackground`
   - `siteAssets.about.primaryImage` / `secondaryImage`
   - `siteAssets.services[...]`
   - `siteAssets.constructionOptions[...]`
   - `siteAssets.projects[...]`
   - `siteAssets.gallery[...]`
3. If hosting images on external CDNs or domains, add the hostname to `next.config.ts` under `images.remotePatterns`.

### To Replace Company Copy, Phone, & Office Address:
1. Open `src/config/site-content.ts` and `src/config/site-assets.ts`.
2. Replace placeholder company names, registration numbers, phone numbers, and addresses.

---

## 7. Local Development Setup

### Prerequisites
- Node.js `18.18+` or `20+` (tested on Node `v24.19.0`)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/rithvikhere/LDdevelopers.git
cd LDdevelopers

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## 8. Roadmap Status

- [x] **Phase 01:** Brand identity, creative direction tokens, typography foundations.
- [x] **Phase 02:** Public Landing Page UI/UX, updated 9-section navigation, editorial layouts, centralized asset configuration.
- [x] **Phase 03:** Motion, Interactions & Navigation (sliding active indicator, sticky offset scroll, accessible mobile drawer, keyboard lightbox, and `prefers-reduced-motion` compliance).
- [ ] **Phase 04:** Customer Authentication & Database Integration (Supabase PostgreSQL, RLS).
- [ ] **Phase 05:** Customer Portal & Multi-Step Construction Enquiry Form.
- [ ] **Phase 06:** Admin Lead Management Dashboard, searchable/filterable lead table, and manual WhatsApp launcher.
- [ ] **Phase 07:** End-to-end testing, security audit, and quality assurance.
- [ ] **Phase 08:** Production deployment and client handover.
