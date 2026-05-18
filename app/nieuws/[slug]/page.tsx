import { notFound } from 'next/navigation'
import { readFile, readdir } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { ArrowLeft } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'

interface Frontmatter {
  titel: string
  beschrijving: string
  datum: string
  bron?: string
}

async function getArtikel(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'nieuws', `${slug}.mdx`)
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
  const dir = path.join(process.cwd(), 'content', 'nieuws')
  const files = await readdir(dir).catch(() => [] as string[])
  return files.filter(f => f.endsWith('.mdx')).map(f => ({ slug: f.replace('.mdx', '') }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = await getArtikel(slug)
  if (!data) return {}
  return {
    title: data.frontmatter.titel,
    description: data.frontmatter.beschrijving,
    openGraph: {
      title: data.frontmatter.titel,
      description: data.frontmatter.beschrijving,
      url: `https://aivergelijker.nl/nieuws/${slug}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://aivergelijker.nl/nieuws/${slug}`,
    },
  }
}

export default async function NieuwsArtikel({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getArtikel(slug)
  if (!data) notFound()

  const { content, frontmatter } = data

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <JsonLd type="article" titel={frontmatter.titel} beschrijving={frontmatter.beschrijving} slug={`nieuws/${slug}`} />

      <nav className="text-sm text-surface-500 mb-6">
        <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
        <span className="mx-2 text-surface-300">/</span>
        <Link href="/nieuws" className="hover:text-brand-500 transition-colors">Nieuws</Link>
        <span className="mx-2 text-surface-300">/</span>
        <span className="text-surface-900 font-medium">{frontmatter.titel}</span>
      </nav>

      <article className="card p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="date-tag">{frontmatter.datum}</span>
          {frontmatter.bron && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-600 bg-surface-100 px-2.5 py-1 rounded-full">
              {frontmatter.bron}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-3 leading-tight">
          {frontmatter.titel}
        </h1>
        <p className="text-lg text-surface-600 mb-8 leading-relaxed">
          {frontmatter.beschrijving}
        </p>

        <div className="prose prose-p:text-surface-700 prose-headings:text-surface-900 prose-strong:text-surface-900 prose-a:text-brand-500 prose-li:text-surface-700 max-w-none border-t border-surface-200 pt-8">
          {content}
        </div>
      </article>

      <div className="mt-8">
        <Link href="/nieuws" className="inline-flex items-center gap-2 text-sm text-surface-600 hover:text-brand-500 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Terug naar nieuws
        </Link>
      </div>
    </div>
  )
}
