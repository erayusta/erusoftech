'use client';

import * as React from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { BackgroundFX } from '@/components/ui/BackgroundFX';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import {
  FEATURED_REFERENCES,
  COMPACT_REFERENCES,
  LEGACY_REFERENCES,
  type WorkCategory,
  type WorkReference,
} from './data';

/**
 * Translate the tech-stack tags stored in data.ts for Turkish viewers
 * so terms like "Custom Software" don't sit untranslated next to the
 * Turkish description text. Brand names (WordPress, Magento, T-Soft,
 * etc.) and technical acronyms are intentionally left untouched.
 */
function localizeTech(tech: string | undefined, locale: string): string | undefined {
  if (!tech || locale !== 'tr') return tech;
  return tech
    .replace(/Custom Software/g, 'Özel Yazılım')
    .replace(/Custom Platform/g, 'Özel Platform')
    .replace(/Custom Support/g, 'Özel Destek')
    .replace(/Custom Single-Page/g, 'Özel Tek-Sayfa')
    .replace(/\+ Custom\b/g, '+ Özel')
    .replace(/Mobile \+ Web/g, 'Mobil + Web')
    .replace(/^Renewal$/u, 'Yenileme');
}

/**
 * Era heading translation for the legacy roll-up. Year-range eras
 * (`2017–2018`, `2015–2016`, `2019`) are language-neutral; only the
 * "Pre-2015" bucket needs a Turkish form.
 */
function localizeEra(era: string, locale: string): string {
  if (locale !== 'tr') return era;
  return era === 'Pre-2015' ? '2015 öncesi' : era;
}

// ---------- Hero ----------

export function WorksHero() {
  const t = useTranslations('works.hero');
  const tStats = useTranslations('works.stats');

  const stats = ['experience', 'projects', 'active', 'categories'] as const;

  return (
    <section className="relative isolate overflow-hidden pb-12 pt-40 md:pb-16 md:pt-48">
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

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4"
          >
            {stats.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-left"
              >
                <div className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {tStats(`items.${key}.value`)}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-white/55">
                  {tStats(`items.${key}.label`)}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ---------- Featured (with category filter) ----------

const FILTER_KEYS: ReadonlyArray<WorkCategory | 'all'> = [
  'all',
  'ecommerce',
  'custom',
  'corporate',
  'education',
  'mobile',
  'services',
];

export function WorksFeatured() {
  const t = useTranslations('works.featured');
  const tFilter = useTranslations('works.filter');
  const [active, setActive] = React.useState<WorkCategory | 'all'>('all');

  const visible = React.useMemo(
    () => (active === 'all' ? FEATURED_REFERENCES : FEATURED_REFERENCES.filter((r) => r.category === active)),
    [active],
  );

  return (
    <Section
      id="work"
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      size="wide"
    >
      <BackgroundFX variant="grid" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-wrap items-center justify-center gap-2"
      >
        {FILTER_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`relative rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] transition-all duration-200 ${
              active === key
                ? 'border-brand-400/40 bg-brand-500/15 text-white'
                : 'border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white'
            }`}
          >
            {tFilter(key)}
          </button>
        ))}
      </motion.div>

      <LayoutGroup>
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((ref) => (
              <motion.div
                key={ref.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <ReferenceCard reference={ref} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </Section>
  );
}

function ReferenceCard({ reference }: { reference: WorkReference }) {
  const t = useTranslations('works.references');
  const tFilter = useTranslations('works.filter');
  const tWorks = useTranslations('works');
  const locale = useLocale();
  const description = t(`${reference.slug}.description`);
  const techLabel = localizeTech(reference.tech, locale);
  const openInNewTabLabel = tWorks('openInNewTab');

  const Wrapper: React.ComponentType<React.ComponentProps<'a'>> = reference.url
    ? (props) => (
        <a
          {...props}
          href={reference.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${reference.name} — ${openInNewTabLabel}`}
        />
      )
    : (props) => <div {...(props as React.ComponentProps<'div'>)} />;

  return (
    <Wrapper className="block h-full">
      <GlowCard className="group gradient-border flex h-full flex-col rounded-2xl p-6">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex h-14 items-center justify-center rounded-lg px-3 ring-1 ${
              reference.lightLogo
                ? 'bg-ink-700 ring-white/20'
                : 'bg-white ring-white/10'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={reference.logo}
              alt={`${reference.name} logo`}
              className="h-8 w-auto max-w-[120px] object-contain"
              loading="lazy"
            />
          </div>
          <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/55 ring-1 ring-white/10">
            {tFilter(reference.category)}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">{reference.name}</h3>
          {reference.url && (
            <ArrowUpRight className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
          )}
        </div>
        {reference.url && (
          <div className="mt-1 text-xs text-white/40">
            {reference.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </div>
        )}

        <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">{description}</p>

        {techLabel && (
          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-[11px] uppercase tracking-[0.14em] text-white/40">
              {techLabel}
            </span>
            {reference.year && (
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                {reference.year}
              </span>
            )}
          </div>
        )}
      </GlowCard>
    </Wrapper>
  );
}

// ---------- Compact (smaller logo cards, no description) ----------

export function WorksCompact() {
  const t = useTranslations('works.compact');
  const tFilter = useTranslations('works.filter');
  const tWorks = useTranslations('works');
  const openInNewTabLabel = tWorks('openInNewTab');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} size="wide">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
      >
        {COMPACT_REFERENCES.map((ref) => (
          <motion.div key={ref.slug} variants={fadeUp}>
            <CompactCard
              reference={ref}
              categoryLabel={tFilter(ref.category)}
              openInNewTabLabel={openInNewTabLabel}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function CompactCard({
  reference,
  categoryLabel,
  openInNewTabLabel,
}: {
  reference: WorkReference;
  categoryLabel: string;
  openInNewTabLabel: string;
}) {
  const Wrapper = reference.url
    ? (props: React.ComponentProps<'a'>) => (
        <a
          {...props}
          href={reference.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${reference.name} — ${openInNewTabLabel}`}
        />
      )
    : (props: React.ComponentProps<'div'>) => <div {...props} />;

  return (
    <Wrapper className="block h-full">
      <GlowCard className="group flex h-full flex-col rounded-2xl p-4">
        <div
          className={`flex h-16 items-center justify-center rounded-lg px-3 ring-1 ${
            reference.lightLogo
              ? 'bg-ink-700 ring-white/20'
              : 'bg-white ring-white/10'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={reference.logo}
            alt={`${reference.name} logo`}
            className="h-8 w-auto max-w-[110px] object-contain"
            loading="lazy"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold text-white">{reference.name}</span>
          {reference.url && (
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
          )}
        </div>
        <span className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-white/40">
          {categoryLabel}
        </span>
      </GlowCard>
    </Wrapper>
  );
}

// ---------- Legacy (text-only roll-up) ----------

export function WorksLegacy() {
  const t = useTranslations('works.legacy');
  const locale = useLocale();

  // Group by era for cleaner display
  const grouped = React.useMemo(() => {
    const map = new Map<string, typeof LEGACY_REFERENCES>();
    for (const ref of LEGACY_REFERENCES) {
      const list = map.get(ref.era) ?? [];
      list.push(ref);
      map.set(ref.era, list);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} size="wide">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-10"
      >
        {grouped.map(([era, items]) => (
          <motion.div key={era} variants={fadeUp}>
            <div className="mb-4 flex items-center gap-3">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                {localizeEra(era, locale)}
              </div>
              <div className="h-px flex-1 bg-white/8" />
              <div className="text-xs text-white/40">
                {t('count', { count: items.length })}
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-3 border-b border-white/5 py-2 text-sm"
                >
                  <span className="truncate text-white/75">{item.name}</span>
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-white/40">
                    {localizeTech(item.tech, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ---------- CTA ----------

export function WorksCTA() {
  const t = useTranslations('works.cta');

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
            <Button href="mailto:hello@erusoftech.com" size="lg" icon>
              {t('button')}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
