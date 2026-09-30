"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { weddingData } from "@/data/weddingData";

const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), { ssr: false });
gsap.registerPlugin(ScrollTrigger);
const aspectClasses = { portrait: "aspect-[3/4]", landscape: "aspect-[4/3]", square: "aspect-square" };

export function Gallery() {
  const section = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  useLayoutEffect(() => { const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; const ctx = gsap.context(() => { const photos = gsap.utils.toArray<HTMLElement>(".gallery-item"); if (reducedMotion) { gsap.set(photos, { autoAlpha: 1, clearProps: "clipPath,transform" }); return; } gsap.fromTo(photos, { autoAlpha: 0, clipPath: "inset(8% 6% 8% 6%)", y: 18 }, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: .65, ease: "power3.out", stagger: .1, scrollTrigger: { trigger: section.current, start: "top 75%", once: true } }); }, section); return () => ctx.revert(); }, []);
  const previous = () => setActiveIndex((current) => current === null ? null : (current - 1 + weddingData.gallery.length) % weddingData.gallery.length);
  const next = () => setActiveIndex((current) => current === null ? null : (current + 1) % weddingData.gallery.length);
  return <section ref={section} id="gallery" className="bg-background px-6 py-24 sm:py-36"><SectionTitle eyebrow={weddingData.ui.gallery.eyebrow} title={weddingData.ui.gallery.title}/><div className="mx-auto mt-16 max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3">{weddingData.gallery.map((photo, index) => <button key={`${photo.src}-${photo.caption}-${index}`} type="button" onClick={() => setActiveIndex(index)} className="gallery-item group relative mb-5 block w-full break-inside-avoid cursor-zoom-in overflow-hidden bg-dark-maroon text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"><div className={`image-zoom relative ${aspectClasses[photo.aspect ?? "portrait"]}`}><Image src={photo.src} alt={photo.alt} fill loading="lazy" className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"/></div><span className="absolute inset-x-0 bottom-0 bg-dark-maroon/75 px-5 pb-4 pt-10 font-display text-sm tracking-wide text-background opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">{photo.caption}</span></button>)}</div>{activeIndex !== null && <GalleryLightbox photos={weddingData.gallery} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onPrevious={previous} onNext={next}/>}</section>;
}
