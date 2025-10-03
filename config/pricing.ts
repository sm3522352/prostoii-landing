export const TRIAL = {
  priceRub: 1,
  days: 3,
  renewRub: 949,
  renewDays: 7,
} as const;

export const IMAGE_PACKS = [
  { count: 10, priceRub: 99, query: "pack=10" },
  { count: 20, priceRub: 179, query: "pack=20" },
  { count: 50, priceRub: 399, query: "pack=50" },
] as const;
