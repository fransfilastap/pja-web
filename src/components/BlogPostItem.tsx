import React, { FunctionComponent } from 'react'
import { chakra, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { PostMetadata, PostViewResponse } from '@/lib/types'
import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export type BlogPostItemProps = PostMetadata

const BlogPostItem: FunctionComponent<BlogPostItemProps> = (props) => {
  const { title, slug, description } = props
  const { data } = useSWR<PostViewResponse>(`/api/views/${slug}`, fetcher)
  const views = Number(data?.total)

  return (
    <Link href={`/blog/${slug}`} style={{ width: '100%' }}>
      <chakra.article
        display={'flex'}
        flexDir={'column'}
        gap={2}
        justifyContent={'space-between'}
        w={'full'}
        minH={'max-content'}
        py={2}
      >
        <Flex flexDir={{ base: 'column', md: 'row' }} justifyContent={'space-between'}>
          <Heading fontWeight={'medium'} size={{ base: 'sm', md: 'md' }}>
            {title}
          </Heading>
          <chakra.span>{views ? Number(views).toLocaleString() : <Spinner />}</chakra.span>
        </Flex>
        <Text>{description}</Text>
      </chakra.article>
    </Link>
  )
}

export default BlogPostItem
