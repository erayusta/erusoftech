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
/**
 * `tone: 'light'` flips the tile to a dark glass background so logos
 * with white marks/text stay visible — the default white tile is for
 * dark/colored brand assets.
 */
type Logo = { name: string; src: string; url: string; tone?: 'light' };

const LOGOS: Logo[] = [
  { name: 'Pozitif Teknoloji', src: '/brand/clients/pt.svg', url: 'https://pt.com.tr' },
  { name: 'Marketten Gelse', src: '/brand/clients/markettengelse.svg', url: 'https://markettengelse.com' },
  { name: 'Muyubi', src: '/brand/clients/muyubi.png', url: 'https://muyubi.com' },
  { name: 'CNT İç Giyim', src: '/brand/clients/e-cnt.jpg', url: 'https://e-cnt.com.tr' },
  { name: 'Petaşk', src: '/brand/clients/petask.png', url: 'https://petask.com.tr' },
  { name: 'Bernarpet', src: '/brand/clients/bernarpet.png', url: 'https://bernarpet.com' },
  { name: 'RAKS', src: '/brand/clients/raks.webp', url: 'https://raks.com.tr' },
  { name: 'DIDOS', src: '/brand/clients/didosofficial.webp', url: 'https://didosofficial.com.tr' },
  { name: 'eMind Teknoloji', src: '/brand/clients/emind.png', url: 'https://emind.com.tr', tone: 'light' },
  { name: 'Erusoft Entegre', src: '/brand/clients/entegre-erusoft.svg', url: 'https://entegre.erusoft.com' },
  { name: 'Bimotif', src: '/brand/clients/bimotif.svg', url: 'https://www.bimotif.com' },
  { name: 'Teknorot', src: '/brand/clients/teknorot.png', url: 'https://www.teknorot.com' },
  { name: 'Hobim', src: '/brand/clients/hobim.png', url: 'https://hobim.com' },
  { name: 'NET Mühendislik', src: '/brand/clients/net-muhendislik.png', url: 'https://net-muhendislik.com' },
  { name: 'Vitanova', src: '/brand/clients/vitanovaevdesaglik.png', url: 'https://vitanovaevdesaglik.com' },
  { name: 'Türkuzay', src: '/brand/clients/turkuzay.png', url: 'https://turkuzay.com.tr', tone: 'light' },
  { name: 'Empatist', src: '/brand/clients/empatist.png', url: 'https://empatist.com', tone: 'light' },
  { name: 'Nihan Kaya', src: '/brand/clients/nihankaya.png', url: 'https://nihankaya.com' },
  { name: 'Topstudy', src: '/brand/clients/topstudy.svg', url: 'https://topstudy.com', tone: 'light' },
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
          {loop.map(({ name, src, url }, i) => (
            <LogoTile key={`${name}-${i}`} name={name} src={src} url={url} />
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

function LogoTile({ name, src, url, tone }: Logo) {
  const isLight = tone === 'light';
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      title={name}
      className={[
        'group/tile relative flex h-16 w-52 shrink-0 items-center justify-center rounded-2xl',
        'border px-4 transition-all duration-500 ease-out',
        isLight
          ? 'border-white/20 bg-ink-700 hover:border-white/40'
          : 'border-white/10 bg-white hover:border-white/30',
        'hover:-translate-y-0.5 hover:scale-[1.04]',
        'hover:[filter:drop-shadow(0_0_28px_rgba(46,107,255,0.35))]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950',
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
    </a>
  );
}
