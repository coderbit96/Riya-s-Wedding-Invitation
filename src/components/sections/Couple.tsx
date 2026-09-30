"use client";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BengaliAlpana } from "@/components/ui/BengaliAlpana";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { weddingData } from "@/data/weddingData";
import { useWeddingLanguage } from "@/components/WeddingLanguage";

gsap.registerPlugin(ScrollTrigger);

function PortraitFrame({ image, name }: { image: string; name: string }) {
  return <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-sm border border-gold/60 bg-dark-maroon p-2"><div className="image-zoom relative h-full overflow-hidden rounded-sm"><Image src={image} alt={`${name} portrait placeholder`} fill className="object-cover" sizes="(max-width: 640px) 88vw, 28vw"/></div><span className="absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-gold"/><span className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-gold"/></div>;
}

function ParentDetails({ relationship, father, mother, addressLabel, address }: { relationship: string; father: string; mother: string; addressLabel?: string; address?: { locality: string; city: string; pin: string } }) {
  return <div className="mt-5 border-t border-gold/30 pt-5 text-sm leading-7 text-dark-maroon"><p className="type-caption text-muted">{relationship}</p><p className="font-display mt-1 text-lg">{father}</p><p className="font-display text-lg">&amp; {mother}</p>{address && <><p className="type-caption mt-4 text-muted">{addressLabel}</p><p>{address.locality}, {address.city}</p><p>PIN – {address.pin}</p></>}</div>;
}

export function Couple() {
  const { t } = useWeddingLanguage();
  const section = useRef<HTMLElement>(null);
  const brideCard = useRef<HTMLDivElement>(null);
  const groomCard = useRef<HTMLDivElement>(null);
  const centerpiece = useRef<HTMLDivElement>(null);
  const { couple, ui } = weddingData;

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      const targets = [brideCard.current, groomCard.current, centerpiece.current];
      if (reduced) { gsap.set(targets, { autoAlpha: 1, clearProps: "transform" }); return; }
      gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 70%", once: true } })
        .fromTo(brideCard.current, { autoAlpha: 0, x: isMobile ? 0 : -40, y: isMobile ? 22 : 0 }, { autoAlpha: 1, x: 0, y: 0, duration: .8, ease: "power3.out" })
        .fromTo(centerpiece.current, { autoAlpha: 0, scale: .8 }, { autoAlpha: 1, scale: 1, duration: .5, ease: "power2.out" }, "-=.35")
        .fromTo(groomCard.current, { autoAlpha: 0, x: isMobile ? 0 : 40, y: isMobile ? 22 : 0 }, { autoAlpha: 1, x: 0, y: 0, duration: .8, ease: "power3.out" }, "-=.4");
    }, section);
    return () => ctx.revert();
  }, []);

  return <section ref={section} id="couple" className="overflow-hidden bg-secondary px-6 py-24 sm:py-32"><SectionContainer><SectionTitle eyebrow={t(ui.couple.eyebrow)} title={t(ui.couple.heading)}/><div className="mt-16 grid items-start gap-16 lg:grid-cols-[minmax(0,1fr)_150px_minmax(0,1fr)] lg:gap-10"><div><div ref={brideCard} className="invisible mx-auto max-w-sm text-center"><PortraitFrame image={couple.brideImage} name={couple.brideName}/><p className="type-caption mt-7 text-gold">{t(ui.couple.brideLabel)}</p><h2 className="font-display mt-2 text-4xl text-dark-maroon">{couple.brideName}</h2><ParentDetails relationship={t(ui.couple.brideRelationship)} father={couple.brideParents.father} mother={couple.brideParents.mother} addressLabel={t(ui.couple.addressLabel)} address={couple.brideAddress}/></div></div><div ref={centerpiece} className="invisible mx-auto flex flex-col items-center"><BengaliAlpana className="w-32 text-gold"/><span className="font-display my-3 text-5xl text-maroon">&amp;</span><span className="h-12 w-px bg-gold/70"/></div><div><div ref={groomCard} className="invisible mx-auto max-w-sm text-center"><PortraitFrame image={couple.groomImage} name={couple.groomName}/><p className="type-caption mt-7 text-gold">{t(ui.couple.groomLabel)}</p><h2 className="font-display mt-2 text-4xl text-dark-maroon">{couple.groomName}</h2><ParentDetails relationship={t(ui.couple.groomRelationship)} father={couple.groomParents.father} mother={couple.groomParents.mother} addressLabel={t(ui.couple.addressLabel)} address={couple.groomAddress}/></div></div></div></SectionContainer></section>;
}
