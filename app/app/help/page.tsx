"use client";

import Card from "@/components/Card";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-text">Помощь</h1>
        <p className="text-sm text-muted">Нашли вопрос — напишите, решим за минуту.</p>
      </header>
      <Card className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-text">Чат поддержки</h2>
          <p className="text-sm text-muted">Ответим в течение пары минут в рабочее время.</p>
        </div>
        <Link
          href="https://t.me/prostoii_support"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Открыть в Telegram <span aria-hidden>→</span>
        </Link>
      </Card>
      <Card className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-text">База знаний</h2>
          <p className="text-sm text-muted">Короткие инструкции по чату, рецептам и файлам.</p>
        </div>
        <Link
          href="/faq"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Смотреть ответы <span aria-hidden>→</span>
        </Link>
      </Card>
    </div>
  );
}
