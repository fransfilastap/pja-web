import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'
import { Button, Link, Table } from '@/components/theme/components'
import { withProse } from '@nikolovlazar/chakra-ui-prose'

const theme = extendTheme(
  {
    components: {
      Button,
      Link,
      Table
    },
    config: {
      initialColorMode: 'light',
      useSystemColorMode: true
    },
    styles: {
      global: (props: StyleFunctionProps) => ({
        _selection: {
          bg: 'purple.400',
          color: 'white'
        },
        body: {
          bg: mode('white', 'black')(props)
        }
      })
    },
    colors: {
      brand: {
        border: '#2D8540',
        focusColor: '#4BDF6B'
      },
      violet: {
        5: '#F5F3FF',
        10: '#EDE9FE',
        20: '#DDD6FE',
        30: '#C4B5FD',
        40: '#A78BFA',
        50: '#8B5CF6',
        60: '#7C3AED',
        70: '#6D28D9',
        80: '#5B21B6',
        90: '#4C1D95'
      }
    }
  },
  withProse({
    baseStyle: (props: StyleFunctionProps) => ({
      a: {
        color: mode('violet.60', 'violet.40')(props),
        fontWeight: 'semibold',
        textDecoration: 'underline'
      },
      table: {
        fontSize: 'sm'
      },
      pre: {
        fontSize: 'sm',
        margin: 0
      },
      _hover: {
        a: {
          color: mode('violet.80', 'violet.30')(props)
        }
      }
    })
  })
)

export default theme
