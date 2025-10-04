import Section from '@/components/Section';
import { goal } from '@/lib/metrics';
import { useEffect } from 'react';

export default function PrivacyPage() {
  useEffect(() => {
    goal('view_privacy');
  }, []);
  return (
    <Section className="pt-12">
      <h1 className="text-3xl font-bold mb-4">Политика конфиденциальности</h1>
      <div className="prose prose-invert max-w-none text-sm space-y-4">
        <p>
          Данный документ разработан в соответствии с требованиями 152-ФЗ «О защите
          персональных данных» и содержит общие условия обработки и защиты
          персональной информации.
        </p>
        <p>TODO: интеграция позже. Здесь будет размещён полный текст политики.</p>
      </div>
    </Section>
  );
}