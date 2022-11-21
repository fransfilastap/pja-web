import { Layout } from '@/components/Layout'
import BasicMeta from '@/components/meta/BasicMeta'
import OpenGraphMeta from '@/components/meta/OpenGraphMeta'
import config from '@/lib/config'
import React from 'react'
import { chakra, Container, Heading } from '@chakra-ui/react'
import BlogPostList from '@/components/BlogPostList'
import { GetStaticProps, NextPage } from 'next'
import { PostMetadata } from '@/lib/types'
import { getPostLists } from '@/lib/content-parser'
import { POST_PER_PAGE } from '@/lib/constants/pagination'

type BlogPageProps = {
  posts: PostMetadata[]
}

const BlogPage: NextPage<BlogPageProps> = (props) => {
  const { posts } = props
  const blogTitle = `Blog - ${config.site_title}`

  return (
    <Layout>
      <BasicMeta title={blogTitle} description={blogTitle} url={`${config.site_url}/blog`} />
      <OpenGraphMeta title={blogTitle} />
      <BlogPageMasthead />
      <Container mt={5} maxW={'container.md'}>
        <BlogPostList posts={posts} />
      </Container>
    </Layout>
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
const BlogPageMasthead = () => {
  return (
    <Container maxW={'container.md'}>
      <chakra.section
        overflow={'hidden'}
        position={'relative'}
        p={0}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        borderRadius={'lg'}
        w={'full'}
        mt={4}
        h={{ base: '20vh', md: '23vh' }}
        bgGradient={'linear(from-tl to-br, violet.50, purple.400, pink.200)'}
      >
        <Container maxW={'container.md'} zIndex={1}>
          <Heading fontWeight={'bold'}>Blog.</Heading>
          <Heading size={'md'}>Just some writings.</Heading>
        </Container>
      </chakra.section>
    </Container>
  )
}

export default BlogPage
