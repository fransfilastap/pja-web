/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'how-to-bphn.notion.site', 'images.unsplash.com']
  }
}

module.exports = nextConfig
