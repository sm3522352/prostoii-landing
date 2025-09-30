import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-[20px] border border-neutral-200/70 bg-white/95 p-6 shadow-[0_24px_64px_-40px_rgba(15,18,34,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_32px_80px_-36px_rgba(15,18,34,0.55)]",
        className
      )}
      {...props}
    />
  );
}
