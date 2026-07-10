import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/:locale/services",
        destination: "/:locale#services",
        permanent: true,
      },
      {
        source: "/:locale/case-studies",
        destination: "/:locale#case-studies",
        permanent: true,
      },
      {
        source: "/:locale/about",
        destination: "/:locale#about",
        permanent: true,
      },
      {
        source: "/:locale/contact",
        destination: "/:locale#contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
