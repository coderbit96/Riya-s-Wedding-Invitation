import Image from "next/image";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { FloralDivider } from "@/components/ui/FloralDivider";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { FamilyInfo } from "@/types";
import { weddingData } from "@/data/weddingData";

function FamilyColumn({ title, family, reverse = false }: { title: string; family: FamilyInfo; reverse?: boolean }) {
  return <div className={`px-2 py-4 text-center ${reverse ? "lg:border-l lg:border-gold/35 lg:pl-14" : "lg:pr-14"}`}>{family.photo && <div className="relative mx-auto mb-8 aspect-[16/7] max-w-md overflow-hidden rounded-full border border-gold/50 p-1"><div className="relative h-full overflow-hidden rounded-full"><Image src={family.photo} alt={family.photoAlt ?? title} fill className="object-cover" sizes="(max-width: 768px) 90vw, 38vw"/></div></div>}<p className="type-caption text-gold">{title}</p><FloralDivider className="my-5"/><div className="space-y-5">{family.members.map((member) => <div key={`${member.name}-${member.relation}`}><p className="font-display text-2xl text-dark-maroon">{member.name}</p><p className="mt-1 text-sm text-muted">{member.relation}</p></div>)}</div>{family.message && <p className="font-display mx-auto mt-8 max-w-sm border-t border-gold/30 pt-6 text-xl italic leading-8 text-maroon">{family.message}</p>}</div>;
}

export function Family() { const { families, ui } = weddingData; return <section className="bg-secondary px-6 py-24 sm:py-32"><SectionContainer><SectionTitle eyebrow={ui.families.eyebrow} title={ui.families.title}/><p className="font-display mt-4 text-center text-2xl text-maroon">{ui.families.englishHeading}</p><div className="mx-auto mt-16 grid max-w-5xl gap-14 lg:grid-cols-2 lg:gap-0"><AnimatedReveal><FamilyColumn title={ui.families.brideLabel} family={families.brideFamily}/></AnimatedReveal><AnimatedReveal delay={.1}><FamilyColumn title={ui.families.groomLabel} family={families.groomFamily} reverse/></AnimatedReveal></div></SectionContainer></section>; }
