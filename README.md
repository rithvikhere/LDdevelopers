# [COMPANY NAME] — Construction & Property Development Platform

A premium, bespoke website and lead-management platform designed for a construction and property development company. Built with an editorial architectural magazine aesthetic, utilizing modern web standards, strong typography, and genuine database integration.

---

## 1. Project Overview

The project is structured into three integrated applications:
1. **Public Architectural Company Website:** A three-part homepage (Hero → Explore Hub → Enquiry) plus six independent content pages (`/about`, `/services`, `/construction-options`, `/gallery`, `/contact`, `/achievements`). There is no global top navigation bar — the Explore hub is the primary navigation system. See [Public Website Architecture](#5-public-website-architecture).
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

## 4. Motion, Interactions & Navigation

- **No global navbar:** The sticky top navigation bar, mobile hamburger drawer and active-section indicator were removed from the public website. Navigation happens through the homepage **Explore hub** and the footer.
- **Explore hub motion:** Masked heading reveal, progressively drawn hairline dividers, restrained staggered entry of the six destinations, and hover/focus emphasis (brass rule sweep, number and title colour shift, sliding arrow).
- **Page transitions:** Each content page enters with a quick fade and slight upward movement (`PageShell`, Framer Motion). No scroll-jacking, no excessive parallax.
- **Section entrance motion:** `KairosDepthReveal`, `KairosMaskedText` and `MotionReveal` scroll reveals, all respecting `prefers-reduced-motion`.
- **Interactive lightbox (Gallery page):** Keyboard navigation (Left/Right arrows for previous/next, Escape to close), focus moved to the close button and restored on close, body scroll lock during inspection.
- **Focus states:** High-contrast `:focus-visible` rings in Champagne Brass.
- **Hero:** Artwork, copy and line-art animation unchanged. Its CTAs now target the homepage sections: *"Let's Build"* → `#enquiry`, *"Explore Our Projects"* and *"Scroll Down"* → `#explore`.

---

## 5. Public Website Architecture

### Homepage (`/`) — three primary sections + footer
```
Hero (#home)            existing hero, unchanged artwork & animation
  ↓
Explore Hub (#explore)  editorial index of the six content pages
  ↓
Enquiry (#enquiry)      existing contact desk + enquiry form, unchanged
  ↓
Footer                  existing footer, unchanged design
```

### Six independent content pages
Each destination in the Explore hub is a real Next.js route that opens in the same browser tab (`next/link`).

| # | Route | Content |
|---|---|---|
| 01 | `/about` | Company philosophy, manifesto and the three pillars (Architectural Integrity, Engineering Rigor, Transparent Governance) |
| 02 | `/services` | The existing service disciplines + "Request a Proposal" CTA → `/#enquiry` |
| 03 | `/construction-options` | Plot dimensions, building typologies (tabbed), inclusions + "Consult on This Typology" CTA → `/#enquiry` |
| 04 | `/gallery` | Photography grid with the accessible keyboard lightbox |
| 05 | `/contact` | Studio address, phone, email, hours, WhatsApp click-to-chat + "Go to the Enquiry Form" CTA → `/#enquiry` (the form is not duplicated) |
| 06 | `/achievements` | Milestone metrics with strict `"--"` placeholders and "Awaiting client verification" labels — no fabricated figures, warranties or certifications |

### Back-to-Explore behaviour
- Every content page shows a single **"← BACK TO EXPLORE"** control (no navigation bar) that links to `/#explore`.
- It always returns to the hub, even when a page was opened directly by URL, so visitors are never stranded.
- Browser back/forward navigation and page refresh work normally because every page is a real route.
- Any enquiry CTA on a content page links to `/#enquiry` (works on client-side navigation and on a full page load).

### Unchanged parts
- The enquiry form (fields, labels, validation, submission via `submitPublicEnquiryAction`, loading/success/error states, Supabase or demo-mode storage).
- The footer design. Its navigation column now links to the six routes and "Commission Enquiry" links to `/#enquiry`.

### Account & admin routes (unchanged)
- `/login` — shared login page
- `/register` — currently redirects to `/login`
- `/dashboard` — currently redirects to `/admin/dashboard`
- `/admin/dashboard` — role-guarded admin lead-management console

### Key files
```
src/app/page.tsx                                   Homepage (Hero → Explore → Enquiry → Footer)
src/app/{about,services,construction-options,gallery,contact,achievements}/page.tsx
src/components/landing/ExploreHubSection.tsx       Explore hub (Section 02)
src/components/landing/ContactInfoCard.tsx         Studio details + WhatsApp card (shared by homepage and /contact)
src/components/pages/PageShell.tsx                 Shared content-page frame (background, back control, transition, footer)
src/components/pages/BackToExplore.tsx             "← BACK TO EXPLORE" link
src/components/pages/EnquiryCta.tsx                Contextual CTA to /#enquiry
src/components/pages/ContactPageContent.tsx        /contact page layout
src/config/site-content.ts                         `navigation` (six routes) and `explore` (hub copy & destinations)
```

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
- [x] **Phase 03:** Motion, Interactions & Navigation (keyboard lightbox, focus states, and `prefers-reduced-motion` compliance).
- [x] **Public website architecture redesign:** Three-part homepage (Hero → Explore Hub → Enquiry), six independent content routes, Back-to-Explore navigation, global navbar removed.
- [ ] **Phase 04:** Customer Authentication & Database Integration (Supabase PostgreSQL, RLS).
- [ ] **Phase 05:** Customer Portal & Multi-Step Construction Enquiry Form.
- [ ] **Phase 06:** Admin Lead Management Dashboard, searchable/filterable lead table, and manual WhatsApp launcher.
- [ ] **Phase 07:** End-to-end testing, security audit, and quality assurance.
- [ ] **Phase 08:** Production deployment and client handover.
