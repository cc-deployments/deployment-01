/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@onchain-kit'], // or the actual package name
  images: {
    domains: ['images.unsplash.com', 'ipfs.io', 'gateway.pinata.cloud'],
  },
  webpack(config) {
    // Ensure Web Workers are treated as ES modules
    config.module.rules.push({
      test: /HeartbeatWorker\.js$/,
      type: 'asset/source',
    });
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  },
};

module.exports = nextConfig; 