import { Footer } from "@/components/sections/Footer";
import { Navigation } from "@/components/Navigation";
import { InvitationExperience } from "@/components/InvitationExperience";
import { Quote } from "@/components/sections/Quote";
import { Couple } from "@/components/sections/Couple";
import { Family } from "@/components/sections/Family";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Invitation } from "@/components/sections/Invitation";
import { Timeline } from "@/components/sections/Timeline";
import { Story } from "@/components/sections/Story";
import { RSVP } from "@/components/sections/RSVP";
import { Events } from "@/components/sections/Events";
import { Venue } from "@/components/sections/Venue";
import { Countdown } from "@/components/sections/Countdown";
import { weddingData } from "@/data/weddingData";
import { MobileActionBar } from "@/components/MobileActionBar";

export default function Home() {
  return <InvitationExperience><Navigation /><main><Hero /><Couple /><Invitation /><Countdown />{weddingData.story.visible && <Story />}<Events /><Gallery /><Family /><Venue />{weddingData.timeline.visible && <Timeline />}<Quote /><RSVP /></main><Footer /><MobileActionBar /></InvitationExperience>;
}
