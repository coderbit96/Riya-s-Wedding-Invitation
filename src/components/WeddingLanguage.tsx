import { createContext, useContext } from "react";

type WeddingLanguageValue = { t: (text: string) => string };
const WeddingLanguageContext = createContext<WeddingLanguageValue>({ t: (text) => text });

/** English-only compatibility provider retained so existing content components need no behavior changes. */
export function WeddingLanguageProvider({ children }: { children: React.ReactNode }) {
  return <WeddingLanguageContext.Provider value={{ t: (text) => text }}>{children}</WeddingLanguageContext.Provider>;
}

export const useWeddingLanguage = () => useContext(WeddingLanguageContext);
