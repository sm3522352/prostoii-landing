"use client";
import { useId, useRef, useState, useEffect } from "react";
import Card from "./Card";

export default function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const id = useId();

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setHeight(open ? el.scrollHeight : 0);
  }, [open]);

  return (
    <Card className="p-5">
      <button
        className="flex w-full items-center justify-between text-left text-base font-medium text-accent"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        data-analytics="faq_toggle"
      >
        <span>{q}</span>
        <span aria-hidden className="ml-4 text-xl leading-none text-primary-500">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        id={id}
        ref={contentRef}
        style={{ maxHeight: height }}
        className="grid overflow-hidden transition-all duration-300 ease-out"
      >
        <p className="mt-3 text-sm text-neutral-600 opacity-0 transition-opacity duration-300 ease-out data-[open='true']:opacity-100" data-open={open}>
          {a}
        </p>
      </div>
    </Card>
  );
}
