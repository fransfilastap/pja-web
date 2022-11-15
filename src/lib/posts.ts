import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import yaml from 'js-yaml'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), '/content/posts')

export type PostContent = {
  readonly date: string
  readonly title: string
  readonly slug: string
  readonly tags?: string[]
  readonly fullPath: string
  readonly readingTime: string
}

let postCache: PostContent[]

export function fetchPostContent(): PostContent[] {
  if (postCache) {
    return postCache
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((it) => it.endsWith('.mdx'))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object
        }
      })
      const matterData = matterResult.data as {
        date: string
        title: string
        description: string
        tags: string[]
        slug: string
        fullPath: string
        readingTime: string
      }
      matterData.fullPath = fullPath
      matterData.readingTime = readingTime(matterResult.content).text

      let slug = fileName.replace(/\.mdx$/, '')

      if (!slug.match(/^(\d{4}-\d{2}-\d{2}-)/)) {
        throw new Error(`file name should start with date: ${fileName}`)
      }

      slug = slug.replace(/^(\d{4}-\d{2}-\d{2}-)/, '')

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(`slug should be ${slug} but is ${matterData.slug}`)
        /* throw new Error(
                  "slug field not match with the path of its content source"
                ); */
      }

      return matterData
    })

  // Sort posts by date
  postCache = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    }
    return -1
  })

  return postCache
}

export function countPosts(tag?: string): number {
  return fetchPostContent().filter((it) => !tag || (it.tags && it.tags.includes(tag))).length
}

export function listPostContent(page: number, limit: number, tag?: string): PostContent[] {
  return fetchPostContent()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit)
}
