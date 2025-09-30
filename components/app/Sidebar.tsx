"use client";

import Link from "next/link";
import clsx from "clsx";
import { navigationItems } from "./navigation";
import { useAppStore } from "@/lib/store";
import { useMemo } from "react";

type SidebarProps = {
  activeRoute: string;
  variant: "desktop" | "overlay";
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ activeRoute, variant, isOpen = false, onClose }: SidebarProps) {
  const { auth, logout } = useAppStore();
  const { user } = auth;

  const navItems = useMemo(() => navigationItems, []);

  const content = (
    <div className="flex h-full flex-col gap-6">
      <div className="pt-4">
        <Link href="/app" className="flex items-center gap-2 px-4 text-lg font-semibold text-text">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 font-heading text-primary">П</span>
          ПростоИИ
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto" aria-label="Основная навигация">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = activeRoute.startsWith(item.href);
            const ItemIcon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    isActive
                      ? "bg-primary/10 text-primary shadow-soft"
                      : "text-muted hover:bg-neutral-100/80 hover:text-text"
                  )}
                  onClick={variant === "overlay" ? onClose : undefined}
                >
                  <ItemIcon className={clsx("h-5 w-5", isActive ? "text-primary" : "text-muted")}
                    focusable="false"
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="space-y-3 px-4 pb-6">
        <div className="rounded-2xl border border-neutral-200/70 bg-neutral-50/70 p-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {user.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text">{user.name}</p>
                <p className="text-xs text-muted">{user.role ?? "Личный аккаунт"}</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold text-text">Гость</p>
              <p className="mt-1 text-xs text-muted">Войдите, чтобы синхронизировать результаты и команды.</p>
              <Link
                href="/login"
                className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                onClick={variant === "overlay" ? onClose : undefined}
              >
                Войти через Telegram
              </Link>
            </div>
          )}
        </div>
        {user && (
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-xl border border-neutral-200/70 bg-white px-4 py-2.5 text-sm font-semibold text-muted transition hover:text-text"
          >
            Выйти
          </button>
        )}
      </div>
    </div>
  );

  if (variant === "overlay") {
    return (
      <>
        <div
          role="presentation"
          onClick={onClose}
          className={clsx(
            "fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        />
        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-50 w-72 bg-white px-3 pb-6 pt-3 shadow-xl transition-transform duration-200 lg:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
          aria-label="Меню приложения"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/70 text-muted transition hover:text-text"
              aria-label="Закрыть меню"
            >
              ×
            </button>
          </div>
          {content}
        </aside>
      </>
    );
  }

  return (
    <aside className="hidden w-72 shrink-0 border-r border-neutral-200/60 bg-white px-3 pb-8 pt-6 lg:flex" aria-label="Меню приложения">
      {content}
    </aside>
  );
}
