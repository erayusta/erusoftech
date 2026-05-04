'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { fadeUp, viewportOnce } from '@/lib/motion';

/**
 * Logos rendered in the partners marquee. The image files live under
 * public/brand/clients/ and were sourced from each brand's own site
 * (see chore(brand) commit on the works-page work). Mixed file types
 * (svg / png / jpg / webp) reflect what each brand actually serves;
 * they're rendered through plain <img> against a small white tile so
 * brand colors stay intact on the dark theme.
 */
type Logo = { name: string; src: string };

const LOGOS: Logo[] = [
  { name: 'Pozitif Teknoloji', src: '/brand/clients/pt.svg' },
  { name: 'Marketten Gelse', src: '/brand/clients/markettengelse.svg' },
  { name: 'Muyubi', src: '/brand/clients/muyubi.png' },
  { name: 'CNT İç Giyim', src: '/brand/clients/e-cnt.jpg' },
  { name: 'Petaşk', src: '/brand/clients/petask.png' },
  { name: 'Bernarpet', src: '/brand/clients/bernarpet.png' },
  { name: 'RAKS', src: '/brand/clients/raks.webp' },
  { name: 'DIDOS', src: '/brand/clients/didosofficial.webp' },
  { name: 'eMind Teknoloji', src: '/brand/clients/emind.png' },
  { name: 'Bimotif', src: '/brand/clients/bimotif.png' },
  { name: 'Teknorot', src: '/brand/clients/teknorot.png' },
  { name: 'Hobim', src: '/brand/clients/hobim.png' },
  { name: 'NET Mühendislik', src: '/brand/clients/net-muhendislik.png' },
  { name: 'Vitanova', src: '/brand/clients/vitanovaevdesaglik.png' },
  { name: 'Türkuzay', src: '/brand/clients/turkuzay.png' },
  { name: 'Empatist', src: '/brand/clients/empatist.png' },
  { name: 'Nihan Kaya', src: '/brand/clients/nihankaya.png' },
  { name: 'Topstudy', src: '/brand/clients/topstudy.svg' },
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
          {loop.map(({ name, src }, i) => (
            <LogoTile key={`${name}-${i}`} name={name} src={src} />
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

function LogoTile({ name, src }: Logo) {
  return (
    <div
      role="img"
      aria-label={name}
      className={[
        'group/tile relative flex h-16 w-52 shrink-0 items-center justify-center rounded-2xl',
        'border border-white/10 bg-white px-4',
        'transition-all duration-500 ease-out',
        'hover:-translate-y-0.5 hover:scale-[1.04] hover:border-white/30',
        'hover:[filter:drop-shadow(0_0_28px_rgba(46,107,255,0.35))]',
      ].join(' ')}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        className="h-9 w-auto max-w-full object-contain transition-transform duration-500 group-hover/tile:scale-[1.03]"
        loading="lazy"
      />

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
