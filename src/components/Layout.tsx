import React, { PropsWithChildren, ReactElement } from 'react';
import {
	Box,
	chakra,
	ChakraProps,
	Flex,
	Heading,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorModeValue
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import ColorToggleButton from '@/components/ColorToggleButton';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import { Container } from '@/components/ContentComponent';
import { MainNavLink } from '@/components/MainNavLink';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

const Layout: React.FunctionComponent<PropsWithChildren> = ({ children }: PropsWithChildren): ReactElement => (
	<Box as='div'>
		<BasicMeta />
		<OpenGraphMeta />
		<Flex direction='column' justifyContent='flex-start' w='full'>
			<Nav />
			<chakra.main flex='1' p={0} minH='100vh'>
				<chakra.div className={'beams'} position={'absolute'} h={'40vh'} w={'100%'} zIndex={'-1'}></chakra.div>
				{children}
			</chakra.main>
			<Footer />
		</Flex>
	</Box>
);

export type NavProps = ChakraProps;

const Nav: React.FunctionComponent<NavProps> = ({ ...rest }): React.ReactElement => (
	<chakra.header
		display='flex'
		flexDir='row'
		justifyContent='space-between'
		alignItems='center'
		css={{ position: 'sticky', top: 0 }}
		bgColor={useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(0, 0, 0, 0.5)')}
		backdropFilter='blur(8px)'
		zIndex={20}
		w='full'
		h='16'
		{...rest}>
		<Container maxW='container.md'>
			<chakra.nav w='full' display='flex' flexDir='row' justifyContent='space-between' alignItems='center'>
				<MobileMenuToggle />
				<Link href={'/'}>
					<Heading size={'1.2em'} fontWeight={{ base: '500', md: '500' }}>
						fransfp.dev
					</Heading>
				</Link>
				<HStack>
					<Box
						display={{ base: 'none', md: 'flex' }}
						px={4}
						flexDir={'row'}
						justifyContent={'space-between'}
						gap={{ base: 4, md: 6 }}
						borderRight='1px'
						_light={{ borderRightColor: 'gray.200' }}
						_dark={{ borderRightColor: 'gray.700' }}>
						<MainNavLink to='/'>Home</MainNavLink>
						<MainNavLink to='/blog'>Blog</MainNavLink>
						<MainNavLink to='/about'>About</MainNavLink>
					</Box>
					<ColorToggleButton />
				</HStack>
			</chakra.nav>
		</Container>
	</chakra.header>
);

function MobileMenuToggle(): ReactElement {
	return (
		<chakra.div display={{ base: 'block', md: 'none' }}>
			<Menu>
				<MenuButton
					bgColor={'transparent'}
					as={IconButton}
					aria-labelledby={'menu'}
					_hover={{ bgColor: 'transparent' }}
					icon={<FiMenu color={useColorModeValue('black', 'white')} />}
				/>
				<MenuList>
					<MenuItem>
						<MainNavLink w='full' _hover={{ textDecor: 'none' }} to='/'>
							Home
						</MainNavLink>
					</MenuItem>
					<MenuItem>
						<MainNavLink w='full' _hover={{ textDecor: 'none' }} to='/blog'>
							Blog
						</MainNavLink>
					</MenuItem>
					<MenuItem>
						<MainNavLink w='full' _hover={{ textDecor: 'none' }} to='/about'>
							About
						</MainNavLink>
					</MenuItem>
				</MenuList>
			</Menu>
		</chakra.div>
	);
}

export { Layout, Nav };
