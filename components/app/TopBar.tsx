"use client";

import { ChangeEvent, useState } from "react";
import clsx from "clsx";
import { useAppStore } from "@/lib/store";

type TopBarProps = {
  onMenuToggle?: () => void;
  isMiniApp?: boolean;
};

export default function TopBar({ onMenuToggle, isMiniApp = false }: TopBarProps) {
  const {
    auth: { user },
  } = useAppStore();
  const [query, setQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-30 flex w-full items-center gap-3 border-b border-neutral-200/60 bg-white/95 backdrop-blur",
        isMiniApp ? "px-3 py-2.5" : "px-4 py-3 sm:px-6 lg:px-8"
      )}
    >
      <div className="flex flex-1 items-center gap-3">
        {!isMiniApp && (
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/70 bg-white text-text transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
            aria-label="Открыть меню"
          >
            <span aria-hidden className="text-lg">☰</span>
          </button>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text">
            {user ? `Здравствуйте, ${user.name.split(" ")[0]}!` : "ПростоИИ"}
          </p>
          <p className="hidden text-xs text-muted sm:block">Быстрые ответы и файлы — всегда под рукой.</p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
        <label className={clsx("relative flex-1 max-w-sm items-center", isMiniApp ? "hidden sm:flex" : "hidden md:flex")}>
          <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
              <circle cx={11} cy={11} r={6} />
              <path d="m20 20-3.6-3.6" />
            </svg>
          </span>
          <input
            value={query}
            onChange={handleChange}
            type="search"
            placeholder="Искать по заметкам"
            aria-label="Поиск по истории"
            className="w-full rounded-xl border border-neutral-200/70 bg-neutral-50/60 py-2 pl-10 pr-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-neutral-200/70 bg-neutral-50/70 px-3 py-2 text-xs font-semibold text-muted">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-success" aria-hidden />
          <span className="text-muted">Лимиты: 24 / 50</span>
        </div>
      </div>
    </header>
  );
}
