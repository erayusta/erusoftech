'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { GlowCard } from '@/components/ui/GlowCard';
import { RevealButton } from '@/components/ui/RevealButton';
import { fadeUp, meteorDrop, staggerContainer, viewportOnce } from '@/lib/motion';

type Tech = {
  name: string;
  category: string;
  description: string;
  glyph: React.ReactNode;
};

/**
 * Ordering principle: from the most general layers (languages, runtimes)
 * down to specific tools (APIs, observability). Each row tells a coherent
 * sub-story so the grid scans like a stack diagram.
 */
const TECHS: Tech[] = [
  // ---- Languages ----
  {
    name: 'TypeScript',
    category: 'Language',
    description: 'Strict typing across DB, API and UI — zero runtime ambiguity.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
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
    name: 'Python',
    category: 'Language',
    description: 'AI, data pipelines and automation glue across services.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M22 10h12c5 0 9 4 9 9v9H21c-5 0-9 4-9 9v6h-3c-5 0-9-4-9-9v-6c0-5 4-9 9-9h22V19c0-3 2-5 5-5h0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M42 54H30c-5 0-9-4-9-9v-9h22c5 0 9-4 9-9v-6h3c5 0 9 4 9 9v6c0 5-4 9-9 9H33v9c0 3-2 5-5 5h0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
          opacity="0.55"
        />
        <circle cx="20" cy="18" r="2" fill="currentColor" />
        <circle cx="44" cy="46" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Go',
    category: 'Language',
    description: 'Concurrent, statically-typed runtime for high-throughput services.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M6 24h12M4 32h16M6 40h12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M48 18a14 14 0 1 0 0 28a14 14 0 0 0 12-7v-7H46"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: 'PHP',
    category: 'Language',
    description: 'Modern PHP 8.x with JIT and full type system.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <ellipse cx="32" cy="32" rx="26" ry="15" stroke="currentColor" strokeWidth="2" />
        <path
          d="M13 26l-2 12h4l1-6h3c3 0 5-1 5-4 0-2-1-2-3-2h-8Zm4 2h2c1 0 2 0 2 1s-1 2-3 2h-2l1-3Zm10-2-2 12h4l1-4h3c3 0 5-2 5-4 0-2-1-4-3-4h-8Zm4 2h2c1 0 2 0 2 1s-1 2-2 2h-3l1-3Zm10-4-2 16h4l1-4h3c3 0 5-2 5-4 0-2-1-2-3-2h-3l1-6h-6Zm4 8h2c1 0 2 0 2 1s-1 2-3 2h-2l1-3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },

  // ---- Runtime ----
  {
    name: 'Node.js',
    category: 'Runtime',
    description: 'Async, high-throughput services, realtime and BFF layers.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M32 6 L54 19 V45 L32 58 L10 45 V19 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M22 28v8c0 4 3 6 6 6s4-1 4-4V26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  // ---- Frameworks ----
  {
    name: 'Next.js',
    category: 'Framework',
    description: 'RSC, edge rendering and image optimization out of the box.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" />
        <path
          d="M24 22v20M44 20l-16 24"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'NestJS',
    category: 'Framework',
    description: 'Modular, TypeScript-first Node.js framework for enterprise APIs.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <polygon
          points="32,6 54,18 54,42 32,54 10,42 10,18"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M22 24l10 12 10-12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d="M32 36v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Laravel',
    category: 'Framework',
    description: 'Eloquent ORM, queues, Horizon — mature DX, fast delivery.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M8 44V16l10 6v24l12 6 22-12V22l-12-6-10 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M30 34l10 6 10-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    category: 'Framework',
    description: 'Async Python framework with type-driven validation and OpenAPI.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" />
        <path
          d="M34 14L20 36h10l-2 14 16-22H32l2-14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },

  // ---- UI ----
  {
    name: 'React',
    category: 'UI',
    description: 'Component UI with the largest ecosystem and proven scaling.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <circle cx="32" cy="32" r="3.5" fill="currentColor" />
        <ellipse cx="32" cy="32" rx="22" ry="9" stroke="currentColor" strokeWidth="1.8" />
        <ellipse
          cx="32"
          cy="32"
          rx="22"
          ry="9"
          stroke="currentColor"
          strokeWidth="1.8"
          transform="rotate(60 32 32)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="22"
          ry="9"
          stroke="currentColor"
          strokeWidth="1.8"
          transform="rotate(120 32 32)"
        />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling',
    description: 'Utility-first CSS for fast, consistent design systems.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M14 24c4-9 11-11 18-7 5 3 8 5 12 4 5-1 8-3 10-7-4 9-11 11-18 7-5-3-8-5-12-4-5 1-8 3-10 7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M14 46c4-9 11-11 18-7 5 3 8 5 12 4 5-1 8-3 10-7-4 9-11 11-18 7-5-3-8-5-12-4-5 1-8 3-10 7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>
    ),
  },

  // ---- Data layer ----
  {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'ACID, row-level security, JSONB and logical replication.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <ellipse cx="32" cy="14" rx="18" ry="6" stroke="currentColor" strokeWidth="2" />
        <path
          d="M14 14v34c0 4 8 6 18 6s18-2 18-6V14"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M14 26c6 4 22 4 36 0M14 38c6 4 22 4 36 0"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    category: 'Database',
    description: 'Easy ops, predictable performance, read-scale replication.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M6 40c8-18 30-22 44-14 3 2 6 5 8 9-3-1-6-1-9 0-4-5-12-9-22-8-7 1-14 4-18 10-1 2-2 3-3 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="46" cy="30" r="1.6" fill="currentColor" />
        <path
          d="M36 46l6 6M44 44l8 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    category: 'Database',
    description: 'Document store for flexible schemas and high write throughput.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M32 6c-4 8-12 16-12 28s5 20 12 24c7-4 12-12 12-24S36 14 32 6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M32 16v40" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Prisma',
    category: 'ORM',
    description: 'Type-safe TypeScript ORM with migrations and relation queries.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M32 8L52 50H12L32 8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M32 8v42" stroke="currentColor" strokeWidth="2" />
        <path d="M22 36h20" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'Redis',
    category: 'Cache',
    description: 'Caching, pub/sub, queues — millisecond-tier data plane.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
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
    name: 'Elasticsearch',
    category: 'Search',
    description: 'Full-text search, faceting and log analytics at scale.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <ellipse cx="26" cy="20" rx="14" ry="6" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 20v14c0 3 6 6 14 6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="42" cy="42" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M48 48l8 8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'Kafka',
    category: 'Streaming',
    description: 'Distributed event streaming for decoupled microservices.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="14" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="14" cy="50" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M18 18l10 10M46 18l-10 10M18 46l10-10M46 46l-10-10"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </svg>
    ),
  },

  // ---- Cloud & edge ----
  {
    name: 'AWS',
    category: 'Cloud',
    description: 'ECS/EKS, RDS, Lambda — infrastructure-as-code with Terraform.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
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
    name: 'GCP',
    category: 'Cloud',
    description: 'BigQuery, GKE, Vertex AI — managed AI/data workloads.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M32 8L54 32L32 56L10 32L32 8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M32 8L54 32L32 32L32 8Z" fill="currentColor" opacity="0.18" />
        <path d="M10 32L32 32L32 56L10 32Z" fill="currentColor" opacity="0.32" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    category: 'Edge',
    description: 'Edge runtime, ISR and preview deployments — Next.js native.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M32 14L54 50H10L32 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: 'Cloudflare',
    category: 'CDN',
    description: 'Workers, CDN, R2 and Zero Trust — programmable edge network.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M14 44a10 10 0 0 1 6-18a14 14 0 0 1 26 4a8 8 0 0 1 4 14H20a8 8 0 0 1-6 0Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M22 44h26"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  // ---- Container / orchestration / IaC / CI/CD ----
  {
    name: 'Docker',
    category: 'Container',
    description: 'Reproducible images and multi-stage builds for lean containers.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <rect x="10" y="28" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="18" y="28" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="26" y="28" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="18" y="20" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="26" y="20" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="34" y="20" width="6" height="6" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M6 38h44c0 8-8 14-18 14S6 48 6 38Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    name: 'Kubernetes',
    category: 'Platform',
    description: 'Self-healing orchestration with rolling updates and HPA/VPA.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <polygon
          points="32,6 54,18 50,44 32,58 14,44 10,18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
        <path
          d="M32 20v6M32 38v6M20 32h6M38 32h6"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    name: 'Terraform',
    category: 'IaC',
    description: 'Declarative, version-controlled infra — plan, review, apply.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path d="M14 14l14 8v16l-14-8V14Z" stroke="currentColor" strokeWidth="2" />
        <path d="M30 24l14-8v16l-14 8V24Z" stroke="currentColor" strokeWidth="2" />
        <path d="M30 42l14-8v16l-14 8V42Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'GitHub Actions',
    category: 'CI/CD',
    description: 'Matrix builds, reusable workflows and ephemeral PR previews.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
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

  // ---- Specific tools ----
  {
    name: 'GraphQL',
    category: 'API',
    description: 'Typed schemas, federated graphs and efficient queries.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <polygon
          points="32,8 54,20 54,44 32,56 10,44 10,20"
          stroke="currentColor"
          strokeWidth="2"
        />
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
    name: 'Playwright',
    category: 'Testing',
    description: 'End-to-end browser testing across Chromium, WebKit and Firefox.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <rect x="8" y="14" width="48" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M8 24h48" stroke="currentColor" strokeWidth="2" />
        <circle cx="14" cy="19" r="1.5" fill="currentColor" />
        <circle cx="20" cy="19" r="1.5" fill="currentColor" />
        <circle cx="26" cy="19" r="1.5" fill="currentColor" />
        <path
          d="M22 38l6 6 14-14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'Grafana',
    category: 'Monitoring',
    description: 'Dashboards, alerting and SLO tracking on Prom/Loki/Tempo.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 36c4-8 10-8 12-2s8 6 12-2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="32" cy="18" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Sentry',
    category: 'Errors',
    description: 'Error tracking and release health with full stack traces.',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M32 12L52 50H40a16 16 0 0 0-16-16v6a10 10 0 0 1 10 10H12L32 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
];

/** Marquee picks shown by default — the canonical modern web stack. */
const FEATURED_NAMES = new Set<string>([
  'TypeScript',
  'Python',
  'Node.js',
  'Next.js',
  'Laravel',
  'React',
  'PostgreSQL',
  'Redis',
  'AWS',
  'Docker',
  'Kubernetes',
  'GitHub Actions',
]);

export function TechStack() {
  const t = useTranslations('tech');
  const [expanded, setExpanded] = React.useState(false);

  const featured = TECHS.filter((tech) => FEATURED_NAMES.has(tech.name));
  const additional = TECHS.filter((tech) => !FEATURED_NAMES.has(tech.name));

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
        {featured.map((tech) => (
          <motion.div key={tech.name} variants={fadeUp}>
            <TechCard tech={tech} />
          </motion.div>
        ))}

        <AnimatePresence>
          {expanded &&
            additional.map((tech, idx) => (
              <motion.div
                key={tech.name}
                custom={idx}
                variants={meteorDrop}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <TechCard tech={tech} />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-12 flex justify-center">
        <RevealButton
          expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          labelOpen={t('viewMore')}
          labelClose={t('viewLess')}
        />
      </div>
    </Section>
  );
}

function TechCard({ tech }: { tech: Tech }) {
  return (
    <GlowCard className="group gradient-border flex h-full flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-white/65 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-white/[0.08] group-hover:text-white group-hover:ring-white/20">
          {tech.glyph}
        </div>
        <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 ring-1 ring-white/10 transition-colors group-hover:text-white/70">
          {tech.category}
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="text-base font-semibold text-white">{tech.name}</div>
        <p className="mt-1.5 text-xs leading-relaxed text-white/55 transition-colors duration-300 group-hover:text-white/75">
          {tech.description}
        </p>
      </div>
    </GlowCard>
  );
}
