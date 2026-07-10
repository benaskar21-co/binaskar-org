import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/:locale(ar|en)/services",
        destination: "/:locale#services",
        permanent: true,
      },
      {
        source: "/:locale(ar|en)/case-studies",
        destination: "/:locale#case-studies",
        permanent: true,
      },
      {
        source: "/:locale(ar|en)/about",
        destination: "/:locale#about",
        permanent: true,
      },
      {
        source: "/:locale(ar|en)/contact",
        destination: "/:locale#contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
