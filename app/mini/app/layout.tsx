"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import AppShell from "@/components/app/AppShell";
import { applyTelegramTheme, initTelegram, onTelegramEvent } from "@/lib/telegram";

export default function MiniAppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/mini/app";
  const activeRoute = pathname.replace(/^\/mini/, "") || "/app";

  useEffect(() => {
    const webApp = initTelegram(() => applyTelegramTheme());
    if (!webApp) return;
    const unsubscribe = onTelegramEvent("themeChanged", () => applyTelegramTheme());
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppShell activeRoute={activeRoute.startsWith("/app") ? activeRoute : `/app${activeRoute}`} isMiniApp>
      {children}
    </AppShell>
  );
}
