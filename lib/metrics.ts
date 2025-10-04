/**
 * A thin wrapper around Yandex.Metrica goal reporting.
 *
 * This helper reads the Yandex.Metrica ID from environment variables
 * (NEXT_PUBLIC_YM_ID) and invokes the global `ym` function if
 * available. Import and call `goal('goal_name')` on user actions to
 * record events. Only runs in the browser.
 */
export const goal = (name: string): void => {
  if (typeof window !== 'undefined') {
    const id = Number(process.env.NEXT_PUBLIC_YM_ID);
    (window as any).ym?.(id, 'reachGoal', name);
  }
};