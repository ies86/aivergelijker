import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getToolsByCategorie } from '@/lib/tools'
import { CATEGORIEEN, getCategorieInfo } from '@/lib/categories'
import type { Categorie } from '@/lib/types'
import CategoryToolList from '@/components/tools/CategoryToolList'
import CategoryNav from '@/components/layout/CategoryNav'

const CAT_KLEUR: Record<string, string> = {
  chatbot: '#1e293b',
  afbeelding: '#db2777',
  video: '#ea580c',
  coding: '#059669',
  audio: '#0891b2',
  productiviteit: '#6d28d9',
}

export async function generateStaticParams() {
  return CATEGORIEEN.map(cat => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategorieInfo(slug as Categorie)
  if (!cat) return {}
  return {
    title: `Beste ${cat.label} AI-tools (2026)`,
    description: `Vergelijk de beste ${cat.label.toLowerCase()} AI-tools van 2026. Onafhankelijke reviews, prijzen en aanbevelingen.`,
    openGraph: {
      title: `Beste ${cat.label} AI-tools (2026)`,
      description: `Vergelijk de beste ${cat.label.toLowerCase()} AI-tools. Onafhankelijke reviews en prijsvergelijkingen.`,
      url: `https://aivergelijker.nl/categorie/${slug}`,
    },
    alternates: {
      canonical: `https://aivergelijker.nl/categorie/${slug}`,
    },
  }
}

export const revalidate = 3600

export default async function CategoriePagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cat = getCategorieInfo(slug as Categorie)
  if (!cat) notFound()

  const tools = await getToolsByCategorie(slug as Categorie).catch(() => [])

  // Statistieken berekenen
  const aantalGratis = tools.filter(t => t.plannen.some(p => p.prijs_mnd === 0)).length
  const betaaldePrijzen = tools
    .map(t => {
      const goedkoopste = t.plannen
        .filter(p => p.prijs_mnd > 0)
        .sort((a, b) => a.prijs_mnd - b.prijs_mnd)[0]
      return goedkoopste?.prijs_mnd
    })
    .filter((p): p is number => p != null)

  const gemPrijs = betaaldePrijzen.length
    ? Math.round(betaaldePrijzen.reduce((a, b) => a + b, 0) / betaaldePrijzen.length)
    : 0

  const gemRating = tools.length
    ? (tools.reduce((sum, t) => sum + (t.beoordeling ?? 0), 0) / tools.length).toFixed(1)
    : '-'

  const kleur = CAT_KLEUR[slug] ?? '#6d28d9'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-surface-500 mb-6">
        <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
        <span className="mx-2 text-surface-300">/</span>
        <span className="text-surface-900 font-medium">{cat.label}</span>
      </nav>

      {/* Header met grote categorie-stat */}
      <div className="card p-6 sm:p-8 mb-8 relative overflow-hidden">
        {/* Subtiele gekleurde accent achter de header */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ background: kleur }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="cat-pill">
              <span className="swatch" style={{ background: kleur }} />
              {cat.label}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-3" style={{ letterSpacing: '-0.025em' }}>
            Beste {cat.label} AI-tools
          </h1>
          <p className="text-surface-600 max-w-2xl mb-6 leading-relaxed">{cat.langeBeschrijving}</p>

          {/* Stat-bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-surface-100">
            <div>
              <p className="text-2xl font-bold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.02em' }}>
                {tools.length}
              </p>
              <p className="text-xs text-surface-500 mt-0.5">tools vergeleken</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600 tabular-nums" style={{ letterSpacing: '-0.02em' }}>
                {aantalGratis}
              </p>
              <p className="text-xs text-surface-500 mt-0.5">met gratis plan</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.02em' }}>
                {gemPrijs > 0 ? <>€{gemPrijs}<span className="text-base text-surface-500 font-medium">/mnd</span></> : '—'}
              </p>
              <p className="text-xs text-surface-500 mt-0.5">gemiddelde prijs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-500 tabular-nums" style={{ letterSpacing: '-0.02em' }}>
                {gemRating}<span className="text-base text-surface-500 font-medium">/5</span>
              </p>
              <p className="text-xs text-surface-500 mt-0.5">gemiddelde beoordeling</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <CategoryNav actief={slug as Categorie} />
      </div>

      <CategoryToolList tools={tools} />
    </div>
  )
}
