import { PropsWithChildren } from 'react'
import { chakra, Flex, Heading, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import config from '@/lib/config'
import { format, parseISO } from 'date-fns'
import { Layout } from '@/components/Layout'
import BasicMeta from '@/components/meta/BasicMeta'
import OpenGraphMeta from '@/components/meta/OpenGraphMeta'
import { ChakraNextImage } from '@/components/ChakraNextImage'
import { ParsedContent, PostMetadata } from '@/lib/types'
import ViewCounter from '@/components/ViewCounter'
import PostAttribute from '@/components/PostAttribute'
import avatar from '~/avatar.png'
import { Container, MarkdownContent } from '@/components/ContentComponent'

export default function BlogLayout({ post }: PropsWithChildren<{ post: ParsedContent<PostMetadata> }>) {
  const blogTitle = `${config.site_url}/blog/${post.matter.title}`
  const color = useColorModeValue('gray.700', 'gray.500')

  return (
    <Layout>
      <BasicMeta
        title={post.matter.title}
        description={post.matter.description}
        author={config.site_url}
        url={`${config.site_url}/blog/${post.matter.slug}`}
        keywords={post.matter.keywords}
      />
      <OpenGraphMeta description={post.matter.description} title={post.matter.title} url={blogTitle} />
      <Container maxW={'container.md'}>
        <chakra.section my={{ base: '4', md: '8' }}>
          <Heading as={'h1'} size={{ base: 'xl', md: '2xl' }} mb={4} fontWeight='bold'>
            {post.matter.title}
          </Heading>
          <Flex flexDir={{ base: 'column', md: 'row' }} justifyContent='space-between' mb={{ base: 6, md: 4 }}>
            <VStack justifyContent={'flex-start'} alignItems={'start'} gap={0}>
              <HStack>
                <ChakraNextImage borderRadius='3xl' width={25} height={25} alt={'Author Photo'} src={avatar} />
                <Text fontSize={{ base: 'sm', md: 'sm' }} color={color}>
                  <span>Frans Filasta Pratama</span>
                  <span> / {format(parseISO(post.matter.date), 'MMMM dd, yyyy')}</span>
                </Text>
              </HStack>
            </VStack>
            <HStack>
              <ViewCounter color={color} slug={post.matter.slug} />
              <PostAttribute color={color}>{`- ${post.matter.readingTime.text}`}</PostAttribute>
            </HStack>
          </Flex>
          {post.matter.cover && (
            <ChakraNextImage
              width='full'
              height={{ base: '30vh', md: '60vh' }}
              borderRadius='xl'
              src={post.matter.cover}
              alt={post.matter.title}
            />
          )}
          <MarkdownContent content={post} />
        </chakra.section>
      </Container>
    </Layout>
  )
}
