import React, { ReactElement, Suspense } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import {
  Text,
  Heading,
  chakra,
  Flex,
  Grid,
  GridItem,
  Link as ChakraLink,
  Icon,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import { Layout } from '@/components/Layout'
import HashTag from '@/components/atoms/HashTag'
import { Section } from '@/components/molecules/Section'
import { ChakraNextImage } from '@/components/ChakraNextImage'
import { PostContent } from '@/lib/posts'
import BlogPostCard from '@/components/molecules/BlogPostCard'
import { MatterParsedResult } from '@/lib/types'
import { getPostLists } from '@/lib/mdx'

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Masthead />
      <Section mt={{ base: 6, md: 6 }} title='Featured Posts'>
        <Suspense fallback={null}>
          <VStack justifyContent='flex-start' alignItems='start' gap={4}>
            <FeaturedPosts posts={posts} />
            <ReadAllPosts />
          </VStack>
        </Suspense>
      </Section>
    </Layout>
  )
}

function Masthead(): ReactElement {
  return (
    <chakra.section
      borderRadius='3xl'
      display='flex'
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      w='full'
      h={{ base: 'max-content', md: '30vh' }}
    >
      <Flex
        w='full'
        direction={{ base: 'column-reverse', md: 'row' }}
        gap={{ base: 0, md: 8 }}
        justifyContent='space-between'
        alignItems='start'
      >
        <chakra.div>
          <Heading mb='0.5' size={{ base: 'lg', md: '2xl' }} fontWeight='extrabold'>
            Frans Filasta P.
          </Heading>
          <Text fontSize={{ base: 'md', md: 'xl' }}>Full-stack developer.</Text>
          <Text mt={{ base: 4, md: 6 }}>
            <HashTag>Java</HashTag> <HashTag>PHP</HashTag> <HashTag>Javascript</HashTag> <HashTag>SpringBoot</HashTag>{' '}
            <HashTag>Laravel</HashTag> <HashTag>React</HashTag>
          </Text>
        </chakra.div>
        <ChakraNextImage
          my={2}
          borderRadius='full'
          width={120}
          height={120}
          src='https://avatars.githubusercontent.com/u/10008396?v=4'
          alt='Frans Filasta Pratama Profile Picture'
        />
      </Flex>
    </chakra.section>
  )
}

function FeaturedPosts({ posts }: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gridAutoRows='1fr' gap={3}>
      {posts.map((e: PostContent) => (
        <GridItem w='full' key={e.slug}>
          <BlogPostCard title={e.title} views={100} slug={e.slug} key={e.slug} readingTime={e.readingTime} />
        </GridItem>
      ))}
    </Grid>
  )
}

function ReadAllPosts(): ReactElement {
  const color = useColorModeValue('gray.600', 'gray.500')
  const hoverColor = useColorModeValue('gray.700', 'white')

  return (
    <Link href='/blog' passHref legacyBehavior>
      <ChakraLink
        display='flex'
        color={color}
        fontWeight='semibold'
        flexDir='row'
        justifyContent='space-between'
        _hover={{ textDecoration: 'none', color: hoverColor }}
        alignItems='center'
      >
        <span>Read all posts</span>
        <Icon as={FiArrowRight} />
      </ChakraLink>
    </Link>
  )
}

const POST_PER_PAGE = 3
export const getStaticProps: GetStaticProps = async () => {
  const posts: MatterParsedResult[] = getPostLists(1, POST_PER_PAGE)
  return {
    props: {
      posts
    }
  }
}
