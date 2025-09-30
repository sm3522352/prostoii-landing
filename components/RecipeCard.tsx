"use client";

import Card from "./Card";
import clsx from "clsx";
import { RecipeCategory, type Recipe } from "@/lib/data";

export type RecipeCardProps = {
  recipe: Recipe;
  onLaunch: (recipe: Recipe, tab: RecipeCategory | "Все") => void;
  tab: RecipeCategory | "Все";
  variant?: "default" | "featured";
};

export default function RecipeCard({ recipe, onLaunch, tab, variant = "default" }: RecipeCardProps) {
  return (
    <Card
      className={clsx(
        "relative h-full overflow-hidden",
        variant === "featured" && "border-primary/30 bg-primary-50/50"
      )}
    >
      <button
        type="button"
        className="flex h-full w-full flex-col gap-4 rounded-[16px] p-4 text-left transition md:p-5"
        onClick={() => onLaunch(recipe, tab)}
        aria-label={`Запустить рецепт «${recipe.title}»`}
      >
        <div className="flex items-start gap-3">
          <span aria-hidden className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-xl">
            {recipe.icon}
          </span>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold leading-tight text-text">{recipe.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{recipe.description}</p>
          </div>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-primary">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            ≈60 сек
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Запустить
            <span aria-hidden>→</span>
          </span>
        </div>
        {recipe.disclaimer && (
          <p className="mt-2 text-xs text-warning" role="note">
            {recipe.disclaimer}
          </p>
        )}
      </button>
    </Card>
  );
}
