import { HeroSection } from '@/components/sections/hero';

// Sections will be imported here as they are built, one phase at a time:
// import { ExpertiseSection } from '@/components/sections/expertise';
// import { VideoTestimonialsSection } from '@/components/sections/video-testimonials';
// import { InfoSection } from '@/components/sections/info-section';
// import { PortfolioSection } from '@/components/sections/portfolio';
// import { ValuesSection } from '@/components/sections/values';
// import { FinalCTA } from '@/components/sections/final-cta';
// import { PartnerLogos } from '@/components/sections/partner-logos';
// import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Remaining sections added here each phase */}
    </>
  );
}
