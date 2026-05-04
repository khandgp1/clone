# 1. Design & Branding Analysis

## Color Palette

Based on the provided UI, we will use a "Sophisticated Professional" palette:

Primary (Gold/Tan): #B8975F — Used for CTAs, accents, and high-impact section backgrounds.

Secondary (Charcoal): #1A1A1A — Used for dark section backgrounds and primary headings.

Neutral (White/Cream): #FFFFFF / #F9F9F9 — Used for clean content areas and readability.

Text (Deep Gray): #333333 — For body copy to ensure high accessibility.

## Reusable UI Elements (Atoms)

Button: Primary (Gold background), Secondary (Outline), and Ghost (Text only) variants.

SectionHeading: Standardized typography for section titles and subtitles.

Card: Base container with subtle shadows/hover effects for projects and features.

Input/TextArea: Standardized form fields for the Lead Generation form.

# 2. Component Tree Structure

App (Layout Wrapper)
├── Navigation (Sticky)
│   ├── TopBar (Contact info/Secondary CTA)
│   └── MainNav (Logo + Desktop/Mobile Menu)
├── HeroSection
│   ├── HeroContent (Title/Sub-text)
│   └── LeadGenForm (Floating Card with validation)
├── ExpertiseSection
│   ├── ImageCollage (Asymmetric Grid)
│   └── ExpertiseContent (Text + "Book Now" CTA)
├── VideoTestimonials
│   ├── SectionHeader
│   └── VideoGrid
│       └── VideoCard (Thumbnail + Play Overlay)
├── InfoSection (Gold Background)
│   ├── FeatureRow (Image-Left / Text-Right)
│   └── FeatureRow (Text-Left / Image-Right)
├── PortfolioSection
│   ├── SectionHeader
│   └── ProjectGrid
│       └── ProjectCard (Image + Location Overlay)
├── ValuesSection (Dark Background)
│   └── ValueGrid
│       └── ValueCard (Numbered Icon + Description)
├── FinalCTA (Banner with background image)
├── PartnerLogos (Slider or Flex-wrap)
└── Footer
    ├── ContactColumn
    ├── QuickLinks
    ├── ServiceAreaMap
    └── LegalBar (Copyright + Socials)

# 3. Suggested Tech Stack

Framework: Next.js (App Router) — Essential for SEO and fast initial page loads.

Styling: Tailwind CSS — Enables rapid development and maintains the design system through tailwind.config.js.

Icons: Lucide-React — Clean, lightweight SVG icons.

Animations: Framer Motion — For subtle "fade-in" effects as users scroll through the sections.

Forms: React Hook Form + Zod — For robust validation of the lead generation form.

# 4. File Structure

src/
├── app/                  # Next.js Routes
│   ├── layout.tsx        # Global Providers & Main Layout
│   └── page.tsx          # Homepage construction
├── components/           # UI Components
│   ├── ui/               # Reusable Atoms (Buttons, Inputs)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   ├── sections/         # Complex Organisms (One section per file)
│   │   ├── hero.tsx
│   │   ├── video-grid.tsx
│   │   ├── project-portfolio.tsx
│   │   └── footer.tsx
│   └── forms/            # Form-specific logic
│       └── lead-form.tsx
├── hooks/                # Custom React hooks (e.g., useScroll)
├── lib/                  # Utilities & Constants
│   ├── constants.ts      # Navigation links, contact info
│   └── utils.ts          # Tailwind class merger
└── public/               # Images and Assets

# 5. Logic Flow & State Management

## A. Lead Generation Form Logic

State: Use useState to track submission status (Idle, Submitting, Success, Error).

Validation: Zod schema to ensure "Phone Number" and "Email" formats are correct before allowing submission.

Submission: Handle onSubmit via a server action or API route to send data to a CRM/Email service.

## B. Video Modal Logic

Trigger: Each VideoCard receives a videoUrl prop.

Flow: Clicking a card sets a selectedVideo state.

Overlay: A global Modal component listens for the selectedVideo state; if present, it renders an <iframe> or HTML5 video player.

## C. Scroll Interactions

Navbar: Logic to detect window.scrollY > 50 to toggle the navbar background from transparent to solid charcoal.

Section Reveals: Use Intersection Observer (via Framer Motion) to trigger animations only when the section is in view.