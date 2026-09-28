import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH (e.g. "/blissaway-website") when hosting under a subpath like GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
