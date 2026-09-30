"use client";
import { useCallback, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { weddingData } from "@/data/weddingData";
import { useWeddingLanguage } from "@/components/WeddingLanguage";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null); const title = useRef<HTMLParagraphElement>(null); const names = useRef<HTMLParagraphElement>(null); const line = useRef<HTMLDivElement>(null); const { t } = useWeddingLanguage();
  const close = useCallback(() => { window.sessionStorage.setItem("subho-bibhaho-opened", "true"); onComplete(); }, [onComplete]);
  useLayoutEffect(() => { if (window.sessionStorage.getItem("subho-bibhaho-opened")) { close(); return; } const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; const ctx = gsap.context(() => { if (reduced) { gsap.set([title.current, names.current, line.current], { autoAlpha: 1 }); return; } gsap.timeline().fromTo(title.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .55, ease: "power3.out" }).fromTo(names.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .4 }, "-=.2").fromTo(line.current, { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: .4 }, "-=.1"); }, root); return () => ctx.revert(); }, [close]);
  return <div ref={root} className="fixed inset-0 z-50 grid place-items-center bg-dark-maroon px-6 text-center"><button type="button" onClick={close} className="absolute right-5 top-5 min-h-11 px-3 text-xs font-semibold uppercase tracking-[.15em] text-gold transition hover:text-background">{t("Skip")}</button><div className="w-full max-w-sm border border-gold/70 bg-background px-8 py-12 shadow-2xl"><p ref={title} className="invisible font-display text-4xl text-dark-maroon sm:text-5xl">{weddingData.ui.preloader.label}</p><p ref={names} className="invisible font-display mt-5 text-2xl text-maroon">{weddingData.couple.brideName} <span className="text-gold">&amp;</span> {weddingData.couple.groomName}</p><div ref={line} className="invisible mx-auto mt-7 h-px w-20 origin-center bg-gold"/><button type="button" onClick={close} className="mt-9 min-h-11 bg-gold px-6 text-sm font-bold text-dark-maroon transition hover:bg-maroon hover:text-background">{t("Open Invitation")}</button></div></div>;
}
