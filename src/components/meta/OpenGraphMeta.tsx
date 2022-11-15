import Head from 'next/head'
import Config from '@/lib/config'

interface OpenGraphMetaProps {
  title?: string
  description?: string
  url?: string
  image?: string
}

function OpenGraphMeta({ title, description, url, image }: OpenGraphMetaProps) {
  return (
    <Head>
      <meta property='og:title' content={title ? [title, Config.site_title].join(' | ') : Config.site_title} />
      <meta property='og:description' content={description || Config.site_description} />
      <meta property='og:type' content='article' />
      <meta property='og:url' content={url || Config.site_url} />
      <meta property='og:image' content={image || `${Config.site_url}/images/me.png`} />
    </Head>
  )
}

export default OpenGraphMeta
