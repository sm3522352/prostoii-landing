"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AppShell from "@/components/app/AppShell";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/app";
  return <AppShell activeRoute={pathname}>{children}</AppShell>;
}
