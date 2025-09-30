import Button from "@/components/Button";
import Card from "@/components/Card";
import Section from "@/components/Section";
import RecipeCard from "@/components/RecipeCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQItem from "@/components/FAQItem";
import ModelTable from "@/components/ModelTable";
import Pill from "@/components/Pill";
import { recipes, faqs, testimonials } from "@/lib/data";

export default function Page(){
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 lg:pt-24">
        <div className="absolute inset-x-0 top-0 -z-10 flex justify-center">
          <div className="bg-warm-glow glow-veil w-[720px] h-[360px] rounded-full" aria-hidden />
        </div>
        <div className="container-soft grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Pill>Личный ИИ‑помощник</Pill>
            <h1 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-jost)" }}>
              Один сервис. Все модели. Ноль сложности.
            </h1>
            <p className="mt-4 text-neutral-600 max-w-xl">
              Скажите по‑человечески — мы сделаем: обычный чат и готовые рецепты для реальных задач.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={()=>location.href='tg://resolve?domain=prostoii_bot'} aria-label="Начать бесплатно в Telegram">Начать бесплатно в Telegram</Button>
              <Button variant="ghost" onClick={()=>document.getElementById('demo')?.scrollIntoView({behavior:'smooth'})}>Смотреть демо</Button>
            </div>
          </div>
          <div className="relative">
            <Card className="p-5 rounded-lg">
              <div className="bg-warm-glow rounded-lg p-1 mb-3" aria-hidden />
              <div className="text-sm text-neutral-600">Демо‑виджет: чат + прогресс</div>
              <div className="mt-3 space-y-2">
                <div className="bg-neutral-50 p-3 rounded-sm text-sm">👤 Как объяснить договор аренды?</div>
                <div className="bg-primary-50 p-3 rounded-sm text-sm">🤖 Коротко о главном и рисках: ...</div>
                <div className="h-2 w-2/3 bg-neutral-200 rounded-sm" aria-hidden />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Section id="how" title="Как это работает" subtitle="Три шага — и готово.">
        <div className="grid md:grid-cols-3 gap-4">
          {["Выберите задачу", "Скажите по‑человечески", "Получите готовый результат"].map((t,i)=>(
            <Card key={i} className="p-5">
              <div className="text-lg font-medium">{t}</div>
              <p className="text-sm text-neutral-600 mt-2">≤ 8 слов, без жаргона.</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="recipes" title="Готовые рецепты" subtitle="Нажмите и запустите — остальное сделаем мы.">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recipes.map(r=> <RecipeCard key={r} title={r} />)}
        </div>
      </Section>

      <Section id="demo" title="Обычный чат" subtitle="Говорите голосом или пишите текстом.">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200" aria-label="Кнопка микрофона" />
            <div className="text-neutral-600">Нажмите голосовую кнопку и начните говорить…</div>
          </div>
        </Card>
      </Section>

      <Section id="models" title="Понятные модели" subtitle="«Для чего лучше» — без жаргона.">
        <ModelTable />
      </Section>

      <Section id="privacy" title="Приватность" subtitle="Коротко и по делу.">
        <div className="grid md:grid-cols-3 gap-4">
          {["Шифрование", "Минимум данных", "Прозрачные настройки"].map((t,i)=>(
            <Card key={i} className="p-5">
              <div className="text-lg font-medium">{t}</div>
              <p className="text-sm text-neutral-600 mt-2">Мы соблюдаем закон и даём контроль.</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="pricing" title="Тарифы" subtitle="Фримиум + Лайт/Семья/Про.">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {name:"Фримиум", price:"0₽", feat:["Базовый чат","Ограниченные рецепты"]},
            {name:"Семья", price:"299₽", feat:["Все рецепты","До 4 профилей"]},
            {name:"Про", price:"699₽", feat:["Приоритет","Расширенные модели"]}
          ].map(t=>(
            <Card key={t.name} className="p-6 flex flex-col">
              <div className="text-xl font-semibold">{t.name}</div>
              <div className="mt-2 text-3xl font-semibold" style={{fontFamily:"var(--font-jost)"}}>{t.price}<span className="text-base font-normal text-neutral-500">/мес</span></div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">{t.feat.map(f=><li key={f}>• {f}</li>)}</ul>
              <Button className="mt-6">Выбрать</Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="testimonials" title="Отзывы" subtitle="До/после — реальные истории.">
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t,i)=>(
            <TestimonialCard key={i} before={t.before} after={t.after} author={t.author} />
          ))}
        </div>
      </Section>

      <Section id="faq" title="FAQ">
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((f,i)=>(<FAQItem key={i} q={f.q} a={f.a} />))}
        </div>
      </Section>

      <footer className="py-12 border-t border-neutral-200 bg-white">
        <div className="container-soft text-sm text-neutral-600 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} ПростоИИ</div>
          <nav className="flex gap-4">
            <a href="#" className="hover:underline">Политика</a>
            <a href="#" className="hover:underline">Пользовательское соглашение</a>
            <a href="#" className="hover:underline">Контакты</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
