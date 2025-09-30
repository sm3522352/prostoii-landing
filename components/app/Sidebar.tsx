"use client";

import { useMemo } from "react";
import Link from "next/link";
import clsx from "clsx";
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

  const list = (
    <nav className="mt-6 flex-1 overflow-y-auto" aria-label="Основная навигация">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = activeRoute.startsWith(item.href);
          const ItemIcon = item.icon;
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={variant === "overlay" ? onClose : undefined}
                className={clsx(
                  "group/nav flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium text-[color-mix(in_srgb,var(--text)_72%,transparent)] transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--primary)_45%,transparent)]",
                  isActive ? "text-[var(--text)]" : "hover:text-[var(--text)]"
                )}
              >
                <span
                  className={clsx(
                    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-base transition",
                    isActive
                      ? "border-[color-mix(in_srgb,var(--primary)_48%,transparent)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]"
                      : "border-[var(--muted-border)] bg-[var(--surface)] text-[color-mix(in_srgb,var(--text)_60%,transparent)]"
                  )}
                  aria-hidden
                >
                  <ItemIcon className="h-5 w-5" focusable="false" />
                </span>
                <span
                  className={clsx(
                    "truncate text-[15px] leading-5 text-[var(--text)]",
                    "lg:max-w-0 lg:opacity-0 lg:transition-all lg:duration-200 lg:ease-out",
                    "lg:group-hover/sidebar:max-w-[160px] lg:group-hover/sidebar:opacity-100 lg:group-focus-within/sidebar:max-w-[160px] lg:group-focus-within/sidebar:opacity-100"
                  )}
                >
                  {item.label}
                </span>
              </Link>
              {isActive && (
                <span
                  className="absolute inset-y-[6px] left-[-6px] hidden w-[3px] rounded-full bg-[color-mix(in_srgb,var(--primary)_75%,transparent)] lg:block"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const limits = (
    <div className="mt-6 rounded-2xl border border-[var(--muted-border)] bg-[var(--surface)] px-3 py-3 text-sm text-[color-mix(in_srgb,var(--text)_70%,transparent)]">
      <div className="flex items-center justify-between text-[13px] font-semibold text-[var(--text)]">
        <span>Сегодня</span>
        <span>20 / 100</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-[var(--neutral-100)]">
        <div
          className="h-full rounded-full bg-[var(--primary)]"
          style={{ width: "20%" }}
          aria-hidden
        />
      </div>
      <button
        type="button"
        className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full border border-[var(--muted-border)] text-[13px] font-semibold text-[var(--text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        Продлить
      </button>
    </div>
  );

  const profile = (
    <div className="rounded-2xl border border-[var(--muted-border)] bg-[var(--surface)] px-3 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-base font-semibold text-[var(--primary)]">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--text)]">{user?.name ?? "Гость"}</p>
          <p className="truncate text-xs text-[color-mix(in_srgb,var(--text)_55%,transparent)]">{planLabel}</p>
        </div>
      </div>
      <button
        type="button"
        className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full bg-[var(--primary)] text-xs font-semibold text-[var(--white)] transition hover:brightness-95"
      >
        Продлить
      </button>
    </div>
  );

  const handleLogout = () => {
    logout();
    if (variant === "overlay") {
      onClose?.();
    }
  };

  if (variant === "overlay") {
    return (
      <>
        <div
          role="presentation"
          onClick={onClose}
          className={clsx(
            "fixed inset-0 z-40 bg-[color-mix(in_srgb,var(--text)_55%,transparent)] backdrop-blur-sm transition-opacity duration-200 lg:hidden",
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        />
        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-50 w-[240px] overflow-hidden bg-[rgba(255,255,255,0.6)] px-4 pb-6 pt-6 shadow-[0_24px_56px_rgba(15,18,34,0.18)] backdrop-blur-[4px] transition-transform duration-200 lg:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
          aria-label="Меню приложения"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_70%,transparent)]"
              aria-label="Закрыть меню"
            >
              ×
            </button>
          </div>
          <div className="mt-4 flex h-full flex-col">
            {profile}
            {list}
            {limits}
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-[var(--muted-border)] text-sm font-semibold text-[color-mix(in_srgb,var(--text)_68%,transparent)] transition hover:text-[var(--text)]"
              >
                Выйти
              </button>
            )}
          </div>
        </aside>
      </>
    );
  }

  return (
    <aside
      className="group/sidebar relative hidden h-screen w-20 shrink-0 overflow-hidden border-r border-[color-mix(in_srgb,var(--text)_6%,transparent)] bg-[rgba(255,255,255,0.6)] px-2 pb-8 pt-6 text-[color-mix(in_srgb,var(--text)_68%,transparent)] transition-[width] duration-200 ease-out backdrop-blur-[4px] lg:flex lg:hover:w-[240px] lg:focus-within:w-[240px]"
      aria-label="Меню приложения"
    >
      <div className="flex w-[240px] flex-col">
        {profile}
        {list}
        {limits}
        {user && (
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-[var(--muted-border)] text-sm font-semibold text-[color-mix(in_srgb,var(--text)_68%,transparent)] transition hover:text-[var(--text)]"
          >
            Выйти
          </button>
        )}
      </div>
    </aside>
  );
}
