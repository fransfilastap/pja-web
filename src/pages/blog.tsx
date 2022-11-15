import { Layout } from '@/components/Layout'
import BasicMeta from '@/components/meta/BasicMeta'
import OpenGraphMeta from '@/components/meta/OpenGraphMeta'
import config from '@/lib/config'
import React from 'react'

const BlogPage = (): React.ReactElement => {
  const blogTitle = `Blog - ${config.site_title}`

  return (
    <Layout>
      <BasicMeta title={blogTitle} description={blogTitle} url={`${config.site_url}/blog`} />
      <OpenGraphMeta title={blogTitle} />
    </Layout>
  )
}

export default BlogPage
