import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Star, Globe, ArrowLeft, ExternalLink } from 'lucide-react'
import { getAllTools, getToolBySlug, getToolsByCategorie } from '@/lib/tools'
import { getCategorieInfo } from '@/lib/categories'
import type { Categorie } from '@/lib/types'
import PricingTable from '@/components/tools/PricingTable'
import ToolLogo from '@/components/tools/ToolLogo'
import StickyToolBar from '@/components/tools/StickyToolBar'
import AffiliateButton from '@/components/shared/AffiliateButton'
import PrijsmodelBadge from '@/components/shared/PrijsmodelBadge'
import JsonLd from '@/components/seo/JsonLd'

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
    title: `${tool.naam} review & prijzen (2026)`,
    description: `${tool.tagline}. Bekijk prijzen, functies en eerlijke beoordeling van ${tool.naam} op aivergelijker.nl`,
    openGraph: {
      title: `${tool.naam} review & prijzen (2026)`,
      description: `${tool.tagline}. Bekijk prijzen, functies en eerlijke beoordeling.`,
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
  const goedkoopsteBetaald = tool.plannen.find(p => p.prijs_mnd > 0)

  // Haal tools uit dezelfde categorie op voor "Vergelijk met..." dropdown
  const categorieTools = await getToolsByCategorie(tool.categorie as Categorie).catch(() => [])
  const vergelijkbareTools = categorieTools.filter(t => t.slug !== tool.slug).slice(0, 6)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32">
      <JsonLd type="tool" tool={tool} />
      <nav className="text-sm text-surface-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
        <span className="text-surface-300">/</span>
        {cat && <Link href={`/categorie/${cat.slug}`} className="hover:text-brand-500 transition-colors">{cat.label}</Link>}
        <span className="text-surface-300">/</span>
        <span className="text-surface-900 font-medium">{tool.naam}</span>
      </nav>

      <div className="card p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-5">
          <ToolLogo src={tool.logo_url} naam={tool.naam} size={72} />

          <div className="flex-1">
            <div className="flex flex-wrap items-start gap-2 mb-1">
              <h1 className="text-3xl font-bold text-surface-900" style={{ letterSpacing: '-0.025em' }}>{tool.naam}</h1>
              <PrijsmodelBadge model={tool.prijsmodel} />
              {tool.badge && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                  {tool.badge}
                </span>
              )}
            </div>
            <p className="text-surface-600 mb-3">{tool.tagline}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              {tool.beoordeling && (
                <div className="flex items-center gap-1 tabular-nums">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-surface-900">{tool.beoordeling}</span>
                  <span className="text-surface-400">/ 5</span>
                </div>
              )}
              {cat && (
                <Link href={`/categorie/${cat.slug}`} className="text-brand-500 hover:underline">
                  {cat.label}
                </Link>
              )}
              {goedkoopsteBetaald && (
                <span className="text-surface-500 tabular-nums">Vanaf €{goedkoopsteBetaald.prijs_mnd}/mnd</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <AffiliateButton toolSlug={tool.slug} label="Probeer nu" variant="primary" />
            <a href={tool.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 text-xs text-surface-400 hover:text-brand-500 transition-colors">
              <Globe className="h-3.5 w-3.5" />
              {new URL(tool.website_url).hostname}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-900 mb-3" style={{ letterSpacing: '-0.02em' }}>Over {tool.naam}</h2>
        <p className="text-surface-600 leading-relaxed">{tool.beschrijving}</p>
      </section>

      {tool.plannen.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-surface-900 mb-5" style={{ letterSpacing: '-0.02em' }}>Prijzen & plannen</h2>
          <PricingTable plannen={tool.plannen} toolSlug={tool.slug} />
        </section>
      )}

      {vergelijkbareTools.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-surface-900 mb-5" style={{ letterSpacing: '-0.02em' }}>
            Vergelijk {tool.naam} met andere {cat?.label.toLowerCase()}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {vergelijkbareTools.slice(0, 6).map(t => (
              <Link
                key={t.slug}
                href={`/vergelijk/${tool.slug}-vs-${t.slug}`}
                className="card p-3 group flex items-center gap-3"
              >
                <ToolLogo src={t.logo_url} naam={t.naam} size={36} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-surface-900 group-hover:text-brand-500 transition-colors truncate">
                    vs {t.naam}
                  </p>
                  {t.beoordeling && (
                    <p className="text-xs text-surface-500 inline-flex items-center gap-1 tabular-nums">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      {t.beoordeling}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-xs text-surface-400 border-t border-surface-200 pt-5 mt-10">
        * aivergelijker.nl kan een affiliate commissie ontvangen via onze links. Dit heeft geen invloed op onze beoordeling.
      </p>

      <div className="mt-8">
        <Link href={cat ? `/categorie/${cat.slug}` : '/'} className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-brand-500 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Terug naar {cat?.label ?? 'overzicht'}
        </Link>
      </div>

      <StickyToolBar tool={tool} vergelijkbareTools={vergelijkbareTools} />
    </div>
  )
}
