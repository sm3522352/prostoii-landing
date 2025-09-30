export type TelegramThemeParams = {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
};

type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

type TelegramEvent = "themeChanged" | "viewportChanged" | "mainButtonClicked" | "backButtonClicked";

type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  colorScheme: "light" | "dark";
  themeParams: TelegramThemeParams;
  initDataUnsafe?: { user?: TelegramUser };
  onEvent: (event: TelegramEvent, handler: () => void) => void;
  offEvent: (event: TelegramEvent, handler: () => void) => void;
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

export function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
}

export function isTelegramAvailable() {
  return Boolean(getTelegramWebApp());
}

export function initTelegram(onReady?: (webApp: TelegramWebApp) => void) {
  const webApp = getTelegramWebApp();
  if (!webApp) return null;
  webApp.ready();
  try {
    webApp.expand();
  } catch (error) {
    console.warn("[telegram] expand failed", error);
  }
  onReady?.(webApp);
  return webApp;
}

export function applyTelegramTheme(theme?: TelegramThemeParams) {
  if (typeof document === "undefined") return;
  const webApp = getTelegramWebApp();
  const params = theme ?? webApp?.themeParams;
  if (!params) return;
  const root = document.documentElement;

  const mappings: Record<string, string | undefined> = {
    "--surface": params.bg_color,
    "--text": params.text_color,
    "--muted": params.secondary_bg_color,
    "--muted-text": params.hint_color,
    "--primary": params.button_color,
  };

  Object.entries(mappings).forEach(([name, value]) => {
    if (!value) return;
    root.style.setProperty(name, value);
  });
}

export function onTelegramEvent(event: TelegramEvent, handler: () => void) {
  const webApp = getTelegramWebApp();
  if (!webApp) return () => {};
  webApp.onEvent(event, handler);
  return () => webApp.offEvent(event, handler);
}

export function getTelegramUser(): TelegramUser | null {
  const webApp = getTelegramWebApp();
  return webApp?.initDataUnsafe?.user ?? null;
}
