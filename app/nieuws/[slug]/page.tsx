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
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/">Home</Link> <span className="mx-2">/</span>
        <Link href="/nieuws" className="hover:text-gray-600">Nieuws</Link> <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{frontmatter.titel}</span>
      </nav>

      <p className="text-xs text-gray-400 mb-3">{frontmatter.datum}</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{frontmatter.titel}</h1>
      <p className="text-gray-500 mb-10">{frontmatter.beschrijving}</p>

      <article className="prose prose-gray max-w-none">
        {content}
      </article>

      <div className="mt-10">
        <Link href="/nieuws" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" /> Terug naar nieuws
        </Link>
      </div>
    </div>
  )
}
