import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LegalContent } from '@/components/pages/LegalContent';

const PRIVACY_SECTIONS = [
  'controller',
  'data',
  'purpose',
  'transfer',
  'collection',
  'rights',
  'cookies',
  'contact',
] as const;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'privacy.meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      siteName: 'Erusoft',
    },
  };
}

export default function PrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <LegalContent namespace="privacy" sectionKeys={PRIVACY_SECTIONS} />
      </main>
      <Footer />
    </>
  );
}
