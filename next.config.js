/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  images: {
    // Domains can be updated to include external image sources when needed.
    domains: []
  }
};

module.exports = nextConfig;