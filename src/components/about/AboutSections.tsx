'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  ShoppingCart,
  Code2,
  Network,
  Sparkles,
  Handshake,
  Eye,
  Wrench,
  Users,
  Globe2,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlowCard } from '@/components/ui/GlowCard';
import { BackgroundFX } from '@/components/ui/BackgroundFX';
import { Button } from '@/components/ui/Button';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

// ---------- Hero ----------

export function AboutHero() {
  const t = useTranslations('about.hero');

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
      <BackgroundFX variant="hero" />
      <Container size="wide" className="relative">
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
            className="mt-6 text-display-2 font-semibold tracking-tight text-white text-balance"
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
        </motion.div>
      </Container>
    </section>
  );
}

// ---------- Story ----------

const MILESTONE_KEYS = ['founded', 'team', 'scale', 'today'] as const;

export function AboutStory() {
  const t = useTranslations('about.story');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <Section
      eyebrow={t('eyebrow')}
      title={t('title')}
      align="left"
      size="default"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto max-w-3xl space-y-6"
      >
        {paragraphs.map((paragraph, idx) => (
          <motion.p
            key={idx}
            variants={fadeUp}
            className="text-lg leading-relaxed text-white/70 text-balance"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 grid gap-4 md:grid-cols-4"
      >
        {MILESTONE_KEYS.map((key) => (
          <motion.div key={key} variants={fadeUp}>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {t(`milestones.${key}.year`)}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-white/55">
                {t(`milestones.${key}.label`)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ---------- Expertise ----------

type ExpertiseKey = 'ecommerce' | 'custom' | 'integrations';

const EXPERTISE: { key: ExpertiseKey; icon: LucideIcon; accent: string; itemCount: number }[] = [
  {
    key: 'ecommerce',
    icon: ShoppingCart,
    accent: 'from-accent-pink/30 to-accent-violet/20',
    itemCount: 4,
  },
  {
    key: 'custom',
    icon: Code2,
    accent: 'from-brand-400/30 to-accent-cyan/20',
    itemCount: 4,
  },
  {
    key: 'integrations',
    icon: Network,
    accent: 'from-accent-emerald/30 to-brand-400/20',
    itemCount: 4,
  },
];

export function AboutExpertise() {
  const t = useTranslations('about.expertise');

  return (
    <Section
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      size="wide"
    >
      <BackgroundFX variant="grid" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-1 lg:grid-cols-3"
      >
        {EXPERTISE.map(({ key, icon: Icon, accent, itemCount }) => (
          <motion.div key={key} variants={fadeUp}>
            <GlowCard className="group gradient-border h-full rounded-2xl p-7">
              <div
                className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${accent} text-white ring-1 ring-white/10`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                {t(`groups.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {t(`groups.${key}.description`)}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-5">
                {Array.from({ length: itemCount }).map((_, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/75">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-500/15 ring-1 ring-brand-400/40">
                      <Check className="h-2.5 w-2.5 text-brand-300" />
                    </span>
                    <span>{t(`groups.${key}.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ---------- Values ----------

type ValueKey = 'production' | 'partnership' | 'transparency' | 'rightTool' | 'team' | 'compliance';

const VALUES: { key: ValueKey; icon: LucideIcon; accent: string }[] = [
  { key: 'production', icon: Sparkles, accent: 'from-brand-400/30 to-accent-violet/20' },
  { key: 'partnership', icon: Handshake, accent: 'from-accent-cyan/30 to-brand-400/20' },
  { key: 'transparency', icon: Eye, accent: 'from-accent-violet/30 to-accent-pink/20' },
  { key: 'rightTool', icon: Wrench, accent: 'from-accent-pink/30 to-brand-400/20' },
  { key: 'team', icon: Users, accent: 'from-accent-emerald/30 to-accent-cyan/20' },
  { key: 'compliance', icon: Globe2, accent: 'from-brand-400/30 to-accent-emerald/20' },
];

export function AboutValues() {
  const t = useTranslations('about.values');

  return (
    <Section
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      size="wide"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {VALUES.map(({ key, icon: Icon, accent }) => (
          <motion.div key={key} variants={fadeUp}>
            <GlowCard className="group h-full rounded-2xl p-6">
              <div
                className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${accent} text-white ring-1 ring-white/10`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-white">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {t(`items.${key}.description`)}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ---------- CTA ----------

export function AboutCTA() {
  const t = useTranslations('about.cta');

  return (
    <section className="relative py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(46,107,255,0.65), rgba(139,92,246,0.3), transparent 60%)',
          }}
        />
      </div>

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800/80 to-ink-900/80 p-10 text-center shadow-card md:p-14"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 grid-overlay opacity-50" />

          <motion.div variants={fadeUp} className="relative flex justify-center">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="relative mt-6 text-display-3 font-semibold text-white text-balance"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="relative mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/65 text-balance"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div variants={fadeUp} className="relative mt-10 flex justify-center">
            <Button href="mailto:hello@erusoft.com" size="lg" icon>
              {t('button')}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
