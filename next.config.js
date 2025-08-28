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
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },

  // Redirect trailing slashes
  trailingSlash: false,

  // 301 Redirects for old numeric product IDs to prevent 404s
  async redirects() {
    return [
      // Redirect old numeric product URLs to homepage or 404
      {
        source: '/products/:id(\\d+)',
        destination: '/products',
        permanent: true,
      },
      // Block spam/malicious lander URLs
      {
        source: '/lander',
        destination: '/',
        permanent: true,
      },
      // Block common spam patterns
      {
        source: '/products/latest-rayon-printed-kurti-palazzo-set-:slug*',
        destination: '/products',
        permanent: true,
      },
      // Block malicious special characters
      {
        source: '/\\$',
        destination: '/',
        permanent: true,
      },
      {
        source: '/&',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);