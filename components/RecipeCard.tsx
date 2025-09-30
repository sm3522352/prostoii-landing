"use client";

import Card from "./Card";
import clsx from "clsx";
import { RecipeCategory, type Recipe } from "@/lib/data";

export type RecipeCardProps = {
  recipe: Recipe;
  onOpen: (recipe: Recipe, tab: RecipeCategory | "Все") => void;
  tab: RecipeCategory | "Все";
  variant?: "default" | "featured";
};

export default function RecipeCard({ recipe, onOpen, tab, variant = "default" }: RecipeCardProps) {
  return (
    <Card
      size="md"
      interactive
      className={clsx(
        "relative h-full overflow-hidden",
        variant === "featured" && "border-[color-mix(in_srgb,var(--primary)_32%,transparent)] bg-[color-mix(in_srgb,var(--primary)_8%,transparent)]"
      )}
    >
      <button
        type="button"
        className="flex h-full w-full flex-col gap-4 text-left"
        onClick={() => onOpen(recipe, tab)}
        aria-label={`Запустить рецепт «${recipe.title}»`}
      >
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-xl"
          >
            {recipe.icon}
          </span>
          <div className="space-y-2">
            <h3 className="text-[18px] font-semibold leading-6 text-[var(--text)]">{recipe.title}</h3>
            <p className="line-clamp-3 text-sm leading-5 text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
              {recipe.description}
            </p>
          </div>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-[var(--primary)]">
          <span className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
            ≈60 сек
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]">
            Запустить
            <span aria-hidden>→</span>
          </span>
        </div>
        {recipe.disclaimer && (
          <p className="mt-2 text-xs text-[var(--warning)]" role="note">
            {recipe.disclaimer}
          </p>
        )}
      </button>
    </Card>
  );
}
