"use client";
import Card from "./Card";
import Button from "./Button";

type RecipeCardProps = {
  title: string;
  benefit: string;
  icon?: string;
  loading?: boolean;
};

export default function RecipeCard({ title, benefit, icon = "🔆", loading = false }: RecipeCardProps) {
  const onRun = () => {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = "Покажем в приложении";
    el.classList.add("toast--visible");
    setTimeout(() => el.classList.remove("toast--visible"), 2400);
  };

  if (loading) {
    return (
      <Card className="p-4 flex flex-col gap-4" aria-hidden>
        <div className="h-10 w-10 rounded-full bg-neutral-100" />
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded-full bg-neutral-100" />
          <div className="h-3 w-2/3 rounded-full bg-neutral-100" />
        </div>
        <div className="h-10 w-full rounded-full bg-neutral-100" />
      </Card>
    );
  }

  return (
    <Card className="group p-5 flex flex-col gap-4 focus-within:ring-2 focus-within:ring-primary-200">
      <div className="flex items-center gap-3">
        <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-lg">
          {icon}
        </span>
        <div>
          <div className="text-sm font-semibold text-accent">{title}</div>
          <p className="text-xs text-neutral-500">{benefit}</p>
        </div>
      </div>
      <Button
        onClick={onRun}
        data-analytics="click_recipe"
        aria-label={`Запустить рецепт «${title}»`}
        className="mt-auto transform transition will-change-transform group-hover:scale-105 group-hover:shadow-lg"
      >
        Запустить
      </Button>
    </Card>
  );
}
