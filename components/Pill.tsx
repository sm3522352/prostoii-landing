import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function Pill({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("inline-flex items-center px-3 py-1 rounded-pill text-xs bg-primary-50 text-primary-600", className)} {...props} />;
}
