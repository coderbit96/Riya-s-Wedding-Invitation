import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import { weddingData } from "@/data/weddingData";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const body = Lora({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const { seo } = weddingData;

export const metadata: Metadata = {
  metadataBase: seo.canonicalUrl ? new URL(seo.canonicalUrl) : undefined,
  title: seo.title,
  description: seo.description,
  keywords: [...seo.keywords],
  robots: { index: true, follow: true },
  alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
  icons: { icon: seo.favicon },
  openGraph: { type: "website", title: seo.ogTitle, description: seo.ogDescription, url: seo.canonicalUrl, siteName: seo.siteName, images: [{ url: seo.image, alt: seo.ogTitle }] },
  twitter: { card: seo.twitterCard, title: seo.ogTitle, description: seo.ogDescription, images: [seo.image] },
};

export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="en" className={`${display.variable} ${body.variable} scroll-smooth`}><body>{children}</body></html>; }
