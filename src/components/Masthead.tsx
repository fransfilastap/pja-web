import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import React, { FunctionComponent, ReactElement } from 'react';

interface MastheadProps {
	title: string;
	subTitle: string;
}

const Masthead: FunctionComponent<MastheadProps> = (props): ReactElement => {
	return (
		<Flex flexDir={'column'} h={'full'} alignItems={'flex-start'} justifyContent={'center'}>
			<Heading fontSize={'3xl'} fontWeight={'600'}>
				{`${props.title}.`}
			</Heading>
			<Text fontWeight={'500'} color={useColorModeValue('gray.600', 'gray.100')}>
				{`${props.subTitle}`}
			</Text>
		</Flex>
	);
};

export default Masthead;
