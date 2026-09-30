import type { WeddingEvent } from "@/types";

export function eventCalendarHref(event: WeddingEvent) {
  const date = new Date(event.date);
  const start = Number.isNaN(date.getTime()) ? "20261211" : date.toISOString().slice(0, 10).replaceAll("-", "");
  const endDate = new Date(date.getTime() + 86400000);
  const end = Number.isNaN(endDate.getTime()) ? "20261212" : endDate.toISOString().slice(0, 10).replaceAll("-", "");
  const params = new URLSearchParams({ action: "TEMPLATE", text: event.title, dates: `${start}/${end}`, location: `${event.venue}, ${event.address}` });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
