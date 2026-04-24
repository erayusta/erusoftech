'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { GlowCard } from '@/components/ui/GlowCard';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

type Tech = {
  name: string;
  description: string;
  glyph: React.ReactNode;
};

const TECHS: Tech[] = [
  {
    name: 'Next.js',
    description: 'React Server Components, edge rendering, image optimization — production defaults.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" />
        <path d="M24 22v20M44 20l-16 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    description: 'High-throughput async backends, realtime, BFF layers and edge functions.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <path
          d="M32 6 L54 19 V45 L32 58 L10 45 V19 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path d="M22 28v8c0 4 3 6 6 6s4-1 4-4V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    description: 'Reproducible images, layered caching, multi-stage builds for lean containers.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <rect x="10" y="28" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="18" y="28" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="26" y="28" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="18" y="20" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="26" y="20" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="34" y="20" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 38h44c0 8-8 14-18 14S6 48 6 38Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Kubernetes',
    description: 'Self-healing orchestration, rolling updates, HPA + VPA for elastic workloads.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <polygon points="32,6 54,18 50,44 32,58 14,44 10,18" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M32 20v6M32 38v6M20 32h6M38 32h6" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    description: 'VPCs, ECS/EKS, RDS, Lambda, CloudFront — infrastructure-as-code with Terraform.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <path
          d="M8 26c6-4 12-4 18 0c6 4 12 4 18 0c4-2 8-2 12 0"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path d="M8 40c20 10 36 10 48 0" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="20" cy="18" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="44" cy="18" r="4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    description: 'ACID transactions, row-level security, JSONB, logical replication at scale.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <ellipse cx="32" cy="14" rx="18" ry="6" stroke="currentColor" strokeWidth="2" />
        <path
          d="M14 14v34c0 4 8 6 18 6s18-2 18-6V14"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path d="M14 26c6 4 22 4 36 0M14 38c6 4 22 4 36 0" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    description: 'Strict mode everywhere — contracts from DB to UI, zero runtime ambiguity.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <rect x="6" y="6" width="52" height="52" rx="8" stroke="currentColor" strokeWidth="2" />
        <path d="M18 28h16M26 28v18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M38 42c1 3 4 5 8 5s7-2 7-5-2-4-6-5s-6-2-6-4 2-4 6-4 6 2 7 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'GitHub Actions',
    description: 'Matrix builds, reusable workflows, ephemeral preview environments per PR.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" />
        <path
          d="M42 22a13 13 0 1 0 4 10v-8h-8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'Redis',
    description: 'Caching, pub/sub, queues, rate limiting — millisecond-tier data plane.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <path
          d="M8 20c0-4 10-8 24-8s24 4 24 8-10 8-24 8-24-4-24-8Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M8 20v8c0 4 10 8 24 8s24-4 24-8v-8" stroke="currentColor" strokeWidth="2" />
        <path d="M8 36v8c0 4 10 8 24 8s24-4 24-8v-8" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Terraform',
    description: 'Declarative, version-controlled infrastructure — plan → review → apply.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <path d="M14 14l14 8v16l-14-8V14Z" stroke="currentColor" strokeWidth="2" />
        <path d="M30 24l14-8v16l-14 8V24Z" stroke="currentColor" strokeWidth="2" />
        <path d="M30 42l14-8v16l-14 8V42Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    description: 'Typed schemas, federated graphs, efficient over-the-wire queries.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <polygon points="32,8 54,20 54,44 32,56 10,44 10,20" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="8" r="3" fill="currentColor" />
        <circle cx="54" cy="20" r="3" fill="currentColor" />
        <circle cx="54" cy="44" r="3" fill="currentColor" />
        <circle cx="32" cy="56" r="3" fill="currentColor" />
        <circle cx="10" cy="44" r="3" fill="currentColor" />
        <circle cx="10" cy="20" r="3" fill="currentColor" />
        <path
          d="M32 8L10 44M32 8L54 44M10 20L54 44M10 44L54 20M10 20L32 56M54 20L32 56"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    name: 'Grafana',
    description: 'Dashboards, alerting and SLO burn-rate tracking on Prometheus + Loki + Tempo.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2" />
        <path d="M20 36c4-8 10-8 12-2s8 6 12-2" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="32" cy="18" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Laravel',
    description:
      'Elegant PHP framework — Eloquent ORM, migrations, queues, Horizon, and a DX that ships faster than most rewrites.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <path
          d="M8 44V16l10 6v24l12 6 22-12V22l-12-6-10 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M30 34l10 6 10-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'PHP',
    description:
      'Battle-tested backend runtime powering a huge share of the web; PHP 8.x JIT + types make it a serious modern platform.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <ellipse cx="32" cy="32" rx="26" ry="15" stroke="currentColor" strokeWidth="2" />
        <path
          d="M13 26l-2 12h4l1-6h3c3 0 5-1 5-4 0-2-1-2-3-2h-8Zm4 2h2c1 0 2 0 2 1s-1 2-3 2h-2l1-3Zm10-2-2 12h4l1-4h3c3 0 5-2 5-4 0-2-1-4-3-4h-8Zm4 2h2c1 0 2 0 2 1s-1 2-2 2h-3l1-3Zm10-4-2 16h4l1-4h3c3 0 5-2 5-4 0-2-1-2-3-2h-3l1-6h-6Zm4 8h2c1 0 2 0 2 1s-1 2-3 2h-2l1-3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    description:
      'Veteran open-source RDBMS — easy ops, predictable performance, strong read scaling, and rock-solid replication.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-8 w-8">
        <path
          d="M6 40c8-18 30-22 44-14 3 2 6 5 8 9-3-1-6-1-9 0-4-5-12-9-22-8-7 1-14 4-18 10-1 2-2 3-3 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="46" cy="30" r="1.6" fill="currentColor" />
        <path d="M36 46l6 6M44 44l8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function TechStack() {
  const t = useTranslations('tech');

  return (
    <Section
      id="technology"
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
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {TECHS.map((tech) => (
          <motion.div key={tech.name} variants={fadeUp}>
            <GlowCard className="group flex aspect-[4/3.3] flex-col justify-between rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div className="text-white/60 transition-colors group-hover:text-white">
                  {tech.glyph}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-white">{tech.name}</div>
                <p className="mt-1 max-h-0 overflow-hidden text-xs leading-relaxed text-white/55 opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-32 group-hover:opacity-100">
                  {tech.description}
                </p>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
