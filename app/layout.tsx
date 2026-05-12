import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aivergelijker.nl'),
  title: {
    default: 'aivergelijker.nl — Vergelijk de beste AI-tools (2026)',
    template: '%s — aivergelijker.nl',
  },
  description: 'Vergelijk de beste AI-tools voor consumenten. Onafhankelijke reviews, prijsvergelijkingen en eerlijke aanbevelingen — in het Nederlands.',
  keywords: [
    'AI tools vergelijken',
    'beste AI tools',
    'ChatGPT vergelijken',
    'AI chatbot vergelijking',
    'AI tools Nederland',
    'Midjourney review',
    'Claude review',
    'AI voor beginners',
    'beste gratis AI',
    'AI vergelijker',
  ],
  openGraph: {
    siteName: 'aivergelijker.nl',
    locale: 'nl_NL',
    type: 'website',
    title: 'aivergelijker.nl — Vergelijk de beste AI-tools',
    description: 'Onafhankelijke vergelijkingen, eerlijke reviews en directe links naar de beste AI-tools — in het Nederlands.',
    url: 'https://aivergelijker.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'aivergelijker.nl — Vergelijk de beste AI-tools',
    description: 'Onafhankelijke AI-tool vergelijkingen in het Nederlands.',
  },
  alternates: {
    canonical: 'https://aivergelijker.nl',
  },
  verification: {
    // Voeg je Google Search Console verificatiecode hier toe
    // google: 'jouw-verificatie-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`${inter.className} antialiased`}>
        <JsonLd type="website" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
