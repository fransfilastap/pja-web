import type { AppProps } from 'next/app';
import '@/styles.css';
import 'prismjs/themes/prism-okaidia.css';
import ChakraApplication from '@/components/Chakra';

export default function Website({ Component, pageProps }: AppProps) {
	return (
		<ChakraApplication>
			<Component {...pageProps} />
		</ChakraApplication>
	);
}
