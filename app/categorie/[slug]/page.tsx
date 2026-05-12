import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getToolsByCategorie } from '@/lib/tools'
import { CATEGORIEEN, getCategorieInfo } from '@/lib/categories'
import type { Categorie } from '@/lib/types'
import ToolGrid from '@/components/tools/ToolGrid'
import CategoryNav from '@/components/layout/CategoryNav'
import CategoryIcon from '@/components/shared/CategoryIcon'

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-surface-400 mb-6">
        <span>Home</span> <span className="mx-2 text-surface-300">/</span>
        <span className="text-white font-medium">{cat.label}</span>
      </nav>

      <div className="mb-10 flex items-start gap-4">
        <CategoryIcon name={cat.icon} size="lg" />
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Beste {cat.label} AI-tools</h1>
          <p className="text-surface-500 max-w-2xl">{cat.langeBeschrijving}</p>
        </div>
      </div>

      <div className="mb-8">
        <CategoryNav actief={slug as Categorie} />
      </div>

      <p className="text-sm text-surface-400 mb-5">{tools.length} tools gevonden</p>
      <ToolGrid tools={tools} />
    </div>
  )
}
