import { FunctionComponent } from 'react'
import { MatterParsedResult } from '@/lib/types'
import { EmptyState } from '@/components/empty/EmptyState'
import BlogPostItem from '@/components/BlogPostItem'
import MotionDiv from '@/components/Motion'
import { childAnimationProps, staggerAnimationProps } from '@/lib/constants/animation'

export type BlogPostListProps = {
  posts: MatterParsedResult[]
}

const BlogPostList: FunctionComponent<BlogPostListProps> = ({ posts }) => {
  if (posts.length <= 0) {
    return <EmptyState title={'Blog Post'} narrate={'No blog post right now. 🙏🏻'} />
  }

  return (
    <MotionDiv display={'flex'} flexDir={'column'} gap={3} {...staggerAnimationProps}>
      {posts.map((post, index) => (
        <BlogPostItem
          description={post.description}
          key={index}
          title={post.title}
          slug={post.slug}
          readingTime={post.readingTime}
          tags={post.tags}
          viewsCount={post.viewsCount}
          date={post.date}
          cover={post.cover}
          motionProps={childAnimationProps}
        />
      ))}
    </MotionDiv>
  )
}

export default BlogPostList
