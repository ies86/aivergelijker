import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Globe, ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react'
import { getAllTools, getToolBySlug, getToolsByCategorie } from '@/lib/tools'
import { getCategorieInfo } from '@/lib/categories'
import type { Categorie } from '@/lib/types'
import PricingTable from '@/components/tools/PricingTable'
import ToolLogo from '@/components/tools/ToolLogo'
import StickyToolBar from '@/components/tools/StickyToolBar'
import AffiliateButton from '@/components/shared/AffiliateButton'
import PrijsmodelBadge from '@/components/shared/PrijsmodelBadge'
import CategoryBanner from '@/components/shared/CategoryBanner'
import JsonLd from '@/components/seo/JsonLd'

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
  try {
    const tools = await getAllTools()
    return tools.map(t => ({ slug: t.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await getToolBySlug(slug)
  if (!tool) return {}
  return {
    title: `${tool.naam}: prijzen en plannen`,
    description: `${tool.tagline}. Bekijk actuele prijzen en plannen van ${tool.naam} op aivergelijker.nl.`,
    openGraph: {
      title: `${tool.naam}: prijzen en plannen`,
      description: tool.tagline,
      url: `https://aivergelijker.nl/tools/${slug}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://aivergelijker.nl/tools/${slug}`,
    },
  }
}

export const revalidate = 3600

export default async function ToolPagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = await getToolBySlug(slug)
  if (!tool) notFound()

  const cat = getCategorieInfo(tool.categorie as Categorie)
  const goedkoopstePlan = tool.plannen.find(p => p.prijs_mnd === 0) ?? tool.plannen[0]
  const goedkoopsteBetaald = tool.plannen.filter(p => p.prijs_mnd > 0).sort((a, b) => a.prijs_mnd - b.prijs_mnd)[0]
  const heeftGratis = tool.plannen.some(p => p.prijs_mnd === 0)
  const aantalPlannen = tool.plannen.length

  const categorieTools = await getToolsByCategorie(tool.categorie as Categorie).catch(() => [])
  const vergelijkbareTools = categorieTools.filter(t => t.slug !== tool.slug).slice(0, 6)

  return (
    <div className="pb-32">
      <JsonLd type="tool" tool={tool} />

      {/* Banner met grote foto + breadcrumb + tool-overlay */}
      <section className="relative">
        <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
          <CategoryBanner
            query={`${tool.naam} ${cat?.label.toLowerCase() ?? ''}`}
            aspect="16/9"
            fallbackGradient={CAT_GRADIENT[tool.categorie] ?? 'from-violet-500 to-cyan-500'}
            className="!rounded-none w-full h-full"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10">
          <nav className="text-xs text-white/70 mb-3 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            {cat && (
              <>
                <Link href={`/categorie/${cat.slug}`} className="hover:text-white transition-colors">{cat.label}</Link>
                <span className="text-white/40">/</span>
              </>
            )}
            <span className="text-white font-medium truncate">{tool.naam}</span>
          </nav>

          <div className="card p-5 sm:p-7 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-5">
              <ToolLogo src={tool.logo_url} naam={tool.naam} size={80} />

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <PrijsmodelBadge model={tool.prijsmodel} />
                  {cat && (
                    <Link href={`/categorie/${cat.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-600 hover:text-brand-500 transition-colors">
                      <span className="inline-block w-1.5 h-1.5 rounded-sm" style={{ background: CAT_KLEUR[tool.categorie] }} />
                      {cat.label}
                    </Link>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 mb-1" style={{ letterSpacing: '-0.03em' }}>{tool.naam}</h1>
                <p className="text-surface-600 text-sm sm:text-base">{tool.tagline}</p>
              </div>

              <div className="flex flex-col gap-2 sm:items-end shrink-0">
                <AffiliateButton toolSlug={tool.slug} label="Probeer nu" variant="primary" />
                <a href={tool.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-end gap-1.5 text-xs text-surface-400 hover:text-brand-500 transition-colors">
                  <Globe className="h-3.5 w-3.5" />
                  {new URL(tool.website_url).hostname}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats-strip — RTINGS info-row */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="card p-4">
            <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold mb-1">Vanaf</p>
            <p className="text-xl font-extrabold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.02em' }}>
              {goedkoopstePlan?.prijs_mnd === 0
                ? <span className="text-emerald-600">Gratis</span>
                : goedkoopsteBetaald
                  ? <>€{goedkoopsteBetaald.prijs_mnd}<span className="text-sm text-surface-500 font-medium">/mnd</span></>
                  : '—'}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold mb-1">Gratis plan</p>
            <p className="text-xl font-extrabold tabular-nums" style={{ letterSpacing: '-0.02em' }}>
              {heeftGratis ? <span className="text-emerald-600">Ja</span> : <span className="text-surface-400">Nee</span>}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold mb-1">Plannen</p>
            <p className="text-xl font-extrabold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.02em' }}>
              {aantalPlannen}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold mb-1">Categorie</p>
            <p className="text-base font-bold text-surface-900 capitalize truncate">{cat?.label ?? tool.categorie}</p>
          </div>
        </div>
      </section>

      {/* Over de tool */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-extrabold text-surface-900 mb-3" style={{ letterSpacing: '-0.02em' }}>Over {tool.naam}</h2>
        <p className="text-surface-600 leading-relaxed max-w-3xl">{tool.beschrijving}</p>
      </section>

      {/* Prijzen & plannen */}
      {tool.plannen.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-surface-500 mb-1">Abonnementen</p>
            <h2 className="text-2xl font-extrabold text-surface-900" style={{ letterSpacing: '-0.025em' }}>Prijzen & plannen</h2>
          </div>
          <PricingTable plannen={tool.plannen} toolSlug={tool.slug} />
        </section>
      )}

      {/* Vergelijk met andere */}
      {vergelijkbareTools.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-surface-500 mb-1">Alternatieven</p>
            <h2 className="text-2xl font-extrabold text-surface-900" style={{ letterSpacing: '-0.025em' }}>
              Vergelijk met andere {cat?.label.toLowerCase()}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {vergelijkbareTools.slice(0, 6).map(t => {
              const tGoedkoopste = t.plannen.find(p => p.prijs_mnd === 0) ?? t.plannen[0]
              return (
                <Link
                  key={t.slug}
                  href={`/vergelijk/${tool.slug}-vs-${t.slug}`}
                  className="card p-3 group flex items-center gap-3"
                >
                  <ToolLogo src={t.logo_url} naam={t.naam} size={40} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-surface-900 group-hover:text-brand-500 transition-colors truncate">
                      vs {t.naam}
                    </p>
                    <p className="text-xs text-surface-500 tabular-nums truncate">
                      {tGoedkoopste?.prijs_mnd === 0 ? 'Gratis plan' : `Vanaf €${tGoedkoopste?.prijs_mnd}/mnd`}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-surface-300 group-hover:text-brand-500 transition-colors shrink-0" />
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-surface-400 border-t border-surface-200 pt-5">
          Prijzen en functies zijn gebaseerd op publiek beschikbare informatie van de aanbieder. Controleer altijd de website van de aanbieder voor de actuele situatie. Sommige links op deze pagina zijn affiliate-links — wanneer je via deze links een abonnement afsluit, ontvangen wij soms een commissie.
        </p>

        <div className="mt-6 mb-2">
          <Link href={cat ? `/categorie/${cat.slug}` : '/'} className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-brand-500 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Terug naar {cat?.label ?? 'overzicht'}
          </Link>
        </div>
      </section>

      <StickyToolBar tool={tool} vergelijkbareTools={vergelijkbareTools} />
    </div>
  )
}
