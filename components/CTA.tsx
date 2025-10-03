"use client";

import Link from "next/link";

import Section from "./Section";
import { APP_URL, BILLING_URL } from "@/lib/env";
import { goal } from "@/lib/metrics";

export default function CTA() {
  return (
    <Section className="pb-20">
      <div className="hero-bg mx-auto max-w-3xl space-y-6 px-8 py-10 text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Готовы подключиться?
        </h2>
        <p className="lead">
          Активируйте trial за 1 ₽, протестируйте все возможности и оставляйте
          подписку только если сервис помогает каждый день.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`${BILLING_URL}?trial=1`}
            onClick={() => goal("click_trial")}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-background shadow-glow transition hover:-translate-y-0.5 hover:shadow-[0_32px_90px_-40px_rgba(255,255,255,0.55)]"
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
      </div>
    </Section>
  );
}
