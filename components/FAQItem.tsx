"use client";
import { useState } from "react";
import Card from "./Card";

export default function FAQItem({ q, a }:{q:string; a:string}){
  const [open, setOpen] = useState(false);
  return (
    <Card className="p-4">
      <button className="w-full text-left flex items-center justify-between" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>
        <span className="font-medium">{q}</span>
        <span aria-hidden>{open ? "−" : "+"}</span>
      </button>
      {open && <p className="text-sm text-neutral-600 mt-3">{a}</p>}
    </Card>
  );
}
