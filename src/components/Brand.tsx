import { Heading, HStack, Icon, useColorModeValue } from '@chakra-ui/react'
import { FiGlobe } from 'react-icons/fi'

export default function Brand() {
  return (
    <HStack
      gap={0}
      _after={{
        content: '" "',
        position: 'absolute',
        top: '50%',
        left: 0,
        width: 'full',
        height: '50%',
        bgColor: useColorModeValue('yellow.300', 'gray.600'),
        zIndex: -1
      }}
      position={'relative'}
    >
      <Icon as={FiGlobe} />
      <Heading whiteSpace={'break-spaces'} fontSize={'lg'} fontFamily={'monospace'}>
        fransfp.dev
      </Heading>
    </HStack>
  )
}
