"use client";

import Link from "next/link";
import clsx from "clsx";
import { navigationItems } from "./navigation";

type BottomTabBarProps = {
  activeRoute: string;
  isMiniApp?: boolean;
};

export default function BottomTabBar({ activeRoute, isMiniApp = false }: BottomTabBarProps) {
  if (isMiniApp) return null;

  return (
    <nav
      aria-label="Нижняя навигация"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200/70 bg-white/95 backdrop-blur lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-4 py-2">
        {navigationItems.map((item) => {
          const isActive = activeRoute.startsWith(item.href);
          const ItemIcon = item.icon;
          return (
            <li key={item.href} className="flex flex-1 justify-center">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "flex w-full flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition",
                  isActive ? "text-primary" : "text-muted hover:text-text"
                )}
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
  );
}
