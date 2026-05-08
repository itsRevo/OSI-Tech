/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/prices',
        destination: '/preise',
        permanent: true,
      },
      {
        source: '/booking',
        destination: '/termine',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
