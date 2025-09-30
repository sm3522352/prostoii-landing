import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "bg-white rounded-md shadow-glow hover:shadow-lg transition hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}
