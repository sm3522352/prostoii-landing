"use client";

import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

export type AppUser = {
  id: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  role?: string;
};

type AppStore = {
  auth: {
    user: AppUser | null;
    onboardingDone: boolean;
    isMiniApp: boolean;
  };
  ui: {
    sidebarOpen: boolean;
  };
  preferences: {
    autoModel: boolean;
  };
  setUser: (user: AppUser | null) => void;
  logout: () => void;
  setOnboardingDone: (value: boolean) => void;
  completeOnboarding: () => void;
  setIsMiniApp: (value: boolean) => void;
  setSidebarOpen: (value: boolean) => void;
  toggleSidebar: () => void;
  setAutoModel: (value: boolean) => void;
};

const AppStoreContext = createContext<AppStore | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [onboardingDone, setOnboardingDoneState] = useState(false);
  const [isMiniApp, setIsMiniAppState] = useState(false);
  const [sidebarOpen, setSidebarOpenState] = useState(false);
  const [autoModel, setAutoModelState] = useState(true);

  const handleSetUser = useCallback((nextUser: AppUser | null) => {
    setUser(nextUser);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  const handleSetOnboardingDone = useCallback((value: boolean) => {
    setOnboardingDoneState(value);
  }, []);

  const handleCompleteOnboarding = useCallback(() => {
    setOnboardingDoneState(true);
  }, []);

  const handleSetIsMiniApp = useCallback((value: boolean) => {
    setIsMiniAppState(value);
  }, []);

  const handleSetSidebarOpen = useCallback((value: boolean) => {
    setSidebarOpenState(value);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpenState((prev) => !prev);
  }, []);

  const handleSetAutoModel = useCallback((value: boolean) => {
    setAutoModelState(value);
  }, []);

  const value = useMemo(
    () => ({
      auth: {
        user,
        onboardingDone,
        isMiniApp,
      },
      ui: {
        sidebarOpen,
      },
      preferences: {
        autoModel,
      },
      setUser: handleSetUser,
      logout: handleLogout,
      setOnboardingDone: handleSetOnboardingDone,
      completeOnboarding: handleCompleteOnboarding,
      setIsMiniApp: handleSetIsMiniApp,
      setSidebarOpen: handleSetSidebarOpen,
      toggleSidebar: handleToggleSidebar,
      setAutoModel: handleSetAutoModel,
    }),
    [
      autoModel,
      handleCompleteOnboarding,
      handleLogout,
      handleSetAutoModel,
      handleSetIsMiniApp,
      handleSetOnboardingDone,
      handleSetSidebarOpen,
      handleSetUser,
      handleToggleSidebar,
      isMiniApp,
      onboardingDone,
      sidebarOpen,
      user,
    ]
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within AppStateProvider");
  }
  return context;
}
