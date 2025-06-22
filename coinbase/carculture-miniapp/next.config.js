/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'ipfs.io', 'gateway.pinata.cloud'],
  },
}

module.exports = nextConfig 