import { Layout } from '@/components/Layout'
import BasicMeta from '@/components/meta/BasicMeta'
import OpenGraphMeta from '@/components/meta/OpenGraphMeta'
import config from '@/lib/config'
import React, { FunctionComponent, ReactNode } from 'react'

interface AboutPageProps {
  children: ReactNode
}
const AboutPage: FunctionComponent<AboutPageProps> = ({ children }: AboutPageProps): React.ReactElement => {
  const pageTitle = `About - ${config.site_title}`

  return (
    <Layout>
      <BasicMeta title={pageTitle} description={pageTitle} url={`${config.site_url}/about`} />
      <OpenGraphMeta title={pageTitle} />
      {children}
    </Layout>
  )
}

export default AboutPage
