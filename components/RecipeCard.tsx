"use client";
import Card from "./Card";
import Button from "./Button";

export default function RecipeCard({ title }:{title:string}){
  const onRun = () => {
    const el = document.getElementById("toast");
    if(!el) return;
    el.textContent = "Покажем в приложении";
    el.classList.add("toast--visible");
    setTimeout(()=> el.classList.remove("toast--visible"), 2400);
  };
  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="text-accent font-medium">{title}</div>
      <Button onClick={onRun} aria-label={`Запустить рецепт ${title}`}>Запустить</Button>
    </Card>
  );
}
