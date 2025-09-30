"use client";

import { ReactNode, useEffect } from "react";
import clsx from "clsx";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BottomTabBar from "./BottomTabBar";
import { useAppStore } from "@/lib/store";

type AppShellProps = {
  children: ReactNode;
  activeRoute: string;
  isMiniApp?: boolean;
};

export default function AppShell({ children, activeRoute, isMiniApp = false }: AppShellProps) {
  const { ui, setIsMiniApp, setSidebarOpen, toggleSidebar } = useAppStore();
  const { sidebarOpen } = ui;

  useEffect(() => {
    setIsMiniApp(isMiniApp);
    if (isMiniApp) {
      setSidebarOpen(false);
    }
  }, [isMiniApp, setIsMiniApp, setSidebarOpen]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [activeRoute, setSidebarOpen]);

  return (
    <div className={clsx("min-h-screen", isMiniApp ? "bg-surface" : "bg-muted")}>
      {!isMiniApp && (
        <Sidebar
          activeRoute={activeRoute}
          variant="overlay"
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex min-h-screen">
        {!isMiniApp && <Sidebar activeRoute={activeRoute} variant="desktop" />}
        <div className="flex min-h-screen flex-1 flex-col">
          <TopBar onMenuToggle={toggleSidebar} isMiniApp={isMiniApp} />
          <main
            className={clsx(
              "flex-1",
              isMiniApp
                ? "px-3 pb-6 pt-4"
                : "px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-8"
            )}
          >
            <div
              className={clsx(
                "mx-auto w-full",
                isMiniApp ? "max-w-3xl space-y-5" : "max-w-6xl space-y-8 lg:space-y-10"
              )}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
      <BottomTabBar activeRoute={activeRoute} isMiniApp={isMiniApp} />
    </div>
  );
}
