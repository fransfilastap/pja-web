import { FunctionComponent, PropsWithChildren } from 'react';
import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import index from '@/theme';

const ChakraApp: FunctionComponent<PropsWithChildren> = (props) => {
	return (
		<ChakraProvider theme={index} colorModeManager={localStorageManager}>
			{props.children}
		</ChakraProvider>
	);
};

export default ChakraApp;
