import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static generation completely to prevent React Error #31
  // output: 'export', // Removed - API routes can't be exported
  // trailingSlash: true, // Removed - not needed without export
  
  // Force dynamic rendering to prevent SSR issues with OnchainKit
  experimental: {
    // externalDir: true, // Disabled to prevent Next.js from scanning entire monorepo
  },
  
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

  // Force dynamic rendering for all pages to prevent SSR issues
  generateStaticParams: false,
  dynamicParams: true,
  
  // Disable static optimization entirely
  staticPageGenerationTimeout: 0,
  experimental: {
    // externalDir: true, // Disabled to prevent Next.js from scanning entire monorepo
    // Disable static optimization
    staticGenerationRetryCount: 0,
  },
};

export default nextConfig;
