import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow imports from outside the project directory
  experimental: {
    externalDir: true,
  },
  
  // Configure webpack to resolve TypeScript paths and improve module resolution
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared/auth': path.resolve(__dirname, '../../../packages/shared-auth'),
      '@shared/ui': path.resolve(__dirname, '../../../packages/shared-ui'),
      '@shared/privy': path.resolve(__dirname, '../../../packages/privy'),
      '@farcaster/frame-sdk': false, // Resolve Farcaster SDK dependency issue
    };
    
    // Improve module resolution for dynamic imports
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
  
  // Removed WalletConnect webpack config to prevent CSP errors
  
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
