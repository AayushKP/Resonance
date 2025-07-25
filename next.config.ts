import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.extensions.push(".json");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "heritageit.edu",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    const isProdDomain =
      process.env.VERCEL_URL === "resonance-hitk.com" ||
      process.env.VERCEL_URL === "www.resonance-hitk.com";

    return [
      {
        source: "/robots.txt",
        destination: isProdDomain ? "/robots-prod.txt" : "/robots-noindex.txt",
      },
    ];
  },
};

export default nextConfig;
