import { chakra, ChakraProps, HStack, Icon } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { IconType } from 'react-icons/lib'

export type PostAttributeProps = {
  icon?: IconType
} & ChakraProps

const PostAttribute: React.FunctionComponent<PropsWithChildren<PostAttributeProps>> = (props): React.ReactElement => (
  <HStack justifyContent='flex-start' gap={0}>
    {props.icon && <Icon as={props.icon} color={props.color} size='sm' />}
    <chakra.span {...props} fontSize={{ base: 'sm', md: 'sm' }}>
      {props.children}
    </chakra.span>
  </HStack>
)

export default PostAttribute
