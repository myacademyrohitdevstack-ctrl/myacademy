/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-pdf", "pdfjs-dist"],
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
