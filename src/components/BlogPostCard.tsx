import { chakra, HStack, shouldForwardProp } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { FiClock } from 'react-icons/fi'
import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import { PostViewResponse } from '@/lib/types'
import { motion, MotionProps } from 'framer-motion'
import PostAttribute from '@/components/PostAttribute'

interface BlogPostCardProps {
  title: string
  readingTime: string
  slug: string
  motionProps?: MotionProps
}

const MotionDiv = chakra(motion.div, {
  shouldForwardProp(prop) {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

const BlogPostCard: React.FunctionComponent<BlogPostCardProps> = ({
  title,
  readingTime,
  slug,
  motionProps
}: BlogPostCardProps): React.ReactElement => {
  const { data } = useSWR<PostViewResponse>(`/api/views/${slug}`, fetcher)
  const views = data?.total

  return (
    <Link href={`/blog/${slug}`}>
      <MotionDiv
        display='flex'
        flexDir='column'
        justifyContent='space-between'
        minH={{ base: '100%', md: '30vh' }}
        minW={{ base: '15vh', md: '25vh' }}
        border='2px'
        cursor='pointer'
        _hover={{ borderColor: 'violet.50' }}
        borderRadius='xl'
        transition='ease-in-out 0.1s'
        p={3}
        {...motionProps}
      >
        <chakra.h1 fontWeight='semibold' fontSize='lg'>
          {title}
        </chakra.h1>
        <HStack>
          <PostAttribute icon={FiClock}>{views}</PostAttribute>
          <PostAttribute icon={FiClock}>{readingTime}</PostAttribute>
        </HStack>
      </MotionDiv>
    </Link>
  )
}

export default BlogPostCard
