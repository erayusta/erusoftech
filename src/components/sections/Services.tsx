'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Brain,
  Database,
  Smartphone,
  ShoppingCart,
  FileStack,
  Users,
  Building2,
  Boxes,
  Network,
  CloudUpload,
  GitBranch,
  ShieldCheck,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { GlowCard } from '@/components/ui/GlowCard';
import { BackgroundFX } from '@/components/ui/BackgroundFX';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

type ServiceKey =
  | 'ai'
  | 'data'
  | 'web'
  | 'ecommerce'
  | 'cms'
  | 'crm'
  | 'erp'
  | 'saas'
  | 'integration'
  | 'cloud'
  | 'devops'
  | 'security';

const SERVICES: { key: ServiceKey; icon: LucideIcon; bulletCount: number; accent: string }[] = [
  { key: 'ai', icon: Brain, bulletCount: 3, accent: 'from-brand-400/30 to-accent-violet/20' },
  { key: 'data', icon: Database, bulletCount: 3, accent: 'from-accent-cyan/30 to-accent-emerald/20' },
  { key: 'web', icon: Smartphone, bulletCount: 3, accent: 'from-accent-violet/30 to-brand-400/20' },
  { key: 'ecommerce', icon: ShoppingCart, bulletCount: 3, accent: 'from-accent-pink/30 to-accent-violet/20' },
  { key: 'cms', icon: FileStack, bulletCount: 3, accent: 'from-accent-violet/30 to-accent-pink/20' },
  { key: 'crm', icon: Users, bulletCount: 3, accent: 'from-accent-cyan/30 to-brand-400/20' },
  { key: 'erp', icon: Building2, bulletCount: 3, accent: 'from-brand-400/30 to-accent-cyan/20' },
  { key: 'saas', icon: Boxes, bulletCount: 3, accent: 'from-accent-emerald/30 to-accent-cyan/20' },
  { key: 'integration', icon: Network, bulletCount: 3, accent: 'from-brand-400/30 to-accent-pink/20' },
  { key: 'cloud', icon: CloudUpload, bulletCount: 3, accent: 'from-accent-cyan/30 to-accent-violet/20' },
  { key: 'devops', icon: GitBranch, bulletCount: 4, accent: 'from-accent-pink/30 to-brand-400/20' },
  { key: 'security', icon: ShieldCheck, bulletCount: 3, accent: 'from-accent-emerald/30 to-brand-400/20' },
];

export function Services() {
  const t = useTranslations('services');

  return (
    <Section
      id="services"
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
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map(({ key, icon: Icon, bulletCount, accent }, idx) => (
          <motion.div key={key} variants={fadeUp}>
            <GlowCard className="group gradient-border h-full min-h-[22rem] rounded-2xl p-7">
              <div className="flex items-start justify-between">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${accent} text-white ring-1 ring-white/10`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {t(`items.${key}.description`)}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-5">
                {Array.from({ length: bulletCount }).map((_, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-white/75"
                  >
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-500/15 ring-1 ring-brand-400/40">
                      <Check className="h-2.5 w-2.5 text-brand-300" />
                    </span>
                    <span>{t(`items.${key}.bullets.${i}`)}</span>
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
