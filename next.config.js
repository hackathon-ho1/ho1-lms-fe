/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/lecture',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
