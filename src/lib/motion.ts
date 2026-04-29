import type { Variants } from 'framer-motion';

/**
 * Motion presets used across the site.
 * Prefer short, purposeful motion — short durations, custom ease.
 */

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeInOutSoft: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const viewportOnce = { once: true, amount: 0.25 } as const;

/**
 * Meteor drop — dramatic reveal for revealed-on-demand cards.
 * Cards arrive from above with a slight tilt, blur clears as they land.
 * Use with a `custom` index prop for a falling-stream stagger.
 */
export const meteorDrop: Variants = {
  hidden: {
    y: -180,
    opacity: 0,
    scale: 0.85,
    rotate: -6,
    filter: 'blur(8px)',
  },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.06,
      type: 'spring',
      stiffness: 70,
      damping: 14,
    },
  }),
  exit: (i: number = 0) => ({
    y: -120,
    opacity: 0,
    scale: 0.9,
    filter: 'blur(6px)',
    transition: {
      delay: i * 0.02,
      duration: 0.25,
      ease: easeOutExpo,
    },
  }),
};
