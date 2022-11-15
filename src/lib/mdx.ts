import fs, { readFileSync } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'
import rehypeImageSize from 'rehype-img-size'
import { fetchPostContent } from '@/lib/posts'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import { Hash, MatterParsedResult, MDXParsedResult } from '@/lib/types'
import path from 'path'

const slugToPostContent = ((postContents) => {
  const hash: Hash = {}
  postContents.forEach((it) => (hash[it.slug] = it))
  return hash
})(fetchPostContent())

export async function getFileBySlug(slug: string): Promise<MDXParsedResult> {
  const source = readFileSync(slugToPostContent[slug].fullPath, 'utf-8')
  const mdxSource = await parseMdx(source)
  const matter = parseMatter(source)

  return {
    html: mdxSource,
    matter,
    estimatedReadingTime: readingTime(source),
    wordCount: source.split(/\s+/gu).length
  }
}

export function parseMatter(source: string): MatterParsedResult {
  const matterResult = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object
    }
  })
  return matterResult.data as MatterParsedResult
}

export async function parseMdx(source: string) {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeCodeTitles,
        rehypePrism,
        [rehypeImageSize, { dir: 'public' }]
      ],
      format: 'mdx'
    },
    parseFrontmatter: true
  })
}

export function fetchPostContents(): MatterParsedResult[] {
  const fileNames = fs.readdirSync(path.join(process.cwd(), '/content/posts'))
  const postsMatterData = fileNames
    .filter((it) => it.endsWith('.mdx'))
    .map((mdx) => {
      const fullPath = path.join(path.join(process.cwd(), '/content/posts'), mdx)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object
        }
      })

      const matterData = matterResult.data as MatterParsedResult
      matterData.fullpath = fullPath
      matterData.readingTime = readingTime(matterResult.content).text

      return matterData
    })

  return postsMatterData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    }
    return -1
  })
}

export function getPostLists(page: number, limit: number, tag?: string): MatterParsedResult[] {
  return fetchPostContents()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit)
}
