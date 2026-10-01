"use client";

import { FormEvent, useState } from "react";
import { Check, MessageCircle, Navigation, Phone } from "lucide-react";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { useWeddingLanguage } from "@/components/WeddingLanguage";
import { PrimaryButton, PrimaryLink, SecondaryLink } from "@/components/ui/Buttons";
import { weddingData } from "@/data/weddingData";

export function RSVP() {
  const { contact, ui, couple } = weddingData;
  const { t } = useWeddingLanguage();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const brideAddress = couple.brideAddress;
  const whatsappUrl = `https://wa.me/${contact.whatsapp.replaceAll(/[^0-9]/g, "")}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !attendance) {
      setError(t("Please share your name and response."));
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <section id="rsvp" className="bg-secondary px-5 py-20 text-center sm:px-6 sm:py-32">
      <AnimatedReveal className="mx-auto max-w-5xl">
        <p className="eyebrow">{t(ui.rsvp.eyebrow)}</p>
        <h2 className="font-display mt-4 text-5xl text-dark-maroon sm:text-6xl">{t(ui.rsvp.heading)}</h2>
        <div className="simple-rule mx-auto mt-6"/>
        <p className="font-display mx-auto mt-6 max-w-xl text-2xl leading-9 text-muted">{t(ui.rsvp.description)}</p>

        <div className="mt-10 grid gap-8 text-left lg:grid-cols-2 lg:items-stretch">
          {sent ? (
            <div role="status" className="premium-card grid place-items-center bg-background p-8 text-center">
              <div>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-maroon text-background"><Check/></span>
                <h3 className="font-display mt-5 text-3xl text-dark-maroon">{t("Thank you for celebrating with us.")}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{t("Your response has been noted. We look forward to seeing you.")}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="premium-card grid content-center gap-4 bg-background p-5 sm:p-7">
              <label className="grid gap-2 text-sm font-semibold text-dark-maroon">
                <span>{t("Your name")}</span>
                <input value={name} onChange={(event) => setName(event.target.value)} className="min-h-11 border border-gold/45 bg-background px-3 text-ink outline-none transition focus:border-maroon" autoComplete="name"/>
              </label>
              <fieldset className="grid gap-2">
                <legend className="text-sm font-semibold text-dark-maroon">{t("Will you be joining us?")}</legend>
                <div className="grid grid-cols-2 gap-3">
                  <label className="cursor-pointer"><input className="peer sr-only" type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={() => setAttendance("yes")}/><span className="flex min-h-11 items-center justify-center border border-gold/45 px-3 text-sm text-muted transition peer-checked:border-maroon peer-checked:bg-maroon peer-checked:text-background">{t("With joy, yes")}</span></label>
                  <label className="cursor-pointer"><input className="peer sr-only" type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={() => setAttendance("no")}/><span className="flex min-h-11 items-center justify-center border border-gold/45 px-3 text-sm text-muted transition peer-checked:border-maroon peer-checked:bg-maroon peer-checked:text-background">{t("With regrets")}</span></label>
                </div>
              </fieldset>
              {error && <p role="alert" className="text-sm text-maroon">{error}</p>}
              <PrimaryButton type="submit" className="w-full">{t(ui.rsvp.submitLabel)}</PrimaryButton>
            </form>
          )}

          {brideAddress?.googleMapsUrl && (
            <aside className="premium-card overflow-hidden bg-background">
              <div className="relative h-56 bg-secondary sm:h-64">
                {brideAddress.googleMapsEmbedUrl && <iframe title={t(ui.rsvp.mapHeading)} src={brideAddress.googleMapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0"/>}
              </div>
              <div className="p-5 sm:p-7">
                <p className="type-caption text-gold">{t(ui.rsvp.mapHeading)}</p>
                <p className="font-display mt-2 text-2xl text-dark-maroon">{brideAddress.locality}, {brideAddress.city}</p>
                <p className="mt-2 text-sm text-muted">PIN – {brideAddress.pin}</p>
                <p className="mt-4 text-sm leading-7 text-muted">{t(ui.rsvp.mapDescription)}</p>
                <SecondaryLink href={brideAddress.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-6"><Navigation size={16}/>{t(ui.rsvp.mapButtonLabel)}</SecondaryLink>
              </div>
            </aside>
          )}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <PrimaryLink href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{t(ui.rsvp.whatsappLabel)}</PrimaryLink>
          <SecondaryLink href={`tel:${contact.phone}`}><Phone size={17}/>{t(ui.rsvp.callLabel)}</SecondaryLink>
        </div>
      </AnimatedReveal>
    </section>
  );
}
