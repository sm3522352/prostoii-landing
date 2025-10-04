import Link from 'next/link';
import { goal } from '@/lib/metrics';
import { TRIAL } from '@/config/pricing';

/**
 * CTA displays a prominent call‑to‑action block encouraging the user
 * to start a trial. It can be reused on multiple pages.
 */
export default function CTA() {
  const billingUrl = process.env.NEXT_PUBLIC_BILLING_URL || '#';
  return (
    <div className="bg-accent rounded-2xl p-8 text-center text-white space-y-4">
      <h3 className="text-2xl font-semibold">Готовы попробовать?</h3>
      <p>Активируйте доступ за {TRIAL.priceRub} ₽ и оцените все возможности ПростоИИ.</p>
      <Link
        href={`${billingUrl}?trial=1`}
        data-goal="click_trial"
        onClick={() => goal('click_trial')}
        className="inline-block px-6 py-3 bg-white text-accent font-bold rounded-xl hover:bg-gray-100"
      >
        Начать за {TRIAL.priceRub} ₽
      </Link>
    </div>
  );
}