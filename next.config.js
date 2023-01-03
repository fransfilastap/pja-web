/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withPlaiceholder } = require('@plaiceholder/next');

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['images.unsplash.com', 'res.cloudinary.com']
	},
	experimental: {
		forceSwcTransforms: false
	}
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});
module.exports = withBundleAnalyzer(withPlaiceholder(nextConfig));
