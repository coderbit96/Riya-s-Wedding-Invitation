import type { ReactNode } from "react";
export function ImageFrame({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`relative p-2 before:absolute before:-inset-2 before:border before:border-gold/60 ${className}`}>{children}</div>; }
