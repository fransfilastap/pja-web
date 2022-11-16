import { FunctionComponent } from 'react'
import { MatterParsedResult } from '@/lib/types'
import { VStack } from '@chakra-ui/react'
import { EmptyState } from '@/components/empty/EmptyState'
import BlogPostItem from '@/components/BlogPostItem'

export type BlogPostListProps = {
  posts: MatterParsedResult[]
}

const BlogPostList: FunctionComponent<BlogPostListProps> = ({ posts }) => {
  if (posts.length <= 0) {
    return <EmptyState title={'Blog Post'} narrate={'No blog post right now. 🙏🏻'} />
  }

  return (
    <VStack alignItems={'start'} w={'full'}>
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
        />
      ))}
    </VStack>
  )
}

export default BlogPostList
