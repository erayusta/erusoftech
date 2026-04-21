import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { CursorTrail } from '@/components/ui/CursorTrail';
import '@/styles/globals.css';

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
    metadataBase: new URL('https://erusoftech.com'),
    icons: {
      icon: [
        { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/brand/logo-mark.webp', sizes: 'any', type: 'image/webp' },
      ],
      apple: [{ url: '/brand/logo-mark@2x.webp', sizes: '144x144' }],
    },
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
    <html lang={locale} className="dark">
      <body className="min-h-screen bg-ink-950 text-white antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CursorTrail />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
