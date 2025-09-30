export type RecipeCategory = "Популярные" | "Для новичка" | "Работа" | "Учёба" | "Быт";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  categories: RecipeCategory[];
  icon: string;
  disclaimer?: string;
};

export const recipeTabs: { id: RecipeCategory; label: string }[] = [
  { id: "Популярные", label: "Популярные" },
  { id: "Для новичка", label: "Для новичка" },
  { id: "Работа", label: "Работа" },
  { id: "Учёба", label: "Учёба" },
  { id: "Быт", label: "Быт" }
];

export const recipes: Recipe[] = [
  {
    id: "calm-hoa-post",
    title: "Пост в ЖКХ — спокойно и без конфликтов",
    description: "Отправим текст, который услышат соседи.",
    categories: ["Популярные", "Быт", "Для новичка"],
    icon: "🏠"
  },
  {
    id: "cover-letter",
    title: "Сопроводительное письмо — коротко и по делу",
    description: "Подчеркнём сильные стороны под вакансию.",
    categories: ["Популярные", "Работа"],
    icon: "✉️"
  },
  {
    id: "role-tailored-resume",
    title: "Резюме под вакансию — выделить сильные стороны",
    description: "Структурируем опыт и добавим примеры.",
    categories: ["Работа", "Популярные"],
    icon: "💼"
  },
  {
    id: "cost-table",
    title: "Таблица затрат — из текста в понятную таблицу",
    description: "Разложим расходы и подсчитаем итоги.",
    categories: ["Работа", "Быт"],
    icon: "📊"
  },
  {
    id: "lesson-plan",
    title: "План урока — по теме и возрасту",
    description: "Учтём цели, темп и активность детей.",
    categories: ["Учёба", "Для новичка"],
    icon: "📚"
  },
  {
    id: "summary",
    title: "Краткий конспект — выжимка из длинного текста",
    description: "Выделим главное и сохраним структуру.",
    categories: ["Учёба", "Работа"],
    icon: "📝"
  },
  {
    id: "client-reply",
    title: "Ответ клиенту — вежливо и чётко",
    description: "Подберём тон, аргументы и следующий шаг.",
    categories: ["Работа", "Популярные"],
    icon: "💬"
  },
  {
    id: "post-ideas",
    title: "Идеи для постов — 10 вариантов",
    description: "Предложим темы, заголовки и короткие тезисы.",
    categories: ["Работа", "Для новичка"],
    icon: "💡"
  },
  {
    id: "claim-letter",
    title: "Письмо жалобы — аргументированно и спокойно",
    description: "Сошлёмся на правила и предложим решение.",
    categories: ["Быт", "Работа"],
    icon: "📝"
  },
  {
    id: "explained-translation",
    title: "Перевод с пояснениями — понятный Рус/Eng",
    description: "Добавим комментарии к спорным фразам.",
    categories: ["Работа", "Учёба"],
    icon: "🌐"
  },
  {
    id: "auto-model",
    title: "«Подберём модель сами» — автоматически",
    description: "Рекомендуем лучший вариант под задачу.",
    categories: ["Популярные", "Для новичка"],
    icon: "🤖"
  },
  {
    id: "fact-search",
    title: "Поиск фактов — краткая справка",
    description: "Соберём главное и укажем источники.",
    categories: ["Учёба", "Работа"],
    icon: "🔍",
    disclaimer: "Если задействован веб-поиск — показываем дисклеймер."
  }
];

export type HowStep = {
  id: number;
  title: string;
  placeholder: string;
  helper: string;
  image: string;
};

export const howSteps: HowStep[] = [
  {
    id: 1,
    title: "Опишите задачу по-человечески",
    placeholder: "Сделай объявление в ЖКХ без конфликта",
    helper: "Достаточно пары фраз и цели.",
    image: "/images/how-step-1.webp"
  },
  {
    id: 2,
    title: "Выберите рецепт",
    placeholder: "Мы предложим подходящий вариант",
    helper: "Можно поменять до запуска.",
    image: "/images/how-step-2.webp"
  },
  {
    id: 3,
    title: "Получите результат",
    placeholder: "Скопируйте, сохраните или поделитесь",
    helper: "Подойдёт для рабочих и личных задач.",
    image: "/images/how-step-3.webp"
  }
];

export type PrivacyCard = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

export const privacyCards: PrivacyCard[] = [
  {
    title: "Шифруем по умолчанию",
    description: "Все запросы идут по защищённым каналам.",
    href: "/privacy",
    cta: "Политика конфиденциальности"
  },
  {
    title: "Храним минимум",
    description: "Управляйте историей и файлами в два клика.",
    href: "/data-storage",
    cta: "Как удалить историю и файлы"
  },
  {
    title: "Все настройки — в один тап",
    description: "Быстрые переключатели приватности.",
    href: "/settings/privacy",
    cta: "Настройки приватности"
  }
];

export type Plan = {
  id: "free" | "family" | "pro";
  name: string;
  price: string;
  period: string;
  description: string;
  bullets: string[];
  footnote: string;
  highlight?: boolean;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "0 ₽",
    period: "/ мес",
    description: "20 запросов в день • Рецепты и чат • История 7 дней • Базовая поддержка",
    bullets: ["20 запросов в день", "Рецепты и чат", "История 7 дней", "Базовая поддержка"],
    footnote: "Без карты"
  },
  {
    id: "family",
    name: "Семья",
    price: "299 ₽",
    period: "/ мес",
    description: "100 запросов в день • Папки и избранное • 3 участника • Приоритетная очередь",
    bullets: ["100 запросов в день", "Папки и избранное", "3 участника", "Приоритетная очередь"],
    footnote: "Можно делиться в семье",
    highlight: true
  },
  {
    id: "pro",
    name: "Про",
    price: "699 ₽",
    period: "/ мес",
    description: "«Разумный безлимит» • Загрузка файлов и версии • Приватные рецепты • Быстрый доступ",
    bullets: ["«Разумный безлимит»", "Загрузка файлов и версии", "Приватные рецепты", "Быстрый доступ"],
    footnote: "Для активной работы"
  }
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  before: string;
  after: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "anna-hoa",
    name: "Анна",
    role: "управляющая УК",
    rating: 5,
    before: "До: жители жаловались на объявления.",
    after: "После: спокойные тексты — жалоб нет.",
    image: "/images/reviews/anna.webp"
  },
  {
    id: "olesya-resume",
    name: "Олеся",
    role: "24 года",
    rating: 5,
    before: "До: боялась резюме.",
    after: "После: получила отклики за 2 дня.",
    image: "/images/reviews/olesya.webp"
  },
  {
    id: "maria-ip",
    name: "Мария",
    role: "ИП",
    rating: 4,
    before: "До: длинные письма — молчали.",
    after: "После: отвечают в срок.",
    image: "/images/reviews/maria.webp"
  }
];

export type FAQ = {
  id: string;
  q: string;
  a: string;
  linkLabel?: string;
  href?: string;
};

export const faqs: FAQ[] = [
  {
    id: "faq-free",
    q: "Это бесплатно?",
    a: "Да: 20 запросов в день, рецепты и чат. Можно перейти на платный позже."
  },
  {
    id: "faq-data",
    q: "Что с данными?",
    a: "Шифруем. Сохраняем только то, что вы разрешили. Историю можно удалить.",
    linkLabel: "Политика конфиденциальности",
    href: "/privacy"
  },
  {
    id: "faq-limits",
    q: "Какие ограничения?",
    a: "Никаких массовых рассылок, капч и скрапинга. Для личных/рабочих задач в рамках закона."
  },
  {
    id: "faq-cancel",
    q: "Как отменить подписку?",
    a: "Профиль → Подписка → Отменить. Доступ активен до конца оплаченного периода.",
    linkLabel: "Настройки подписки",
    href: "/settings/privacy"
  },
  {
    id: "faq-support",
    q: "Где поддержка?",
    a: "Чат на сайте и Telegram. Отвечаем быстро в рабочие часы.",
    linkLabel: "Открыть чат поддержки",
    href: "https://t.me/prostoii_support"
  },
  {
    id: "faq-models",
    q: "Какие модели?",
    a: "Подбираем автоматически. Можно выбрать вручную в настройках.",
    linkLabel: "Настройки моделей",
    href: "/settings/privacy"
  },
  {
    id: "faq-team",
    q: "Командный доступ?",
    a: "Да, подключаем роли и выставляем счета.",
    linkLabel: "Связаться с отделом продаж",
    href: "mailto:team@prostoii.ru"
  }
];
