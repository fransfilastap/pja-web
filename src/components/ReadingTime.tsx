import { chakra, HStack, Icon } from '@chakra-ui/react';
import { FiClock } from 'react-icons/fi';
import React from 'react';

interface ReadingTimeProps {
	children: string;
}
const ReadingTime: React.FunctionComponent<ReadingTimeProps> = ({ children }: ReadingTimeProps): React.ReactElement => (
	<HStack justifyContent='flex-start' gap={0}>
		<Icon as={FiClock} size='sm' />
		<chakra.span fontSize={{ base: 'sm', md: 'sm' }}>{children}</chakra.span>
	</HStack>
);

export default ReadingTime;
