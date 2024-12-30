import './globals.css'
import { Montserrat, Roboto } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ErrorBoundary from './components/ErrorBoundary'
import Cart from './components/Cart'
import Script from 'next/script'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-roboto' })

export const metadata = {
  title: 'Mediokart - Empowering You with Smarter Healthcare Solutions',
  description: 'Explore AuraBox and a range of healthcare services designed for your well-being.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className={`${roboto.className} bg-background text-primary-900`}>
        <ErrorBoundary>
          <CustomCursor />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Cart />
        </ErrorBoundary>
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      </body>
    </html>
  )
}

