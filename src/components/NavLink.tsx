import React from 'react';
import { Link as ChakraLink, LinkProps, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export type NavLinkProps = LinkProps & {
	to: string;
	children?: string | React.ReactNode;
	activeProps?: LinkProps;
	_hover?: LinkProps;
};
const NavLink: React.FunctionComponent<NavLinkProps> = ({
	to,
	children,
	activeProps,
	_hover,
	...props
}: NavLinkProps): React.ReactElement => {
	const router = useRouter();
	const isActive = router.asPath === to;
	const color = useColorModeValue('gray.600', 'gray.400');

	if (isActive) {
		return (
			<NextLink href={to} legacyBehavior passHref>
				<ChakraLink color={color} _hover={_hover} {...props} {...activeProps}>
					{children}
				</ChakraLink>
			</NextLink>
		);
	}

	return (
		<NextLink href={to} legacyBehavior passHref>
			<ChakraLink {...props} color={color} _hover={_hover}>
				{children}
			</ChakraLink>
		</NextLink>
	);
};

export default NavLink;
