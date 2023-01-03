import React, { FunctionComponent, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import styles from './index.module.css';

const SmoothTransitionImage: FunctionComponent<ImageProps> = (props) => {
	const [imageLoading, setImageLoading] = useState<boolean>(true);
	return (
		<Image
			className={imageLoading ? styles['img-blur'] : 'unblur'}
			onLoadingComplete={() => {
				setImageLoading(false);
			}}
			{...props}
		/>
	);
};

export default SmoothTransitionImage;
