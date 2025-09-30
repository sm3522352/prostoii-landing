"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import { showToast } from "@/lib/toast";
import {
  continueItems,
  fileIcons,
  fileItems,
  hintPills,
  pinnedRecipes,
  quickActions,
} from "@/app/app/home-data";

export default function MiniDashboardPage() {
  const [activeHint, setActiveHint] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveHint((index) => (index + 1) % hintPills.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const visibleHints = useMemo(() => {
    if (hintPills.length <= 2) return hintPills;
    const pool: string[] = [];
    for (let i = 0; i < 2; i += 1) {
      pool.push(hintPills[(activeHint + i) % hintPills.length]);
    }
    return pool;
  }, [activeHint]);

  const handleHintClick = (text: string) => {
    showToast(`Подсказка добавлена: ${text}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="space-y-3">
        <h2 className="text-[18px] font-semibold leading-6 text-[var(--text)]">Быстрые действия</h2>
        <div className="flex flex-col gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="flex min-h-[120px] flex-col justify-between rounded-2xl border border-[var(--muted-border)] bg-[var(--surface)] px-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--primary)_45%,transparent)]"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-lg">
                  {action.icon}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--text)_55%,transparent)]">
                  {action.hint}
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-[17px] font-semibold leading-6 text-[var(--text)]">{action.title}</h3>
                <p className="text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold leading-6 text-[var(--text)]">Продолжить</h2>
          <button
            type="button"
            onClick={() => showToast("Обновили ленту")}
            className="inline-flex h-9 items-center rounded-full border border-[var(--muted-border)] px-3 text-sm font-semibold text-[color-mix(in_srgb,var(--text)_70%,transparent)]"
          >
            Обновить
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {continueItems.map((item) => (
            <Card key={item.id} className="flex flex-col gap-3" size="sm" interactive>
              <div className="flex items-center justify-between text-xs font-semibold text-[color-mix(in_srgb,var(--text)_55%,transparent)]">
                <span>{item.type}</span>
                <span>{item.updatedAt}</span>
              </div>
              <h3 className="text-[17px] font-semibold leading-6 text-[var(--text)]">{item.title}</h3>
              <p className="line-clamp-3 text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">{item.description}</p>
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--muted-border)] px-4 text-sm font-semibold text-[var(--primary)]"
              >
                Продолжить
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[18px] font-semibold leading-6 text-[var(--text)]">Закреплённые</h2>
        <div className="flex flex-col gap-3">
          {pinnedRecipes.map((recipe) => (
            <Card key={recipe.id} className="flex flex-col gap-2" size="sm" interactive>
              <span className="text-xs font-semibold text-[color-mix(in_srgb,var(--text)_55%,transparent)]">Закреплено</span>
              <h3 className="text-[16px] font-semibold leading-6 text-[var(--text)]">{recipe.title}</h3>
              <p className="line-clamp-2 text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">{recipe.summary}</p>
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--muted-border)] px-4 text-sm font-semibold text-[var(--primary)]"
              >
                Запустить
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold leading-6 text-[var(--text)]">Файлы</h2>
          <Link
            href="/app/files"
            className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--muted-border)] px-3 text-sm font-semibold text-[color-mix(in_srgb,var(--text)_70%,transparent)]"
          >
            Все
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {fileItems.map((file) => (
            <Card key={file.id} className="flex items-center gap-3" size="sm" interactive>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-lg">
                {fileIcons[file.kind]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold leading-5 text-[var(--text)]">{file.name}</p>
                <p className="text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
                  {file.size} • {file.updatedAt}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <Card className="flex flex-col gap-3" size="sm">
          <div>
            <h3 className="text-[17px] font-semibold leading-6 text-[var(--text)]">Лимит на сегодня</h3>
            <p className="text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">20 из 100 запросов</p>
          </div>
          <div className="h-2 rounded-full bg-[color-mix(in_srgb,var(--text)_8%,transparent)]">
            <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: "20%" }} aria-hidden />
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--white)]"
          >
            Продлить
          </button>
        </Card>

        <Card className="flex flex-col gap-2" size="sm">
          <h3 className="text-[17px] font-semibold leading-6 text-[var(--text)]">Подсказки</h3>
          <div className="flex flex-wrap gap-2">
            {visibleHints.map((hint) => (
              <button
                key={hint}
                type="button"
                onClick={() => handleHintClick(hint)}
                className="inline-flex h-10 items-center rounded-full border border-[var(--muted-border)] px-4 text-sm font-medium text-[color-mix(in_srgb,var(--text)_70%,transparent)]"
              >
                {hint}
              </button>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
