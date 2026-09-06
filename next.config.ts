import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Mike',
  assetPrefix: '/Mike',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
