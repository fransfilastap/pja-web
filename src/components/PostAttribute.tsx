import { chakra, HStack, Icon } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { IconType } from 'react-icons/lib'

export type PostAttributeProps = {
  icon: IconType
}

const PostAttribute: React.FunctionComponent<PropsWithChildren<PostAttributeProps>> = (props): React.ReactElement => (
  <HStack justifyContent='flex-start' gap={0}>
    <Icon as={props.icon} size='sm' />
    <chakra.span fontSize={{ base: 'sm', md: 'sm' }}>{props.children}</chakra.span>
  </HStack>
)

export default PostAttribute
