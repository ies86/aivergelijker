import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import path from 'path'
import { getAllTools } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'

export const dynamic = 'force-static'
export const revalidate = 3600

export interface ZoekItem {
  type: 'tool' | 'categorie' | 'vergelijking' | 'guide' | 'nieuws'
  titel: string
  subtitel?: string
  href: string
  logo?: string | null
  categorie?: string
  rating?: number
}

async function lijstSlugs(folder: string): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), 'content', folder)
    const files = await readdir(dir)
    return files.filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', ''))
  } catch {
    return []
  }
}

function titelVanSlug(slug: string): string {
  return slug
    .replace(/-vs-/g, ' vs ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

export async function GET() {
  const tools = await getAllTools().catch(() => [])

  const items: ZoekItem[] = []

  // Tools
  for (const tool of tools) {
    items.push({
      type: 'tool',
      titel: tool.naam,
      subtitel: tool.tagline,
      href: `/tools/${tool.slug}`,
      logo: tool.logo_url,
      categorie: tool.categorie,
      rating: tool.beoordeling ?? undefined,
    })
  }

  // Categorieën
  for (const cat of CATEGORIEEN) {
    items.push({
      type: 'categorie',
      titel: cat.label,
      subtitel: cat.beschrijving,
      href: `/categorie/${cat.slug}`,
    })
  }

  // Vergelijkingen
  const vergelijkingen = await lijstSlugs('vergelijkingen')
  for (const slug of vergelijkingen) {
    items.push({
      type: 'vergelijking',
      titel: titelVanSlug(slug),
      href: `/vergelijk/${slug}`,
    })
  }

  // Guides
  const guides = await lijstSlugs('guides')
  for (const slug of guides) {
    items.push({
      type: 'guide',
      titel: titelVanSlug(slug),
      href: `/beste-ai-voor/${slug}`,
    })
  }

  return NextResponse.json({ items })
}
