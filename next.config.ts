import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'image.aladin.co.kr',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/aladin-api/:path*',
        destination: 'https://www.aladin.co.kr/ttb/api/:path*',
      },
    ];
  },
};

export default nextConfig;
