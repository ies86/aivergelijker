import { notFound } from 'next/navigation'
import { readFile, readdir } from 'fs/promises'
import path from 'path'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getToolsBySlugs } from '@/lib/tools'
import ComparisonTable from '@/components/tools/ComparisonTable'
import AffiliateButton from '@/components/shared/AffiliateButton'

interface Frontmatter {
  titel: string
  beschrijving: string
  tools: string[]
  criteria: { label: string; waarden: (string | boolean | null)[] }[]
}

async function getVergelijking(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'vergelijkingen', `${slug}.mdx`)
  try {
    const source = await readFile(filePath, 'utf-8')
    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source,
      options: { parseFrontmatter: true },
    })
    return { content, frontmatter }
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'vergelijkingen')
  const files = await readdir(dir)
  return files.filter(f => f.endsWith('.mdx')).map(f => ({ slug: f.replace('.mdx', '') }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = await getVergelijking(slug)
  if (!data) return {}
  return {
    title: data.frontmatter.titel,
    description: data.frontmatter.beschrijving,
  }
}

export default async function VergelijkPagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getVergelijking(slug)
  if (!data) notFound()

  const { content, frontmatter } = data
  const tools = await getToolsBySlugs(frontmatter.tools ?? []).catch(() => [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/">Home</Link> <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{frontmatter.titel}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{frontmatter.titel}</h1>
      <p className="text-gray-500 mb-8">{frontmatter.beschrijving}</p>

      {/* Vergelijkingstabel */}
      {tools.length > 0 && frontmatter.criteria && (
        <div className="mb-12">
          <ComparisonTable tools={tools} criteria={frontmatter.criteria} />
        </div>
      )}

      {/* MDX artikel body */}
      <article className="prose prose-gray max-w-none">
        {content}
      </article>

      {/* CTAs */}
      {tools.length > 0 && (
        <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Probeer zelf:</p>
          <div className="flex flex-wrap gap-3">
            {tools.map(tool => (
              <AffiliateButton key={tool.slug} toolSlug={tool.slug} label={`Probeer ${tool.naam}`} />
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 border-t border-gray-100 pt-5 mt-10">
        * aivergelijker.nl kan een affiliate commissie ontvangen wanneer je via onze links een aankoop doet.
      </p>

      <div className="mt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" /> Terug naar overzicht
        </Link>
      </div>
    </div>
  )
}
