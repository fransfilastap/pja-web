import { Flex, Heading } from '@chakra-ui/react';
import React, { FunctionComponent, ReactElement } from 'react';

interface MastheadProps {
	title: string;
	subTitle: string;
}

const Masthead: FunctionComponent<MastheadProps> = (props): ReactElement => {
	return (
		<Flex flexDir={'column'} h={'full'} alignItems={'flex-start'} justifyContent={'center'}>
			<Heading fontSize={'5xl'} fontWeight={'extrabold'}>
				{`${props.title}.`}
			</Heading>
			<Heading fontSize={'lg'} fontWeight={'medium'}>
				{`${props.subTitle}`}
			</Heading>
		</Flex>
	);
};

export default Masthead;
