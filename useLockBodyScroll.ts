'use client';

import { useEffect } from 'react';

/**
 * Locks body scroll when `locked` is true.
 * Used by the mobile navigation drawer.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);
}
