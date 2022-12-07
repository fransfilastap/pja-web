import { FunctionComponent, ReactNode } from 'react';
import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import theme from '@/theme';

interface ChakraAppProps {
	children: ReactNode;
}

const ChakraApp: FunctionComponent<ChakraAppProps> = ({ children }: ChakraAppProps) => {
	return (
		<ChakraProvider theme={theme} colorModeManager={localStorageManager}>
			{children}
		</ChakraProvider>
	);
};

export default ChakraApp;
