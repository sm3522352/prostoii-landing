/**
 * ForWhom showcases the audiences who can benefit from the service.
 * It highlights typical user personas with succinct descriptions.
 */
export default function ForWhom() {
  const personas = [
    {
      title: 'Маркетологам',
      description: 'Создавайте привлекательные тексты и визуалы для рекламных кампаний без долгих брифов.'
    },
    {
      title: 'Предпринимателям',
      description: 'Быстро получайте материалы для презентаций, лендингов и соцсетей — экономьте время.'
    },
    {
      title: 'Студентам',
      description: 'Получайте помощь с черновиками и иллюстрациями для учебных проектов и работ.'
    },
    {
      title: 'SMM/Дизайнерам',
      description: 'Размещайте актуальный контент и картинки в социальных сетях — просто и креативно.'
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {personas.map((p) => (
        <div key={p.title} className="bg-panel rounded-xl p-6 border border-border space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">{p.title}</h3>
          <p className="text-text-secondary text-sm">{p.description}</p>
        </div>
      ))}
    </div>
  );
}