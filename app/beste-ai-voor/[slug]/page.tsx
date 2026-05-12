import { notFound } from 'next/navigation'
import { readFile, readdir } from 'fs/promises'
import path from 'path'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getToolsBySlugs } from '@/lib/tools'
import ToolGrid from '@/components/tools/ToolGrid'
import JsonLd from '@/components/seo/JsonLd'

interface Frontmatter {
  titel: string
  beschrijving: string
  tools: string[]
}

async function getGuide(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'guides', `${slug}.mdx`)
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
  const dir = path.join(process.cwd(), 'content', 'guides')
  const files = await readdir(dir)
  return files.filter(f => f.endsWith('.mdx')).map(f => ({ slug: f.replace('.mdx', '') }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = await getGuide(slug)
  if (!data) return {}
  return {
    title: data.frontmatter.titel,
    description: data.frontmatter.beschrijving,
    openGraph: {
      title: data.frontmatter.titel,
      description: data.frontmatter.beschrijving,
      url: `https://aivergelijker.nl/beste-ai-voor/${slug}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://aivergelijker.nl/beste-ai-voor/${slug}`,
    },
  }
}

export default async function GuidePagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getGuide(slug)
  if (!data) notFound()

  const { content, frontmatter } = data
  const tools = frontmatter.tools?.length
    ? await getToolsBySlugs(frontmatter.tools).catch(() => [])
    : []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-surface-500 mb-6">
        <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
        <span className="mx-2 text-surface-300">/</span>
        <span className="text-surface-900 font-medium">{frontmatter.titel}</span>
      </nav>

      <JsonLd type="article" titel={frontmatter.titel} beschrijving={frontmatter.beschrijving} slug={`beste-ai-voor/${slug}`} />
      <h1 className="text-3xl font-bold text-surface-900 mb-2">{frontmatter.titel}</h1>
      <p className="text-surface-500 mb-10">{frontmatter.beschrijving}</p>

      <article className="prose prose-p:text-surface-600 prose-headings:text-surface-900 prose-strong:text-surface-900 prose-a:text-brand-500 max-w-none mb-12">
        {content}
      </article>

      {tools.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-surface-900 mb-5">Aanbevolen tools</h2>
          <ToolGrid tools={tools} />
        </div>
      )}

      <p className="text-xs text-surface-400 border-t border-surface-200 pt-5 mt-10">
        * aivergelijker.nl kan een affiliate commissie ontvangen via onze links.
      </p>

      <div className="mt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-brand-500 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Terug naar overzicht
        </Link>
      </div>
    </div>
  )
}
