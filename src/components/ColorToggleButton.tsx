import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import React from 'react';

function ColorToggleButton() {
	const { toggleColorMode, colorMode } = useColorMode();
	const bgColor = useColorModeValue('violet.10', 'gray.600');
	const color = useColorModeValue('violet.50', 'yellow.500');

	return (
		<IconButton
			size='md'
			icon={colorMode === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
			bgColor={bgColor}
			color={color}
			_hover={{ bgColor, color, border: '2px' }}
			onClick={toggleColorMode}
			aria-label='color toggle'
		/>
	);
}

export default ColorToggleButton;
