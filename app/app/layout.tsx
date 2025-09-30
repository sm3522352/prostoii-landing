"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppShell from "@/components/app/AppShell";
import { useAppStore } from "@/lib/store";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/app";
  const router = useRouter();
  const { auth, hydrated } = useAppStore();

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

  return <AppShell activeRoute={pathname}>{children}</AppShell>;
}
