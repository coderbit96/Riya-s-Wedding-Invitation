"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWeddingLanguage } from "@/components/WeddingLanguage";
import { weddingData } from "@/data/weddingData";

gsap.registerPlugin(ScrollTrigger);

export function Invitation() {
  const section = useRef<HTMLElement>(null); const heading = useRef<HTMLHeadingElement>(null); const body = useRef<HTMLDivElement>(null); const { t } = useWeddingLanguage(); const { hosts, wedding, ui, couple } = weddingData;
  useLayoutEffect(() => { const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; const ctx = gsap.context(() => { if (reduced) { gsap.set([heading.current, body.current], { autoAlpha: 1, clearProps: "transform" }); return; } gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 72%", once: true } }).fromTo(heading.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .65, ease: "power3.out" }).fromTo(body.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .6, ease: "power3.out" }, "-=.25"); }, section); return () => ctx.revert(); }, []);
  return <section ref={section} id="invitation" className="bg-background px-6 py-24 text-center sm:py-32"><div className="premium-card mx-auto max-w-2xl bg-background px-6 py-12 sm:px-12"><p className="eyebrow">{t(ui.invitation.eyebrow)}</p><h2 ref={heading} className="invisible type-section-heading mt-4 text-dark-maroon">{t(ui.invitation.heading)}</h2><div className="simple-rule mx-auto mt-6"/><div ref={body} className="invisible"><p className="type-caption mt-7 text-gold">{t(hosts.relationToBride)}</p><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted">{hosts.englishInvitation}</p><p className="font-display mx-auto mt-8 max-w-xl whitespace-pre-line text-2xl leading-10 text-dark-maroon sm:text-3xl">{wedding.invitationMessage}</p><div className="mx-auto mt-9 h-px w-16 bg-gold"/><p className="font-display mt-8 text-3xl text-maroon">{couple.brideName} <span className="px-2 text-gold">&amp;</span> {couple.groomName}</p><p className="font-display mt-4 text-xl text-dark-maroon">{t(wedding.signOff)}</p></div></div></section>;
}
