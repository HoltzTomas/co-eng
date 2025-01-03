import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
