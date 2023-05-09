import { defineDocumentType } from 'contentlayer/source-files'
import type * as unified from 'unified'
import { toMarkdown } from 'mdast-util-to-markdown'
import { mdxToMarkdown } from 'mdast-util-mdx'
import readingTime from 'reading-time'
import { bundleMDX } from 'mdx-bundler'
import { slug } from 'github-slugger'


export type BlogHeading = { level: 1 | 2 | 3; title: string, slug: string }

export const Blog = defineDocumentType(() => ({
    name: 'Blog',
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
            resolve: (doc) => `/blog/${doc._raw.sourceFileName.split('.').slice(0, -1).join('.')}`
        },
        timeToRead: {
            type: 'string',
            resolve: (doc) => {
                return readingTime(doc.body.raw).text
            },
      },
headings: {
      type: 'json',
      resolve: async (doc) => {
        const headings: BlogHeading[] = []

        await bundleMDX({
          source: doc.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [...(opts.remarkPlugins ?? []), tocPlugin(headings)]
            return opts
          },
        })

        return [...headings]
      },
    },
    }
}));



const tocPlugin =
  (headings: BlogHeading[]): unified.Plugin =>
    () => {
      return (node: any) => {
        for (const element of node.children.filter((_: any) => _.type === 'heading' || _.name === 'OptionsTable')) {
          
          if (element.type === 'heading' && [2,3].includes(element.depth)) {        
            const title = toMarkdown({ type: 'paragraph', children: element.children }, { extensions: [mdxToMarkdown()] })
              .trim()
              .replace(/<.*$/g, '')
              .replace(/\\/g, '')
              .trim()
            
            headings.push(
              {
                level: element.
                depth,
                title,
                slug: slug(title.toLowerCase())
              })
          }
        }
      }
    }