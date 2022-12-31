import NavLink, { NavLinkProps } from '@/components/NavLink';
import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';

export type MainNavLinkProps = Omit<NavLinkProps, 'hasActiveState'>;
const MainNavLink: React.FunctionComponent<MainNavLinkProps> = ({
	to,
	children
}: MainNavLinkProps): React.ReactElement => {
	const activeColor = useColorModeValue('violet.50', 'violet.50');
	const hoverColor = useColorModeValue('black', 'white');

	return (
		<NavLink
			hasActiveState={true}
			to={to}
			w={'full'}
			fontSize='md'
			fontWeight='medium'
			flexDir='row'
			justifyContent='space-around'
			alignItems='center'
			activeProps={{ color: activeColor, fontWeight: 'bold' }}
			_hover={{ color: hoverColor }}>
			{children}
		</NavLink>
	);
};
export { MainNavLink };
