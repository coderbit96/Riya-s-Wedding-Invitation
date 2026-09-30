import type { NextConfig } from "next";
const nextConfig: NextConfig = { images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }], formats: ["image/avif", "image/webp"], qualities: [75, 80], minimumCacheTTL: 2_592_000 } };
export default nextConfig;
