"use client";
import type Lenis from "lenis";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children, enabled = true }: { children: React.ReactNode; enabled?: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const lowPowerMobile = window.matchMedia("(max-width: 767px)").matches && ((navigator.hardwareConcurrency ?? 8) <= 4 || memory <= 4);
    if (prefersReducedMotion() || lowPowerMobile) { ScrollTrigger.refresh(); return; }
    let active = true;
    let lenis: Lenis | undefined;
    const onScroll = () => ScrollTrigger.update();
    const onTick = (time: number) => lenis?.raf(time * 1000);
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    void import("lenis").then(({ default: LenisClass }) => {
      if (!active) return;
      lenis = new LenisClass({ lerp: .09, smoothWheel: true, syncTouch: false });
      lenis.on("scroll", onScroll);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    });
    return () => { active = false; cancelAnimationFrame(refresh); gsap.ticker.remove(onTick); lenis?.off("scroll", onScroll); lenis?.destroy(); };
  }, [enabled]);
  return <>{children}</>;
}
