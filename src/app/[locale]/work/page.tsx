import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  WorksHero,
  WorksFeatured,
  WorksCompact,
  WorksLegacy,
  WorksCTA,
} from '@/components/work/WorksSections';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'works.meta' });
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

export default function WorkPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <WorksHero />
        <WorksFeatured />
        <WorksCompact />
        <WorksLegacy />
        <WorksCTA />
      </main>
      <Footer />
    </>
  );
}
