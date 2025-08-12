/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Use ignore-loader to skip HeartbeatWorker.js files
    config.module.rules.push({
      test: /HeartbeatWorker\.js$/,
      use: 'ignore-loader'
    });
    return config;
  },
};

export default nextConfig; 