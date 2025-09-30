'use client';

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  as?: "button";
};

export default function Button({ variant = "primary", className, ...props }: Props) {
  const base = "inline-flex items-center gap-2 rounded-pill px-5 py-3 text-sm font-medium transition transform will-change-transform focus-visible:outline-none";
  const variants = {
    primary: "bg-primary-500 text-white shadow-glow hover:shadow-lg hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary-300",
    ghost: "bg-white text-accent border border-neutral-200 hover:bg-neutral-50"
  };
  return <button {...props} className={clsx(base, variants[variant], className)} />;
}
