import { FunctionComponent } from 'react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import { MDXRemote } from 'next-mdx-remote'
import { ParsedContent } from '@/lib/types'
import MDXComponents from '@/components/MDXComponents'

export type ContentParserProps = {
  content: ParsedContent<any>
}
const ContentParser: FunctionComponent<ContentParserProps> = (props) => {
  const { html } = props.content

  return (
    <Prose my={{ base: 4, md: 6 }}>
      <MDXRemote {...html} components={{ ...MDXComponents }} />
    </Prose>
  )
}

export default ContentParser
