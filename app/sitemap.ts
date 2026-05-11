import { MetadataRoute } from 'next'
import { readdir } from 'fs/promises'
import path from 'path'
import { getAllTools } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aivergelijker.nl'

async function getMdxSlugs(folder: string): Promise<string[]> {
  const dir = path.join(process.cwd(), 'content', folder)
  const files = await readdir(dir).catch(() => [])
  return files.filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', ''))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tools, vergelijkingen, guides] = await Promise.all([
    getAllTools().catch(() => []),
    getMdxSlugs('vergelijkingen'),
    getMdxSlugs('guides'),
  ])

  const now = new Date()

  return [
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1 },

    ...CATEGORIEEN.map(cat => ({
      url: `${BASE}/categorie/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    ...tools.map(tool => ({
      url: `${BASE}/tools/${tool.slug}`,
      lastModified: new Date(tool.bijgewerkt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    ...vergelijkingen.map(slug => ({
      url: `${BASE}/vergelijk/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),

    ...guides.map(slug => ({
      url: `${BASE}/beste-ai-voor/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}
