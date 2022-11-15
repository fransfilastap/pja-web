import { MDXRemote } from 'next-mdx-remote'
import { GetStaticPaths, GetStaticProps } from 'next'
import BlogLayout from '@/components/layouts/blog'
import { Post } from '@/lib/types'
import { fetchPostContents, getFileBySlug } from '@/lib/mdx'
import { Suspense } from 'react'
import MDXComponents from '@/components/MDXComponents'

function PostPage({ post }: { post: Post }): React.ReactElement {
  return (
    <BlogLayout post={post}>
      <Suspense fallback={null}>
        <MDXRemote
          {...post.content}
          components={{
            ...MDXComponents
          }}
        />
      </Suspense>
    </BlogLayout>
  )
}

export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContents().map((it) => `/blog/${it.slug}`)
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string = params?.slug as string
  const post = await getFileBySlug(slug)
  return {
    props: {
      post: {
        readingTime: post.estimatedReadingTime.text,
        title: post.matter.title,
        viewsCount: 0,
        description: post.matter.description,
        date: post.matter.date,
        slug: post.matter.slug,
        content: post.html,
        images: post.matter.images
      }
    }
  }
}
