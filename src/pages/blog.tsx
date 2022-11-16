import { Layout } from '@/components/Layout'
import BasicMeta from '@/components/meta/BasicMeta'
import OpenGraphMeta from '@/components/meta/OpenGraphMeta'
import config from '@/lib/config'
import React, { Suspense } from 'react'
import { Section } from '@/components/Section'
import { Spinner, Text } from '@chakra-ui/react'
import BlogPostList from '@/components/BlogPostList'
import { GetStaticProps, NextPage } from 'next'
import { MatterParsedResult } from '@/lib/types'
import { fetchPostContents } from '@/lib/mdx'

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
      <Suspense fallback={<Spinner />}>
        <BlogPostList posts={posts} />
      </Suspense>
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
    <Section my={{ base: 4, md: 6 }} title={'Blog'}>
      <Text fontSize={'lg'}>Many thoughts are in my mind. Some of them should be written.</Text>
    </Section>
  )
}

export default BlogPage
