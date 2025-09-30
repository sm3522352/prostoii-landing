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
    <div className="min-h-screen">
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
                ? "px-3 pb-20 pt-3"
                : "px-4 pb-24 pt-5 sm:px-8 lg:px-12 lg:pb-14 lg:pt-6"
            )}
          >
            <div
              className={clsx(
                "mx-auto w-full",
                isMiniApp ? "max-w-3xl space-y-4" : "max-w-6xl space-y-6 lg:space-y-8"
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
