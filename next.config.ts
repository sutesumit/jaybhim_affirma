/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "api.microlink.io",
          pathname: "/**", // Allow all paths under this domain
        },
      ],
  },
  // Remove webpack config for Turbopack
  transpilePackages: ['jquery', 'turn.js'],
};

export default nextConfig;