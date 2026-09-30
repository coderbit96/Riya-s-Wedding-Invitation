"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { lineReveal, prefersReducedMotion, textReveal } from "@/lib/animations";

export function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  const root = useRef<HTMLDivElement>(null); const heading = useRef<HTMLHeadingElement>(null); const line = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => { const ctx = gsap.context(() => { if (prefersReducedMotion()) { gsap.set([heading.current, line.current], { autoAlpha: 1, clearProps: "transform" }); return; } textReveal(heading.current, { duration: .7, scrollTrigger: { trigger: root.current, start: "top 86%", once: true } }); lineReveal(line.current, { duration: .55, delay: .18, scrollTrigger: { trigger: root.current, start: "top 86%", once: true } }); }, root); return () => ctx.revert(); }, []);
  return <div ref={root} className="text-center"><p className={`eyebrow mb-4 ${light ? "!text-gold" : ""}`}>{eyebrow}</p><div className="overflow-hidden pb-3"><h2 ref={heading} className={`invisible type-section-heading pb-2 ${light ? "text-background" : "text-dark-maroon"}`}>{title}</h2></div><div ref={line} className={`invisible mx-auto mt-6 h-px w-20 ${light ? "bg-gold" : "bg-gold"}`}/></div>;
}
