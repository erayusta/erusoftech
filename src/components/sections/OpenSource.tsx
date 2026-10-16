'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { WORDPRESS_CATALOGUE_URL } from '@/lib/links';

const POINT_KEYS = ['p1', 'p2', 'p3'] as const;

export function OpenSource() {
  const t = useTranslations('openSource');

  return (
    <section id="open-source" className="relative py-24 md:py-28">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />

          <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <motion.div variants={fadeUp}>
                <Eyebrow>{t('eyebrow')}</Eyebrow>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="mt-6 text-display-3 font-semibold text-white text-balance"
              >
                {t('title')}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65 text-balance"
              >
                {t('body')}
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={WORDPRESS_CATALOGUE_URL} size="lg" icon>
                  {t('button')}
                </Button>
                <a
                  href={`${WORDPRESS_CATALOGUE_URL}/destek/`}
                  className="text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {t('support')}
                </a>
              </motion.div>
            </div>

            <motion.ul variants={fadeUp} className="space-y-3 md:col-span-5">
              {POINT_KEYS.map((key) => (
                <li
                  key={key}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 text-sm leading-relaxed text-white/75"
                >
                  {t(`points.${key}`)}
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
