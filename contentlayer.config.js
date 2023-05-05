import { makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeImgSize from 'rehype-img-size'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Blog } from './src/contentlayer/document/Blog'

const rehypePrettyCodeoptions = {
  // Use one of Shiki's packaged themes
  theme: 'light-plus',
  // Set to true to keep the background color
  keepBackground: true,
  onVisitLine (node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine (node) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord (node, id) {
    node.properties.className = ['word']
  }
}

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }],
    [rehypeImgSize, { dir: 'public' }],
    [rehypePrettyCode, rehypePrettyCodeoptions]
  ]
}

export default makeSource({
  contentDirPath: 'content/blog',
  documentTypes: [Blog],
  mdx: mdxOptions
})
