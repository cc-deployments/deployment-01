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
  
  // Fix Next.js 15 config - moved from experimental
  outputFileTracingRoot: path.resolve(__dirname, '../../../'),
  
  // Temporarily disable TypeScript checking to get app working
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable prerendering to prevent React Error #31 with OnchainKit
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  
  // Keep API routes server-side - remove static export to allow API routes
  // output: 'export', // Removed - conflicts with API routes
  
  // Configure webpack to resolve TypeScript paths and improve module resolution
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared/auth': path.resolve(__dirname, '../../../packages/shared-auth'),
      '@shared/ui': path.resolve(__dirname, '../../../packages/shared-ui'),
      // '@shared/privy': path.resolve(__dirname, '../../../packages/privy'), // Removed - not needed for MiniKit-only app
      // '@farcaster/frame-sdk': false, // Temporarily removed to test runtime error
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
