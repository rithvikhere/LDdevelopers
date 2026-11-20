import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 92 is used for the hero residence image so it stays crisp at large sizes.
    qualities: [75, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
