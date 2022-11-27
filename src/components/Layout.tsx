import React, { ReactElement } from 'react';
import {
	Box,
	chakra,
	ChakraProps,
	Flex,
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

export type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children }: LayoutProps): ReactElement => (
	<Box as='div'>
		<BasicMeta />
		<OpenGraphMeta />
		<Flex direction='column' justifyContent='flex-start' w='full'>
			<Nav />
			<chakra.main flex='1' p={0} minH='100vh'>
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
				<Box display={{ base: 'none', md: 'flex' }} flexDir={'row'} gap={{ base: 4, md: 2 }}>
					<MainNavLink to='/'>Home</MainNavLink>
					<MainNavLink to='/blog'>Blog</MainNavLink>
					<MainNavLink to='/about'>About</MainNavLink>
				</Box>
				<HStack>
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
				<MenuButton as={IconButton} icon={<FiMenu />} />
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
