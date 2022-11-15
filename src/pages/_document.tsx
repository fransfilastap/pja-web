import Document,{ Html, Head, Main, NextScript, DocumentContext } from 'next/document';


class MyDocument extends Document{

    static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App: any) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component: any) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
    }
    
    render(): JSX.Element {
        return <Html lang="en">
            <Head>
                <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
                <link href="/static/favicons/site.webmanifest" rel="manifest" />
                <link
                    href="/static/favicons/apple-touch-icon.png"
                    rel="apple-touch-icon"
                    sizes="180x180" />
                <link
                    href="/static/favicons/favicon-32x32.png"
                    rel="icon"
                    sizes="32x32"
                    type="image/png" />
                <link
                    href="/static/favicons/favicon-16x16.png"
                    rel="icon"
                    sizes="16x16"
                    type="image/png" />
                <link
                    color="#4a9885"
                    href="/static/favicons/safari-pinned-tab.svg"
                    rel="mask-icon" />
                <meta content="#ffffff" name="theme-color" />
                <meta content="#ffffff" name="msapplication-TileColor" />
                {/* <meta
                    content="/static/favicons/browserconfig.xml"
                    name="msapplication-config" /> */}
{/*                 <meta content="14d2e73487fa6c71" name="yandex-verification" /> */}
                {/* <meta
                    content="eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw"
                    name="google-site-verification" /> */}
                <meta
                    content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                    name="robots" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>;
    } 
}

export default MyDocument