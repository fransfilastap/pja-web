import { chakra, HStack, Icon } from '@chakra-ui/react'
import Link from 'next/link'
import ReadingTime from 'src/components/ReadingTime'
import React from 'react'
import { FiEye } from 'react-icons/fi'
import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import { PostViewResponse } from '@/lib/types'

interface BlogPostCardProps {
  title: string
  readingTime: string
  slug: string
}

const BlogPostCard: React.FunctionComponent<BlogPostCardProps> = ({
  title,
  readingTime,
  slug
}: BlogPostCardProps): React.ReactElement => {
  const { data } = useSWR<PostViewResponse>(`/api/views/${slug}`, fetcher)
  const views = data?.total

  return (
    <Link href={`/blog/${slug}`}>
      <chakra.article
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
      </chakra.article>
    </Link>
  )
}

export default BlogPostCard
