import Section from '@/components/Section';
import { goal } from '@/lib/metrics';
import { useEffect } from 'react';

export default function OfferPage() {
  useEffect(() => {
    goal('view_offer');
  }, []);
  return (
    <Section className="pt-12">
      <h1 className="text-3xl font-bold mb-4">Договор оферты</h1>
      <p className="text-text-secondary mb-2">Дата вступления в силу: 28.11.2024</p>
      <div className="prose prose-invert max-w-none text-sm">
        TODO: интеграция позже. Здесь будет содержаться полный текст оферты.
      </div>
    </Section>
  );
}