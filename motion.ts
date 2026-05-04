export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export const navbarVariants = {
  transparent: {
    backgroundColor: 'rgba(42, 42, 42, 0)',
    boxShadow: 'none',
  },
  solid: {
    backgroundColor: 'rgba(42, 42, 42, 1)',
    boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
  },
};

export const VIEWPORT_ONCE = { once: true, margin: '-80px' };
