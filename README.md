# ПростоИИ — лендинг (Next.js 14 + TailwindCSS)

Минималистичный лендинг в стиле Lumi.ai: тёплые оранжевые свечения, чистая типографика, скруглённые карточки. Код соответствует спецификации и готов к продакшн‑доработке.

## Быстрый старт

```bash
pnpm i   # или npm i / yarn
pnpm dev # http://localhost:3000
```

## Техстек
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- next/font (Jost, Manrope)

## Структура
```
app/
  globals.css
  layout.tsx
  page.tsx
components/
  Button.tsx Card.tsx Pill.tsx Section.tsx
  RecipeCard.tsx TestimonialCard.tsx FAQItem.tsx ModelTable.tsx
lib/
  data.ts
tailwind.config.ts
next.config.ts
tsconfig.json
postcss.config.js
```

## Дизайн‑токены
Переменные цветов и радиусов объявлены в `app/globals.css` и подключены в Tailwind через `theme.extend`.

## Доступность и перфоманс
- Видимые `focus`‑состояния, контраст ≥ WCAG AA
- Ленивая отрисовка простая; для изображений используйте `next/image` (AVIF/WebP)

## CTA
Кнопка ведёт на `tg://resolve?domain=prostoii_bot` (заглушка). Замените на актуальный username.

## Лицензия
MIT
