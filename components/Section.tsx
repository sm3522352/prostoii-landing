import { ReactNode } from "react";

export default function Section({ title, subtitle, children, id }:{title:string, subtitle?:string, children:ReactNode, id?:string}){
  return (
    <section id={id} className="py-16 lg:py-24">
      <div className="container-soft">
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-semibold" style={{ fontFamily: "var(--font-jost)" }}>{title}</h2>
          {subtitle && <p className="text-neutral-500 mt-2 max-w-2xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
