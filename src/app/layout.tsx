import "./globals.css";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/config/env";
import Footer from "@/components/footer";

const instrumentSans = localFont({
  src: "../fonts/instrument-sans/InstrumentSans[wdth,wght].woff2",
  variable: "--font-instrument-sans",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
});

const valverde = localFont({
  src: "../fonts/valverde/Valverde-CondensedSemibold.woff2",
  variable: "--font-valverde",
  preload: true,
});

export const metadata = {
  title: "Frans FP",
  description: "Personal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          name="robots"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#FFFFFF" />
      </head>
      <body
        className={`${instrumentSans.variable} ${inter.variable} ${valverde.variable}`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
      </Script>
    </html>
  );
}
