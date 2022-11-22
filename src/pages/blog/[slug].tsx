import { MDXRemote } from 'next-mdx-remote'
import { GetStaticPaths, GetStaticProps } from 'next'
import BlogLayout from '@/components/layouts/blog'
import { Post } from '@/lib/types'
import React from 'react'
import MDXComponents from '@/components/MDXComponents'
import { getAllPostMeta, parsePostContent } from '@/lib/content-parser'

function PostPage({ post }: { post: Post }): React.ReactElement {
  return (
    <BlogLayout post={post}>
      <MDXRemote
        {...post.html}
        components={{
          ...MDXComponents
        }}
      />
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
