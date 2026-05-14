'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Compass, Layers, MapPin, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { BackgroundFX } from '@/components/ui/BackgroundFX';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const TOPIC_KEYS = ['architecture', 'commerce', 'turkey'] as const;
const TOPIC_ICONS = {
  architecture: Layers,
  commerce: Compass,
  turkey: MapPin,
} as const;
const TOPIC_ACCENTS = {
  architecture: 'from-brand-400/30 to-accent-violet/20',
  commerce: 'from-accent-pink/30 to-accent-violet/20',
  turkey: 'from-accent-emerald/30 to-accent-cyan/20',
} as const;

export function BlogContent() {
  const t = useTranslations('blog');

  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-40 md:pb-16 md:pt-48">
        <BackgroundFX variant="hero" />
        <Container className="relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeUp} className="flex justify-center">
              <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-display-2 font-semibold tracking-tight text-white text-balance"
            >
              {t.rich('hero.title', {
                span: (chunks) => <span className="gradient-text">{chunks}</span>,
              })}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="mailto:hello@erusoft.com" size="lg" icon>
                {t('hero.contactCta')}
              </Button>
              <Button href="/work" variant="secondary" size="lg">
                <Sparkles className="h-4 w-4" />
                {t('hero.workCta')}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <Section
        eyebrow={t('topics.eyebrow')}
        title={t('topics.title')}
        subtitle={t('topics.subtitle')}
        size="wide"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 md:grid-cols-3"
        >
          {TOPIC_KEYS.map((key) => {
            const Icon = TOPIC_ICONS[key];
            const accent = TOPIC_ACCENTS[key];
            return (
              <motion.div key={key} variants={fadeUp}>
                <GlowCard className="group h-full rounded-2xl p-7">
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${accent} text-white ring-1 ring-white/10`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {t(`topics.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {t(`topics.items.${key}.description`)}
                  </p>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>
    </>
  );
}
