/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure external image domains
  images: {
    unoptimized: true, // Fix for Vercel production image loading
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arweave.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-af4818e955f442b2931c620d7cdee98e.r2.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
