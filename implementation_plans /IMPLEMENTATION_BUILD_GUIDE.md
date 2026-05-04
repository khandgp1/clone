# Experts Remodel — Website Clone: Multi-Phase Build Plan

## Guiding Principles

- One section = one file. Each major section lives in src/components/sections/.
- ~600 line max per file. Split into sub-components if approaching the limit.
- Design tokens first. All colors, fonts, and spacing live in tailwind.config.js — never hardcoded.
- Screenshots drive fidelity. Each phase begins with a cropped screenshot review before a single line is written.
- Atoms before organisms. Build reusable primitives (Button, Card, Input) before assembling sections.

## Phase 0 — Project Scaffolding & Design System

**Goal**: Establish the foundation every subsequent phase depends on. Nothing visual is built yet.

### 0.1 — Repository Setup

- Initialize a Next.js 14+ (App Router) project with TypeScript.
- Install and configure Tailwind CSS, Framer Motion, Lucide React, React Hook Form, and Zod.
- Configure tailwind.config.js with the full design token set:

```
// tailwind.config.js — Design Tokens
colors: {
  gold:    '#B8975F',  // Primary CTA / Accents
  charcoal:'#1A1A1A',  // Dark backgrounds / headings
  cream:   '#F9F9F9',  // Light content areas
  body:    '#333333',  // Body copy
}
```

- Set up Google Fonts (or next/font) — suggested pairing: Playfair Display (display) + DM Sans (body).
- Configure ESLint, Prettier, and path aliases (@/components, @/lib, etc.).

### 0.2 — Global Layout (src/app/layout.tsx)

- Establish <html> / <body> with font classes applied.
- Wrap with any future providers (e.g., modal context).
- Define metadata for SEO (title, description, OG tags).

### 0.3 — Reusable Atom Components (src/components/ui/)

| File | Description |
|------|-------------|
| `button.tsx` | primary (gold fill), secondary (outline), ghost (text only) |
| `input.tsx` | Standard text, tel, email — with error state styling |
| `textarea.tsx` | Resizable, matches input styling |
| `card.tsx` | Base container: subtle shadow, optional hover lift |
| `section-heading.tsx` | Title + optional subtitle, supports light/dark context |
| `badge.tsx` | Small label pill (e.g., "Maryland's #1") |

### 0.4 — Constants & Utilities (src/lib/)

- `constants.ts` — Navigation links, contact info (phone, email, hours), service areas, partner logos list, footer quick links.
- `utils.ts` — `cn()` Tailwind class merger using `clsx` + `tailwind-merge`.

### 0.5 — Public Assets Audit

- Create /public/images/ folder structure:

```
/public/images/
  ├── hero/
  ├── projects/
  ├── testimonials/
  ├── partners/
  └── team/
```

- Use placeholder.svg or next/image blur placeholders until real assets are sourced.

## Phase 1 — Navigation

**Goal**: Sticky top navigation with transparent-to-solid scroll behavior.

### Components

- `src/components/layout/top-bar.tsx` — Phone number, email, and business hours strip above the main nav.
- `src/components/layout/main-nav.tsx` — Logo left, desktop links center/right, mobile hamburger menu.
- `src/components/layout/mobile-menu.tsx` — Full-screen or slide-in drawer for mobile.

### Logic

- `useScrolled` custom hook: watches `window.scrollY > 50` → toggles `bg-transparent` → `bg-charcoal` with a CSS transition.
- Mobile menu open/close state via `useState` in `main-nav.tsx`.

### Best Practices

- Use `next/link` for all internal routes.
- Mark the nav with `<header role="banner">` and `<nav aria-label="Main navigation">` for accessibility.
- The CTA button ("Get A Quote") in the nav should use the primary `Button` atom.

## Phase 2 — Hero Section + Lead Generation Form

**Goal**: Full-viewport hero with background image, headline, and the floating lead-gen form card.

### Components

- `src/components/sections/hero.tsx` — Layout orchestrator.
- `src/components/forms/lead-form.tsx` — Self-contained form with its own validation logic.

### Sub-elements

- Background image with a dark gradient overlay for text legibility.
- Headline: "Maryland's Home Remodeling Experts" in display font.
- Sub-headline body copy.
- CTA button below copy (secondary style, links to form or scrolls to it).

### Lead Form Logic (lead-form.tsx)

- Fields: Name, Phone, Email, Service Type (select), Message.
- Zod schema defines validation rules.
- React Hook Form useForm() connects schema to inputs.
- Submission state machine: 'idle' | 'submitting' | 'success' | 'error' via useState.
- On success: replace form with a thank-you message.
- Discount badge ("Get A 30% Discount") rendered as a <Badge> atom above the form card.

### Best Practices

- Form card floats over the hero on desktop; stacks below on mobile.
- Use `next/image` with `priority` prop on the hero background for LCP optimization.
- No `<form>` HTML tag — use `<div>` with React Hook Form's `handleSubmit`.

## Phase 3 — Expertise / "Expert Remodeling Team" Section

**Goal**: Image collage left, text content right — introduces the team and triggers a "Get In Touch" CTA.

### Components

- `src/components/sections/expertise.tsx`
- `src/components/ui/image-collage.tsx` — Asymmetric 3-image grid (reusable for other sections).

### Layout Notes

- Two-column layout on desktop (collage | text), single column stacked on mobile.
- Text block includes: heading, 2–3 paragraphs with bold keywords (matching the site's SEO content pattern), phone number link, and "Get In Touch" primary CTA button.

## Phase 4 — Video Testimonials Section

**Goal**: Dark-background grid of video thumbnail cards with a play overlay. Clicking opens a modal.

### Components

- `src/components/sections/video-testimonials.tsx` — Layout + section header.
- `src/components/ui/video-card.tsx` — Thumbnail image + play icon overlay + hover state.
- `src/components/ui/video-modal.tsx` — Global modal triggered by card click.

### Logic

- `selectedVideo: string | null` state lifted to the section level (or a Context if needed globally).
- `VideoCard` calls `onPlay(videoUrl)` prop on click.
- `VideoModal` renders `<iframe>` (YouTube embed) or `<video>` tag when `selectedVideo` is not null.
- Clicking modal backdrop or close button resets `selectedVideo` to null.
- Trap focus inside modal for accessibility (`aria-modal`, `role="dialog"`).

### Best Practices

- Lazy-load video iframes — only inject the src attribute after the play button is clicked to avoid unwanted network requests.
- 2×2 grid on desktop, 1 column on mobile.

## Phase 5 — Info Section (Gold Background)

**Goal**: Alternating image-left/text-right and text-left/image-right feature rows on a gold background.

### Components

- `src/components/sections/info-section.tsx` — Orchestrates the two feature rows.
- `src/components/ui/feature-row.tsx` — Reusable alternating row: accepts `imagePosition: 'left' | 'right'` prop.

### Content Blocks

- Free Design Consultations — image left, copy right.
- Renovation Timeline — copy left, image right.

### Best Practices

- Use CSS flex-row-reverse or md:flex-row-reverse controlled by the imagePosition prop.
- All body copy should accept a content prop (string or React node) for easy content updates without touching layout code.

### Data Shape

```
// src/lib/constants.ts
export const projects = [
  { id: 1, title: 'Full Home Renovation', location: 'Bethesda, MD', image: '/images/projects/1.jpg' },
  // ...
]
```

### Best Practices

- Grid: 4 columns on desktop, 2 on tablet, 1 on mobile.
- Hover state on ProjectCard: subtle image zoom (scale-105 with overflow-hidden).
- Cards link to a future project detail page via next/link href={/projects/${id}}.

## Phase 7 — Values / "Why Work With Us?" Section

**Goal**: Dark charcoal background, numbered icon cards explaining the company's value propositions.

### Components

- `src/components/sections/values.tsx`
- `src/components/ui/value-card.tsx` — Accepts number, icon, title, description props.

### Data Shape

```
// Defined in constants.ts
export const values = [
  { id: 1, icon: 'ShieldCheck', title: 'Our 3 Year Guarantee', description: '...' },
  { id: 2, icon: 'Award',       title: 'Professional Service', description: '...' },
  { id: 3, icon: 'Wrench',      title: 'Remodeling Expertise', description: '...' },
]
```

### Best Practices

- Icon component dynamically maps string names to Lucide icons via a ICON_MAP object — avoids hardcoding icons in the data layer.
- 3-column grid on desktop, 1 column on mobile.

## Phase 8 — Final CTA Banner

**Goal**: Full-width banner with a background image, headline, and a primary "Get A Quote" button.

### Components

- `src/components/sections/final-cta.tsx`

### Notes

- Parallax or fixed background optional for depth effect.
- Button should be the primary atom — links to the lead form or a /contact page.
- Keep this file minimal (~60 lines) — it is purely presentational.

## Phase 9 — Partner Logos Bar

**Goal**: Horizontal strip of trust/accreditation logos (Google, NARI, BBB, etc.).

### Components

- `src/components/sections/partner-logos.tsx`

### Notes

- On desktop: flex-wrap or CSS scroll marquee animation for a polished feel.
- All logos stored in /public/images/partners/ as SVGs or PNGs.
- Logos defined in constants.ts as { name: string, src: string }[].

## Phase 10 — Footer

**Goal**: 4-column dark footer with contact info, quick links, service area, and legal bar.

### Components

- `src/components/layout/footer.tsx` — Orchestrator.
- `src/components/layout/footer-contact.tsx` — Address, phone, email, hours, star rating.
- `src/components/layout/footer-links.tsx` — "General" and "Our Services" quick link columns.
- `src/components/layout/footer-legal.tsx` — Copyright line, social icons.

### Best Practices

- Service area map placeholder — reserve space for a future embedded Google Map or static map image.
- Social icon links use aria-label attributes.
- Copyright year rendered dynamically: new Date().getFullYear().

## Phase 11 — Scroll Animations & Polish

**Goal**: Layer in motion and micro-interactions after all sections are static and correct.

### Approach

- Wrap section content with Framer Motion <motion.div> + viewport={{ once: true }} — triggers animation only on first scroll-into-view.
- Standard enter animation: opacity: 0, y: 24 → opacity: 1, y: 0 over 0.5s ease-out.
- Stagger children in grids (cards, value items) using staggerChildren: 0.1.
- Navbar scroll effect wired up (from Phase 1 plan).

### Best Practices

- Define animation variants in src/lib/motion.ts as shared constants — prevents duplication across sections.
- prefers-reduced-motion media query respected: wrap all Framer Motion animations in a check or use useReducedMotion() hook.

## Phase 12 — SEO, Performance & Accessibility Audit

**Goal**: Production-ready quality pass before launch.

| Area                    | Action                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| SEO                     | Verify metadata exports in layout.tsx and any future route pages. Add OG image.                                                             |
| Images                  | All images use next/image with alt text, correct width/height, and loading="lazy" (except hero).                                          |
| Accessibility           | Audit heading hierarchy (single <h1> per page). All interactive elements keyboard-navigable. Color contrast ≥ 4.5:1.                          |
| Performance             | Run Lighthouse. Target 90+ scores. Defer non-critical JS.                                                                                     |
| Forms                   | Test all Zod validation paths. Confirm server action or API route is wired.                                                                     |
| Mobile                  | Full breakpoint QA at 375px, 768px, 1280px, 1440px.                                                                                             |

## Phase Summary Table

| Phase | Section                         | Key Files                                            |
| ----- | ------------------------------- | ---------------------------------------------------- |
| 0     | Scaffolding & Design System     | tailwind.config, ui/ atoms, lib/                     |
| 1     | Navigation                      | top-bar, main-nav, mobile-menu                       |
| 2     | Hero + Lead Form                | hero, lead-form                                      |
| 3     | Expertise / Team                | expertise, image-collage                             |
| 4     | Video Testimonials              | video-testimonials, video-card, video-modal          |
| 5     | Info Section (Gold)             | info-section, feature-row                            |
| 6     | Portfolio Grid                  | portfolio, project-card                              |
| 7     | Values Section                  | values, value-card                                   |
| 8     | Final CTA Banner                | final-cta                                            |
| 9     | Partner Logos                   | partner-logos                                        |
| 10    | Footer                          | footer, sub-columns, footer-legal                    |
| 11    | Animations & Polish             | lib/motion.ts, Framer Motion wrappers                |
| 12    | SEO, Perf & A11y Audit (Global) | metadata exports, Lighthouse, Lighthouse audit → 90+ |

