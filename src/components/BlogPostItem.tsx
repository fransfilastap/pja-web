import React, { FunctionComponent } from 'react'
import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { PostMetadata, PostViewResponse } from '@/lib/types'
import { MotionProps } from 'framer-motion'
import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import MotionDiv from '@/components/Motion'
import PostAttribute from '@/components/PostAttribute'
import { FiEye } from 'react-icons/fi'

export type BlogPostItemProps = PostMetadata & {
  motionProps?: Omit<MotionProps, 'transition'>
}

const BlogPostItem: FunctionComponent<BlogPostItemProps> = (props) => {
  const { title, slug, description, motionProps } = props
  const { data } = useSWR<PostViewResponse>(`/api/views/${slug}`, fetcher)

  return (
    <Link href={`/blog/${slug}`} style={{ width: '100%' }}>
      <MotionDiv display={'flex'} flexDir={'row'} justifyContent={'space-between'} p={2} {...motionProps}>
        <Flex flexDir={'column'} justifyContent={'space-between'}>
          <Heading fontWeight={'bold'} size={{ base: 'md', md: 'md' }}>
            {title}
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.500')}>{description}</Text>
        </Flex>
        <PostAttribute icon={FiEye}>{data?.total}</PostAttribute>
      </MotionDiv>
    </Link>
  )
}

export default BlogPostItem
