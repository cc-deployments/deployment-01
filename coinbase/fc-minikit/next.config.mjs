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
  
  // Configure webpack to resolve TypeScript paths
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared/env': path.resolve(__dirname, '../../../packages/shared-config/env'),
      '@shared/auth': path.resolve(__dirname, '../../../packages/shared-auth'),
    };
    return config;
  },
  
  // Removed WalletConnect webpack config to prevent CSP errors
  
  // Configure external image domains
  images: {
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
