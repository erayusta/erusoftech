'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BackgroundFX } from '@/components/ui/BackgroundFX';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

type Props = {
  /** Translation namespace (e.g. "privacy" or "terms"). Must expose
   *  hero.eyebrow, hero.title, hero.lastUpdated, intro and a sections
   *  object whose keys match the `sectionKeys` array. */
  namespace: string;
  sectionKeys: readonly string[];
};

/**
 * Long-form legal page shell — privacy/KVKK and terms share this
 * layout. Renders an Eyebrow + title hero, an intro paragraph, then
 * a stack of titled sections, each section's body supporting plain
 * paragraphs separated by blank lines.
 */
export function LegalContent({ namespace, sectionKeys }: Props) {
  const t = useTranslations(namespace);

  return (
    <section className="relative isolate overflow-hidden pb-24 pt-40 md:pt-48">
      <BackgroundFX variant="hero" />
      <Container size="default" className="relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-display-3 font-semibold tracking-tight text-white text-balance"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm uppercase tracking-[0.18em] text-white/45"
          >
            {t('hero.lastUpdated')}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-10 text-base leading-relaxed text-white/75"
          >
            {t('intro')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-14 max-w-3xl space-y-12"
        >
          {sectionKeys.map((key, idx) => (
            <motion.section key={key} variants={fadeUp}>
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] text-brand-300">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 className="text-xl font-semibold text-white">
                  {t(`sections.${key}.title`)}
                </h2>
              </div>
              <div className="mt-4 space-y-4 border-l border-white/8 pl-5 text-sm leading-relaxed text-white/70">
                {t(`sections.${key}.body`)
                  .split('\n\n')
                  .map((paragraph, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </motion.section>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
