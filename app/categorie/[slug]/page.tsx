import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getToolsByCategorie } from '@/lib/tools'
import { CATEGORIEEN, getCategorieInfo } from '@/lib/categories'
import type { Categorie } from '@/lib/types'
import CategoryToolList from '@/components/tools/CategoryToolList'
import CategoryNav from '@/components/layout/CategoryNav'
import CategoryBanner from '@/components/shared/CategoryBanner'

const CAT_KLEUR: Record<string, string> = {
  chatbot: '#1e293b',
  afbeelding: '#db2777',
  video: '#ea580c',
  coding: '#059669',
  audio: '#0891b2',
  productiviteit: '#6d28d9',
}

const CAT_GRADIENT: Record<string, string> = {
  chatbot: 'from-slate-700 to-slate-900',
  afbeelding: 'from-pink-500 to-fuchsia-700',
  video: 'from-orange-500 to-red-700',
  coding: 'from-emerald-500 to-teal-700',
  audio: 'from-cyan-500 to-blue-700',
  productiviteit: 'from-violet-500 to-purple-700',
}

export async function generateStaticParams() {
  return CATEGORIEEN.map(cat => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategorieInfo(slug as Categorie)
  if (!cat) return {}
  return {
    title: `Beste ${cat.label} AI-tools`,
    description: `Vergelijk ${cat.label.toLowerCase()} AI-tools op prijs, gratis plan en functies.`,
    openGraph: {
      title: `Beste ${cat.label} AI-tools`,
      description: `Vergelijk ${cat.label.toLowerCase()} AI-tools.`,
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

  // Statistieken
  const aantalGratis = tools.filter(t => t.plannen.some(p => p.prijs_mnd === 0)).length
  const betaaldePrijzen = tools
    .map(t => t.plannen.filter(p => p.prijs_mnd > 0).sort((a, b) => a.prijs_mnd - b.prijs_mnd)[0]?.prijs_mnd)
    .filter((p): p is number => p != null)
  const gemPrijs = betaaldePrijzen.length
    ? Math.round(betaaldePrijzen.reduce((a, b) => a + b, 0) / betaaldePrijzen.length)
    : 0
  const goedkoopstePrijs = betaaldePrijzen.length ? Math.min(...betaaldePrijzen) : 0

  const kleur = CAT_KLEUR[slug] ?? '#6d28d9'

  return (
    <div className="pb-10">
      {/* Banner met grote foto + breadcrumb + titel-overlay */}
      <section className="relative">
        <div className="relative h-48 sm:h-64 lg:h-72 overflow-hidden">
          <CategoryBanner
            query={slug}
            aspect="16/9"
            fallbackGradient={CAT_GRADIENT[slug] ?? 'from-violet-500 to-cyan-500'}
            className="!rounded-none w-full h-full"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-10">
          <nav className="text-xs text-white/80 mb-3 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{cat.label}</span>
          </nav>

          <div className="card p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="cat-pill">
                <span className="swatch" style={{ background: kleur }} />
                {cat.label}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 mb-2" style={{ letterSpacing: '-0.03em' }}>
              Beste {cat.label.toLowerCase()} AI-tools
            </h1>
            <p className="text-surface-600 max-w-2xl text-sm sm:text-base">{cat.beschrijving}</p>
          </div>
        </div>
      </section>

      {/* Stats-strip onder header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="card p-4">
            <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold mb-1">Tools</p>
            <p className="text-xl font-extrabold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.02em' }}>{tools.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold mb-1">Met gratis plan</p>
            <p className="text-xl font-extrabold text-emerald-600 tabular-nums" style={{ letterSpacing: '-0.02em' }}>{aantalGratis}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold mb-1">Vanaf</p>
            <p className="text-xl font-extrabold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.02em' }}>
              {goedkoopstePrijs > 0 ? <>€{goedkoopstePrijs}<span className="text-sm text-surface-500 font-medium">/mnd</span></> : '—'}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold mb-1">Gemiddeld</p>
            <p className="text-xl font-extrabold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.02em' }}>
              {gemPrijs > 0 ? <>€{gemPrijs}<span className="text-sm text-surface-500 font-medium">/mnd</span></> : '—'}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mb-6">
          <CategoryNav actief={slug as Categorie} />
        </div>

        <CategoryToolList tools={tools} />
      </div>
    </div>
  )
}
