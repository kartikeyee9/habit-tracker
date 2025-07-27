/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // 👈 This disables Turbopack internally
  },
};

module.exports = nextConfig;
