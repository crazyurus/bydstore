import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'byd-store-cdn-rel.byd.auto'
      },
      {
        protocol: 'https',
        hostname: 'profilesys.bydauto.com.cn'
      }
    ]
  }
};

export default nextConfig;
