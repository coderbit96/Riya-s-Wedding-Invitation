"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { fadeUp, prefersReducedMotion } from "@/lib/animations";

export function AnimatedReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) { gsap.set(ref.current, { autoAlpha: 1, clearProps: "transform" }); return; }
      fadeUp(ref.current, { delay, scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
