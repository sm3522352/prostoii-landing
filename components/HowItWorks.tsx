/**
 * HowItWorks displays a simple three‑step sequence illustrating how the
 * service works. Each item has a title and a short explanation. Icons
 * could be added in the future using an icon library.
 */
export default function HowItWorks() {
  const steps = [
    {
      title: '1. Пробная подписка',
      description: 'Активируйте пробный доступ за 1 ₽ и получите первые лимиты на тексты и изображения.'
    },
    {
      title: '2. Использование',
      description: 'Генерируйте контент, наблюдайте за лимитами в реальном времени и получайте результат в пару секунд.'
    },
    {
      title: '3. Продление или пакеты',
      description: 'Автопродление каждую неделю или покупка пакетов изображений — выбирайте, что выгоднее.'
    }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step) => (
        <div key={step.title} className="flex flex-col space-y-2 text-center md:text-left">
          <h3 className="text-xl font-semibold text-text-primary">{step.title}</h3>
          <p className="text-text-secondary text-sm">{step.description}</p>
        </div>
      ))}
    </div>
  );
}