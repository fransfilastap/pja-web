import type { DeepPartial, Theme } from '@chakra-ui/react';
import { Inter, Fira_Sans } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });
const fira = Fira_Sans({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700'] });

const fonts: DeepPartial<Theme['fonts']> = {
	heading: `${fira.style.fontFamily}`,
	body: `${inter.style.fontFamily}`
};

export default fonts;
