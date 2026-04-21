'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Compass,
  Blocks,
  Code2,
  ShieldCheck,
  Rocket,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';

type StepKey =
  | 'discovery'
  | 'architecture'
  | 'development'
  | 'testing'
  | 'deployment'
  | 'monitoring';

const STEPS: { key: StepKey; icon: LucideIcon }[] = [
  { key: 'discovery', icon: Compass },
  { key: 'architecture', icon: Blocks },
  { key: 'development', icon: Code2 },
  { key: 'testing', icon: ShieldCheck },
  { key: 'deployment', icon: Rocket },
  { key: 'monitoring', icon: Activity },
];

export function Process() {
  const t = useTranslations('process');

  return (
    <Section
      id="process"
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      size="wide"
    >
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {STEPS.map(({ key, icon: Icon }, idx) => (
          <motion.li
            key={key}
            variants={fadeUp}
            className={cn(
              'relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-6',
              'transition-all duration-300 hover:-translate-y-1 hover:border-white/15',
            )}
          >
            {/* Step number ghost */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-4 top-0 select-none font-black leading-none text-white/[0.035]"
              style={{ fontSize: 'clamp(6rem, 10vw, 9rem)' }}
            >
              0{idx + 1}
            </div>

            <div className="relative flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-500/20 to-accent-violet/10 text-brand-300">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                    Step 0{idx + 1}
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {t(`steps.${key}.title`)}
                </h3>
              </div>
            </div>

            <p className="relative mt-5 text-sm leading-relaxed text-white/65">
              {t(`steps.${key}.description`)}
            </p>

            {/* Progress bar (decorative) */}
            <div className="relative mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full bg-gradient-brand"
                style={{ width: `${((idx + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
