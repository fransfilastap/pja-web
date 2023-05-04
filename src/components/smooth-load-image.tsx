'use client'

import React, { FunctionComponent, useCallback, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import styles from './smooth-load-image.module.css';

const SmoothLoadImage: FunctionComponent<ImageProps> = (props) => {
	const [imageLoading, setImageLoading] = useState<boolean>(true);
	const onLoadingCompleteHandler = useCallback(() => {
		setTimeout(() => {
			setImageLoading(false);
		}, 300);
	}, []);

	return (
		<Image
			className={imageLoading ? styles['img-blur'] : 'unblur'}
			onLoadingComplete={onLoadingCompleteHandler}
			{...props}
		/>
	);
};

export default SmoothLoadImage;