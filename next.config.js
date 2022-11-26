/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['avatars.githubusercontent.com', 'images.unsplash.com']
	},
	experimental: {
		forceSwcTransforms: false
	}
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});
module.exports = withBundleAnalyzer(nextConfig);
