"use client";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BengaliAlpana } from "@/components/ui/BengaliAlpana";
import { SecondaryLink } from "@/components/ui/Buttons";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { weddingData } from "@/data/weddingData";

gsap.registerPlugin(ScrollTrigger);

export function Venue() {
  const section = useRef<HTMLElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const { venue, ui } = weddingData;
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      if (reduced) { gsap.set([image.current, content.current], { autoAlpha: 1, clearProps: "transform" }); return; }
      gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 72%", once: true } })
        .fromTo(image.current, { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" }, { autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: .85, ease: "power3.inOut" })
        .fromTo(content.current, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: .7, ease: "power3.out" }, "-=.42");
      if (!isMobile) gsap.to(image.current, { yPercent: -4, ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: .8 } });
    }, section);
    return () => ctx.revert();
  }, []);
  return <section ref={section} id="venue" className="overflow-hidden bg-secondary px-6 py-24 sm:py-36"><SectionContainer className="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-24"><div ref={image} className="invisible relative"><span className="absolute -left-3 -top-3 z-10 h-20 w-20 border-l border-t border-gold"/><div className="image-zoom relative aspect-[5/4] overflow-hidden bg-dark-maroon"><Image src={venue.image} alt={venue.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw"/></div><span className="absolute -bottom-3 -right-3 h-20 w-20 border-b border-r border-gold"/></div><div ref={content} className="invisible text-center lg:text-left"><BengaliAlpana className="mx-auto w-28 text-gold lg:mx-0"/><p className="eyebrow mt-6">{venue.eyebrow}</p><h2 className="type-section-heading mt-3 text-dark-maroon">{venue.name}</h2><div className="my-7 h-px w-24 bg-gold/70 max-lg:mx-auto"/><p className="type-body text-muted">{venue.description}</p><div className="mt-8 space-y-3 border-y border-gold/30 py-6 text-sm text-dark-maroon"><p className="font-display text-lg">{venue.date} · {venue.time}</p><p className="flex items-start justify-center gap-2 text-muted lg:justify-start"><MapPin className="mt-1 shrink-0 text-maroon" size={16}/><span>{venue.address}</span></p></div>{venue.googleMapsUrl && <SecondaryLink href={venue.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-8"><ExternalLink size={16}/>{ui.venue.directionsLabel}</SecondaryLink>}</div></SectionContainer></section>;
}
