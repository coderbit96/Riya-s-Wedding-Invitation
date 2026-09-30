"use client";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BengaliAlpana } from "@/components/ui/BengaliAlpana";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { QuoteBlock } from "@/components/ui/QuoteBlock";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { weddingData } from "@/data/weddingData";

gsap.registerPlugin(ScrollTrigger);

export function Story() {
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const firstImage = useRef<HTMLDivElement>(null);
  const firstCopy = useRef<HTMLDivElement>(null);
  const secondImage = useRef<HTMLDivElement>(null);
  const milestone = useRef<HTMLDivElement>(null);
  const { story } = weddingData;

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const elements = [heading.current, firstImage.current, firstCopy.current, secondImage.current, milestone.current];
      if (reducedMotion) { gsap.set(elements, { autoAlpha: 1, clearProps: "transform" }); return; }
      gsap.fromTo(heading.current, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: .65, ease: "power3.out", scrollTrigger: { trigger: heading.current, start: "top 84%", once: true } });
      gsap.fromTo(firstImage.current, { autoAlpha: 0, x: -34 }, { autoAlpha: 1, x: 0, duration: .7, ease: "power3.out", scrollTrigger: { trigger: firstImage.current, start: "top 80%", once: true } });
      gsap.fromTo(firstCopy.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .65, ease: "power3.out", scrollTrigger: { trigger: firstCopy.current, start: "top 82%", once: true } });
      if (story.secondImage && story.milestone) {
        gsap.fromTo(secondImage.current, { autoAlpha: 0, x: 34 }, { autoAlpha: 1, x: 0, duration: .7, ease: "power3.out", scrollTrigger: { trigger: secondImage.current, start: "top 82%", once: true } });
        gsap.fromTo(milestone.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .65, ease: "power3.out", scrollTrigger: { trigger: milestone.current, start: "top 82%", once: true } });
        const parallaxAmount = window.matchMedia("(max-width: 767px)").matches ? 2 : 5;
        gsap.to(firstImage.current, { yPercent: -parallaxAmount, ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "center center", scrub: .8 } });
        gsap.to(secondImage.current, { yPercent: parallaxAmount, ease: "none", scrollTrigger: { trigger: section.current, start: "center bottom", end: "bottom top", scrub: .8 } });
      }
    }, section);
    return () => ctx.revert();
  }, [story.secondImage, story.milestone]);

  return <section ref={section} id="story" className="overflow-hidden bg-background px-6 py-24 sm:py-36"><SectionContainer><div ref={heading} className="invisible mx-auto max-w-2xl text-center"><BengaliAlpana className="mx-auto w-32 text-gold"/><p className="eyebrow mt-5">{story.eyebrow}</p><h2 className="type-bengali-title mt-3 text-dark-maroon">{story.heading}</h2></div><div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-24"><div ref={firstImage} className="invisible mx-auto w-full max-w-xl"><ImageFrame><div className="image-zoom relative aspect-[4/5] overflow-hidden"><Image src={story.image} alt={story.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 52vw"/></div></ImageFrame></div><div ref={firstCopy} className="invisible"><p className="font-bengali text-2xl leading-10 text-dark-maroon sm:text-3xl sm:leading-[1.55]">{story.description}</p>{story.quote && <QuoteBlock className="mt-10">{story.quote.text}</QuoteBlock>} {story.quote?.author && <p className="type-caption mt-4 text-gold">— {story.quote.author}</p>}</div></div>{story.secondImage && story.milestone && <div className="mt-28 grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24"><div ref={milestone} className="invisible lg:order-1"><p className="eyebrow">{story.milestone.eyebrow}</p><h3 className="type-bengali-title mt-4 text-dark-maroon">{story.milestone.title}</h3><div className="my-7 h-px w-28 bg-gold/70"/><p className="type-body max-w-md text-muted">{story.milestone.description}</p></div><div ref={secondImage} className="invisible mx-auto w-full max-w-xl lg:order-2"><ImageFrame><div className="image-zoom relative aspect-[5/4] overflow-hidden"><Image src={story.secondImage} alt={story.secondImageAlt ?? story.milestone.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 52vw"/></div></ImageFrame></div></div>}</SectionContainer></section>;
}
