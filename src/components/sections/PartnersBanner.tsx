'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { fadeUp, viewportOnce } from '@/lib/motion';

/**
 * Inline SVG brand marks.
 *
 * The placeholder logos used to live as standalone .svg files rendered
 * through next/image — but `currentColor` doesn't inherit across the
 * <img> boundary, so the marks rendered in their default fill (dark) and
 * disappeared into the page background. Re-authoring them as inline SVG
 * components makes `fill="currentColor"` work again; the parent tile
 * drives color, grayscale and glow with plain CSS.
 */
type LogoRenderer = (className: string) => React.ReactNode;

const LOGOS: { name: string; render: LogoRenderer }[] = [
  {
    name: 'Nexora',
    render: (c) => (
      <svg viewBox="0 0 180 48" fill="none" className={c} aria-label="Nexora">
        <rect x="4" y="12" width="24" height="24" rx="6" fill="currentColor" />
        <path d="M11 19l10 10M21 19l-10 10" stroke="#05060A" strokeWidth="2.6" strokeLinecap="round" />
        <text
          x="38"
          y="32"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="20"
          fontWeight={700}
          letterSpacing="-0.4"
          fill="currentColor"
        >
          Nexora
        </text>
      </svg>
    ),
  },
  {
    name: 'Orbitly',
    render: (c) => (
      <svg viewBox="0 0 180 48" fill="none" className={c} aria-label="Orbitly">
        <circle cx="16" cy="24" r="10" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="22.5" cy="19" r="3" fill="currentColor" />
        <path d="M6 24a10 10 0 0 0 20 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
        <text
          x="38"
          y="32"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="20"
          fontWeight={700}
          letterSpacing="-0.4"
          fill="currentColor"
        >
          Orbitly
        </text>
      </svg>
    ),
  },
  {
    name: 'Vertex',
    render: (c) => (
      <svg viewBox="0 0 180 48" fill="none" className={c} aria-label="Vertex">
        <path d="M4 36L16 10l12 26Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M10 36l6-13 6 13Z" fill="currentColor" />
        <text
          x="38"
          y="32"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="20"
          fontWeight={700}
          letterSpacing="-0.4"
          fill="currentColor"
        >
          Vertex
        </text>
      </svg>
    ),
  },
  {
    name: 'Lumen',
    render: (c) => (
      <svg viewBox="0 0 180 48" fill="none" className={c} aria-label="Lumen">
        <rect x="2" y="14" width="18" height="20" rx="10" fill="currentColor" />
        <rect x="14" y="14" width="18" height="20" rx="10" fill="currentColor" fillOpacity="0.55" />
        <text
          x="42"
          y="32"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="20"
          fontWeight={700}
          letterSpacing="-0.4"
          fill="currentColor"
        >
          Lumen
        </text>
      </svg>
    ),
  },
  {
    name: 'Altair',
    render: (c) => (
      <svg viewBox="0 0 180 48" fill="none" className={c} aria-label="Altair">
        <path
          d="M16 6l3 10 10 3-10 3-3 10-3-10-10-3 10-3z"
          fill="currentColor"
        />
        <text
          x="38"
          y="32"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="20"
          fontWeight={700}
          letterSpacing="-0.4"
          fill="currentColor"
        >
          Altair
        </text>
      </svg>
    ),
  },
  {
    name: 'Kairos',
    render: (c) => (
      <svg viewBox="0 0 180 48" fill="none" className={c} aria-label="Kairos">
        <rect x="4" y="12" width="6" height="24" rx="2" fill="currentColor" />
        <rect x="13" y="18" width="6" height="18" rx="2" fill="currentColor" />
        <rect x="22" y="24" width="6" height="12" rx="2" fill="currentColor" />
        <text
          x="36"
          y="32"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="20"
          fontWeight={700}
          letterSpacing="-0.4"
          fill="currentColor"
        >
          Kairos
        </text>
      </svg>
    ),
  },
  {
    name: 'Hexon',
    render: (c) => (
      <svg viewBox="0 0 180 48" fill="none" className={c} aria-label="Hexon">
        <path d="M16 6l10 6v14l-10 6-10-6V12Z" fill="currentColor" />
        <path d="M16 14l5 3v7l-5 3-5-3v-7Z" fill="#05060A" />
        <text
          x="34"
          y="32"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="20"
          fontWeight={700}
          letterSpacing="-0.4"
          fill="currentColor"
        >
          Hexon
        </text>
      </svg>
    ),
  },
  {
    name: 'Parallax',
    render: (c) => (
      <svg viewBox="0 0 200 48" fill="none" className={c} aria-label="Parallax">
        <circle cx="12" cy="24" r="8" fill="currentColor" />
        <circle cx="24" cy="24" r="8" fill="currentColor" fillOpacity="0.5" />
        <text
          x="40"
          y="32"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="20"
          fontWeight={700}
          letterSpacing="-0.4"
          fill="currentColor"
        >
          Parallax
        </text>
      </svg>
    ),
  },
];

export function PartnersBanner() {
  const t = useTranslations('partners');

  // Duplicate once — the marquee translates by -50% so the loop is seamless.
  const loop = [...LOGOS, ...LOGOS];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Gradient dividers top + bottom to separate the band from the sections above and below */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px divider-fade" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px divider-fade" />

      {/* Subtle cobalt ambient glow centered behind the banner */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-80 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(46,107,255,0.55), rgba(139,92,246,0.15), transparent 80%)',
          }}
        />
      </div>

      <Container>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 text-center text-xs font-medium uppercase tracking-[0.28em] text-white/55"
        >
          {t('title')}
        </motion.p>
      </Container>

      {/* Marquee lane */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-scroll-x gap-4 py-2 group-hover:[animation-play-state:paused]">
          {loop.map(({ name, render }, i) => (
            <LogoTile key={`${name}-${i}`} name={name} render={render} />
          ))}
        </div>

        {/*
          Intense shine sweep — brand-gradient band drifting across the
          banner every ~3.8s. Screen blend mode so it reads as added light
          on top of logos, not paint over them.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-[30%] animate-shine-sweep"
          style={{
            background:
              'linear-gradient(110deg, transparent 20%, rgba(46,107,255,0.42) 40%, rgba(139,92,246,0.36) 55%, rgba(34,211,238,0.32) 70%, transparent 80%)',
            filter: 'blur(8px)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>
    </section>
  );
}

function LogoTile({ name, render }: { name: string; render: LogoRenderer }) {
  return (
    <div
      role="img"
      aria-label={name}
      className={[
        'group/tile relative flex h-16 w-52 shrink-0 items-center justify-center rounded-2xl',
        'border border-white/8 bg-white/[0.02] text-white/75',
        'transition-all duration-500 ease-out',
        'hover:-translate-y-0.5 hover:scale-[1.04] hover:border-white/20 hover:bg-white/[0.05] hover:text-white',
        'hover:[filter:drop-shadow(0_0_28px_rgba(46,107,255,0.35))]',
        'backdrop-blur-sm',
      ].join(' ')}
    >
      {render('h-8 w-auto transition-colors duration-500')}

      {/* Subtle gradient border that fades in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100"
        style={{
          padding: '1px',
          background:
            'linear-gradient(135deg, rgba(46,107,255,0.55), rgba(139,92,246,0.45), rgba(34,211,238,0.35))',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
    </div>
  );
}
