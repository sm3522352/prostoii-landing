import Link from 'next/link';
import { TRIAL, IMAGE_PACKS, FREE_LIMITS } from '@/config/pricing';
import { goal } from '@/lib/metrics';

/**
 * PricingTable renders the available plans and add-ons. It is used on
 * both the home page and the dedicated /pricing page. Each tier
 * contains a list of included features and buttons to purchase.
 */
export default function PricingTable() {
  const billingUrl = process.env.NEXT_PUBLIC_BILLING_URL || '#';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Free tier */}
      <div className="border border-border rounded-xl p-6 bg-panel flex flex-col">
        <h3 className="text-2xl font-semibold text-text-primary mb-2">Free</h3>
        <p className="text-text-secondary text-sm mb-4">Бесплатный доступ с ежедневными лимитами</p>
        <ul className="space-y-1 text-sm mb-6">
          <li>до {FREE_LIMITS.textPerDay.toLocaleString()} символов текста/день</li>
          <li>до {FREE_LIMITS.imagesPerDay} изображений/день</li>
          <li>Chat + Images</li>
        </ul>
        <div className="mt-auto">
          <Link
            href={`${billingUrl}?trial=1`}
            data-goal="click_trial"
            onClick={() => goal('click_trial')}
            className="block text-center w-full px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg"
          >
            Активировать за {TRIAL.priceRub} ₽
          </Link>
        </div>
      </div>
      {/* PRO tier */}
      <div className="border border-border rounded-xl p-6 bg-panel flex flex-col">
        <h3 className="text-2xl font-semibold text-text-primary mb-2">PRO Trial</h3>
        <p className="text-text-secondary text-sm mb-4">
          {TRIAL.priceRub} ₽ за {TRIAL.days} дня, затем автопродление {TRIAL.renewRub} ₽/{TRIAL.renewDays} дней
        </p>
        <ul className="space-y-1 text-sm mb-6">
          <li>Безлимит сообщений (soft rate-limit)</li>
          <li>Приоритетная очередь</li>
          <li>Поддержка Chat + Images</li>
        </ul>
        <div className="mt-auto">
          <Link
            href={`${billingUrl}?trial=1`}
            data-goal="click_trial"
            onClick={() => goal('click_trial')}
            className="block text-center w-full px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg"
          >
            Начать за {TRIAL.priceRub} ₽
          </Link>
          <p className="text-xs text-text-secondary mt-2 text-center">
            Деньги списываются автоматически — автопродление можно отключить на странице “Отменить подписку”.
          </p>
        </div>
      </div>
      {/* Image packs */}
      <div className="border border-border rounded-xl p-6 bg-panel flex flex-col">
        <h3 className="text-2xl font-semibold text-text-primary mb-2">Пакеты изображений</h3>
        <p className="text-text-secondary text-sm mb-4">Дополнительные изображения для Free и PRO</p>
        <div className="flex flex-col space-y-4 mb-4">
          {IMAGE_PACKS.map((pack) => (
            <div key={pack.count} className="flex justify-between items-center border border-border rounded-lg p-3">
              <span>{pack.count} изображений</span>
              <span className="font-semibold">{pack.priceRub} ₽</span>
              <Link
                href={`${billingUrl}?${pack.query}`}
                onClick={() => goal(`click_buy_pack_${pack.count}`)}
                data-goal={`click_buy_pack_${pack.count}`}
                className="bg-accent hover:bg-accent-hover text-white px-3 py-1 rounded-md text-sm"
              >
                Купить
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}