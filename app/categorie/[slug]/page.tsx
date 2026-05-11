import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getToolsByCategorie } from '@/lib/tools'
import { CATEGORIEEN, getCategorieInfo } from '@/lib/categories'
import type { Categorie } from '@/lib/types'
import ToolGrid from '@/components/tools/ToolGrid'
import CategoryNav from '@/components/layout/CategoryNav'

export async function generateStaticParams() {
  return CATEGORIEEN.map(cat => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategorieInfo(slug as Categorie)
  if (!cat) return {}
  return {
    title: `Beste ${cat.label} AI-tools`,
    description: `Vergelijk de beste ${cat.label.toLowerCase()} AI-tools. Onafhankelijke reviews, prijzen en aanbevelingen.`,
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
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <span>Home</span> <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{cat.label}</span>
      </nav>

      {/* Categorie header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{cat.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900">Beste {cat.label} AI-tools</h1>
        </div>
        <p className="text-gray-500 max-w-2xl">{cat.beschrijving}</p>
      </div>

      {/* Categorie navigatie */}
      <div className="mb-8">
        <CategoryNav actief={slug as Categorie} />
      </div>

      {/* Resultaat */}
      <p className="text-sm text-gray-500 mb-5">{tools.length} tools gevonden</p>
      <ToolGrid tools={tools} />
    </div>
  )
}
