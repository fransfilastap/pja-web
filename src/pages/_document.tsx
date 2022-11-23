import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '@/components/theme/theme'
import Favicon from '@/components/Favicon'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App: any) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component: any) => Component
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    return await Document.getInitialProps(ctx)
  }

  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          {/* <meta
                    content="/static/favicons/browserconfig.xml"
                    name="msapplication-config" /> */}
          {/*                 <meta content="14d2e73487fa6c71" name="yandex-verification" /> */}
          {/* <meta
                    content="eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw"
                    name="google-site-verification" /> */}
          <meta content='max-snippet:-1, max-image-preview:large, max-video-preview:-1' name='robots' />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
          `
            }}
          />
        </Head>
        <Favicon />
        <body>
          <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
