"use client";

type ToastElement = HTMLDivElement & { timeout?: number };

export function showToast(message: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById("toast") as ToastElement | null;
  if (!el) return;
  el.textContent = message;
  el.classList.add("toast--visible");
  if (el.timeout) {
    window.clearTimeout(el.timeout);
  }
  el.timeout = window.setTimeout(() => {
    el.classList.remove("toast--visible");
    el.timeout = undefined;
  }, 2400);
}
