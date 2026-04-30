import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { SpaceBackground } from '@/components/fx/SpaceBackground';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      siteName: 'Erusoft',
      images: [
        {
          url: '/brand/logo-full@2x.webp',
          width: 960,
          alt: 'Erusoft',
        },
      ],
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
