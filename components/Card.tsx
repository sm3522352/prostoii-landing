import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "bg-white/90 backdrop-blur-sm rounded-[16px] shadow-soft transition hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}
