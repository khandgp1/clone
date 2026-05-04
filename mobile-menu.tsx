'use client';

import Link from 'next/link';
import { X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { CONTACT, NAV_LINKS, SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useLockBodyScroll(isOpen);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[70] w-[300px] bg-charcoal-nav',
          'flex flex-col overflow-y-auto',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="font-display text-white text-lg font-bold">
            Experts <span className="text-gold">✦</span> Remodel
          </span>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors duration-200 p-1"
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-6 py-6 gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-sans text-white/80 hover:text-gold text-base py-2.5 border-b border-white/5 transition-colors duration-200 uppercase tracking-widest text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Services accordion placeholder */}
        <div className="px-6 pb-4">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-sans">
            Our Services
          </p>
          <div className="flex flex-col gap-1">
            {SERVICES.slice(0, 5).map((service) => (
              <span
                key={service}
                className="text-white/60 text-sm font-sans py-1"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Contact & CTA */}
        <div className="mt-auto px-6 py-6 border-t border-white/10 flex flex-col gap-4">
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-3 text-white hover:text-gold transition-colors duration-200 font-sans"
          >
            <Phone size={16} className="text-gold" />
            <span className="text-sm">{CONTACT.phone}</span>
          </a>
          <a
            href={CONTACT.emailHref}
            className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors duration-200 font-sans"
          >
            <Mail size={16} className="text-gold" />
            <span className="text-sm">{CONTACT.email}</span>
          </a>
          <Button variant="primary" size="md" fullWidth onClick={onClose}>
            Get an Estimate
          </Button>
        </div>
      </div>
    </>
  );
}
