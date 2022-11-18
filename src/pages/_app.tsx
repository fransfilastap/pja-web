import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ga from '@/lib/ga'
import theme from '@/components/theme/theme'
import 'prismjs/themes/prism-okaidia.css'
import '@/styles.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
