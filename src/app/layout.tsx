import './globals.css'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'
import Footer from '@/components/Footer'

const instrumentSans = localFont({
  src: "../fonts/instrument-sans/InstrumentSans[wdth,wght].woff2",
  variable: '--font-instrument-sans',
  preload: true
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  preload: true
})

const valverde = localFont({
  src: "../fonts/valverde/Valverde-CondensedSemibold.woff2",
  variable: '--font-valverde',
  preload: true
})


export const metadata = {
  title: 'Frans FP',
  description: 'Personal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${inter.variable} ${valverde.variable}`}>
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
