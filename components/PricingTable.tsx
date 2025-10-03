"use client";

import Link from "next/link";

import Section from "./Section";
import { BILLING_URL } from "@/lib/env";
import { goal } from "@/lib/metrics";
import { IMAGE_PACKS, TRIAL } from "@/config/pricing";

type PricingTableProps = {
  id?: string;
  title?: string;
  description?: string;
  showImagePacks?: boolean;
};

const freeFeatures = [
  "30 000 символов/день",
  "20 изображений/день",
  "История запросов 30 дней",
  "Поддержка по e-mail",
];

const proFeatures = [
  "Trial 1 ₽ на 3 дня → 949 ₽ / 7 дней",
  "Безлимит сообщений (soft rate limit)",
  "Приоритет к быстрым моделям",
  "Пакеты картинок отдельно",
];

const goalByPack: Record<number, string> = {
  10: "click_buy_pack_10",
  20: "click_buy_pack_20",
  50: "click_buy_pack_50",
};

export default function PricingTable({
  id,
  title = "Тарифы ПростоИИ",
  description = "Выбирайте подходящий сценарий: оставайтесь на Free или активируйте PRO с пробным доступом.",
  showImagePacks = false,
}: PricingTableProps) {
  return (
    <Section id={id}>
      <div className="space-y-10">
        {title || description ? (
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            {title ? (
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-base text-white/70">{description}</p>
            ) : null}
          </div>
        ) : null}
        <div className="grid gap-6 lg:grid-cols-2" data-testid="pricing-table">
          <div className="card h-full rounded-3xl border border-white/10 bg-card/85 p-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm text-white/60">
                <span className="font-semibold text-white">Free</span>
                <span>0 ₽</span>
              </div>
              <p className="text-sm text-white/70">
                Для ознакомления и повседневных задач.
              </p>
              <ul className="space-y-2 text-sm text-white/75">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`${BILLING_URL}?trial=1`}
                onClick={() => goal("click_trial")}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Активировать за 1 ₽
              </Link>
            </div>
          </div>
          <div className="card h-full rounded-3xl border border-primary-400/40 bg-[#151934] p-8 shadow-glow">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm text-white/75">
                <span className="font-semibold text-white">PRO Trial</span>
                <span>
                  {TRIAL.priceRub} ₽ / {TRIAL.days} дня → {TRIAL.renewRub} ₽ /{" "}
                  {TRIAL.renewDays} дней
                </span>
              </div>
              <p className="text-sm text-white/75">
                Полный доступ ко всем моделям, история без ограничений и
                приоритетное время ответа.
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`${BILLING_URL}?trial=1`}
                onClick={() => goal("click_trial")}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-background shadow-glow transition hover:-translate-y-0.5 hover:shadow-[0_32px_90px_-40px_rgba(255,255,255,0.55)]"
              >
                Активировать за 1 ₽
              </Link>
            </div>
          </div>
        </div>
        {showImagePacks ? (
          <div className="card rounded-3xl border border-white/10 bg-card/80 p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Пакеты изображений
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Оплачиваются отдельно. Подходят, если нужно больше визуального
                  контента.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {IMAGE_PACKS.map((pack) => (
                  <Link
                    key={pack.count}
                    href={`${BILLING_URL}?${pack.query}`}
                    onClick={() => goal(goalByPack[pack.count])}
                    className="inline-flex flex-col items-center justify-center rounded-2xl border border-white/20 px-5 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                  >
                    <span>{pack.count} шт.</span>
                    <span className="text-white/70">{pack.priceRub} ₽</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        <p className="rounded-3xl border border-white/10 bg-card/60 px-6 py-4 text-sm text-white/70">
          Деньги списываются автоматически — автопродление всегда можно
          отключить на странице «Отменить подписку».
        </p>
      </div>
    </Section>
  );
}
