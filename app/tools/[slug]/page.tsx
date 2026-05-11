import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Star, Globe, ArrowLeft } from 'lucide-react'
import { getAllTools, getToolBySlug } from '@/lib/tools'
import { getCategorieInfo } from '@/lib/categories'
import type { Categorie } from '@/lib/types'
import PricingTable from '@/components/tools/PricingTable'
import AffiliateButton from '@/components/shared/AffiliateButton'
import Badge from '@/components/shared/Badge'
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
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span>/</span>
        {cat && <Link href={`/categorie/${cat.slug}`} className="hover:text-gray-600">{cat.label}</Link>}
        <span>/</span>
        <span className="text-gray-700 font-medium">{tool.naam}</span>
      </nav>

      {/* Tool header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-7 mb-8">
        <div className="flex flex-col sm:flex-row gap-5">
          {tool.logo_url ? (
            <Image src={tool.logo_url} alt={tool.naam} width={72} height={72} className="rounded-xl object-contain bg-gray-50 p-2 shrink-0" />
          ) : (
            <div className="w-18 h-18 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-3xl shrink-0 w-[72px] h-[72px]">
              {tool.naam[0]}
            </div>
          )}

          <div className="flex-1">
            <div className="flex flex-wrap items-start gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{tool.naam}</h1>
              <Badge label={prijsmodelLabel(tool.prijsmodel)} variant={tool.prijsmodel} />
              {tool.badge && <Badge label={tool.badge} />}
            </div>
            <p className="text-gray-500 mb-3">{tool.tagline}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              {tool.beoordeling && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{tool.beoordeling}</span>
                  <span className="text-gray-400">/5</span>
                </div>
              )}
              {cat && (
                <Link href={`/categorie/${cat.slug}`} className="text-brand-600 hover:underline">
                  {cat.icon} {cat.label}
                </Link>
              )}
              {goedkoopsteBetaald && (
                <span className="text-gray-500">Vanaf €{goedkoopsteBetaald.prijs_mnd}/mnd</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <AffiliateButton toolSlug={tool.slug} label="Bezoek website" variant="primary" />
            <a href={tool.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-gray-600">
              <Globe className="h-3.5 w-3.5" />
              {new URL(tool.website_url).hostname}
            </a>
          </div>
        </div>
      </div>

      {/* Beschrijving */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Over {tool.naam}</h2>
        <p className="text-gray-600 leading-relaxed">{tool.beschrijving}</p>
      </section>

      {/* Prijzen */}
      {tool.plannen.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Prijzen & plannen</h2>
          <PricingTable plannen={tool.plannen} toolSlug={tool.slug} />
        </section>
      )}

      {/* Affiliate disclaimer */}
      <p className="text-xs text-gray-400 border-t border-gray-100 pt-5 mt-10">
        * aivergelijker.nl kan een affiliate commissie ontvangen wanneer je via onze links een aankoop doet. Dit heeft geen invloed op onze beoordeling.
      </p>

      {/* Terug */}
      <div className="mt-8">
        <Link href={cat ? `/categorie/${cat.slug}` : '/'} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" />
          Terug naar {cat?.label ?? 'overzicht'}
        </Link>
      </div>
    </div>
  )
}
