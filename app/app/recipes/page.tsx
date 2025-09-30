"use client";

import { Fragment, useMemo, useState } from "react";
import clsx from "clsx";
import RecipeCard from "@/components/RecipeCard";
import Card from "@/components/Card";
import { recipeTabs, recipes, type Recipe, type RecipeCategory } from "@/lib/data";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";

const allTabs: (RecipeCategory | "Все")[] = ["Все", ...recipeTabs.map((tab) => tab.id)];

export default function RecipesPage() {
  const [activeTab, setActiveTab] = useState<RecipeCategory | "Все">("Все");
  const [search, setSearch] = useState("");
  const [onlyPinned, setOnlyPinned] = useState(false);
  const [pinned, setPinned] = useState<string[]>(["calm-hoa-post", "lesson-plan"]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesTab = activeTab === "Все" || recipe.categories.includes(activeTab);
      const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
      const matchesPinned = !onlyPinned || pinned.includes(recipe.id);
      return matchesTab && matchesSearch && matchesPinned;
    });
  }, [activeTab, onlyPinned, pinned, search]);

  const handleOpenRecipe = (recipe: Recipe, _tab: RecipeCategory | "Все") => {
    setSelectedRecipe(recipe);
    setDrawerOpen(true);
  };

  const handleLaunch = (recipe: Recipe) => {
    trackEvent("recipe_launch", { recipeId: recipe.id, tab: activeTab });
    showToast(`Запускаем рецепт «${recipe.title}»`);
  };

  const handleTogglePin = (id: string) => {
    setPinned((prev) =>
      prev.includes(id) ? prev.filter((recipeId) => recipeId !== id) : [...prev, id]
    );
    showToast("Обновили закрепление рецепта");
  };

  return (
    <Fragment>
      <div className="space-y-6">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-[24px] font-semibold leading-7 text-[var(--text)]">Рецепты</h1>
              <p className="text-sm text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
                Готовые сценарии для типичных задач. Выберите таб или найдите по названию.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <label className="relative flex items-center sm:w-64">
                <span className="sr-only">Поиск рецептов</span>
                <span className="pointer-events-none absolute left-3 text-[color-mix(in_srgb,var(--text)_55%,transparent)]">🔍</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  type="search"
                  placeholder="Найти рецепт"
                  className="w-full rounded-full border border-[var(--muted-border)] bg-[var(--surface)] py-2 pl-9 pr-4 text-sm text-[var(--text)] placeholder:text-[color-mix(in_srgb,var(--text)_55%,transparent)] focus:border-[var(--primary)] focus:outline-none"
                />
              </label>
              <button
                type="button"
                onClick={() => setOnlyPinned((prev) => !prev)}
                className={clsx(
                  "inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-semibold transition",
                  onlyPinned
                    ? "border-[color-mix(in_srgb,var(--primary)_45%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]"
                    : "border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_65%,transparent)] hover:text-[var(--text)]"
                )}
              >
                📌 Закреплённые
              </button>
            </div>
          </div>
          <nav aria-label="Категории рецептов" className="flex flex-wrap gap-2">
            {allTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition",
                  tab === activeTab
                    ? "bg-[var(--primary)] text-[var(--white)]"
                    : "border border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_65%,transparent)] hover:text-[var(--text)]"
                )}
              >
                {tab}
              </button>
            ))}
          </nav>
        </header>

        <section>
          {filteredRecipes.length === 0 ? (
            <Card className="flex flex-col items-center gap-3 text-center" size="lg">
              <span className="text-3xl" aria-hidden>
                🔍
              </span>
              <p className="text-[18px] font-semibold leading-6 text-[var(--text)]">Пока ничего не найдено</p>
              <p className="text-sm text-[color-mix(in_srgb,var(--text)_60%,transparent)]">
                Попробуйте изменить фильтры или создайте свой первый рецепт.
              </p>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--white)]"
                onClick={() => showToast("Открываем создание рецепта")}
              >
                Создать рецепт
              </button>
            </Card>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="relative">
                  <button
                    type="button"
                    onClick={() => handleTogglePin(recipe.id)}
                    className={clsx(
                      "absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold",
                      pinned.includes(recipe.id)
                        ? "border-[color-mix(in_srgb,var(--primary)_45%,transparent)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]"
                        : "border-[var(--muted-border)] bg-[var(--surface)] text-[color-mix(in_srgb,var(--text)_60%,transparent)] hover:text-[var(--text)]"
                    )}
                    aria-label={pinned.includes(recipe.id) ? "Убрать из закреплённых" : "Закрепить рецепт"}
                  >
                    📌
                  </button>
                  <RecipeCard recipe={recipe} tab={activeTab} onOpen={handleOpenRecipe} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {drawerOpen && selectedRecipe && (

        <div
          className="fixed inset-0 z-40 flex justify-end"
          style={{ background: "color-mix(in srgb, var(--text) 45%, transparent)" }}
        >
          <div className="h-full w-full max-w-md border-l border-[var(--muted-border)] bg-[var(--surface)] px-6 py-6 shadow-[0_16px_48px_color-mix(in_srgb,var(--text)_14%,transparent)]">

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[20px] font-semibold leading-6 text-[var(--text)]">{selectedRecipe.title}</h2>
                <p className="mt-2 text-sm text-[color-mix(in_srgb,var(--text)_60%,transparent)]">{selectedRecipe.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_65%,transparent)]"
                aria-label="Закрыть превью"
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm text-[color-mix(in_srgb,var(--text)_70%,transparent)]">
              {selectedRecipe.steps?.map((step, index) => (
                <p key={index} className="rounded-2xl bg-[color-mix(in_srgb,var(--text)_4%,transparent)] px-4 py-3">
                  {step}
                </p>
              )) ?? (
                <p className="rounded-2xl bg-[color-mix(in_srgb,var(--text)_4%,transparent)] px-4 py-3">
                  Подробности появятся после запуска рецепта.
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--white)]"
                onClick={() => {
                  handleLaunch(selectedRecipe);
                  setDrawerOpen(false);
                }}
              >
                Запустить
              </button>
              <button
                type="button"
                onClick={() => handleTogglePin(selectedRecipe.id)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--muted-border)] text-[color-mix(in_srgb,var(--text)_65%,transparent)]"
                aria-label="Закрепить рецепт"
              >
                📌
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
