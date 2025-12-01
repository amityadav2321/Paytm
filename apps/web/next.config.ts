import type { NextConfig } from "next";
import * as path from "path";
import * as dotenv from "dotenv";

// Load root-level .env file
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@repo/ui", "@repo/store"],
};

export default nextConfig;
