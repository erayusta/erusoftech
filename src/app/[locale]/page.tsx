import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { PartnersBanner } from '@/components/sections/PartnersBanner';
import { Services } from '@/components/sections/Services';
import { TechStack } from '@/components/sections/TechStack';
import { Process } from '@/components/sections/Process';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Trust } from '@/components/sections/Trust';
import { CTA } from '@/components/sections/CTA';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <Hero />
        <PartnersBanner />
        <Services />
        <TechStack />
        <Process />
        <CaseStudies />
        <Trust />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
