import { chakra, ChakraProps, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

type HashTagProps = ChakraProps & {
	children: string;
};
const HashTag: React.FunctionComponent<HashTagProps> = ({ children, ...props }: HashTagProps): React.ReactElement => (
	<chakra.span
		color='blue.400'
		fontWeight='normal'
		_hover={{ cursor: 'pointer' }}
		bgGradient={useColorModeValue('linear(to-r, violet.50, purple.600)', 'linear(to-r, blue.500, blue.500)')}
		bgClip='text'
		fontSize={{ base: 'md', md: 'lg' }}
		{...props}>
		#{children}
	</chakra.span>
);

export default HashTag;
