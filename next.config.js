/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    'pino-pretty': false,
  },
}

module.exports = nextConfig
