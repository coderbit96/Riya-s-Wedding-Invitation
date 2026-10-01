import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    minimumCacheTTL: 2_592_000,
  },
};

export default nextConfig;
