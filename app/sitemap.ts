import type { MetadataRoute } from 'next'
import { readdir } from 'fs/promises'
import path from 'path'
import { getAllTools } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'

const BASE = 'https://aivergelijker.nl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  // Statische pagina's
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
  ]

  // Categorie-pagina's
  const categoriePaginas: MetadataRoute.Sitemap = CATEGORIEEN.map(cat => ({
    url: `${BASE}/categorie/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Tool-pagina's
  const tools = await getAllTools().catch(() => [])
  const toolPaginas: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${BASE}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Vergelijkingen
  const vergelijkingenDir = path.join(process.cwd(), 'content', 'vergelijkingen')
  const vergelijkingenFiles = await readdir(vergelijkingenDir).catch(() => [] as string[])
  const vergelijkPaginas: MetadataRoute.Sitemap = vergelijkingenFiles
    .filter(f => f.endsWith('.mdx'))
    .map(f => ({
      url: `${BASE}/vergelijk/${f.replace('.mdx', '')}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // Guides
  const guidesDir = path.join(process.cwd(), 'content', 'guides')
  const guidesFiles = await readdir(guidesDir).catch(() => [] as string[])
  const guidePaginas: MetadataRoute.Sitemap = guidesFiles
    .filter(f => f.endsWith('.mdx'))
    .map(f => ({
      url: `${BASE}/beste-ai-voor/${f.replace('.mdx', '')}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [
    ...staticPages,
    ...categoriePaginas,
    ...toolPaginas,
    ...vergelijkPaginas,
    ...guidePaginas,
  ]
}
