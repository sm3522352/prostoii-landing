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
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[color-mix(in_srgb,var(--text)_7%,transparent)] bg-[rgba(255,255,255,0.6)] px-4 py-3 text-sm font-semibold text-[var(--text)] backdrop-blur-[4px]">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]">
            {user?.name?.charAt(0).toUpperCase() ?? "П"}
          </div>
          <span className="truncate">{user?.name ?? "ПростоИИ"}</span>
        </div>
        <button
          type="button"
          className="ml-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_70%,transparent)]"
          aria-label="Поиск"
        >
          🔍
        </button>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex w-full flex-wrap items-center gap-3 border-b border-[color-mix(in_srgb,var(--text)_7%,transparent)] bg-[rgba(255,255,255,0.6)] px-4 py-4 backdrop-blur-[4px] sm:px-6 lg:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_70%,transparent)] lg:hidden"
          aria-label="Открыть меню"
        >
          <span aria-hidden className="text-base">☰</span>
        </button>
        <div className="min-w-0 flex-1">
          <label className="relative flex items-center">
            <span aria-hidden className="pointer-events-none absolute left-4 text-[color-mix(in_srgb,var(--text)_50%,transparent)]">
              🔍
            </span>
            <input
              value={query}
              onChange={handleChange}
              type="search"
              placeholder="Спросите или найдите"
              aria-label="Спросите, что нужно сделать"
              className="w-full rounded-2xl border border-[var(--muted-border)] bg-[var(--surface)] py-3 pl-11 pr-4 text-sm text-[var(--text)] placeholder:text-[color-mix(in_srgb,var(--text)_55%,transparent)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_45%,transparent)]"
            />
          </label>
          <p className="mt-1 hidden text-xs text-[color-mix(in_srgb,var(--text)_60%,transparent)] sm:block">{greeting}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => handleQuickAction(action)}
            className="inline-flex h-10 items-center rounded-full border border-[var(--muted-border)] bg-[var(--surface)] px-4 text-sm font-semibold text-[color-mix(in_srgb,var(--text)_70%,transparent)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            {action}
          </button>
        ))}
      </div>
    </header>
  );
}
