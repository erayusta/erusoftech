'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BackgroundFX } from '@/components/ui/BackgroundFX';
import { HeroVideoBackground } from './HeroVideoBackground';
import { fadeUp, staggerContainer } from '@/lib/motion';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-32">
      {/* Video background (placeholder poster / muted loop) */}
      {/*
        Hero background — YouTube-backed. Swappable: if you later want to
        self-host, replace <HeroVideoBackground /> with a <video> element
        pointing at /placeholders/hero-bg.mp4 (built by scripts/build-hero-bg.sh).
      */}
      <HeroVideoBackground />

      {/* Gradient overlays & atmosphere */}
      <BackgroundFX variant="hero" />

      <Container size="wide" className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-display-1 font-semibold tracking-tight text-white text-balance"
          >
            {t.rich('title', {
              span: (chunks) => <span className="gradient-text">{chunks}</span>,
            })}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button href="#contact" size="lg" icon>
              {t('primaryCta')}
            </Button>
            <Button href="#services" variant="secondary" size="lg">
              <PlayCircle className="h-4 w-4" />
              {t('secondaryCta')}
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {[
              { value: '99.98%', label: t('stats.uptime') },
              { value: '400+', label: t('stats.deployments') },
              { value: '25+', label: t('stats.team') },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl px-4 py-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20"
              >
                <div className="font-semibold text-white">
                  <span className="text-2xl md:text-3xl">{stat.value}</span>
                </div>
                <div className="mt-1 text-xs leading-relaxed text-white/55">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Subtle scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="h-px w-8 bg-white/20" />
          <ArrowRight className="h-3 w-3 rotate-90" />
        </div>
      </div>
    </section>
  );
}
