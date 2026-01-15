import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
    ],
  },
  cacheComponents: true,
};

export default nextConfig;
