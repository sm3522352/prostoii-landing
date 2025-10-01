"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";
import { useAppStore } from "@/lib/store";
import {
  continueItems,
  fileIcons,
  fileItems,
  hintPills,
  pinnedRecipes,
  quickActions,
} from "./home-data";
export default function DashboardPage() {
  const { setPromptDraft } = useAppStore();
  const [activeHint, setActiveHint] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveHint(0);
      return undefined;
    }

    const id = window.setInterval(() => {
      setActiveHint((index) => (index + 1) % hintPills.length);
    }, 6000);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  const visibleHints = useMemo(() => {
    if (hintPills.length <= 3) return hintPills;
    const sequence: string[] = [];
    for (let i = 0; i < 3; i += 1) {
      sequence.push(hintPills[(activeHint + i) % hintPills.length]);
    }
    return sequence;
  }, [activeHint]);

  const handleQuickAction = (href: string) => {
    if (href.includes("recipes")) {
      trackEvent("recipe_launch", { source: "dashboard" });
    }
    if (href.includes("chat")) {
      trackEvent("chat_open", { source: "dashboard" });
    }
    if (href.includes("files")) {
      trackEvent("file_upload_open", { source: "dashboard" });
    }
  };

  const handleHintClick = (text: string) => {
    setPromptDraft(text);
    showToast(`Подсказка добавлена: ${text}`);
  };

  return (
    <>
      <div className="flex flex-col gap-8 xl:col-span-8">
        <section className="space-y-3">
          <div>
            <h2 className="text-[20px] font-semibold leading-6 text-[var(--text)]">Быстрые действия</h2>
            <p className="mt-3 text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
              Начните с ключевого сценария — новый рецепт, чат или загрузка файла.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="group flex min-h-[116px] flex-col justify-between rounded-2xl border border-[var(--muted-border)] bg-[var(--surface)] px-5 py-5 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--primary)_45%,transparent)]"
                onClick={() => handleQuickAction(action.href)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-lg">
                      {action.icon}
                    </span>
                    <h3 className="text-[18px] font-semibold leading-6 text-[var(--text)]">{action.title}</h3>
                    <p className="text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">{action.description}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--text)_55%,transparent)]">
                    {action.hint}
                  </span>
                </div>
                <span className="inline-flex items-center text-sm font-semibold text-[var(--primary)]">
                  Перейти →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-[20px] font-semibold leading-6 text-[var(--text)]">Продолжить</h2>
              <p className="mt-2 text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
                Возвращайтесь к последним диалогам, черновикам и рецептам.
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast("Обновили ленту")}
              className="inline-flex h-10 items-center rounded-full border border-[var(--muted-border)] px-4 text-sm font-semibold text-[color-mix(in_srgb,var(--text)_65%,transparent)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              Обновить
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {continueItems.length === 0 && (
              <Card className="md:col-span-2 flex flex-col items-start gap-3" size="md">
                <span className="inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                  Пока пусто
                </span>
                <p className="text-[18px] font-semibold leading-6 text-[var(--text)]">
                  Пока пусто. Начните с нового рецепта.
                </p>
                <button
                  type="button"
                  className="inline-flex h-10 items-center rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--white)]"
                  onClick={() => handleQuickAction("/app/recipes?new=1")}
                >
                  Создать первый рецепт
                </button>
              </Card>
            )}

            {continueItems.map((item) => (
              <Card key={item.id} className="flex flex-col justify-between gap-4" size="md" interactive>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[color-mix(in_srgb,var(--text)_55%,transparent)]">
                    <span>{item.type}</span>
                    <span>{item.updatedAt}</span>
                  </div>
                  <h3 className="text-[18px] font-semibold leading-6 text-[var(--text)]">{item.title}</h3>
                  <p className="line-clamp-3 text-sm leading-5 text-[color-mix(in_srgb,var(--text)_62%,transparent)]">{item.description}</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--muted-border)] px-4 text-sm font-semibold text-[color-mix(in_srgb,var(--text)_70%,transparent)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    Продолжить
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--muted-border)] px-4 text-sm font-semibold text-[color-mix(in_srgb,var(--text)_60%,transparent)] transition hover:text-[var(--error)]"
                  >
                    Удалить
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold leading-6 text-[var(--text)]">Закреплённые рецепты</h2>
          </div>
          {pinnedRecipes.length === 0 ? (
            <Card className="flex flex-col gap-3" size="md">
              <p className="text-[18px] font-semibold leading-6 text-[var(--text)]">
                Ничего не закреплено
              </p>
              <p className="text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
                Закрепляйте важные рецепты, чтобы держать их под рукой.
              </p>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {pinnedRecipes.map((recipe) => (
                <Card key={recipe.id} className="flex flex-col gap-3" size="sm" interactive>
                  <div className="flex items-center justify-between text-xs font-semibold text-[color-mix(in_srgb,var(--text)_55%,transparent)]">
                    <span>Закреплено</span>
                    <button type="button" className="text-[color-mix(in_srgb,var(--text)_65%,transparent)]">
                      Открепить
                    </button>
                  </div>
                  <h3 className="text-[17px] font-semibold leading-6 text-[var(--text)]">{recipe.title}</h3>
                  <p className="line-clamp-3 text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">{recipe.summary}</p>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--muted-border)] px-4 text-sm font-semibold text-[var(--primary)] transition hover:border-[var(--primary)]"
                  >
                    Запустить
                  </button>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[20px] font-semibold leading-6 text-[var(--text)]">Файлы</h2>
            <Link
              href="/app/files"
              className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--muted-border)] px-4 text-sm font-semibold text-[color-mix(in_srgb,var(--text)_70%,transparent)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              Все файлы
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {fileItems.map((file) => (
              <Card key={file.id} className="flex items-center gap-3" size="sm" interactive>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-lg">
                  {fileIcons[file.kind]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold leading-5 text-[var(--text)]">{file.name}</p>
                  <p className="text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
                    {file.size} • {file.updatedAt}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--muted-border)] px-3 text-sm font-semibold text-[color-mix(in_srgb,var(--text)_60%,transparent)] transition hover:text-[var(--primary)]"
                >
                  Открыть
                </button>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <aside className="flex flex-col gap-6 xl:col-span-4">
        <Card className="flex flex-col gap-4" size="md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[18px] font-semibold leading-6 text-[var(--text)]">Лимит на сегодня</h3>
              <p className="text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">20 из 100 запросов</p>
            </div>
            <span className="text-sm font-semibold text-[color-mix(in_srgb,var(--primary)_80%,transparent)]">20%</span>
          </div>
          <div className="h-2 rounded-full bg-[color-mix(in_srgb,var(--text)_8%,transparent)]">
            <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: "20%" }} aria-hidden />
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--white)]"
            onClick={() => trackEvent("plan_upgrade", { source: "dashboard_widget" })}
          >
            Продлить
          </button>
        </Card>

        <Card className="flex flex-col gap-3" size="md">
          <div>
            <h3 className="text-[18px] font-semibold leading-6 text-[var(--text)]">Подсказки к запросам</h3>
            <p className="text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
              Кликните, чтобы вставить текст в поиск.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {visibleHints.map((hint) => (
              <button
                key={hint}
                type="button"
                onClick={() => handleHintClick(hint)}
                className="inline-flex h-9 items-center rounded-full border border-[var(--muted-border)] px-4 text-sm font-medium text-[color-mix(in_srgb,var(--text)_70%,transparent)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                {hint}
              </button>
            ))}
          </div>
        </Card>
      </aside>
    </>
  );
}
