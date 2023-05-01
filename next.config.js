
const withVideos = require('next-videos')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = withVideos(nextConfig)
