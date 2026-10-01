"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GalleryImage } from "@/types";

type Props = { photos: GalleryImage[]; activeIndex: number; onClose: () => void; onPrevious: () => void; onNext: () => void; };

export default function GalleryLightbox({ photos, activeIndex, onClose, onPrevious, onNext }: Props) {
  const touchStart = useRef<number | null>(null);
  const photo = photos[activeIndex];
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); if (event.key === "ArrowLeft") onPrevious(); if (event.key === "ArrowRight") onNext(); }; const previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKeyDown); return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); }; }, [onClose, onNext, onPrevious]);
  return <div role="dialog" aria-modal="true" aria-label={photo.alt} className="fixed inset-0 z-50 flex items-center justify-center bg-dark-maroon/95 p-4" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const difference = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(difference) > 48) { if (difference > 0) onPrevious(); else onNext(); } touchStart.current = null; }}><button type="button" aria-label="Close gallery" onClick={onClose} className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center border border-gold/60 text-background transition hover:bg-gold hover:text-dark-maroon"><X size={21}/></button><button type="button" aria-label="Previous image" onClick={onPrevious} className="absolute left-3 z-10 grid h-11 w-11 place-items-center text-background transition hover:text-gold sm:left-7"><ChevronLeft size={32}/></button><div className="relative h-[78vh] w-full max-w-6xl"><Image src={photo.src} alt={photo.alt} fill loading="lazy" quality={80} className="object-contain" sizes="100vw"/><p className="absolute inset-x-0 -bottom-8 text-center font-display tracking-wide text-background">{photo.caption}</p></div><button type="button" aria-label="Next image" onClick={onNext} className="absolute right-3 z-10 grid h-11 w-11 place-items-center text-background transition hover:text-gold sm:right-7"><ChevronRight size={32}/></button></div>;
}
