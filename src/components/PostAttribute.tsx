import { chakra, ChakraProps, HStack, Icon } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { IconType } from 'react-icons/lib'

export type PostAttributeProps = {
  icon?: IconType
} & ChakraProps

const PostAttribute: React.FunctionComponent<PropsWithChildren<PostAttributeProps>> = (props): React.ReactElement => {
  const { icon, color, children, ...rest } = props

  return (
    <HStack justifyContent='flex-start' gap={0}>
      {props.icon && <Icon as={icon} color={color} />}
      <chakra.span color={color} {...rest} fontSize={'sm'}>
        {children}
      </chakra.span>
    </HStack>
  )
}

export default PostAttribute
