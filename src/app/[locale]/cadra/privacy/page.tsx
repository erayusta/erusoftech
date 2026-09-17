import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LegalContent } from '@/components/pages/LegalContent';

/**
 * Privacy Policy URL filed for the Cadra iOS app in App Store Connect.
 *
 * The section order below mirrors the App Privacy questionnaire answers
 * one-to-one. If the app's data collection ever changes, this page, the
 * questionnaire, and Cadra's BackendConfig.isEnabled flag all have to move
 * together — a policy that does not match behaviour is one of the more common
 * reasons an approved app is later pulled.
 */
const CADRA_PRIVACY_SECTIONS = [
  'photos',
  'collected',
  'notCollected',
  'purchases',
  'tracking',
  'children',
  'retention',
  'contact',
] as const;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'cadraPrivacy.meta' });
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

export default function CadraPrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <LegalContent namespace="cadraPrivacy" sectionKeys={CADRA_PRIVACY_SECTIONS} />
      </main>
      <Footer />
    </>
  );
}
