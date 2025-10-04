import Section from '@/components/Section';
import { goal } from '@/lib/metrics';
import { useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    goal('view_contact');
  }, []);
  const supportUrl = process.env.NEXT_PUBLIC_SUPPORT_URL || '#';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || '';
  return (
    <Section className="pt-12 max-w-2xl mx-auto text-center space-y-4">
      <h1 className="text-3xl font-bold mb-4">Контакты и поддержка</h1>
      <p className="text-text-secondary text-sm">
        Если у вас возникли вопросы, идеи или предложения, пожалуйста, свяжитесь с нами. Мы всегда открыты для
        обратной связи.
      </p>
      <div className="space-y-2">
        <a
          href={supportUrl}
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover"
        >
          Открыть поддержку
        </a>
        <p>
          Или пишите нам на <a href={`mailto:${contactEmail}`} className="text-accent hover:text-accent-hover underline">{contactEmail}</a>
        </p>
      </div>
    </Section>
  );
}