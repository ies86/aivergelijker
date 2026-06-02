import Link from 'next/link'
import { ArrowLeft, Newspaper } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nieuws',
  description: 'Op dit moment publiceren we geen nieuws. Bekijk onze tool-vergelijkingen voor actuele informatie.',
  robots: { index: false, follow: true },
}

export default function NieuwsOverzicht() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="card p-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-100 mb-4">
          <Newspaper className="h-6 w-6 text-surface-500" />
        </div>
        <h1 className="text-2xl font-bold text-surface-900 mb-2" style={{ letterSpacing: '-0.025em' }}>
          Geen nieuws op dit moment
        </h1>
        <p className="text-surface-600 mb-8 max-w-md mx-auto">
          We publiceren nieuws alleen wanneer er iets relevants te melden valt over de AI-tools die we vergelijken.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-700 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Terug naar de homepage
        </Link>
      </div>
    </div>
  )
}
