import Image from 'next/image';
import Link from 'next/link';
import { LeadForm } from '@/components/forms/lead-form';
import { CONTACT } from '@/lib/constants';

export function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center"
      aria-label="Hero — Maryland's Home Remodeling Experts"
    >
      {/* ── Background Image ─────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-house.jpg"
          alt="A beautiful Maryland home transformed by Experts Remodel"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/*
         * Gradient overlay:
         * - Left side: heavier dark overlay for text legibility
         * - Right side: lighter overlay so the house photo shows through the form
         */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.35) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-4 md:px-8 pt-[100px] pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* Left — Headline + CTA */}
          <div className="flex-1 max-w-[560px]">
            <h1 className="font-display text-white text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight">
              Maryland's Home Remodeling Experts
            </h1>

            <p className="mt-5 font-sans text-white font-semibold text-base md:text-lg leading-relaxed max-w-[480px]">
              Transform your home without breaking the bank! At Experts Remodel,
              we offer top-notch home remodeling services at prices that fit your
              budget.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center px-7 py-3.5
                           font-sans font-medium text-sm uppercase tracking-widest
                           bg-gold text-white border border-gold
                           hover:bg-gold-dark hover:border-gold-dark
                           active:scale-[0.98] transition-all duration-200"
              >
                Call Now For Free Consultation
              </a>
            </div>
          </div>

          {/* Right — Floating Lead Form */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <LeadForm />
          </div>

        </div>
      </div>
    </section>
  );
}
