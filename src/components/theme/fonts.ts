import type { DeepPartial, Theme } from '@chakra-ui/react';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

const fonts: DeepPartial<Theme['fonts']> = {
	heading: `${inter.style.fontFamily}`,
	body: `${inter.style.fontFamily}`
};

export default fonts;
