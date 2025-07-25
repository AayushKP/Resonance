import type { NextConfig } from "next";

const isProd = process.env.VERCEL_ENV === "production";

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
    return [
      {
        source: "/robots.txt",
        destination: isProd ? "/robots-prod.txt" : "/robots-noindex.txt",
      },
    ];
  },
};

export default nextConfig;
