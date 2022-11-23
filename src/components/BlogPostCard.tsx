import { Heading, HStack, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import { PostViewResponse } from '@/lib/types'
import PostAttribute from '@/components/PostAttribute'
import MotionDiv from '@/components/Motion'
import { MotionProps } from 'framer-motion'
import { FiEye } from 'react-icons/fi'

interface BlogPostCardProps extends MotionProps {
  title: string
  slug: string
}

const BlogPostCard: React.FunctionComponent<BlogPostCardProps> = ({
  title,
  slug,
  ...rest
}: BlogPostCardProps): React.ReactElement => {
  const { data } = useSWR<PostViewResponse>(`/api/views/${slug}`, fetcher)
  const views = data?.total

  return (
    <Link href={`/blog/${slug}`}>
      <MotionDiv
        display='flex'
        flexDir='column'
        justifyContent='space-between'
        minH={{ base: '15vh', md: '30vh' }}
        cursor='pointer'
        _hover={{
          bgColor: useColorModeValue('gray.50', 'gray.900'),
          boxShadow: 'lg'
        }}
        border={'2px'}
        borderColor={useColorModeValue('gray.50', 'gray.800')}
        borderRadius='xl'
        boxShadow={'sm'}
        transition='ease-in-out 0.1s'
        p={{ base: 6, md: 6 }}
        {...rest}
      >
        <Heading color={useColorModeValue('gray.700', 'gray.100')} fontWeight='semibold' fontSize='lg'>
          {title}
        </Heading>
        <HStack>
          <PostAttribute icon={FiEye}>{views}</PostAttribute>
        </HStack>
      </MotionDiv>
    </Link>
  )
}

export default BlogPostCard
