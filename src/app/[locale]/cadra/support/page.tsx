import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LegalContent } from '@/components/pages/LegalContent';

/**
 * Support URL filed for the Cadra iOS app in App Store Connect.
 *
 * App Review checks that this resolves and that a person can actually reach
 * someone from it, so the contact section carries a real address rather than a
 * form that has to be built first.
 */
const CADRA_SUPPORT_SECTIONS = [
  'start',
  'quality',
  'saving',
  'subscription',
  'restore',
  'refund',
  'languages',
  'contact',
] as const;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'cadraSupport.meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      siteName: 'Erusoft',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default function CadraSupportPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <LegalContent namespace="cadraSupport" sectionKeys={CADRA_SUPPORT_SECTIONS} />
      </main>
      <Footer />
    </>
  );
}
