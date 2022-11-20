import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ReadTimeResults } from 'reading-time'

export type ContentMetadata = {
  title: string
  slug: string
  excerpt?: string
  description: string
  tags: string[]
  date: string
  cover: string
  images?: string[]
  author: string
  lastmod?: Date
}

export type Post = ParsedPostContent

export interface Hash {
  [key: string]: any
}

export type PostList = PostMetadata[]

export type PostMetadata = ContentMetadata & {
  fullPath: string
  readingTime: ReadTimeResults
}

export type ParsedPostContent = {
  html: MDXRemoteSerializeResult
  matter: PostMetadata
}

export type ErrorResponse = {
  message: string
}
export type PostViewResponse = {
  total: string
}
