import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

import { extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';
import { components } from '@/theme/components';
import config from '@/theme/config';
import fonts from '@/theme/fonts';
import styles from '@/theme/styles';
import { colors } from '@/theme/colors';

const index = extendTheme(
	{
		components,
		fonts,
		config,
		styles,
		colors
	},
	withProse({
		baseStyle: (props: StyleFunctionProps) => ({
			a: {
				color: mode('violet.60', 'violet.40')(props),
				fontWeight: 'semibold',
				textDecoration: 'underline'
			},
			table: {
				fontSize: 'sm'
			},
			pre: {
				fontSize: 'sm',
				margin: 0
			},
			_hover: {
				a: {
					color: mode('violet.80', 'violet.30')(props)
				}
			}
		})
	})
);

export default index;
