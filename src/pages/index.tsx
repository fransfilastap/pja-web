import React, { ReactElement } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { Box, chakra, Flex, Heading, Icon, Link as ChakraLink, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import { Layout } from '@/components/Layout'
import HashTag from '@/components/HashTag'
import { Section } from '@/components/Section'
import BlogPostCard from '@/components/BlogPostCard'
import MotionDiv from '@/components/Motion'
import { childAnimationProps, staggerAnimationProps } from '@/lib/constants/animation'
import { getPostLists } from '@/lib/content-parser'
import { PostMetadata } from '@/lib/types'
import { POST_PER_PAGE } from '@/lib/constants/pagination'
import avatar from '~/avatar.png'
import { Container } from '@/components/ContentComponent'
import Image from 'next/image'

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Container maxW='container.md'>
        <Masthead />
        <Section mt={{ base: 6, md: 6 }} title='Featured Posts'>
          <VStack justifyContent='flex-start' alignItems='start' gap={4}>
            <FeaturedPosts posts={posts} />
            <ReadAllPosts />
          </VStack>
        </Section>
      </Container>
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
            <HashTag>Java</HashTag> <HashTag>PHP</HashTag> <HashTag>Javascript</HashTag>
            <HashTag>SpringBoot</HashTag> <HashTag>Laravel</HashTag> <HashTag>React</HashTag>
          </Text>
        </chakra.div>
        <Box
          my={2}
          as={'div'}
          display={'block'}
          position={'relative'}
          height={{ base: '5rem', md: '8rem' }}
          width={{ base: '5rem', md: '8rem' }}
        >
          <Image
            src={avatar}
            width={100}
            height={100}
            style={{ borderRadius: '100%', position: 'absolute' }}
            alt={'avatar'}
          />
        </Box>
      </Flex>
    </chakra.section>
  )
}

function FeaturedPosts({ posts }: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
  return (
    <MotionDiv
      {...staggerAnimationProps}
      display={'grid'}
      gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
      gridAutoRows='max-content'
      gap={3}
    >
      {posts.map((e: PostMetadata) => (
        <BlogPostCard {...childAnimationProps} title={e.title} slug={e.slug} key={e.slug} />
      ))}
    </MotionDiv>
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPostLists(1, POST_PER_PAGE)
  return {
    props: {
      posts
    }
  }
}
