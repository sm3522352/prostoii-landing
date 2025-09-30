"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type AppUser = {
  id: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  role?: string;
};

type AuthState = {
  user: AppUser | null;
  onboardingDone: boolean;
  isMiniApp: boolean;
};

type PersistedAuthState = Pick<AuthState, "user" | "onboardingDone">;

const AUTH_KEY = "prostoii_auth_v1";

const defaultPersistedAuth: PersistedAuthState = {
  user: null,
  onboardingDone: false,
};

const defaultAuthState: AuthState = {
  ...defaultPersistedAuth,
  isMiniApp: false,
};

function getWindow() {
  return typeof window === "undefined" ? null : window;
}

export function loadAuth(): PersistedAuthState {
  const w = getWindow();
  if (!w) {
    return defaultPersistedAuth;
  }

  try {
    const raw = w.localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as PersistedAuthState) : defaultPersistedAuth;
  } catch {
    return defaultPersistedAuth;
  }
}

export function saveAuth(state: PersistedAuthState) {
  const w = getWindow();
  if (!w) {
    return;
  }

  try {
    w.localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  } catch {
    // ignore write errors (private mode, etc.)
  }
}

export function loginMock(name?: string) {
  const base = loadAuth();
  const user: AppUser = {
    id: `mock-${Date.now()}`,
    name: name ?? "Demo User",
  };
  const next: PersistedAuthState = {
    user,
    onboardingDone: base.onboardingDone,
  };
  saveAuth(next);
  return next;
}

export function logout() {
  saveAuth({ user: null, onboardingDone: false });
}

type AppStore = {
  auth: AuthState;
  ui: {
    sidebarOpen: boolean;
    promptDraft: string;
  };
  preferences: {
    autoModel: boolean;
  };
  hydrated: boolean;
  setAuth: (value: Partial<AuthState> | ((prev: AuthState) => Partial<AuthState>)) => void;
  setUser: (user: AppUser | null) => void;
  setOnboardingDone: (value: boolean) => void;
  completeOnboarding: () => void;
  setIsMiniApp: (value: boolean) => void;
  setSidebarOpen: (value: boolean) => void;
  toggleSidebar: () => void;
  setPromptDraft: (value: string | ((prev: string) => string)) => void;
  setAutoModel: (value: boolean) => void;
  loginMock: (name?: string) => void;
  logout: () => void;
};

const AppStoreContext = createContext<AppStore | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>(() => ({
    ...defaultAuthState,
    ...loadAuth(),
  }));
  const [sidebarOpen, setSidebarOpenState] = useState(false);
  const [promptDraft, setPromptDraftState] = useState("");
  const [autoModel, setAutoModelState] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persisted = loadAuth();
    setAuthState((prev) => ({ ...prev, ...persisted }));
    setHydrated(true);
  }, []);

  useEffect(() => {
    saveAuth({ user: auth.user, onboardingDone: auth.onboardingDone });
  }, [auth.user, auth.onboardingDone]);

  const handleSetAuth = useCallback(
    (next: Partial<AuthState> | ((prev: AuthState) => Partial<AuthState>)) => {
      setAuthState((prev) => {
        const patch = typeof next === "function" ? next(prev) : next;
        return { ...prev, ...patch };
      });
    },
    []
  );

  const handleSetUser = useCallback((nextUser: AppUser | null) => {
    handleSetAuth({ user: nextUser });
  }, [handleSetAuth]);

  const handleLogout = useCallback(() => {
    logout();
    setAuthState({ ...defaultAuthState });
  }, []);

  const handleSetOnboardingDone = useCallback((value: boolean) => {
    handleSetAuth({ onboardingDone: value });
  }, [handleSetAuth]);

  const handleCompleteOnboarding = useCallback(() => {
    handleSetAuth({ onboardingDone: true });
  }, [handleSetAuth]);

  const handleSetIsMiniApp = useCallback((value: boolean) => {
    handleSetAuth({ isMiniApp: value });
  }, [handleSetAuth]);

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
      auth,
      ui: {
        sidebarOpen,
        promptDraft,
      },
      preferences: {
        autoModel,
      },
      hydrated,
      setAuth: handleSetAuth,
      setUser: handleSetUser,
      setOnboardingDone: handleSetOnboardingDone,
      completeOnboarding: handleCompleteOnboarding,
      setIsMiniApp: handleSetIsMiniApp,
      setSidebarOpen: handleSetSidebarOpen,
      toggleSidebar: handleToggleSidebar,
      setPromptDraft: setPromptDraftState,
      setAutoModel: handleSetAutoModel,
      loginMock: (name?: string) => {
        const next = loginMock(name);
        handleSetAuth({ user: next.user, onboardingDone: next.onboardingDone });
      },
      logout: handleLogout,
    }),
    [
      autoModel,
      auth,
      handleCompleteOnboarding,
      handleLogout,
      handleSetAuth,
      handleSetAutoModel,
      handleSetIsMiniApp,
      handleSetOnboardingDone,
      handleSetSidebarOpen,
      handleSetUser,
      handleToggleSidebar,
      sidebarOpen,
      hydrated,
      promptDraft,
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
