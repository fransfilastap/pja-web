import type { DeepPartial, Theme } from '@chakra-ui/react';

import { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const styles: DeepPartial<Theme['styles']> = {
	global: (props: StyleFunctionProps) => ({
		_selection: {
			bg: 'purple.400',
			color: 'white'
		},
		body: {
			bg: mode('white', 'black')(props)
		}
	})
};

export default styles;
