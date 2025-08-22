/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Minimal config to prevent memory issues
  experimental: {
    workerThreads: false,
  },

  // Disable image optimization temporarily
  images: {
    unoptimized: true
  },

  // Performance optimizations
  compress: true,
  
  // Memory optimization
  output: 'standalone',
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Security headers
  poweredByHeader: false,
  generateEtags: false,

  // Optional: Add security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirect trailing slashes
  trailingSlash: false,
};

module.exports = withBundleAnalyzer(nextConfig);