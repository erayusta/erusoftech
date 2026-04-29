'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

type Props = {
  expanded: boolean;
  onClick: () => void;
  labelOpen: string;
  labelClose: string;
};

/**
 * Brand-gradient pill button used to toggle "show more / show less" reveals.
 * Pairs with the meteorDrop motion preset so the hidden cards drop in dramatically.
 */
export function RevealButton({ expanded, onClick, labelOpen, labelClose }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-gradient-to-r from-brand-500 via-accent-violet to-brand-500 bg-[length:200%_100%] bg-left px-7 py-3 text-sm font-semibold text-white shadow-glow-sm transition-[background-position,box-shadow] duration-700 hover:bg-right hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(255,255,255,0.3),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <Sparkles className="relative h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
      <span className="relative">{expanded ? labelClose : labelOpen}</span>
      <motion.span
        animate={{ rotate: expanded ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="relative inline-flex"
      >
        <ChevronDown className="h-4 w-4" />
      </motion.span>
    </motion.button>
  );
}
