import { Layout } from '@/components/Layout'
import BasicMeta from '@/components/meta/BasicMeta'
import OpenGraphMeta from '@/components/meta/OpenGraphMeta'
import config from '@/lib/config'
import React from 'react'
import { Container, Text, chakra } from '@chakra-ui/react'
import BlogPostList from '@/components/BlogPostList'
import { GetStaticProps, NextPage } from 'next'
import { MatterParsedResult } from '@/lib/types'
import { fetchPostContents } from '@/lib/mdx'
import { VideoLazyLoad } from '@/components/LazyLoad'

type BlogPageProps = {
  posts: MatterParsedResult[]
}

const BlogPage: NextPage<BlogPageProps> = (props) => {
  const { posts } = props
  const blogTitle = `Blog - ${config.site_title}`

  return (
    <Layout>
      <BasicMeta title={blogTitle} description={blogTitle} url={`${config.site_url}/blog`} />
      <OpenGraphMeta title={blogTitle} />
      <BlogPageMasthead />
      <Container my={'20'} maxW={'container.md'}>
        <BlogPostList posts={posts} />
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = fetchPostContents()
  return {
    props: {
      posts
    }
  }
}
const BlogPageMasthead = () => {
  return (
    <chakra.section
      overflow={'hidden'}
      position={'relative'}
      m={0}
      p={0}
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      w={'full'}
      h={{ base: '30vh', md: '35vh' }}
      bgColor={'gray.900'}
    >
      <Container maxW={'container.md'} zIndex={1}>
        <Text fontSize={'2xl'} fontWeight={'bold'} fontStyle={'italic'} color={'white'}>
          Thoughts. Log.
        </Text>
      </Container>
      <VideoLazyLoad src={'./coding.mp4'} />
    </chakra.section>
  )
}

export default BlogPage
