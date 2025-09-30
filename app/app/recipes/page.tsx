"use client";

import { useMemo, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { recipeTabs, recipes, type Recipe, type RecipeCategory } from "@/lib/data";
import { showToast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";
import clsx from "clsx";

const allTabs: (RecipeCategory | "Все")[] = ["Все", ...recipeTabs.map((tab) => tab.id)];

export default function RecipesPage() {
  const [activeTab, setActiveTab] = useState<RecipeCategory | "Все">("Все");
  const [search, setSearch] = useState("");
  const [onlyPinned, setOnlyPinned] = useState(false);
  const [pinned, setPinned] = useState<string[]>(["calm-hoa-post", "lesson-plan"]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesTab = activeTab === "Все" || recipe.categories.includes(activeTab);
      const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
      const matchesPinned = !onlyPinned || pinned.includes(recipe.id);
      return matchesTab && matchesSearch && matchesPinned;
    });
  }, [activeTab, onlyPinned, pinned, search]);

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
    <div className="space-y-6">
      <header className="scroll-reveal space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-text">Рецепты</h1>
            <p className="text-sm text-muted">Готовые сценарии для типичных задач. Выберите пресет или ищите по названию.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="relative flex items-center">
              <span className="sr-only">Поиск рецептов</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type="search"
                placeholder="Найти рецепт"
                className="w-full rounded-xl border border-neutral-200/70 bg-white/95 px-4 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <button
              type="button"
              onClick={() => setOnlyPinned((prev) => !prev)}
              className={clsx(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition",
                onlyPinned
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-neutral-200/70 text-muted hover:text-text"
              )}
            >
              <span aria-hidden>📌</span>
              Закреплённые
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
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                tab === activeTab
                  ? "bg-primary text-white shadow-soft"
                  : "bg-white/80 text-muted hover:text-text"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <section className="scroll-reveal">
        {filteredRecipes.length === 0 ? (
          <div className="rounded-3xl border border-neutral-200/70 bg-white/95 p-6 text-center shadow-soft">
            <p className="text-lg font-semibold text-text">Не нашли подходящий рецепт</p>
            <p className="mt-2 text-sm text-muted">Попробуйте другую категорию или отключите фильтр закреплённых.</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="relative">
                <div className="absolute right-5 top-5 z-10">
                  <button
                    type="button"
                    onClick={() => handleTogglePin(recipe.id)}
                    className={clsx(
                      "inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition",
                      pinned.includes(recipe.id)
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-neutral-200/70 bg-white/90 text-muted hover:text-text"
                    )}
                    aria-label={pinned.includes(recipe.id) ? "Убрать из закреплённых" : "Закрепить рецепт"}
                  >
                    📌
                  </button>
                </div>
                <RecipeCard
                  recipe={recipe}
                  tab={activeTab === "Все" ? "Популярные" : activeTab}
                  onLaunch={(item) => handleLaunch(item)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
