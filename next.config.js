/** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
