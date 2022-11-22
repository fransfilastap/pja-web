import { GetStaticPaths, GetStaticProps } from 'next'
import BlogLayout from '@/components/layouts/blog'
import { Post } from '@/lib/types'
import React from 'react'
import { getAllPostMeta, parsePostContent } from '@/lib/content-parser'
import { MarkdownContent } from '@/components/ContentComponent'

function PostPage({ post }: { post: Post }): React.ReactElement {
  return (
    <BlogLayout post={post}>
      <MarkdownContent content={post} />
    </BlogLayout>
  )
}

export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getAllPostMeta()
  const paths = result.map((post) => `/blog/${post.slug}`)
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string = params?.slug as string
  const post = await parsePostContent(slug)

  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  }
}
