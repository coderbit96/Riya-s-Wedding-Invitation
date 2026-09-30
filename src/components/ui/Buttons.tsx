"use client";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

type Shared = { children: ReactNode; className?: string };
type ButtonProps = Shared & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = Shared & AnchorHTMLAttributes<HTMLAnchorElement>;

const primary = "group inline-flex min-h-11 items-center justify-center gap-2 bg-maroon px-6 py-3.5 text-xs font-bold tracking-[.14em] text-background transition-[background-color,box-shadow,transform] duration-300 hover:bg-dark-maroon hover:shadow-[0_10px_25px_rgba(82,19,29,.2)] [&>svg]:transition-transform [&>svg]:duration-300 group-hover:[&>svg]:translate-x-0.5";
const secondary = "group inline-flex min-h-11 items-center justify-center gap-2 border border-gold px-6 py-3.5 text-xs font-bold tracking-[.14em] text-dark-maroon transition-[background-color,box-shadow,transform] duration-300 hover:bg-gold hover:text-dark-maroon [&>svg]:transition-transform [&>svg]:duration-300 group-hover:[&>svg]:translate-x-0.5";

function magneticMove(event: MouseEvent<HTMLElement>) { if (!window.matchMedia("(pointer: fine)").matches) return; const element = event.currentTarget; const box = element.getBoundingClientRect(); const x = (event.clientX - box.left - box.width / 2) / box.width; const y = (event.clientY - box.top - box.height / 2) / box.height; element.style.transform = `translate(${x * 4}px, ${y * 3}px) scale(1.015)`; }
function magneticReset(event: MouseEvent<HTMLElement>) { event.currentTarget.style.transform = ""; }

export function PrimaryButton({ children, className = "", onMouseMove, onMouseLeave, ...props }: ButtonProps) { return <button className={`${primary} ${className}`} onMouseMove={(event) => { magneticMove(event); onMouseMove?.(event); }} onMouseLeave={(event) => { magneticReset(event); onMouseLeave?.(event); }} {...props}>{children}</button>; }
export function PrimaryLink({ children, className = "", onMouseMove, onMouseLeave, ...props }: LinkProps) { return <a className={`${primary} ${className}`} onMouseMove={(event) => { magneticMove(event); onMouseMove?.(event); }} onMouseLeave={(event) => { magneticReset(event); onMouseLeave?.(event); }} {...props}>{children}</a>; }
export function SecondaryButton({ children, className = "", onMouseMove, onMouseLeave, ...props }: ButtonProps) { return <button className={`${secondary} ${className}`} onMouseMove={(event) => { magneticMove(event); onMouseMove?.(event); }} onMouseLeave={(event) => { magneticReset(event); onMouseLeave?.(event); }} {...props}>{children}</button>; }
export function SecondaryLink({ children, className = "", onMouseMove, onMouseLeave, ...props }: LinkProps) { return <a className={`${secondary} ${className}`} onMouseMove={(event) => { magneticMove(event); onMouseMove?.(event); }} onMouseLeave={(event) => { magneticReset(event); onMouseLeave?.(event); }} {...props}>{children}</a>; }
