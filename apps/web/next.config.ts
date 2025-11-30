import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
   transpilePackages: ["@repo/ui", "@repo/store"],
};

export default nextConfig;
