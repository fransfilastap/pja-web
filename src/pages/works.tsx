import { Layout } from '@/components/Layout'
import BasicMeta from '@/components/meta/BasicMeta'
import OpenGraphMeta from '@/components/meta/OpenGraphMeta'
import config from '@/lib/config'
import React from 'react'

const WorksPage = (): React.ReactElement => {
  const pageTitle = `Portfolio - ${config.site_title}`

  return (
    <Layout>
      <BasicMeta title={pageTitle} description="Frans Filasta Pratama's Portofolio" url={`${config.site_url}/works`} />
      <OpenGraphMeta title={pageTitle} />
    </Layout>
  )
}

export default WorksPage
