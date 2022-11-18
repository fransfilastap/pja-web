import React, { FunctionComponent } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { PostMetadata, PostViewResponse } from '@/lib/types'
import { MotionProps } from 'framer-motion'
import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import PostAttribute from '@/components/PostAttribute'
import { FiEye } from 'react-icons/fi'
import MotionDiv from '@/components/Motion'

export type BlogPostItemProps = PostMetadata & {
  motionProps?: Omit<MotionProps, 'transition'>
}

const BlogPostItem: FunctionComponent<BlogPostItemProps> = (props) => {
  const { title, slug, description, motionProps } = props
  const { data } = useSWR<PostViewResponse>(`/api/views/${slug}`, fetcher)
  const views = Number(data?.total)

  return (
    <Link href={`/blog/${slug}`} style={{ width: '100%' }}>
      <MotionDiv
        display={'flex'}
        flexDir={'column'}
        gap={2}
        justifyContent={'space-between'}
        w={'full'}
        minH={'max-content'}
        py={2}
        {...motionProps}
      >
        <Flex flexDir={{ base: 'column', md: 'row' }} justifyContent={'space-between'}>
          <Heading fontWeight={'bold'} size={{ base: 'sm', md: 'md' }}>
            {title}
          </Heading>
          <PostAttribute icon={FiEye}>{views} views</PostAttribute>
        </Flex>
        <Text fontStyle={'italic'} fontSize={'sm'}>
          {description}
        </Text>
      </MotionDiv>
    </Link>
  )
}

export default BlogPostItem
