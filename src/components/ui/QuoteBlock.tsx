import type { ReactNode } from "react";
import { BengaliAlpana } from "./BengaliAlpana";
export function QuoteBlock({ children, className = "" }: { children: ReactNode; className?: string }) { return <blockquote className={`border-l-2 border-gold py-2 pl-6 ${className}`}><p className="type-quote text-dark-maroon">“{children}”</p><BengaliAlpana className="mt-3 w-24"/></blockquote>; }
