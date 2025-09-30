import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-[20px] border border-neutral-200/70 bg-white/95 p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg md:p-6",
        className
      )}
      {...props}
    />
  );
}
