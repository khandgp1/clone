'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true once the user has scrolled past `threshold` pixels.
 * Used to toggle the navbar from transparent → solid.
 */
export function useScrolled(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Set initial state in case the page loads already scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
