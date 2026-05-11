import { readdir } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { readFile } from 'fs/promises'

export const metadata: Metadata = {
  title: 'AI Nieuws & Updates',
  description: 'Het laatste nieuws over AI-tools, nieuwe releases en updates — in het Nederlands.',
}

interface Frontmatter {
  titel: string
  beschrijving: string
  datum: string
}

async function getAlleNieuws() {
  const dir = path.join(process.cwd(), 'content', 'nieuws')
  const files = await readdir(dir).catch(() => [] as string[])
  const mdxFiles = files.filter(f => f.endsWith('.mdx'))

  const artikelen = await Promise.all(
    mdxFiles.map(async file => {
      const slug = file.replace('.mdx', '')
      const source = await readFile(path.join(dir, file), 'utf-8')
      const { frontmatter } = await compileMDX<Frontmatter>({ source, options: { parseFrontmatter: true } })
      return { slug, ...frontmatter }
    })
  )

  return artikelen.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime())
}

export default async function NieuwsOverzicht() {
  const artikelen = await getAlleNieuws()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Nieuws</h1>
      <p className="text-gray-500 mb-10">Het laatste nieuws over AI-tools voor consumenten.</p>

      {artikelen.length === 0 ? (
        <p className="text-gray-400">Binnenkort verschijnen hier de eerste artikelen.</p>
      ) : (
        <div className="space-y-6">
          {artikelen.map(artikel => (
            <Link
              key={artikel.slug}
              href={`/nieuws/${artikel.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow group"
            >
              <p className="text-xs text-gray-400 mb-2">{artikel.datum}</p>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
                {artikel.titel}
              </h2>
              <p className="text-gray-500 text-sm mb-3">{artikel.beschrijving}</p>
              <span className="inline-flex items-center gap-1 text-brand-500 text-sm font-medium">
                Lees meer <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
