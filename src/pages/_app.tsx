import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import ChakraApplication from '@/components/Chakra';
import '@/styles.css';
import '@/image.css';
import 'prismjs/themes/prism-okaidia.css';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { useMemo } from 'react';

const ProgressBarColor: Record<ColorMode, string> = {
	dark: '#5B21B6',
	light: '#8B5CF6'
};

export default function Website({ Component, pageProps }: AppProps) {
	const { colorMode } = useColorMode();
	const progressBarColor = useMemo(() => ProgressBarColor[colorMode], [colorMode]);
	return (
		<ChakraApplication>
			<NextNProgress color={progressBarColor} />
			<Component {...pageProps} />
		</ChakraApplication>
	);
}
