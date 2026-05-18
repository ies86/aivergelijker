import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import CompareBar from '@/components/tools/CompareBar'
import { getAllTools } from '@/lib/tools'

// Variable fonts van Vercel — optical sizing en alle weights beschikbaar
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

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

// Initial theme-script: voorkomt FOUC door theme te zetten vóór render
// Default: licht. Alleen wisselen naar dark als de gebruiker dat zelf
// expliciet heeft ingesteld via de toggle (opgeslagen in localStorage).
const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tools = await getAllTools().catch(() => [])
  const minimaleTools = tools.map(t => ({ slug: t.slug, naam: t.naam, logo_url: t.logo_url }))

  return (
    <html lang="nl" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <JsonLd type="website" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CompareBar alleTools={minimaleTools} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
