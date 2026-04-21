'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

const LOGOS = [
  '/placeholders/logos/logo-1.svg',
  '/placeholders/logos/logo-2.svg',
  '/placeholders/logos/logo-3.svg',
  '/placeholders/logos/logo-4.svg',
  '/placeholders/logos/logo-5.svg',
  '/placeholders/logos/logo-6.svg',
  '/placeholders/logos/logo-7.svg',
  '/placeholders/logos/logo-8.svg',
] as const;

export function PartnersBanner() {
  const t = useTranslations('partners');

  // Duplicate once for seamless -50% translate loop.
  const loop = [...LOGOS, ...LOGOS];

  return (
    <section className="relative border-y border-white/5 bg-ink-900/40 py-16">
      <Container>
        <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.25em] text-white/50">
          {t('title')}
        </p>
      </Container>

      <div
        className="group relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-scroll-x gap-12 py-4 group-hover:[animation-play-state:paused]">
          {loop.map((src, i) => (
            <div
              key={i}
              className="flex h-10 w-40 shrink-0 items-center justify-center text-white/60 transition-all duration-300 hover:text-white hover:[filter:drop-shadow(0_0_12px_rgba(46,107,255,0.6))] hover:scale-110"
            >
              <Image
                src={src}
                alt=""
                width={160}
                height={40}
                className="h-10 w-auto opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                priority={i < 8}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
