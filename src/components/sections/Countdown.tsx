"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { useWeddingLanguage } from "@/components/WeddingLanguage";
import { weddingData } from "@/data/weddingData";

type CountdownValue = { days: string; hours: string; minutes: string; seconds: string; complete: boolean };
const initialValue: CountdownValue = { days: "00", hours: "00", minutes: "00", seconds: "00", complete: false };

export function Countdown() {
  const [time, setTime] = useState<CountdownValue>(initialValue); const { t } = useWeddingLanguage();
  useEffect(() => { const update = () => { const difference = new Date(weddingData.wedding.date).getTime() - Date.now(); if (difference <= 0) { setTime({ ...initialValue, complete: true }); return; } setTime({ days: String(Math.floor(difference / 86400000)).padStart(2, "0"), hours: String(Math.floor(difference / 3600000) % 24).padStart(2, "0"), minutes: String(Math.floor(difference / 60000) % 60).padStart(2, "0"), seconds: String(Math.floor(difference / 1000) % 60).padStart(2, "0"), complete: false }); }; update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer); }, []);
  const labels = weddingData.ui.countdown; const items = [[time.days, t(labels.days)], [time.hours, t(labels.hours)], [time.minutes, t(labels.minutes)], [time.seconds, t(labels.seconds)]];
  return <section className="relative isolate overflow-hidden bg-dark-maroon px-6 py-24 sm:py-32"><Image src={weddingData.wedding.countdownImage} alt="" fill loading="lazy" className="-z-20 object-cover" sizes="100vw"/><div className="absolute inset-0 -z-10 bg-dark-maroon/75"/><AnimatedReveal className="relative mx-auto max-w-5xl text-center"><p className="type-caption text-gold">{t(labels.eyebrow)}</p><h2 className="font-display mt-4 text-4xl text-background sm:text-5xl">{t(labels.heading)}</h2><DecorativeDivider className="mt-7"/>{time.complete ? <p className="font-display mx-auto mt-12 max-w-xl text-2xl leading-10 text-background sm:text-3xl">{t(labels.completedMessage)}</p> : <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-start justify-center gap-y-8 sm:flex-nowrap sm:gap-0">{items.map(([value, label], index) => <div key={label} className="flex items-start"><div className="min-w-28 px-4 text-center sm:min-w-36"><p className="font-display text-6xl leading-none text-background sm:text-7xl">{value}</p><p className="type-caption mt-4 text-gold">{label}</p></div>{index < items.length - 1 && <span aria-hidden className="mt-7 hidden h-10 w-px bg-gold/60 sm:block"/>}</div>)}</div>}</AnimatedReveal></section>;
}
