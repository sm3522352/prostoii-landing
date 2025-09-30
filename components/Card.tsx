import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-[20px] border border-neutral-200/70 bg-white/95 p-5 shadow-[0_16px_40px_-28px_rgba(15,18,34,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-28px_rgba(15,18,34,0.22)] md:p-6",
        className
      )}
      {...props}
    />
  );
}
