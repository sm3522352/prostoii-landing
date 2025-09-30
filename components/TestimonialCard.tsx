import Image from "next/image";
import clsx from "clsx";
import Card from "./Card";

type Props = {
  id: string;
  name: string;
  role: string;
  rating: number;
  before: string;
  after: string;
  image: string;
  className?: string;
};

export default function TestimonialCard({ id, name, role, rating, before, after, image, className }: Props) {
  const stars = Array.from({ length: 5 }, (_, index) => (index < rating ? "★" : "☆")).join("");

  return (
    <Card className={clsx("min-w-[280px] snap-center scroll-ml-6 rounded-[20px] border border-neutral-200/60 bg-white p-6 lg:min-w-[320px]", className)}>
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt={`Фото ${name}`}
          width={64}
          height={64}
          sizes="64px"
          loading="lazy"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <div className="flex flex-wrap items-center gap-1 text-sm font-semibold text-text">
            <span>{name}</span>
            <span aria-hidden>•</span>
            <span className="font-medium text-muted">{role}</span>
          </div>
          <span className="mt-1 block text-sm text-warning" aria-label={`Оценка ${rating} из 5`}>
            {stars}
          </span>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
        <p className="rounded-[16px] bg-neutral-100 p-3 text-text/80">{before}</p>
        <p
          className="rounded-[16px] p-3 text-success"
          style={{ backgroundColor: "rgba(16, 185, 129, 0.12)" }}
        >
          {after}
        </p>
      </div>
      <div className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">case #{id}</div>
    </Card>
  );
}
