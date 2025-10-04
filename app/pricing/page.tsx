import Section from '@/components/Section';
import PricingTable from '@/components/PricingTable';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import { useEffect } from 'react';
import { goal } from '@/lib/metrics';

export default function PricingPage() {
  useEffect(() => {
    goal('view_pricing');
  }, []);
  return (
    <>
      <Section className="pt-12 pb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Тарифы</h1>
        <p className="text-center text-text-secondary mb-8">Выберите подходящий тариф или пакет изображений.</p>
        <PricingTable />
      </Section>
      <Section>
        <FAQ />
      </Section>
      <Section>
        <CTA />
      </Section>
    </>
  );
}