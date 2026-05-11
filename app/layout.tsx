import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aivergelijker.nl'),
  title: {
    default: 'aivergelijker.nl — Vergelijk de beste AI-tools',
    template: '%s — aivergelijker.nl',
  },
  description: 'Vergelijk de beste AI-tools voor consumenten. Onafhankelijke reviews, prijsvergelijkingen en eerlijke aanbevelingen.',
  openGraph: {
    siteName: 'aivergelijker.nl',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
