import { FunctionComponent, PropsWithChildren } from 'react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import { MDXRemote } from 'next-mdx-remote'
import { ContentMetadata, ParsedContent } from '@/lib/types'
import MDXComponents from '@/components/MDXComponents'
import { Container as ChakraContainer, ContainerProps } from '@chakra-ui/react'

export type ContentParserProps<T extends ContentMetadata> = {
  content: ParsedContent<T>
}
export const MarkdownContent: FunctionComponent<ContentParserProps<ContentMetadata>> = (props) => {
  const { html } = props.content

  return (
    <Prose>
      <MDXRemote {...html} components={{ ...MDXComponents }} />
    </Prose>
  )
}

export const Container: FunctionComponent<PropsWithChildren<ContainerProps>> = (props) => {
  const { children, ...rest } = props
  return (
    <ChakraContainer {...rest} p={{ base: 6, md: 0 }}>
      {children}
    </ChakraContainer>
  )
}
