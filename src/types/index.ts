export type EventIcon = "sparkle" | "music" | "heart";
export interface Parents { father: string; mother: string; fatherBengali: string; motherBengali: string; }
export interface Address { locality: string; city: string; pin: string; localityBengali: string; cityBengali: string; pinBengali: string; }
export interface CoupleData { groomName: string; groomNameBengali: string; brideName: string; brideNameBengali: string; groomImage: string; brideImage: string; coupleImage: string; heroImage: string; groomParents: Parents; brideParents: Parents; groomAddress?: Address; brideAddress?: Address; }
export interface WeddingEvent { title: string; titleBengali: string; date: string; day: string; time: string; venue: string; address: string; visible: boolean; icon?: EventIcon; image?: string; imageAlt?: string; dressCode?: string; googleMapsUrl?: string; }
export interface GalleryImage { src: string; alt: string; caption: string; category?: string; aspect?: "portrait" | "landscape" | "square"; }
export interface FamilyMember { name: string; relation: string; }
export interface FamilyInfo { members: FamilyMember[]; message?: string; photo?: string; photoAlt?: string; }
export interface TimelineItem { title: string; year?: string; }

export interface WeddingData {
  weddingType: string;
  weddingTitleBengali: string;
  hosts: { primaryHost: string; secondaryHost: string; relationToBride: string; englishInvitation: string; bengaliInvitation: string; };
  couple: CoupleData;
  wedding: { date: string; displayDate: string; displayDateBengali: string; heroDate: string; time: string; timeBengali: string; location: string; announcement: string; invitationMessage: string; heroMessage: string; signOff: string; countdownImage: string; };
  story: { visible: boolean; eyebrow: string; heading: string; description: string; image: string; imageAlt: string; secondImage?: string; secondImageAlt?: string; milestone?: { eyebrow: string; title: string; description: string }; quote?: { text: string; author: string }; };
  events: WeddingEvent[];
  gallery: GalleryImage[];
  families: { groomFamily: FamilyInfo; brideFamily: FamilyInfo; extendedFamily: { brideSide: FamilyMember[]; groomSide: FamilyMember[] }; };
  venue: { eyebrow: string; name: string; nameBengali: string; address: string; addressBengali: string; date: string; time: string; image: string; imageAlt: string; googleMapsUrl: string; description: string; };
  timeline: { visible: boolean; items: TimelineItem[]; };
  quote: { text: string; lines?: string[]; author: string; backgroundImage?: string; };
  contact: { phone: string; displayPhone: string; whatsapp: string; whatsappMessage: string; whatsappMessageBengali?: string; email: string; coordinators: Array<{ name: string; phone: string }>; };
  social: { instagram: string; hashtag: string; };
  seo: { title: string; description: string; image: string; keywords: string[]; canonicalUrl?: string; ogTitle: string; ogDescription: string; siteName: string; twitterCard: "summary" | "summary_large_image"; favicon: string; };
  ui: { brandName: string; navigation: Array<{ label: string; href: string }>; hero: { label: string; subLabel: string; exploreLabel: string; scrollLabel: string }; couple: { eyebrow: string; heading: string; brideLabel: string; groomLabel: string; brideRelationship: string; groomRelationship: string; addressLabel: string; }; invitation: { eyebrow: string; heading: string; closing: string }; countdown: { eyebrow: string; heading: string; days: string; hours: string; minutes: string; seconds: string; completedMessage: string }; events: { eyebrow: string; title: string }; gallery: { eyebrow: string; title: string; backgroundImage?: string }; families: { eyebrow: string; title: string; englishHeading: string; groomLabel: string; brideLabel: string }; timeline: { eyebrow: string; title: string }; blessing: { eyebrow: string; heading: string }; venue: { directionsLabel: string; contactLabel: string }; rsvp: { eyebrow: string; heading: string; description: string; whatsappLabel: string; callLabel: string }; preloader: { label: string }; footer: { withLove: string; closingLine: string; copyright: string }; };
  translations?: Record<string, string>;
}
