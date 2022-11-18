import { chakra, HStack, Icon, shouldForwardProp } from '@chakra-ui/react'
import Link from 'next/link'
import ReadingTime from 'src/components/ReadingTime'
import React from 'react'
import { FiEye } from 'react-icons/fi'
import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import { PostViewResponse } from '@/lib/types'
import { motion, MotionProps } from 'framer-motion'

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
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        display='flex'
        flexDir='column'
        justifyContent='space-between'
        minH={{ base: '100%', md: '30vh' }}
        minW={{ base: '15vh', md: '25vh' }}
        border='4px'
        borderColor='violet.30'
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
          <HStack gap={1}>
            <Icon as={FiEye} />
            <chakra.span>{views ? Number(views).toLocaleString() : '----'}</chakra.span>
          </HStack>
          <ReadingTime>{readingTime}</ReadingTime>
        </HStack>
      </MotionDiv>
    </Link>
  )
}

export default BlogPostCard
