"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppShell from "@/components/app/AppShell";
import { applyTelegramTheme, initTelegram, onTelegramEvent } from "@/lib/telegram";
import { useAppStore } from "@/lib/store";

export default function MiniAppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/mini/app";
  const activeRoute = pathname.replace(/^\/mini/, "") || "/app";
  const router = useRouter();
  const { auth, hydrated } = useAppStore();

  useEffect(() => {
    const webApp = initTelegram(() => applyTelegramTheme());
    if (!webApp) return;
    const unsubscribe = onTelegramEvent("themeChanged", () => applyTelegramTheme());
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (!auth.user) {
      router.replace("/login");
    }
  }, [auth.user, hydrated, router]);

  if (!hydrated || !auth.user) {
    return null;
  }

  return (
    <AppShell activeRoute={activeRoute.startsWith("/app") ? activeRoute : `/app${activeRoute}`} isMiniApp>
      {children}
    </AppShell>
  );
}
