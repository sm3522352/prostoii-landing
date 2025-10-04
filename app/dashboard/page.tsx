import Link from 'next/link';
import { useEffect } from 'react';
import { goal } from '@/lib/metrics';
import Section from '@/components/Section';
import { FREE_LIMITS } from '@/config/pricing';

export default function DashboardPage() {
  useEffect(() => {
    goal('view_dashboard');
  }, []);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || '#';
  const billingUrl = process.env.NEXT_PUBLIC_BILLING_URL || '#';
  return (
    <Section className="pt-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Личный кабинет</h1>
      <nav className="flex space-x-6 mb-6 border-b border-border pb-4 text-text-secondary">
        <Link href={`${appUrl}`} className="hover:text-accent">Чат</Link>
        <Link href={`${appUrl}`} className="hover:text-accent">Изображения</Link>
        <Link href="#limits" className="hover:text-accent">Лимиты</Link>
        <Link href={`${billingUrl}`} className="hover:text-accent">Оплата</Link>
      </nav>
      <div id="limits" className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Лимиты</h2>
        <p className="text-sm text-text-secondary mb-4">
          Дневная квота для бесплатного тарифа: {FREE_LIMITS.textPerDay.toLocaleString()} символов и {FREE_LIMITS.imagesPerDay}{' '}
          изображений. Чтобы снять ограничения и получить приоритетный доступ — активируйте PRO.
        </p>
        <Link
          href={`${billingUrl}?trial=1`}
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover"
        >
          Перейти на PRO
        </Link>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Пустые состояния</h2>
        <p className="text-sm text-text-secondary mb-4">Сервис скоро будет доступен. Начните работу в приложении.</p>
        <Link
          href={appUrl}
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover"
        >
          Открыть приложение
        </Link>
      </div>
      <div className="mt-8">
        <Link href="/cancel" className="text-accent hover:text-accent-hover underline">
          Отменить подписку
        </Link>
      </div>
    </Section>
  );
}