import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import cloudinary from '@/lib/cloudinary';

export type LazyLoadImageProps = ImageProps & {
	asThumbnail?: boolean;
};
export const defaultPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
export const toBase64 = (str: string) =>
	typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

const LazyLoadImage: FunctionComponent<LazyLoadImageProps> = (props) => {
	const { src, alt, asThumbnail, ...rest } = props;
	const [blurPlaceholder, setBlurPlaceholder] = useState<string>(defaultPlaceholder);
	const { placeholder: blurPlaceholderUrl, original, thumbnail } = cloudinary(src as string);

	const getBase64BlurPlaceholder = useCallback(async (blurUrl: string) => {
		const response = await fetch(blurUrl);
		const buffer = await response.arrayBuffer();
		const data = Buffer.from(buffer).toString('base64');
		return `data:image/webp;base64,${data}`;
	}, []);

	useEffect(() => {
		getBase64BlurPlaceholder(blurPlaceholderUrl)
			.then((base64) => {
				setBlurPlaceholder(base64);
			})
			.catch(console.error);
	}, []);

	return (
		<Image
			src={asThumbnail ? thumbnail : original}
			placeholder={'blur'}
			blurDataURL={blurPlaceholder}
			alt={alt}
			{...rest}
		/>
	);
};

export default LazyLoadImage;
