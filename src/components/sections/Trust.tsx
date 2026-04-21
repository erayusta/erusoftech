'use client';

import * as React from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { GlowCard } from '@/components/ui/GlowCard';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

type MetricKey = 'projects' | 'production' | 'uptime' | 'performance';

const METRICS: MetricKey[] = ['projects', 'production', 'uptime', 'performance'];

export function Trust() {
  const t = useTranslations('trust');

  return (
    <Section
      id="trust"
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
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {METRICS.map((key) => (
          <motion.div key={key} variants={fadeUp}>
            <GlowCard className="h-full rounded-2xl p-7">
              <AnimatedMetric display={t(`metrics.${key}.value`)} />
              <div className="mt-3 text-sm text-white/55">{t(`metrics.${key}.label`)}</div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>

      <p className="mx-auto mt-14 max-w-3xl text-center text-lg leading-relaxed text-white/65 text-balance">
        {t('body')}
      </p>
    </Section>
  );
}

/**
 * Animates the numeric portion of a metric label (e.g. "99.98%", "120+", "3.2x").
 * Preserves prefix/suffix characters and decimal precision.
 */
function AnimatedMetric({ display }: { display: string }) {
  const match = display.match(/^(\D*?)([\d.,]+)(.*)$/);
  if (!match) return <div className="text-5xl font-semibold text-white">{display}</div>;

  const [, prefix, rawNumber, suffix] = match;
  // Turkish uses comma as decimal separator; normalize then restore
  const usesComma = rawNumber.includes(',');
  const numericString = rawNumber.replace(/\./g, '').replace(',', '.');
  const target = parseFloat(numericString);
  const decimals = (numericString.split('.')[1] ?? '').length;

  return (
    <div className="flex items-baseline text-5xl font-semibold tracking-tight text-white md:text-6xl">
      <span className="text-white/50">{prefix}</span>
      <Counter target={target} decimals={decimals} usesComma={usesComma} />
      <span className="text-white/50">{suffix}</span>
    </div>
  );
}

function Counter({
  target,
  decimals,
  usesComma,
}: {
  target: number;
  decimals: number;
  usesComma: boolean;
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => {
    const str = v.toFixed(decimals);
    return usesComma ? str.replace('.', ',') : str;
  });

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, target, mv]);

  return (
    <motion.span ref={ref} className="tabular-nums text-white">
      {rounded}
    </motion.span>
  );
}
