export type ContinueItem = {
  id: string;
  title: string;
  type: "Рецепт" | "Чат" | "Файл";
  updatedAt: string;
  description: string;
};

export type PinnedRecipe = {
  id: string;
  title: string;
  summary: string;
};

export type FileItem = {
  id: string;
  name: string;
  size: string;
  updatedAt: string;
  kind: "pdf" | "sheet" | "doc" | "img";
};

export const quickActions = [
  {
    id: "new-recipe",
    title: "Новый рецепт",
    description: "Подберите готовый сценарий под задачу",
    href: "/app/recipes?new=1",
    icon: "🧾",
    hint: "2 минуты",
  },
  {
    id: "open-chat",
    title: "Открыть чат",
    description: "Начните новый диалог с ассистентом",
    href: "/app/chat",
    icon: "💬",
    hint: "Всегда рядом",
  },
  {
    id: "upload-file",
    title: "Загрузить файл",
    description: "Документы, таблицы и презентации",
    href: "/app/files?upload=1",
    icon: "📁",
    hint: "До 20 МБ",
  },
];

export const continueItems: ContinueItem[] = [
  {
    id: "c-1",
    title: "Сценарий вебинара по продукту",
    type: "Рецепт",
    updatedAt: "5 минут назад",
    description: "Подготовили структуру, осталось добавить слайды по преимуществам.",
  },
  {
    id: "c-2",
    title: "Диалог: автоматизация отчётов",
    type: "Чат",
    updatedAt: "12 минут назад",
    description: "Обсудили, какие данные выгружать. Нужен финальный список полей.",
  },
  {
    id: "c-3",
    title: "Черновик рассылки клиентам",
    type: "Рецепт",
    updatedAt: "Вчера",
    description: "Идея письма готова, осталось согласовать сроки запуска кампании.",
  },
  {
    id: "c-4",
    title: "Разбор договора поставки",
    type: "Файл",
    updatedAt: "2 дня назад",
    description: "Пометили спорные пункты. Проверьте пункт о гарантиях и штрафах.",
  },
];

export const pinnedRecipes: PinnedRecipe[] = [
  {
    id: "p-1",
    title: "Урок о солнечной энергии",
    summary: "Методичка с заданиями и примерами из жизни",
  },
  {
    id: "p-2",
    title: "План переговоров с партнёром",
    summary: "5 шагов подготовки и блок возражений",
  },
  {
    id: "p-3",
    title: "Тренировка текстов в соцсетях",
    summary: "Подборка шаблонов под анонсы и итоги",
  },
  {
    id: "p-4",
    title: "Подбор идей для блога",
    summary: "Контент на месяц с темами и героями",
  },
];

export const fileItems: FileItem[] = [
  { id: "f-1", name: "Отчёт-май.xlsx", size: "1.8 МБ", updatedAt: "Сегодня", kind: "sheet" },
  { id: "f-2", name: "Коммерческое предложение.pdf", size: "940 КБ", updatedAt: "Вчера", kind: "pdf" },
  { id: "f-3", name: "Презентация проекта.pptx", size: "4.2 МБ", updatedAt: "3 дня назад", kind: "doc" },
  { id: "f-4", name: "Фото с замеров.jpg", size: "3.5 МБ", updatedAt: "5 дней назад", kind: "img" },
];

export const hintPills = [
  "Составь письмо клиенту про перенос встречи",
  "Объясни, как работает машинное обучение простыми словами",
  "Подготовь список задач на запуск продукта",
  "Собери бриф для интервью с экспертом",
  "Подскажи идеи для сторис на неделю",
  "Сделай пошаговый план внедрения сервиса",
  "Разбери текст договора на риски",
];

export const fileIcons: Record<FileItem["kind"], string> = {
  pdf: "📄",
  sheet: "📊",
  doc: "📝",
  img: "🖼️",
};
