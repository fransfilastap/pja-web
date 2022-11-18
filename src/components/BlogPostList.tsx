import { FunctionComponent } from 'react'
import { MatterParsedResult } from '@/lib/types'
import { EmptyState } from '@/components/empty/EmptyState'
import BlogPostItem from '@/components/BlogPostItem'
import MotionDiv from './Motion'
import { Variants } from 'framer-motion'

export type BlogPostListProps = {
  posts: MatterParsedResult[]
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
}

const item: Variants = {
  hidden: { x: -10, opacity: 0 },
  show: { x: 0, opacity: 1 }
}

const BlogPostList: FunctionComponent<BlogPostListProps> = ({ posts }) => {
  if (posts.length <= 0) {
    return <EmptyState title={'Blog Post'} narrate={'No blog post right now. 🙏🏻'} />
  }

  return (
    <MotionDiv display={'flex'} flexDir={'column'} gap={2} initial='hidden' animate='show' variants={container}>
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
          images={[]}
          motionProps={{ variants: item }}
        />
      ))}
    </MotionDiv>
  )
}

export default BlogPostList
