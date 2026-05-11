import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { getUitgelichtTools, getAllTools } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'
import ToolGrid from '@/components/tools/ToolGrid'
import NewsletterForm from '@/components/shared/NewsletterForm'

export const revalidate = 3600 // ISR: elke 1 uur

export default async function HomePage() {
  const [uitgelicht, alleTools] = await Promise.all([
    getUitgelichtTools().catch(() => []),
    getAllTools().catch(() => []),
  ])

  const aantalPerCategorie = CATEGORIEEN.map(cat => ({
    ...cat,
    aantal: alleTools.filter(t => t.categorie === cat.slug).length,
  }))

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Zap className="h-4 w-4" />
            {alleTools.length} AI-tools vergeleken
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Welke AI-tool past<br className="hidden sm:block" /> bij jou?
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Onafhankelijke vergelijkingen, eerlijke reviews en de beste prijzen voor alle populaire AI-tools — in het Nederlands.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/vergelijk/chatgpt-vs-claude" className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-600 transition-colors">
              ChatGPT vs Claude
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/beste-ai-voor/studenten" className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Beste AI voor studenten
            </Link>
          </div>
        </div>
      </section>

      {/* Categorieën */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Zoek per categorie</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {aantalPerCategorie.map(cat => (
            <Link
              key={cat.slug}
              href={`/categorie/${cat.slug}`}
              className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-300 hover:shadow-sm transition-all text-center group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-brand-600">{cat.label}</span>
              <span className="text-xs text-gray-400">{cat.aantal} tools</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Uitgelichte tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Populaire AI-tools</h2>
          <Link href="/categorie/chatbot" className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
            Alle tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ToolGrid tools={uitgelicht} />
      </section>

      {/* Vergelijkingen CTA */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Populaire vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/vergelijk/chatgpt-vs-claude', titel: 'ChatGPT vs Claude', sub: 'Welke chatbot wint in 2026?' },
              { href: '/vergelijk/midjourney-vs-dall-e', titel: 'Midjourney vs DALL-E 3', sub: 'Beste AI voor afbeeldingen' },
              { href: '/vergelijk/cursor-vs-github-copilot', titel: 'Cursor vs GitHub Copilot', sub: 'Beste AI voor developers' },
              { href: '/vergelijk/chatgpt-plus-vs-gratis', titel: 'ChatGPT Plus vs Gratis', sub: 'Is betalen de moeite waard?' },
              { href: '/vergelijk/runway-vs-kling', titel: 'Runway vs Kling AI', sub: 'Beste AI-videogenerator' },
              { href: '/beste-ai-voor/studenten', titel: 'Beste AI voor studenten', sub: 'Gratis tools die echt helpen' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-gray-50 rounded-xl p-5 hover:bg-brand-50 hover:border-brand-200 border border-transparent transition-all group"
              >
                <p className="font-semibold text-gray-900 group-hover:text-brand-700">{item.titel}</p>
                <p className="text-sm text-gray-500 mt-1">{item.sub}</p>
                <span className="text-brand-500 text-sm font-medium mt-3 inline-flex items-center gap-1">
                  Lees vergelijking <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-brand-600 rounded-2xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Blijf op de hoogte</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Nieuwe AI-tools, eerlijke vergelijkingen en de beste deals — elke week in je inbox.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
          <p className="text-brand-200 text-xs mt-3">Geen spam. Uitschrijven kan altijd.</p>
        </div>
      </section>
    </>
  )
}
