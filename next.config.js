/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://opsmith-frontend.vercel.app',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
    // Connect to your live backend API
    OPSMITH_API_URL: process.env.OPSMITH_API_URL || 'https://api.opsmith.biz'
  },
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Connect to your live backend API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.opsmith.biz/api/:path*',
      },
    ]
  },
  // Optimize build for production
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

module.exports = nextConfig