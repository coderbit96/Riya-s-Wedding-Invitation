"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { weddingData } from "@/data/weddingData";

export function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="pointer-events-none fixed inset-x-0 top-0 z-30"><nav className="pointer-events-auto mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full border border-gold/20 bg-dark-maroon/75 px-4 py-3 text-background shadow-lg backdrop-blur-md sm:mt-5 sm:px-6"><a href="#top" className="font-display text-lg tracking-[.12em] sm:text-xl">{weddingData.ui.brandName}</a><div className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[.12em] lg:flex">{weddingData.ui.navigation.map((item) => <a key={item.href} href={item.href} className="link-underline transition hover:text-gold">{item.label}</a>)}</div><button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid min-h-11 min-w-11 place-items-center rounded-full border border-gold/35 transition hover:bg-gold hover:text-dark-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden">{open ? <X size={20}/> : <Menu size={20}/>}</button></nav>{open && <div className="pointer-events-auto mx-4 mt-2 rounded-2xl border border-gold/20 bg-background p-4 text-center text-dark-maroon shadow-xl lg:hidden">{weddingData.ui.navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="link-underline block min-h-11 py-3 text-sm font-semibold">{item.label}</a>)}</div>}</header>;
}
