import Link from 'next/link';
import { goal } from '@/lib/metrics';
import { FREE_LIMITS, IMAGE_PACKS, TRIAL } from '@/config/pricing';

/**
 * Hero displays the main headline, subheadline and primary call-to-action
 * buttons for the landing page. It is intentionally concise and
 * highlights the key offering (trial and subscription).
 */
export default function Hero() {
  const billing = process.env.NEXT_PUBLIC_BILLING_URL || '#';
  const app = process.env.NEXT_PUBLIC_APP_URL || '#';
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
        ПростоИИ — текст и картинки по&nbsp;подписке
      </h1>
      <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
        Генерация текстов и изображений на мощных моделях по API. Прозрачные лимиты,
        пробный доступ {TRIAL.priceRub} ₽ на {TRIAL.days} дня.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={`${billing}?trial=1`}
          onClick={() => goal('click_trial')}
          className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-hover"
          data-goal="click_trial"
        >
          Начать за {TRIAL.priceRub} ₽
        </Link>
        <Link
          href={app}
          onClick={() => goal('click_open_app')}
          className="px-6 py-3 bg-panel text-text-primary rounded-xl font-semibold border border-border hover:bg-border"
          data-goal="click_open_app"
        >
          Открыть приложение
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-2 text-sm text-text-secondary mt-4">
        <span className="px-3 py-1 bg-panel rounded-full border border-border">Chat + Images</span>
        <span className="px-3 py-1 bg-panel rounded-full border border-border">Trial {TRIAL.priceRub} ₽/{TRIAL.days} дня</span>
        <span className="px-3 py-1 bg-panel rounded-full border border-border">Автопродление {TRIAL.renewRub} ₽/{TRIAL.renewDays} дней</span>
        {IMAGE_PACKS.map(pack => (
          <span key={pack.count} className="px-3 py-1 bg-panel rounded-full border border-border">
            {pack.count} изображений
          </span>
        ))}
      </div>
    </div>
  );
}