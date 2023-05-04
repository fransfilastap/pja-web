import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeImgSize from 'rehype-img-size'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true
    },
    slug: {
      type: 'string',
      description: 'Post unique url identifier',
      required: true
    },
    description: {
      type: 'string',
      description: 'Post summary',
      required: true
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true
    },
    author: {
      type: 'string',
      description: 'Post author',
      required: true
    },
    cover: {
      type: 'string',
      description: 'Post thumbnail',
      required: true
    },
    lastmod: {
      type: 'date',
      description: 'The modification date of the post',
      required: false
    },
    tags: {
      type: 'list',
      of: { type: 'string' }
    },
    keywords: {
      type: 'string',
      required: false
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath}`
    },
    timeToRead: {
      type: 'string',
      resolve: (doc) => {
        return readingTime(doc.body.raw).text
      }
    }
  }
}))

const rehypeoptions = {
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
export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }], [rehypeImgSize, { dir: 'public' }], [rehypePrettyCode, rehypeoptions]]
  }
})
