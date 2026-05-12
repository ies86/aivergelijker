import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Star, Globe, ArrowLeft, ExternalLink } from 'lucide-react'
import { getAllTools, getToolBySlug } from '@/lib/tools'
import { getCategorieInfo } from '@/lib/categories'
import type { Categorie } from '@/lib/types'
import PricingTable from '@/components/tools/PricingTable'
import AffiliateButton from '@/components/shared/AffiliateButton'
import Badge from '@/components/shared/Badge'
import JsonLd from '@/components/seo/JsonLd'
import { prijsmodelLabel } from '@/lib/utils'

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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <JsonLd type="tool" tool={tool} />
      <nav className="text-sm text-surface-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span className="text-surface-300">/</span>
        {cat && <Link href={`/categorie/${cat.slug}`} className="hover:text-white transition-colors">{cat.label}</Link>}
        <span className="text-surface-300">/</span>
        <span className="text-white font-medium">{tool.naam}</span>
      </nav>

      <div className="bg-surface-100 rounded-2xl border border-white/5 p-7 mb-8 gradient-border">
        <div className="flex flex-col sm:flex-row gap-5">
          {tool.logo_url ? (
            <Image src={tool.logo_url} alt={tool.naam} width={72} height={72} className="rounded-2xl object-contain bg-surface-200 p-2 shrink-0" />
          ) : (
            <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white font-bold text-3xl shrink-0">
              {tool.naam[0]}
            </div>
          )}

          <div className="flex-1">
            <div className="flex flex-wrap items-start gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{tool.naam}</h1>
              <Badge label={prijsmodelLabel(tool.prijsmodel)} variant={tool.prijsmodel} />
              {tool.badge && <Badge label={tool.badge} />}
            </div>
            <p className="text-surface-500 mb-3">{tool.tagline}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              {tool.beoordeling && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-white">{tool.beoordeling}</span>
                  <span className="text-surface-400">/5</span>
                </div>
              )}
              {cat && (
                <Link href={`/categorie/${cat.slug}`} className="text-brand-400 hover:underline">
                  {cat.label}
                </Link>
              )}
              {goedkoopsteBetaald && (
                <span className="text-surface-500">Vanaf &euro;{goedkoopsteBetaald.prijs_mnd}/mnd</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <AffiliateButton toolSlug={tool.slug} label="Probeer nu" variant="primary" />
            <a href={tool.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 text-xs text-surface-400 hover:text-brand-400 transition-colors">
              <Globe className="h-3.5 w-3.5" />
              {new URL(tool.website_url).hostname}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Over {tool.naam}</h2>
        <p className="text-surface-500 leading-relaxed">{tool.beschrijving}</p>
      </section>

      {tool.plannen.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-5">Prijzen & plannen</h2>
          <PricingTable plannen={tool.plannen} toolSlug={tool.slug} />
        </section>
      )}

      <p className="text-xs text-surface-400 border-t border-white/5 pt-5 mt-10">
        * aivergelijker.nl kan een affiliate commissie ontvangen via onze links. Dit heeft geen invloed op onze beoordeling.
      </p>

      <div className="mt-8">
        <Link href={cat ? `/categorie/${cat.slug}` : '/'} className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Terug naar {cat?.label ?? 'overzicht'}
        </Link>
      </div>
    </div>
  )
}
