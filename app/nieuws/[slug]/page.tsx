import { notFound } from 'next/navigation'
import { readFile, readdir } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { ArrowLeft } from 'lucide-react'

interface Frontmatter {
  titel: string
  beschrijving: string
  datum: string
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
  }
}

export default async function NieuwsArtikel({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getArtikel(slug)
  if (!data) notFound()

  const { content, frontmatter } = data

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-surface-400 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span className="mx-2 text-surface-300">/</span>
        <Link href="/nieuws" className="hover:text-white transition-colors">Nieuws</Link>
        <span className="mx-2 text-surface-300">/</span>
        <span className="text-white font-medium">{frontmatter.titel}</span>
      </nav>

      <p className="text-xs text-surface-400 mb-3">{frontmatter.datum}</p>
      <h1 className="text-3xl font-bold text-white mb-2">{frontmatter.titel}</h1>
      <p className="text-surface-500 mb-10">{frontmatter.beschrijving}</p>

      <article className="prose prose-invert prose-p:text-surface-500 prose-headings:text-white prose-strong:text-white prose-a:text-brand-400 max-w-none">
        {content}
      </article>

      <div className="mt-10">
        <Link href="/nieuws" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Terug naar nieuws
        </Link>
      </div>
    </div>
  )
}
