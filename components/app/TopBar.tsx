"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";

type TopBarProps = {
  onMenuToggle?: () => void;
  isMiniApp?: boolean;
};

const QUICK_ACTIONS = ["Сделай проще", "Объясни как ребёнку", "Списком"];

export default function TopBar({ onMenuToggle, isMiniApp = false }: TopBarProps) {
  const {
    auth: { user },
  } = useAppStore();
  const [query, setQuery] = useState("");

  const greeting = useMemo(() => {
    if (!user) return "ПростоИИ";
    const firstName = user.name.split(" ")[0];
    return `Здравствуйте, ${firstName}!`;
  }, [user]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQuickAction = (action: string) => {
    setQuery(action);
  };

  if (isMiniApp) {
    return (
      <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-neutral-200/60 bg-white/95 px-3 py-2 text-sm font-semibold text-text">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            {user?.name?.charAt(0).toUpperCase() ?? "П"}
          </div>
          <span className="truncate">{user?.name ?? "ПростоИИ"}</span>
        </div>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/70 text-muted transition hover:text-text"
          aria-label="Поиск"
        >
          🔍
        </button>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex w-full flex-wrap items-center gap-3 border-b border-neutral-200/60 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuToggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/70 bg-white text-text shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          aria-label="Открыть меню"
        >
          <span aria-hidden className="text-lg">☰</span>
        </button>
        <div className="min-w-0 flex-1">
          <label className="relative flex items-center">
            <span aria-hidden className="pointer-events-none absolute left-4 text-muted">
              🔍
            </span>
            <input
              value={query}
              onChange={handleChange}
              type="search"
              placeholder="Спросите…"
              aria-label="Спросите, что нужно сделать"
              className="w-full rounded-2xl border border-neutral-200/70 bg-neutral-50/80 py-3 pl-10 pr-4 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <p className="mt-1 hidden text-xs text-muted sm:block">{greeting}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => handleQuickAction(action)}
            className="inline-flex items-center rounded-full border border-neutral-200/70 bg-white/90 px-4 py-2 text-sm font-semibold text-muted transition hover:border-primary hover:text-primary"
          >
            {action}
          </button>
        ))}
      </div>
    </header>
  );
}
