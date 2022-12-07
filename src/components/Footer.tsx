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
				<Flex w={'full'} direction={'row'} gap={2} py={8} justifyContent={{ md: 'space-between', base: 'flex-start' }}>
					<VStack flex={1} alignItems={'flex-start'}>
						<FooterLink to={'/'}>Home</FooterLink>
						<FooterLink to={'/blog'}>Blog</FooterLink>
						<FooterLink to={'/about'}>About</FooterLink>
						<FooterLink to={'/colophon'}>Colophon</FooterLink>
					</VStack>
					<VStack flex={1} alignItems={'flex-start'}>
						<FooterLink isExternal={true} to={'https://github.com/fransfilastap'}>
							Github
						</FooterLink>
						<FooterLink isExternal={true} to={'https://linkedin.com/in/fransfilastapratama'}>
							LinkedIn
						</FooterLink>
						<FooterLink isExternal={true} to={'https://poly.me/fransfilasta_pra'}>
							Polywork
						</FooterLink>
					</VStack>
				</Flex>
				<Flex
					h='full'
					w='full'
					py={6}
					direction='row'
					justifyContent={{ base: 'center', md: 'space-between' }}
					alignContent='center'
					alignItems='center'>
					<chakra.span color={useColorModeValue('gray.600', 'gray.500')} fontSize='sm'>
						&copy; {`${date.getFullYear()} Frans Filasta Pratama. All rights reserved`}
					</chakra.span>
				</Flex>
			</chakra.footer>
		</Container>
	);
};

type FooterLinkProps = PropsWithChildren<Omit<NavLinkProps, 'hasActiveState'>> & {
	isExternal?: boolean;
};

const FooterLink: FunctionComponent<FooterLinkProps> = ({ isExternal = false, ...props }: FooterLinkProps) => {
	const { to, children, ...rest } = props;
	return (
		<NavLink
			{...rest}
			hasActiveState={false}
			color={'gray.300'}
			display={'flex'}
			flexDir={'row'}
			gap={1}
			alignItems={'center'}
			to={to}
			w={'full'}
			fontSize='md'
			fontWeight='normal'
			_hover={{ color: 'violet.50' }}>
			{children}
			{isExternal && (
				<chakra.svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					h={5}
					w={5}>
					<path strokeLinecap='round' strokeLinejoin='round' d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25' />
				</chakra.svg>
			)}
		</NavLink>
	);
};

export { Footer, FooterLink };
