import Section from '@/components/Section';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import HowItWorks from '@/components/HowItWorks';
import ForWhom from '@/components/ForWhom';
import PricingTable from '@/components/PricingTable';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import LogoCloud from '@/components/LogoCloud';
import CookieConsent from '@/components/CookieConsent';
import { goal } from '@/lib/metrics';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    goal('view_home');
  }, []);

  return (
    <>
      <Section className="pt-12 pb-20 text-center">
        <Hero />
      </Section>
      <Section>
        <FeatureCards />
      </Section>
      <Section>
        <HowItWorks />
      </Section>
      <Section>
        <ForWhom />
      </Section>
      <Section>
        <PricingTable />
      </Section>
      <Section>
        <FAQ />
      </Section>
      <Section>
        <LogoCloud />
      </Section>
      <Section>
        <CTA />
      </Section>
      <CookieConsent />
    </>
  );
}