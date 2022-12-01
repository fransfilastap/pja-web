import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as ga from '@/lib/ga';
import '@/styles.css';
import 'prismjs/themes/prism-okaidia.css';
import ChakraApplication from '@/components/Chakra';
import { AnimatePresence } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';

export default function Website({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { toggleColorMode, colorMode } = useColorMode();

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			ga.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);

		return router.events.off('routeChangeComplete', handleRouteChange);
	}, [router.events]);

	useEffect(() => {
		if (localStorage.getItem('chakra-ui-color-mode') === 'light' && colorMode === 'dark') {
			setTimeout(() => toggleColorMode(), 1500);
		} else if (localStorage.getItem('chakra-ui-color-mode') === 'dark' && colorMode === 'light') {
			setTimeout(() => toggleColorMode(), 1500);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ChakraApplication>
			<AnimatePresence mode={'wait'} initial={true}>
				<Component {...pageProps} />
			</AnimatePresence>
		</ChakraApplication>
	);
}
