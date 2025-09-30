"use client";

import { ReactNode, createContext, useContext, useMemo, useState } from "react";

type AppStore = {
  autoModel: boolean;
  setAutoModel: (value: boolean) => void;
};

const AppStoreContext = createContext<AppStore | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [autoModel, setAutoModel] = useState(true);
  const value = useMemo(() => ({ autoModel, setAutoModel }), [autoModel]);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within AppStateProvider");
  }
  return context;
}
