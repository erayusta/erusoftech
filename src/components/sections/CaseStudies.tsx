'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowUpRight, Sparkles, LineChart, Rocket } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { GlowCard } from '@/components/ui/GlowCard';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

type CaseKey = 'case1' | 'case2' | 'case3';

const ORDER: { key: CaseKey; accent: string; preview: React.ReactNode }[] = [
  {
    key: 'case1',
    accent: 'from-brand-500/30 to-accent-violet/20',
    preview: <CrmPreview />,
  },
  {
    key: 'case2',
    accent: 'from-accent-violet/30 to-accent-pink/20',
    preview: <CmsPreview />,
  },
  {
    key: 'case3',
    accent: 'from-accent-cyan/30 to-accent-emerald/20',
    preview: <DevopsPreview />,
  },
];

export function CaseStudies() {
  const t = useTranslations('cases');

  return (
    <Section
      id="work"
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
        className="grid gap-6 lg:grid-cols-3"
      >
        {ORDER.map(({ key, accent, preview }) => (
          <motion.article key={key} variants={fadeUp} className="h-full">
            <GlowCard className="group flex h-full flex-col overflow-hidden rounded-2xl p-0">
              {/* Preview */}
              <div
                className={`relative aspect-[16/10] overflow-hidden border-b border-white/8 bg-gradient-to-br ${accent}`}
              >
                <div className="absolute inset-0 grid-overlay opacity-40" />
                <div className="absolute inset-6 rounded-lg border border-white/10 bg-ink-900/70 p-4 shadow-card backdrop-blur-md">
                  {preview}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                    {t(`items.${key}.tag`)}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition-all group-hover:text-brand-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {t(`items.${key}.title`)}
                </h3>

                <dl className="mt-5 space-y-3 text-sm">
                  <Row label="Problem" value={t(`items.${key}.problem`)} />
                  <Row label="Solution" value={t(`items.${key}.solution`)} />
                  <Row label="Result" value={t(`items.${key}.result`)} highlight />
                </dl>
              </div>
            </GlowCard>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-start gap-3">
      <dt className="pt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</dt>
      <dd
        className={
          highlight ? 'font-medium text-brand-200' : 'text-white/70 leading-relaxed'
        }
      >
        {value}
      </dd>
    </div>
  );
}

/* ------------------ Preview mockups (SVG-ish with Tailwind) ------------------ */

function CrmPreview() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-brand-300" />
          <span className="text-[11px] font-medium text-white/80">AI Leads · Today</span>
        </div>
        <span className="rounded-full bg-accent-emerald/20 px-2 py-0.5 text-[9px] font-medium text-accent-emerald">
          +38%
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          ['Score', '94'],
          ['Hot', '312'],
          ['Booked', '27'],
          ['Revenue', '$142k'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-white/8 bg-white/[0.02] p-2">
            <div className="text-[9px] uppercase tracking-widest text-white/40">{k}</div>
            <div className="mt-0.5 text-sm font-semibold text-white">{v}</div>
          </div>
        ))}
      </div>
      <div className="flex h-8 items-end gap-1">
        {[30, 50, 40, 70, 55, 80, 62, 90, 75, 95].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-brand-500/60 to-brand-300/80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function CmsPreview() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LineChart className="h-3.5 w-3.5 text-accent-violet" />
          <span className="text-[11px] font-medium text-white/80">Content Pipeline</span>
        </div>
        <span className="rounded-full bg-accent-violet/20 px-2 py-0.5 text-[9px] font-medium text-accent-violet">
          5 brands
        </span>
      </div>
      <div className="space-y-1.5">
        {[
          { name: 'Launch /autumn-campaign', progress: 92, tag: 'Publishing' },
          { name: 'Article: State of AI 2026', progress: 75, tag: 'Review' },
          { name: 'Video: Behind the product', progress: 60, tag: 'Edit' },
          { name: 'Landing: /pricing v3', progress: 40, tag: 'Draft' },
        ].map((row) => (
          <div
            key={row.name}
            className="flex items-center gap-2 rounded-md border border-white/8 bg-white/[0.02] p-1.5"
          >
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-accent-violet to-accent-pink"
                style={{ width: `${row.progress}%` }}
              />
            </div>
            <span className="flex-1 truncate text-[10px] text-white/70">{row.name}</span>
            <span className="rounded-sm bg-white/5 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-white/50">
              {row.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DevopsPreview() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="h-3.5 w-3.5 text-accent-cyan" />
          <span className="text-[11px] font-medium text-white/80">deploy / prod</span>
        </div>
        <span className="rounded-full bg-accent-emerald/20 px-2 py-0.5 text-[9px] font-medium text-accent-emerald">
          12/day
        </span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[10px] font-mono text-white/70">
        {[
          ['12:04', 'build  ✓ cache hit (12 layers)'],
          ['12:05', 'test   ✓ 2,134 passed · 0 failed'],
          ['12:06', 'scan   ✓ 0 critical, 0 high'],
          ['12:07', 'deploy ✓ blue → green · 9s'],
          ['12:07', 'slo    ✓ error-budget 99.98%'],
        ].map(([time, line]) => (
          <React.Fragment key={`${time}-${line}`}>
            <div className="text-white/40">{time}</div>
            <div className="truncate">{line}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
