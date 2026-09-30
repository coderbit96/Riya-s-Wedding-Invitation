"use client";
import { createContext, useContext, useState } from "react";
import { Preloader } from "@/components/sections/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WeddingLanguageProvider } from "@/components/WeddingLanguage";

const InvitationReadyContext = createContext(false);
export const useInvitationReady = () => useContext(InvitationReadyContext);

export function InvitationExperience({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  return <WeddingLanguageProvider><InvitationReadyContext.Provider value={isReady}><SmoothScroll enabled={isReady}>{!isReady && <Preloader onComplete={() => setIsReady(true)}/>}<div className={isReady ? "opacity-100 transition-opacity duration-700" : "opacity-0"}>{children}</div></SmoothScroll></InvitationReadyContext.Provider></WeddingLanguageProvider>;
}
