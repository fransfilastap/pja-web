import { CLOUDINARY_CLOUD_NAME } from '@/config/env';

const cloudinaryBaseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`;
const cloudinaryWebImageDir = 'v1672477516/fransfp.dev';

export type CloudinaryImage = {
	placeholder: string;
	thumbnail: string;
	original: string;
};

export default function cloudinary(imageId: string): CloudinaryImage {
	const placeholderUrl = `${cloudinaryBaseUrl}/w_auto/dpr_auto/e_blur:1000,q_auto,f_webp/${cloudinaryWebImageDir}${imageId}`;
	const thumbnailUrl = `${cloudinaryBaseUrl}/w_500/q_auto,f_webp/${cloudinaryWebImageDir}${imageId}`;
	const original = `${cloudinaryBaseUrl}/dpr_auto/w_auto/f_webp/${cloudinaryWebImageDir}${imageId}`;
	return {
		placeholder: placeholderUrl,
		thumbnail: thumbnailUrl,
		original
	};
}
