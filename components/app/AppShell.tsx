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
    <div className="relative min-h-screen bg-transparent">
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
              "relative flex-1",
              isMiniApp
                ? "px-4 pb-24 pt-4 sm:px-5"

                : "px-4 pb-24 pt-6 sm:px-6 lg:px-6"
            )}
          >
            <div
              className={clsx(
                "mx-auto flex w-full flex-col gap-6 xl:gap-8",
                isMiniApp
                  ? "max-w-3xl gap-5"
                  : "max-w-[1280px] xl:grid xl:grid-cols-12 xl:gap-8"
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
