import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      "pdfjs-dist$": path.resolve(
        __dirname,
        "node_modules/pdfjs-dist/build/pdf.min.mjs"
      ),
      "pdfjs-dist": path.resolve(
        __dirname,
        "node_modules/pdfjs-dist/build/pdf.min.mjs"
      ),
    };
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
