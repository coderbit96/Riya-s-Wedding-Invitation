"use client";
import { useState } from "react";

/** Hidden automatically until the matching optional artwork is added to public/images. */
export function OptionalArtwork({ src, className = "" }: { src: string; className?: string }) {
  const [available, setAvailable] = useState(true);
  if (!available) return null;
  // This deliberately supports files that may not exist yet; it is hidden on a 404 and only serves optional ornament artwork.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" aria-hidden className={className} onError={() => setAvailable(false)}/>;
}
