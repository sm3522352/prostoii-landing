import Section from '@/components/Section';
import Link from 'next/link';
import { goal } from '@/lib/metrics';
import { useEffect } from 'react';

export default function LegalPage() {
  useEffect(() => {
    goal('view_legal');
  }, []);
  const docs = [
    { href: '/docs/offer', label: 'Договор оферты' },
    { href: '/docs/privacy', label: 'Политика конфиденциальности' },
    { href: '/cancel', label: 'Отмена подписки' },
    { href: '/contact', label: 'Контакты' }
  ];
  return (
    <Section className="pt-12 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Юридические документы</h1>
      <ul className="space-y-3">
        {docs.map((doc) => (
          <li key={doc.href} className="border border-border rounded-lg p-4 bg-panel hover:bg-border">
            <Link href={doc.href} className="block text-text-primary hover:text-accent">
              {doc.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}