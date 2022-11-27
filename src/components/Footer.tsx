import { chakra, ChakraProps, Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Container } from '@/components/ContentComponent';
import NavLink, { NavLinkProps } from '@/components/NavLink';

type FooterProps = ChakraProps;
const Footer: React.FunctionComponent<FooterProps> = ({ ...props }: FooterProps): React.ReactElement => {
	const date = new Date();

	return (
		<Container maxW='container.md'>
			<chakra.footer
				h='14'
				mt='16'
				display='flex'
				flexDir='column'
				justifyContent='space-between'
				alignContent='center'
				alignItems='center'
				borderTop={'1px'}
				borderTopColor={useColorModeValue('gray.100', 'gray.800')}
				{...props}>
				<Flex
					w={'full'}
					direction={{ base: 'column', md: 'row' }}
					gap={2}
					py={8}
					justifyContent={{ md: 'space-between', base: 'flex-start' }}>
					<VStack flex={1} alignItems={'flex-start'}>
						<FooterLink to={'/'}>Home</FooterLink>
						<FooterLink to={'/blog'}>Blog</FooterLink>
						<FooterLink to={'/about'}>About</FooterLink>
					</VStack>
					<VStack flex={1} alignItems={'flex-start'}>
						<FooterLink to={'https://github.com/fransfilastap'}>Github</FooterLink>
						<FooterLink to={'https://linkedin.com/in/fransfilastapratama'}>LinkedIn</FooterLink>
					</VStack>
				</Flex>
				<Flex
					h='full'
					w='full'
					py={6}
					direction='row'
					justifyContent='space-between'
					alignContent='center'
					alignItems='center'>
					<chakra.span color={useColorModeValue('gray.600', 'gray.700')} fontSize='sm'>
						&copy; {`${date.getFullYear()} Frans Filasta Pratama. All rights reserved`}
					</chakra.span>
				</Flex>
			</chakra.footer>
		</Container>
	);
};

const FooterLink: FunctionComponent<PropsWithChildren<Omit<NavLinkProps, 'hasActiveState'>>> = (props) => {
	const { to, children, ...rest } = props;
	return (
		<NavLink
			{...rest}
			hasActiveState={false}
			color={'gray.300'}
			to={to}
			w={'full'}
			fontSize='md'
			fontWeight='normal'
			_hover={{ color: 'violet.50' }}>
			{children}
		</NavLink>
	);
};

export { Footer, FooterLink };
