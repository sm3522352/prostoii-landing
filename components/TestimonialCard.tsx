import clsx from "clsx";
import Card from "./Card";

type Props = {
  before: string;
  after: string;
  author: string;
  className?: string;
};

export default function TestimonialCard({ before, after, author, className }: Props) {
  return (
    <Card
      className={clsx(
        "min-w-[280px] snap-center scroll-ml-6 rounded-[16px] p-5 lg:min-w-[320px]",
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-primary-600">
        <span aria-hidden>★</span>
        <span>До → после</span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="mb-1 text-xs uppercase tracking-wide text-neutral-500">До</div>
          <div className="rounded-[12px] bg-neutral-50 p-3 text-sm leading-relaxed text-neutral-600">{before}</div>
        </div>
        <div>
          <div className="mb-1 text-xs uppercase tracking-wide text-neutral-500">После</div>
          <div className="rounded-[12px] bg-primary-50 p-3 text-sm leading-relaxed text-primary-700">{after}</div>
        </div>
      </div>
      <div className="mt-4 text-xs text-neutral-500">— {author}</div>
    </Card>
  );
}
