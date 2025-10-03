"use client";

import Link from "next/link";

import Section from "./Section";
import { BILLING_URL, APP_URL } from "@/lib/env";
import { goal } from "@/lib/metrics";

const badges = [
  "Chat + Images",
  "Trial 1 ₽/3 дня",
  "Автопродление 949 ₽/7 дней",
  "Пакеты 10/20/50",
];

export default function Hero() {
  return (
    <Section
      className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28"
      containerClassName="relative"
    >
      <div
        className="hero-bg overflow-hidden px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16"
        data-testid="hero-section"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
              SaaS • AI • Subscription
            </p>
            <h1 className="h1 text-white">
              ПростоИИ — текст и картинки по подписке
            </h1>
            <p className="lead max-w-xl">
              Генерация текстов и изображений на мощных моделях по API.
              Прозрачные лимиты, пробный доступ 1 ₽ на 3 дня.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`${BILLING_URL}?trial=1`}
                onClick={() => goal("click_trial")}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-background shadow-glow transition hover:-translate-y-0.5 hover:shadow-[0_32px_90px_-40px_rgba(255,255,255,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              >
                Начать за 1 ₽
              </Link>
              <Link
                href={APP_URL}
                onClick={() => goal("click_open_app")}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Открыть приложение
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 text-sm text-white/80">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="badge bg-white/10 text-white/80 backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="card relative mx-auto w-full max-w-xl overflow-hidden border border-white/10 bg-card/70 p-6 shadow-glow">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Проект: Лэндинг</span>
                <span>LLM 4.1 Turbo</span>
              </div>
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4">
                <p className="text-sm text-white/85">
                  «Сгенерируй 5 идей постов про запуск новой коллекции. Добавь
                  эмодзи и чёткий CTA»
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
                <p className="text-sm text-white/85">
                  ✅ Готово! Предлагаем 5 постов: анонс, польза, отзыв клиента,
                  закулисье, оффер с ограничением по времени. Каждый с эмодзи и
                  CTA.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-2xl font-semibold text-white">30k</p>
                  <p>символов/день</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-2xl font-semibold text-white">20</p>
                  <p>изображений/день</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-2xl font-semibold text-white">949 ₽</p>
                  <p>каждые 7 дней</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
