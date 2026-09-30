"use client";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import { useWeddingLanguage } from "@/components/WeddingLanguage";

export function MobileActionBar() {
  const { t } = useWeddingLanguage();
  const whatsappUrl = `https://wa.me/${weddingData.contact.whatsapp}?text=${encodeURIComponent(weddingData.contact.whatsappMessage)}`;
  return <nav aria-label="Quick wedding actions" className="mobile-action-bar"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{t("RSVP")}</a><a href="#venue"><MapPin size={17}/>{t("Venue")}</a><a href={`tel:${weddingData.contact.phone}`}><Phone size={17}/>{t("Call")}</a></nav>;
}
