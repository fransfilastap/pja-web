import { PropsWithChildren, Suspense } from 'react'
import { chakra, Flex, Heading, HStack, Text, useColorModeValue, Container, VStack } from '@chakra-ui/react'
import config from '@/lib/config'
import { format, parseISO } from 'date-fns'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import { Layout } from '@/components/Layout'
import BasicMeta from '@/components/meta/BasicMeta'
import OpenGraphMeta from '@/components/meta/OpenGraphMeta'
import { ChakraNextImage } from '@/components/ChakraNextImage'
import { Post } from '@/lib/types'
import ViewCounter from '@/components/ViewCounter'
import { FiClock } from 'react-icons/fi'
import PostAttribute from '@/components/PostAttribute'

export default function BlogLayout({ children, post }: PropsWithChildren<{ post: Post }>) {
  const blogTitle = `${config.site_url}/blog/${post.title}`
  const color = useColorModeValue('gray.700', 'gray.500')

  return (
    <Layout>
      <BasicMeta
        title={post.title}
        description={post.description}
        author={config.site_url}
        url={`${config.site_url}/blog/${post.slug}`}
      />
      <OpenGraphMeta description={post.description} title={post.title} url={blogTitle} />
      <Container maxW={'container.md'}>
        <Suspense fallback={null}>
          <chakra.section my={{ base: '4', md: '8' }}>
            <Heading as={'h1'} size={{ base: 'xl', md: '2xl' }} mb={4} fontWeight='bold'>
              {post.title}
            </Heading>
            <Flex flexDir={{ base: 'column', md: 'row' }} justifyContent='space-between' mb={{ base: 6, md: 4 }}>
              <VStack justifyContent={'flex-start'} alignItems={'start'} gap={0}>
                <HStack>
                  <ChakraNextImage
                    borderRadius='3xl'
                    width={25}
                    height={25}
                    alt={'Author Photo'}
                    src='https://avatars.githubusercontent.com/u/10008396?v=4'
                  />
                  <Text fontSize={{ base: 'sm', md: 'sm' }} color={color}>
                    <span>Frans Filasta Pratama</span>
                    <span> / {format(parseISO(post.date), 'MMMM dd, yyyy')}</span>
                  </Text>
                </HStack>
              </VStack>
              <HStack>
                <ViewCounter color={color} slug={post.slug} />-
                <PostAttribute color={color} icon={FiClock}>
                  {post.readingTime}
                </PostAttribute>
              </HStack>
            </Flex>
            {post.images && (
              <ChakraNextImage
                width='full'
                height={{ base: '30vh', md: '60vh' }}
                borderRadius='xl'
                src={post.cover}
                alt={post.title}
              />
            )}
            <Prose my={{ base: 4, md: 6 }}>{children}</Prose>
          </chakra.section>
        </Suspense>
      </Container>
    </Layout>
  )
}
