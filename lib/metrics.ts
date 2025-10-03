export const goal = (name: string) => {
  if (typeof window !== "undefined") {
    const id = Number(process.env.NEXT_PUBLIC_YM_ID);
    (window as any).ym?.(id, "reachGoal", name);
  }
};
