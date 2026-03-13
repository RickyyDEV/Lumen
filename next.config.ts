import type { NextConfig } from 'next';
import './app/env';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/**')],
  },
};

export default nextConfig;
