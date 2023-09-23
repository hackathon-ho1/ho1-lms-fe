/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/home',
        destination: '/lecture',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
