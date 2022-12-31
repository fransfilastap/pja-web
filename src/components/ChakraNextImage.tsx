import { Box, BoxProps } from '@chakra-ui/react';

import Image, { ImageProps } from 'next/image';
import cloudinary from '@/lib/cloudinary';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
    </filter>
  </defs>  
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" filter="url(#f1)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
	typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export type ChakraNextImageProps = Pick<ImageProps, 'alt' | 'src' | 'quality'> &
	BoxProps & {
		imageFit?: 'cover' | 'contain' | 'fill' | null;
		imageFitPosition?: string | null;
	};

function ChakraNextImage(props: ChakraNextImageProps) {
	const { src, alt, quality, imageFit, imageFitPosition, ...rest } = props;
	const { placeholder, original } = cloudinary(src as string);

	/*	const base64Url = useMemo(async () => {
		const response = await fetch(placeholder);
		const buffer = await response.arrayBuffer();
		const data = Buffer.from(buffer).toString('base64');
		setLoading(false)
		return `data:image/webp;base64,${data}`;
	},[placeholder]);*/

	return (
		<Box
			{...rest}
			pos='relative'
			cursor='pointer'
			className='group'
			display='flex'
			flexDir='column'
			overflow='hidden'
			p={0}>
			<Image
				quality={quality}
				placeholder='blur'
				fill
				sizes={'60vw'}
				style={{
					objectFit: imageFit ?? 'cover',
					objectPosition: imageFitPosition ?? 'center'
				}}
				blurDataURL={placeholder}
				src={original}
				alt={alt}
			/>
		</Box>
	);
}

export { ChakraNextImage, shimmer, toBase64 };
