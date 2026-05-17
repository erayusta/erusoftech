'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { GlowCard } from '@/components/ui/GlowCard';
import { RevealButton } from '@/components/ui/RevealButton';
import { fadeUp, meteorDrop, staggerContainer, viewportOnce } from '@/lib/motion';

type Tech = {
  /** translation key under `tech.items.{slug}.description` */
  slug: string;
  /** displayed brand / product name */
  name: string;
  /** category badge text */
  category: string;
  glyph: React.ReactNode;
  /** when true, card renders a "Partner" pill above the category */
  partner?: boolean;
};

/**
 * Ordering principle: lead with what we ship most — WordPress and the
 * e-commerce platforms layered on top, including the Turkish platforms
 * we hold partner status with — then the surrounding language /
 * framework / data stack, then specific tools (cloud, devops, observability).
 * The first twelve entries are the marquee set rendered before the reveal.
 */
const TECHS: Tech[] = [
  // ---- E-commerce platforms (shipped daily, lead the stack) ----
  {
    slug: 'wordpress',
    name: 'WordPress',
    category: 'CMS',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" />
        <path
          d="M14 22l8 22M28 22l8 22M42 22l8 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M19 22h7M33 22h7M47 22h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    ),
  },
  {
    slug: 'woocommerce',
    name: 'WooCommerce',
    category: 'E-commerce',
    partner: true,
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M8 14h8l4 28h28l4-18H22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="22" cy="50" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="44" cy="50" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    category: 'E-commerce',
    partner: true,
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M16 22V20a8 8 0 0 1 16 0v2M12 22h32l-2 30a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3l-2-30Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M24 36c2 2 6 2 6-1s-6-2-6-5 4-3 6-1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    slug: 'ikas',
    name: 'İkas',
    category: 'E-commerce',
    partner: true,
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="44" cy="20" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="44" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="44" cy="44" r="6" fill="currentColor" />
      </svg>
    ),
  },
  {
    slug: 'tsoft',
    name: 'T-Soft',
    category: 'E-commerce',
    partner: true,
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M8 14h36l12 12-22 22a4 4 0 0 1-6 0L8 36V14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="22" cy="28" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M30 30l14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'ideasoft',
    name: 'IdeaSoft',
    category: 'E-commerce',
    partner: true,
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <rect x="8" y="12" width="48" height="40" rx="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M22 32l8 8 14-16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    slug: 'ticimax',
    name: 'Ticimax',
    category: 'E-commerce',
    partner: true,
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M32 8L52 18v18a18 18 0 0 1-20 18 18 18 0 0 1-20-18V18z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M22 26h20M32 26v20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'dopigo',
    name: 'Dopigo',
    category: 'INTEGRATION',
    partner: true,
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <circle cx="14" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="14" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="50" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="32" r="4" fill="currentColor" />
        <path
          d="M20 32h8M36 32h8M32 20v8M32 36v8"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    slug: 'magento',
    name: 'Magento',
    category: 'E-commerce',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M32 6L52 18v28L32 58 12 46V18L32 6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M22 44V24l10 6 10-6v20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M28 44V32M36 44V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },

  // ---- Languages ----
  {
    slug: 'typescript',
    name: 'TypeScript',
    category: 'Language',
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
    slug: 'python',
    name: 'Python',
    category: 'Language',
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
    slug: 'go',
    name: 'Go',
    category: 'Language',
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
    slug: 'php',
    name: 'PHP',
    category: 'Language',
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
    slug: 'nodejs',
    name: 'Node.js',
    category: 'RUNTIME',
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
    slug: 'nextjs',
    name: 'Next.js',
    category: 'Framework',
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
    slug: 'nestjs',
    name: 'NestJS',
    category: 'Framework',
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
    slug: 'laravel',
    name: 'Laravel',
    category: 'Framework',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
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
    slug: 'fastapi',
    name: 'FastAPI',
    category: 'Framework',
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
    slug: 'react',
    name: 'React',
    category: 'UI',
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
    slug: 'tailwind',
    name: 'Tailwind CSS',
    category: 'STYLING',
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
    slug: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
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
    slug: 'mysql',
    name: 'MySQL',
    category: 'Database',
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
        <path d="M36 46l6 6M44 44l8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
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
    slug: 'prisma',
    name: 'Prisma',
    category: 'ORM',
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
    slug: 'redis',
    name: 'Redis',
    category: 'Cache',
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
    slug: 'elasticsearch',
    name: 'Elasticsearch',
    category: 'Search',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <ellipse cx="26" cy="20" rx="14" ry="6" stroke="currentColor" strokeWidth="2" />
        <path d="M12 20v14c0 3 6 6 14 6" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="42" cy="42" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M48 48l8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'kafka',
    name: 'Kafka',
    category: 'STREAMING',
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
    slug: 'aws',
    name: 'AWS',
    category: 'Cloud',
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
    slug: 'gcp',
    name: 'GCP',
    category: 'Cloud',
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
    slug: 'vercel',
    name: 'Vercel',
    category: 'Edge',
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
    slug: 'cloudflare',
    name: 'Cloudflare',
    category: 'CDN',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path
          d="M14 44a10 10 0 0 1 6-18a14 14 0 0 1 26 4a8 8 0 0 1 4 14H20a8 8 0 0 1-6 0Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M22 44h26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },

  // ---- Container / orchestration / IaC / CI/CD ----
  {
    slug: 'docker',
    name: 'Docker',
    category: 'CONTAINER',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
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
    slug: 'kubernetes',
    name: 'Kubernetes',
    category: 'Platform',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <polygon
          points="32,6 54,18 50,44 32,58 14,44 10,18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M32 20v6M32 38v6M20 32h6M38 32h6" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    slug: 'terraform',
    name: 'Terraform',
    category: 'IaC',
    glyph: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-7 w-7">
        <path d="M14 14l14 8v16l-14-8V14Z" stroke="currentColor" strokeWidth="2" />
        <path d="M30 24l14-8v16l-14 8V24Z" stroke="currentColor" strokeWidth="2" />
        <path d="M30 42l14-8v16l-14 8V42Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    slug: 'github-actions',
    name: 'GitHub Actions',
    category: 'CI/CD',
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
    slug: 'graphql',
    name: 'GraphQL',
    category: 'API',
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
    slug: 'playwright',
    name: 'Playwright',
    category: 'TESTING',
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
    slug: 'grafana',
    name: 'Grafana',
    category: 'MONITORING',
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
    slug: 'sentry',
    name: 'Sentry',
    category: 'Errors',
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

/**
 * Marquee picks shown by default — leads with the partner-status
 * commerce platforms we ship daily, then the surrounding modern web
 * stack. The remaining entries are revealed by the "view more" toggle.
 */
const FEATURED_SLUGS = new Set<string>([
  'wordpress',
  'woocommerce',
  'shopify',
  'ikas',
  'tsoft',
  'ideasoft',
  'ticimax',
  'dopigo',
  'laravel',
  'typescript',
  'nextjs',
  'react',
]);

export function TechStack() {
  const t = useTranslations('tech');
  const [expanded, setExpanded] = React.useState(false);

  const featured = TECHS.filter((tech) => FEATURED_SLUGS.has(tech.slug));
  const additional = TECHS.filter((tech) => !FEATURED_SLUGS.has(tech.slug));
  const partnerLabel = t('partnerBadge');

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
          <motion.div key={tech.slug} variants={fadeUp}>
            <TechCard tech={tech} partnerLabel={partnerLabel} />
          </motion.div>
        ))}

        <AnimatePresence>
          {expanded &&
            additional.map((tech, idx) => (
              <motion.div
                key={tech.slug}
                custom={idx}
                variants={meteorDrop}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <TechCard tech={tech} partnerLabel={partnerLabel} />
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

function TechCard({ tech, partnerLabel }: { tech: Tech; partnerLabel: string }) {
  const t = useTranslations('tech.items');
  return (
    <GlowCard className="group gradient-border flex h-full flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-white/65 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-white/[0.08] group-hover:text-white group-hover:ring-white/20">
          {tech.glyph}
        </div>
        <div className="flex flex-col items-end gap-1">
          {tech.partner && (
            <span className="inline-flex items-center gap-1 rounded-full border border-brand-400/40 bg-brand-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-200 shadow-glow-sm">
              <Sparkles className="h-2.5 w-2.5" />
              {partnerLabel}
            </span>
          )}
          <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 ring-1 ring-white/10 transition-colors group-hover:text-white/70">
            {tech.category}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="text-base font-semibold text-white">{tech.name}</div>
        <p className="mt-1.5 text-xs leading-relaxed text-white/55 transition-colors duration-300 group-hover:text-white/75">
          {t(`${tech.slug}.description`)}
        </p>
      </div>
    </GlowCard>
  );
}
