"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";

type DashboardResult = {
  id: string;
  title: string;
  snippet: string;
  updatedAt: string;
  pinned: boolean;
  type: "recipe" | "chat" | "file";
};

const quickActions = [
  {
    id: "recipe",
    title: "Новый рецепт",
    description: "Подберите готовую инструкцию под задачу",
    hint: "2 мин",
    href: "/app/recipes",
  },
  {
    id: "chat",
    title: "Открыть чат",
    description: "Спросите своими словами — ответим просто",
    hint: "Через 5 сек",
    href: "/app/chat",
  },
  {
    id: "file",
    title: "Загрузить файл",
    description: "Документы, таблицы и презентации",
    hint: "До 20 МБ",
    href: "/app/files",
  },
];

const initialResults: DashboardResult[] = [
  {
    id: "1",
    title: "План урока: энергия и заряд",
    snippet: "Вступление, объяснение через аналогии и задания на закрепление...",
    updatedAt: "5 минут назад",
    pinned: true,
    type: "recipe",
  },
  {
    id: "2",
    title: "Письмо клиенту: перенос встреч",
    snippet: "Добрый день! Понимаем, что сроки сдвинулись. Предлагаю два окна...",
    updatedAt: "18 минут назад",
    pinned: false,
    type: "chat",
  },
  {
    id: "3",
    title: "Резюме разговора с командой",
    snippet: "Собрали задачи, уточнили сроки и добавили follow-up на понедельник...",
    updatedAt: "Вчера",
    pinned: true,
    type: "chat",
  },
  {
    id: "4",
    title: "Разбор договора поставки",
    snippet: "Основные риски: пункт 4.2, уточнить ответственность за доставку...",
    updatedAt: "2 дня назад",
    pinned: false,
    type: "file",
  },
];

const typeLabels: Record<DashboardResult["type"], string> = {
  recipe: "Рецепт",
  chat: "Чат",
  file: "Файл",
};

const navigationTiles = [
  {
    id: "recipes",
    title: "Рецепты",
    description: "Подбор готовых сценариев и инструкций",
    href: "/app/recipes",
  },
  {
    id: "chat",
    title: "Чат",
    description: "Диалог с ИИ простыми словами",
    href: "/app/chat",
  },
  {
    id: "files",
    title: "Файлы",
    description: "Загрузки, разборы и конспекты",
    href: "/app/files",
  },
  {
    id: "team",
    title: "Команда",
    description: "Совместная работа и роли",
    href: "/app/team",
  },
  {
    id: "settings",
    title: "Настройки",
    description: "Профиль, тариф и интеграции",
    href: "/app/settings",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [results, setResults] = useState(initialResults);

  const pinnedResults = useMemo(() => results.filter((result) => result.pinned), [results]);
  const recentResults = useMemo(() => results.filter((result) => !result.pinned), [results]);

  const handleQuickAction = (href: string) => {
    if (href.includes("/recipes")) {
      trackEvent("recipe_launch", { source: "dashboard" });
    } else if (href.includes("/chat")) {
      trackEvent("chat_send", { source: "dashboard" });
    } else if (href.includes("/files")) {
      trackEvent("file_upload", { source: "dashboard" });
    }
    router.push(href);
  };

  const handleTogglePin = (id: string) => {
    setResults((items) =>
      items.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item))
    );
    showToast("Обновили закрепление");
  };

  const handleDelete = (id: string) => {
    setResults((items) => items.filter((item) => item.id !== id));
    showToast("Удалено");
  };

  const handleCopy = (id: string) => {
    const item = results.find((result) => result.id === id);
    if (!item) return;
    showToast("Скопировали в буфер обмена");
  };

  const handleShare = () => {
    showToast("Ссылка скопирована");
  };

  return (
    <div className="space-y-10 lg:space-y-12">
      <section className="scroll-reveal">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Навигация</p>
          <h2 className="text-xl font-semibold text-text">Быстрый переход по разделам</h2>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {navigationTiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => router.push(tile.href)}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-neutral-200/70 bg-white/95 px-5 py-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-soft-lg"
            >
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-muted">
                Раздел
              </span>
              <span className="text-lg font-semibold text-text">{tile.title}</span>
              <span className="text-sm text-muted">{tile.description}</span>
              <span className="inline-flex items-center text-sm font-semibold text-primary">
                Перейти
                <span aria-hidden className="ml-1 transition group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="scroll-reveal">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-text">Домашняя</h1>
          <p className="text-sm text-muted">
            Начните с быстрого действия, посмотрите последние ответы или обновите тариф.
          </p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => handleQuickAction(action.href)}
              className="group rounded-2xl border border-neutral-200/70 bg-white/95 px-5 py-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-soft-lg"
            >
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {action.hint}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-text">{action.title}</h2>
              <p className="mt-2 text-sm text-muted">{action.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                Перейти
                <span aria-hidden className="ml-1 transition group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="scroll-reveal space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">Последние результаты</h2>
            <p className="text-sm text-muted">Всё, что генерировали недавно — чаты, рецепты и файлы.</p>
          </div>
          <button
            type="button"
            onClick={() => showToast("Обновили ленту")}
            className="hidden rounded-xl border border-neutral-200/70 px-4 py-2 text-sm font-semibold text-muted transition hover:text-text sm:inline-flex"
          >
            Обновить
          </button>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {recentResults.length === 0 && (
            <Card className="col-span-full flex flex-col items-start gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Пока пусто</span>
              <p className="text-lg font-semibold text-text">Здесь появятся свежие ответы</p>
              <p className="text-sm text-muted">
                Создайте рецепт, начните чат или загрузите файл, чтобы увидеть историю здесь.
              </p>
              <button
                type="button"
                onClick={() => handleQuickAction("/app/recipes")}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Создать первый рецепт
              </button>
            </Card>
          )}
          {recentResults.map((result) => (
            <Card key={result.id} className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-muted">
                    {typeLabels[result.type]}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-text">{result.title}</h3>
                  <p className="mt-2 text-sm text-muted">{result.snippet}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(result.id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/70 text-muted transition hover:text-text"
                    aria-label="Скопировать"
                  >
                    ⧉
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/70 text-muted transition hover:text-text"
                    aria-label="Поделиться"
                  >
                    ↗
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{result.updatedAt}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleTogglePin(result.id)}
                    className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/70 px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-text"
                  >
                    {result.pinned ? "Открепить" : "Закрепить"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(result.id)}
                    className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/70 px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-error"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="scroll-reveal space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">Закреплённые</h2>
            <p className="text-sm text-muted">То, к чему вы часто возвращаетесь.</p>
          </div>
        </div>
        {pinnedResults.length === 0 ? (
          <Card className="flex flex-col items-start gap-3">
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-muted">Пока пусто</span>
            <p className="text-lg font-semibold text-text">Закрепите важные результаты</p>
            <p className="text-sm text-muted">Нажмите «Закрепить» у результата, чтобы видеть его здесь.</p>
          </Card>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {pinnedResults.map((result) => (
              <Card key={`pinned-${result.id}`} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Закреплено</span>
                  <span className="text-xs text-muted">{result.updatedAt}</span>
                </div>
                <h3 className="text-lg font-semibold text-text">{result.title}</h3>
                <p className="text-sm text-muted">{result.snippet}</p>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickAction(result.type === "chat" ? "/app/chat" : "/app/recipes")}
                    className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/70 px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-text"
                  >
                    Открыть
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTogglePin(result.id)}
                    className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/70 px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-text"
                  >
                    Открепить
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="scroll-reveal">
        <Card className="flex flex-col gap-4 bg-gradient-to-r from-primary/8 via-primary/6 to-primary/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-text">Лимиты и тариф</h2>
              <p className="mt-1 text-sm text-muted">Вы израсходовали 24 из 50 генераций. Продлите доступ, чтобы не останавливаться.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                trackEvent("plan_upgrade", { source: "dashboard_limits" });
                showToast("Переходим к тарифам");
              }}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Обновить
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-muted">
              <span>Использовано</span>
              <span>24 / 50</span>
            </div>
            <div className="h-2 rounded-full bg-white/60">
              <div className="h-full rounded-full bg-primary" style={{ width: "48%" }} />
            </div>
            <p className="text-xs text-muted">
              Бесплатный план. Обновление до «Команды» добавит ещё 200 генераций, общую папку и контроль доступа.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}
