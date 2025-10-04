/**
 * LogoCloud displays a row of partner or technology logos. In this
 * skeleton implementation we use placeholders; replace with real
 * images when available. Logos should be optimised and served via
 * next/image for performance.
 */
export default function LogoCloud() {
  const logos = ['OpenAI', 'StableDiffusion', 'Midjourney', 'Yandex'];
  return (
    <div className="flex flex-wrap justify-center items-center gap-6">
      {logos.map((name) => (
        <div
          key={name}
          className="w-24 h-12 flex items-center justify-center bg-panel border border-border rounded-md text-text-secondary text-xs"
        >
          {name}
        </div>
      ))}
    </div>
  );
}