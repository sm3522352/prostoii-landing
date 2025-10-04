import Link from 'next/link';

/**
 * FAQ lists common questions and answers. On the pricing page it helps
 * clarify limitations, PRO benefits and how to cancel auto‑renew.
 */
export default function FAQ() {
  const items = [
    {
      question: 'Какие лимиты у бесплатного тарифа?',
      answer: 'Бесплатный тариф включает 30 000 символов текста и 20 изображений в день.'
    },
    {
      question: 'Что даёт PRO?',
      answer:
        'PRO снимает суточные ограничения, предоставляет приоритетный доступ и возможность автопродления каждую неделю.'
    },
    {
      question: 'Как отключить автопродление?',
      answer:
        'Вы можете отключить автопродление в личном кабинете или отправив запрос на странице отмены подписки.'
    },
    {
      question: 'Есть ли корпоративный доступ?',
      answer: (
        <span>
          Да, мы работаем с компаниями. Пожалуйста, свяжитесь с нами через{' '}
          <Link href="/contact" className="text-accent hover:text-accent-hover underline">
            форму обратной связи
          </Link>
          .
        </span>
      )
    }
  ];
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.question} className="border-b border-border pb-4">
          <h4 className="font-semibold text-text-primary mb-1">{item.question}</h4>
          <p className="text-text-secondary text-sm">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}