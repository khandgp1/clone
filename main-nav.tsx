'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Phone, Mail, Clock, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { useScrolled } from '@/hooks/useScrolled';
import { CONTACT, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(50);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
          scrolled
            ? 'bg-charcoal-nav shadow-[0_2px_20px_rgba(0,0,0,0.35)]'
            : 'bg-charcoal-nav'
        )}
        role="banner"
      >
        <div className="max-w-8xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-[80px] gap-4">
            {/* ── Logo ───────────────────────────────────────── */}
            <Link
              href="/"
              className="flex-shrink-0 flex flex-col items-start leading-none"
              aria-label="Experts Remodel — Home"
            >
              {/*
               * Replace this placeholder with:
               * <Image src="/images/logo.png" alt="Experts Remodel" width={160} height={52} priority />
               */}
              <span className="font-display text-white text-xl font-bold tracking-tight">
                Experts{' '}
                <span className="text-gold">✦</span>{' '}
                Remodel
              </span>
              <span className="font-sans text-white/50 text-[10px] tracking-wider mt-0.5 uppercase">
                Your Dream , Our Project..
              </span>
            </Link>

            {/* ── Contact Strip (desktop) ─────────────────────── */}
            <nav
              aria-label="Contact information"
              className="hidden lg:flex items-center gap-6 text-white/80 text-sm font-sans"
            >
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2 hover:text-gold transition-colors duration-200"
              >
                <Phone size={15} className="text-gold flex-shrink-0" />
                <span>{CONTACT.phone}</span>
              </a>

              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-2 hover:text-gold transition-colors duration-200"
              >
                <Mail size={15} className="text-gold flex-shrink-0" />
                <span>{CONTACT.email}</span>
              </a>

              <div className="flex items-start gap-2">
                <Clock size={15} className="text-gold flex-shrink-0 mt-0.5" />
                <div className="flex flex-col leading-snug">
                  <span>
                    {CONTACT.hours.weekday} | {CONTACT.hours.saturday}
                  </span>
                  <span>{CONTACT.hours.sunday}</span>
                </div>
              </div>
            </nav>

            {/* ── CTA + Hamburger ─────────────────────────────── */}
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                className="hidden sm:inline-flex"
                onClick={() => {
                  document
                    .getElementById('lead-form')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get an Estimate
              </Button>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 text-white hover:text-gold transition-colors duration-200"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ──────────────────────────────────────── */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
