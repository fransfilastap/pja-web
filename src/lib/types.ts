import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ReadTimeResults } from 'reading-time'

export type PostMetadata = {
  title: string
  slug: string
  excerpt?: string
  description: string
  tags: string[]
  date: string
  images: string[]
  viewsCount: number
  readingTime: string
}

export type Post = PostMetadata & {
  content: MDXRemoteSerializeResult
}

export interface Hash {
  [key: string]: any
}

export type MatterParsedResult = PostMetadata & {
  fullpath?: string
  slug: string
  author: string
  lastmod?: Date
}

export type MDXParsedResult = {
  html: MDXRemoteSerializeResult
  matter: MatterParsedResult
  estimatedReadingTime: ReadTimeResults
  wordCount: number
}

export type ErrorResponse = {
  message: string
}
export type PostViewResponse = {
  total: string
}
