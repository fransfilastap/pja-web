import React, { ReactElement } from 'react'
import {
  chakra,
  Box,
  Flex,
  HStack,
  ChakraProps,
  useColorModeValue,
  Container,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { FiMenu, FiX } from 'react-icons/fi'
import NavLink, { NavLinkProps } from '@/components/NavLink'
import ColorToggleButton from '@/components/ColorToggleButton'
import BasicMeta from '@/components/meta/BasicMeta'
import OpenGraphMeta from '@/components/meta/OpenGraphMeta'
import Brand from '@/components/Brand'

export type LayoutProps = {
  children: React.ReactNode
}

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
)

export type NavProps = ChakraProps

const Nav: React.FunctionComponent<NavProps> = ({ ...rest }): React.ReactElement => (
  <chakra.header
    display='flex'
    flexDir='row'
    justifyContent='space-between'
    alignItems='center'
    css={{ position: 'sticky', top: 0 }}
    bgColor={useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(0, 0, 0, 0.5)')}
    backdropFilter='blur(8px)'
    boxShadow={'sm'}
    zIndex={20}
    w='full'
    h='16'
    p={{ base: 4, md: 0 }}
    {...rest}
  >
    <Container maxW='container.md'>
      <chakra.nav w='full' display='flex' flexDir='row' justifyContent='space-between' alignItems='center'>
        <HStack gap={3}>
          <Brand />
          <MainNavLink to='/'>
            <chakra.span>Home</chakra.span>
          </MainNavLink>
          <MainNavLink to='/blog'>
            <chakra.span>Blog</chakra.span>
          </MainNavLink>
          <MainNavLink to='/about'>
            <chakra.span>About</chakra.span>
          </MainNavLink>
        </HStack>
        <HStack>
          <ColorToggleButton />
          <MobileMenuToggle />
        </HStack>
      </chakra.nav>
    </Container>
  </chakra.header>
)

export type MainNavLinkProps = NavLinkProps

const MainNavLink: React.FunctionComponent<MainNavLinkProps> = ({
  to,
  children
}: MainNavLinkProps): React.ReactElement => {
  const activeColor = useColorModeValue('black', 'white')
  const hoverColor = useColorModeValue('black', 'white')

  return (
    <NavLink
      to={to}
      w={'full'}
      fontSize='md'
      fontWeight='bold'
      display={{ base: 'none', md: 'flex' }}
      flexDir='row'
      justifyContent='space-around'
      gap='1'
      alignItems='center'
      activeProps={{ color: activeColor, fontWeight: 'bold' }}
      _hover={{ color: hoverColor }}
    >
      {children}
    </NavLink>
  )
}

function MobileMenuToggle(): ReactElement {
  return (
    <chakra.div display={{ base: 'block', md: 'none' }}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton as={IconButton} icon={isOpen ? <FiX /> : <FiMenu />} />
            <MenuList>
              <MenuItem>
                <NavLink w='full' _hover={{ textDecor: 'none' }} to='/'>
                  Home
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink w='full' _hover={{ textDecor: 'none' }} to='/blog'>
                  Blog
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink w='full' _hover={{ textDecor: 'none' }} to='/works'>
                  Works
                </NavLink>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </chakra.div>
  )
}

type FooterProps = ChakraProps
const Footer: React.FunctionComponent<FooterProps> = ({ ...props }: FooterProps): React.ReactElement => {
  const date = new Date()

  return (
    <chakra.footer
      h='14'
      p='2'
      borderTop='1px'
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      mt='2'
      display='flex'
      flexDir='column'
      justifyContent='center'
      alignContent='center'
      alignItems='center'
      {...props}
    >
      <Container maxW='container.md'>
        <Flex h='full' w='full' direction='row' justifyContent='flex-start' alignContent='center' alignItems='center'>
          <chakra.span fontSize='sm'>
            &copy; {`${date.getFullYear()} Frans Filasta Pratama. All rights reserved`}
          </chakra.span>
        </Flex>
      </Container>
    </chakra.footer>
  )
}

export { Layout, Nav, MainNavLink, Footer }
