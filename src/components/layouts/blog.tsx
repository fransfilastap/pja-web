import { PropsWithChildren, Suspense } from 'react'
import { Box, SkeletonText, chakra, Flex, Heading, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import config from '@/lib/config'
import { format, parseISO } from 'date-fns'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import { Layout } from '@/components/Layout'
import BasicMeta from '@/components/meta/BasicMeta'
import OpenGraphMeta from '@/components/meta/OpenGraphMeta'
import { ChakraNextImage } from '@/components/ChakraNextImage'
import { Post } from '@/lib/types'
import ViewCounter from '@/components/ViewCounter'

export default function BlogLayout({ children, post }: PropsWithChildren<{ post: Post }>) {
  const blogTitle = `${config.site_url}/blog/${post.title}`
  return (
    <Layout>
      <BasicMeta
        title={post.title}
        description={post.description}
        author={config.site_url}
        url={`${config.site_url}/blog/${post.slug}`}
      />
      <OpenGraphMeta description={post.description} title={post.title} url={blogTitle} />
      <Suspense fallback={<BlogPostSkeleton />}>
        <chakra.section my={{ base: '4', md: '8' }}>
          <Heading as={'h1'} size={{ base: 'xl', md: '2xl' }} mb={4} fontWeight='bold'>
            {post.title}
          </Heading>
          <Flex flexDir={{ base: 'column', md: 'row' }} justifyContent='space-between' mb={{ base: 6, md: 4 }}>
            <HStack>
              <ChakraNextImage
                borderRadius='3xl'
                imageFit='cover'
                imageFitPosition='center'
                width={25}
                height={25}
                alt='Author Photo'
                src='https://avatars.githubusercontent.com/u/10008396?v=4'
              />
              <Text fontSize={{ base: 'sm', md: 'sm' }} color={useColorModeValue('gray.700', 'gray.500')}>
                Frans Filasta Pratama / {format(parseISO(post.date), 'MMMM dd, yyyy')}
              </Text>
            </HStack>
            <HStack>
              <ViewCounter slug={post.slug} />
              <Text fontSize={{ base: 'sm', md: 'sm' }} color={useColorModeValue('gray.700', 'gray.500')}>
                {post.readingTime}
              </Text>
            </HStack>
          </Flex>
          {post.images && (
            <ChakraNextImage
              width='full'
              height={{ base: '30vh', md: '60vh' }}
              borderRadius='xl'
              src={post.images[0]}
              alt={post.title}
            />
          )}
          <Prose my={{ base: 4, md: 6 }}>{children}</Prose>
        </chakra.section>
      </Suspense>
    </Layout>
  )
}

const BlogPostSkeleton = () => {
  return (
    <Box padding='6' boxShadow='lg' bg='white'>
      <SkeletonText mt='4' noOfLines={4} spacing='4' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' />
    </Box>
  )
}
