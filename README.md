# ПростоИИ — лендинг

Next.js 14 + TypeScript + TailwindCSS. Тёмный SaaS-лендинг c секциями Hero → Benefits → How it works → Use cases → Pricing → FAQ → CTA. Подготовлен под деплой на Vercel и подключён к Яндекс.Метрике.

## Быстрый старт

```bash
npm install
cp .env.example .env.local # при необходимости поменяйте значения
npm run dev # http://localhost:3000
```

## Скрипты

| Команда             | Назначение                              |
| ------------------- | --------------------------------------- |
| `npm run dev`       | локальная разработка                    |
| `npm run build`     | production-сборка                       |
| `npm run start`     | запуск собранного приложения            |
| `npm run lint`      | ESLint (Next.js preset)                 |
| `npm run typecheck` | TypeScript без генерации файлов         |
| `npm run format`    | проверка форматирования Prettier        |
| `npm run test:e2e`  | Playwright: smoke + визуальные снапшоты |

## Конфигурация

- `.env.local` — публичные ссылки и Яндекс.Метрика. Пример значений в `.env.example`:
  - `NEXT_PUBLIC_APP_URL`
  - `NEXT_PUBLIC_BILLING_URL`
  - `NEXT_PUBLIC_SUPPORT_URL`
  - `NEXT_PUBLIC_CONTACT_EMAIL`
  - `NEXT_PUBLIC_YM_ID`
- `config/pricing.ts` — цены trial и пакеты изображений.

После изменения конфигурации перезапустите dev-сервер.

## Метрика

В `lib/metrics.ts` реализован helper `goal(name)`. На фронтенде размечены цели:

- `click_trial`
- `click_open_app`
- `click_buy_pack_10`
- `click_buy_pack_20`
- `click_buy_pack_50`
- `view_pricing`
- `view_cancel`

Проверьте, что ID счётчика в `.env.local` совпадает с актуальным значением.

## Тестирование и качество

1. `npm run lint`
2. `npm run typecheck`
3. `npm run format`
4. `npm run build`
5. `npm run test:e2e`

Playwright запускает smoke-тесты для `/`, `/pricing`, `/cancel` и снимает визуальные снапшоты hero и тарифов (desktop + mobile).

## Lighthouse цели

Для превью-деплоя (мобильный Lighthouse, Vercel):

- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices = 100
- SEO = 100

## Деплой

Рекомендуемый хостинг — Vercel. Каждая ветка создаёт preview-окружение, основной деплой — из ветки `main`. В README добавьте ссылку на превью при публикации PR.
