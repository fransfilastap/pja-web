import { FunctionComponent } from 'react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import { MDXRemote } from 'next-mdx-remote'
import { ContentMetadata, ParsedContent } from '@/lib/types'
import MDXComponents from '@/components/MDXComponents'

export type ContentParserProps<T extends ContentMetadata> = {
  content: ParsedContent<T>
}
const ContentParser: FunctionComponent<ContentParserProps<ContentMetadata>> = (props) => {
  const { html } = props.content

  return (
    <Prose my={{ base: 4, md: 6 }}>
      <MDXRemote {...html} components={{ ...MDXComponents }} />
    </Prose>
  )
}

export default ContentParser
