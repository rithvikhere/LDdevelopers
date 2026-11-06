# [COMPANY NAME] — Construction & Property Development Platform

A premium, bespoke website and lead-management platform designed for a construction and property development company. Built with an editorial architectural magazine aesthetic, utilizing modern web standards, strong typography, and genuine database integration.

---

## 1. Project Overview

The project is structured into three integrated applications:
1. **Public Architectural Company Website:** A nine-section, cinematic single-page experience showcasing services, plot construction options, sample concepts, amenities, photography archive, verified achievements, and contact channels.
2. **Customer Portal (`/dashboard`):** Client registration, authentication, multi-step construction enquiry submission, and live status tracking.
3. **Admin Lead-Management Console (`/admin/dashboard`):** Isolated administrative login, real database statistics, comprehensive enquiry table with search/filtering, detailed lead viewer, and manual click-to-chat WhatsApp, call, and email integration.

---

## 2. Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography:**
  - Display Font: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Google Fonts)
  - Supporting Font: [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Google Fonts)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth (Phases 2–4):** [Supabase](https://supabase.com/) PostgreSQL with Row Level Security (RLS)
- **Forms & Validation:** React Hook Form with Zod

---

## 3. Brand Identity & Color System

The visual identity follows the creative direction defined in `PHASE_01_BRAND_IDENTITY_AND_CREATIVE_DIRECTION_README.md`. It translates the company's foundational black, gold, and green identity into refined, editorial architectural tones:

| Color Name | Hex Value | Role & Application |
|---|---|---|
| **Deep Charcoal** | `#202622` | Navigation, dark sections, hero overlay, footer |
| **Warm Ivory** | `#F3F0E8` | Primary page backgrounds and spacious reading surfaces |
| **Muted Forest** | `#526653` | Primary action buttons, CTA elements, and selected states |
| **Champagne Brass** | `#B49A68` | Subtle borders, badges, dividers, and premium highlights |
| **Stone Beige** | `#D9D2C4` | Secondary cards, subtle containers, and hover fills |
| **Olive Charcoal** | `#343B33` | Dark elevation, secondary borders, and deep surfaces |

---

## 4. The 9 Landing Page Sections

1. **Hero Section (`#home`):** Cinematic full-screen architectural photography, layered dark gradient overlay, temporary logo badge, headline (*"Sculpting Enduring Spaces, Defining Modern Living"*), primary *"Let's Build"* CTA, and *"Explore Our Projects"* navigation.
2. **About Section (`#about`):** Craftsmanship philosophy, vision, three foundational pillars (*Architectural Integrity, Engineering Rigor, Transparent Governance*), and dual-photo editorial layout.
3. **Services Section (`#services`):** Six key disciplines:
   - *Independent Houses*
   - *Duplex Houses*
   - *Villas*
   - *Commercial Buildings*
   - *Land Investment*
   - *Property Buying & Selling*
4. **Construction Options (`#options`):** Deep charcoal section detailing recommended plot dimensions, house types, duplex/villa formats, commercial frameworks, and custom turnkey briefs.
5. **Projects Showcase (`#projects`):** Curated architectural concept gallery with category filters (*All, Residential, Villas, Commercial, Duplex*), specifications, and prominent *"Sample Project"* identification.
6. **Amenities & Quality (`#amenities`):** Six engineering benchmarks: Seismic foundations, artisanal finishes, thermal/acoustic insulation, home automation, rainwater harvesting, and certified structural assurance.
7. **Gallery (`#gallery`):** Responsive architectural photography grid with interactive lightbox zoom modal.
8. **Achievements (`#achievements`):** Transparent milestone metrics with strict `"--"` placeholders awaiting verified client figures (zero fake metrics).
9. **Contact Section (`#contact`):** Telephone, email, corporate office address, consultation hours, manual WhatsApp click-to-chat action, and interactive preliminary enquiry card.

---

## 5. Replacing Placeholder Assets & Logo

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

## 6. Local Development Setup

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

## 7. Production Build

To verify type safety and build optimized static assets:
```bash
npm run build
npm run start
```

---

## 8. Next Phases Roadmap

- [x] **Phase 0:** Project inspection, GitHub repository setup, brand identity alignment.
- [x] **Phase 1:** Brand system, design tokens, typography, centralized asset configuration, and complete 9-section public landing page.
- [ ] **Phase 2:** Supabase database migrations, Row Level Security (RLS), Customer Auth, and Admin Auth.
- [ ] **Phase 3:** Customer Portal & Multi-Step Construction Enquiry Form with Zod validation.
- [ ] **Phase 4:** Admin Lead Management Dashboard, searchable/filterable enquiry table, detailed lead viewer, and manual WhatsApp launcher.
- [ ] **Phase 5:** End-to-end user journey verification, security audits, and QA.
- [ ] **Phase 6:** Production deployment, domain linkage, and client handover.
