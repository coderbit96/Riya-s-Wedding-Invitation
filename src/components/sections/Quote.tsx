"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BengaliAlpana } from "@/components/ui/BengaliAlpana";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { weddingData } from "@/data/weddingData";

gsap.registerPlugin(ScrollTrigger);

export function Quote() {
  const section = useRef<HTMLElement>(null);
  const lines = useRef<HTMLDivElement>(null);
  const ornament = useRef<HTMLDivElement>(null);
  const details = useRef<HTMLDivElement>(null);
  const { quote, ui, couple } = weddingData;
  const quoteLines = quote.lines?.length ? quote.lines : [quote.text];

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const lineElements = gsap.utils.toArray<HTMLElement>(".blessing-line");

      if (reducedMotion) {
        gsap.set([lineElements, ornament.current, details.current], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 72%", once: true } })
        .fromTo(ornament.current, { autoAlpha: 0, scale: .85 }, { autoAlpha: 1, scale: 1, duration: .55, ease: "power3.out" })
        .fromTo(lineElements, { autoAlpha: 0, yPercent: 115 }, { autoAlpha: 1, yPercent: 0, duration: .72, stagger: .16, ease: "power4.out" }, "-=.25")
        .fromTo(details.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .45, ease: "power2.out" }, "-=.25");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative isolate overflow-hidden bg-dark-maroon px-6 py-32 text-center sm:py-44">
      <Image src={quote.backgroundImage ?? couple.coupleImage} alt="" fill className="-z-20 object-cover" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-dark-maroon/85" />
      <div className="mx-auto max-w-5xl">
        <div ref={ornament} className="invisible">
          <BengaliAlpana className="mx-auto w-36 text-gold" />
        </div>
        <p className="eyebrow mt-7 !text-gold">{ui.blessing.eyebrow}</p>
        <h2 className="font-display mt-4 text-3xl text-background sm:text-4xl">{ui.blessing.heading}</h2>
        <DecorativeDivider className="mt-8" />
        <div ref={lines} className="mt-11 space-y-2 overflow-hidden font-display text-4xl leading-tight text-background sm:text-6xl lg:text-7xl">
          {quoteLines.map((line, index) => (
            <div key={`${line}-${index}`} className="overflow-hidden pb-4">
              <p className="blessing-line invisible pb-2">{line}</p>
            </div>
          ))}
        </div>
        <div ref={details} className="invisible mx-auto mt-10 max-w-2xl">
          {quote.context && <p className="font-display text-xl leading-8 text-background/90 sm:text-2xl">{quote.context}</p>}
          {quote.dateLine && <p className="type-caption mt-7 text-gold">{quote.dateLine}</p>}
          <p className="type-caption mt-4 text-gold/80">&mdash; {quote.author}</p>
        </div>
      </div>
    </section>
  );
}
