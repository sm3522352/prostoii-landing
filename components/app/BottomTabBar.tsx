"use client";

import Link from "next/link";
import clsx from "clsx";
import { bottomNavigationItems } from "./navigation";

type BottomTabBarProps = {
  activeRoute: string;
  isMiniApp?: boolean;
};

export default function BottomTabBar({ activeRoute, isMiniApp = false }: BottomTabBarProps) {
  const items = bottomNavigationItems;

  return (
    <nav
      aria-label="Нижняя навигация"
      className={clsx(

        "fixed inset-x-0 bottom-0 z-30 border-t border-[color-mix(in_srgb,var(--text)_7%,transparent)] bg-[color-mix(in_srgb,var(--white)_60%,transparent)] backdrop-blur-[4px] motion-reduce:backdrop-blur-none lg:hidden",
        isMiniApp ? "py-2" : "py-3"
      )}
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-between px-4">
        {items.map((item) => {
          const isActive = activeRoute.startsWith(item.href);
          const ItemIcon = item.icon;
          return (
            <li key={item.href} className="flex flex-1 justify-center">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "flex w-full flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[13px] font-medium transition",
                  isActive
                    ? "text-[var(--primary)]"
                    : "text-[color-mix(in_srgb,var(--text)_65%,transparent)] hover:text-[var(--text)]"
                )}
              >
                <ItemIcon
                  className={clsx(
                    "h-5 w-5",
                    isActive
                      ? "text-[var(--primary)]"
                      : "text-[color-mix(in_srgb,var(--text)_55%,transparent)]"
                  )}
                  focusable="false"
                />
                <span>{item.bottomLabel ?? item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
