import { ComponentStyleConfig } from '@chakra-ui/react'

const Button: ComponentStyleConfig = {
  baseStyle: {},
  variants: {
    solid: {
      bgColor: 'violet.50',
      color: 'white',
      _hover: {
        bgColor: 'violet.60'
      }
    }
  }
}

export { Button }
