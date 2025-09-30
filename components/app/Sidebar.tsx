"use client";

import Link from "next/link";
import clsx from "clsx";
import { useMemo } from "react";
import { navigationItems } from "./navigation";
import { useAppStore } from "@/lib/store";

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

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "П";
  const planLabel = user?.role ?? "Бесплатный план";

  const content = (
    <div className="flex h-full flex-col">
      <div className="rounded-3xl border border-neutral-200/60 bg-white/90 px-4 pb-5 pt-6 shadow-[0_22px_48px_-32px_rgba(15,18,34,0.22)]">
        <Link href="/app" className="flex items-center gap-3 text-sm font-semibold text-text">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 font-heading text-base text-primary">
            П
          </span>
          ПростоИИ
        </Link>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-neutral-50/90 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text">{user?.name ?? "Гость"}</p>
            <p className="truncate text-xs text-muted">{planLabel}</p>
          </div>
          <Link
            href="/app/settings"
            className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white transition hover:shadow-soft"
            onClick={variant === "overlay" ? onClose : undefined}
          >
            Продлить
          </Link>
        </div>
      </div>
      <nav className="mt-6 flex-1 overflow-y-auto" aria-label="Основная навигация">
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeRoute.startsWith(item.href);
            const ItemIcon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    isActive ? "bg-primary/12 text-primary" : "text-muted hover:bg-white/80 hover:text-text"
                  )}
                  onClick={variant === "overlay" ? onClose : undefined}
                >
                  <span
                    className={clsx(
                      "inline-flex h-9 w-9 items-center justify-center rounded-2xl border transition",
                      isActive ? "border-primary/40 bg-primary/10 text-primary" : "border-neutral-200/70 bg-white text-muted group-hover:border-neutral-200"
                    )}
                    aria-hidden
                  >
                    <ItemIcon className="h-4 w-4" focusable="false" />
                  </span>
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-6 rounded-3xl border border-neutral-200/60 bg-white/90 px-4 py-5 text-sm text-muted">
        <div className="flex items-center justify-between font-semibold text-text">
          <span>Запросы</span>
          <span>20 / 100</span>
        </div>
        <p className="mt-1 text-xs">Сегодня</p>
        <div className="mt-3 h-2 rounded-full bg-neutral-100">
          <div className="h-full w-1/5 rounded-full bg-primary" aria-hidden />
        </div>
      </div>
      {user && (
        <button
          type="button"
          onClick={() => {
            logout();
            if (variant === "overlay") {
              onClose?.();
            }
          }}
          className="mt-4 inline-flex items-center justify-center rounded-2xl border border-neutral-200/70 bg-white px-4 py-2 text-sm font-semibold text-muted transition hover:text-text"
        >
          Выйти
        </button>
      )}
    </div>
  );

  if (variant === "overlay") {
    return (
      <>
        <div
          role="presentation"
          onClick={onClose}
          className={clsx(
            "fixed inset-0 z-40 bg-neutral-900/45 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        />
        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-50 w-72 bg-white/95 px-3 pb-6 pt-3 shadow-xl transition-transform duration-200 lg:hidden",
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
    <aside className="hidden w-72 shrink-0 border-r border-neutral-200/60 bg-white/90 px-4 pb-8 pt-6 lg:flex" aria-label="Меню приложения">
      {content}
    </aside>
  );
}
