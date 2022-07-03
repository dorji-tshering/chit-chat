/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
}

module.exports = nextConfig;

/**
 async redirects() {
    return [
      {
        source: '/',
        destination: '/logi',
        permanent: false,
      },
    ]
  },
 */
