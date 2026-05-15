import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { SpaceBackground } from '@/components/fx/SpaceBackground';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Resolve the canonical site origin for absolute URLs in metadata.
 * Prefer the explicit NEXT_PUBLIC_SITE_URL when it's set (production
 * domain, e.g. https://erusoft.com); otherwise fall back to Vercel's
 * preview URL so previews still resolve correctly.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  // og:image and twitter:image come from src/app/opengraph-image.tsx and
  // src/app/twitter-image.tsx file conventions — Next.js auto-injects them
  // into metadata as long as openGraph.images / twitter.images aren't set
  // explicitly here.
  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      siteName: 'Erusoft',
      locale: params.locale === 'tr' ? 'tr_TR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

/**
 * Locale layout — thin wrapper on top of the root layout.
 *
 * The root layout owns <html> and <body>; this layer just validates the
 * incoming locale and installs the NextIntlClientProvider so server-rendered
 * messages are available to client components further down the tree.
 */
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <SpaceBackground />
      {children}
    </NextIntlClientProvider>
  );
}
