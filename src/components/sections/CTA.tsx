'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

export function CTA() {
  const t = useTranslations('cta');

  return (
    <section id="contact" className="relative py-28 md:py-36">
      {/* Glow backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(46,107,255,0.7), rgba(139,92,246,0.3), transparent 60%)',
          }}
        />
      </div>

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800/80 to-ink-900/80 p-10 text-center shadow-card md:p-16"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 grid-overlay opacity-50" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-40 blur-3xl"
          />

          <motion.div variants={fadeUp} className="relative flex justify-center">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="relative mt-6 text-display-2 font-semibold text-white text-balance"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="relative mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/65 text-balance"
          >
            {t('body')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative mt-10 flex items-center justify-center"
          >
            <Button href="mailto:hello@erusoftech.com" size="lg" icon>
              {t('button')}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
