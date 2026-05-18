'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, GitCompare, Trash2 } from 'lucide-react'
import { gebruikVergelijking } from '@/lib/compareStore'
import ToolLogo from './ToolLogo'
import type { Tool } from '@/lib/types'

interface Props {
  /** Volledige tools-array zodat we per slug logo+naam kunnen ophalen */
  alleTools: Pick<Tool, 'slug' | 'naam' | 'logo_url'>[]
}

/**
 * Vaste balk onderaan het scherm met geselecteerde tools.
 * Bij 2+ tools verschijnt "Vergelijk nu" knop die naar /vergelijk/A-vs-B leidt
 * (of voor 3+ tools opent een speciale multi-compare URL).
 */
export default function CompareBar({ alleTools }: Props) {
  const { slugs, verwijder, reset, max, gemount } = gebruikVergelijking()
  const [zichtbaar, setZichtbaar] = useState(false)

  useEffect(() => {
    setZichtbaar(slugs.length > 0)
  }, [slugs.length])

  if (!gemount) return null

  const geselecteerd = slugs
    .map(s => alleTools.find(t => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => t != null)

  // Bouw vergelijk-URL
  const vergelijkUrl = geselecteerd.length >= 2
    ? `/vergelijk/${geselecteerd.map(t => t.slug).join('-vs-')}`
    : '#'

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 pointer-events-none ${
        zichtbaar ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!zichtbaar}
    >
      <div className="max-w-5xl mx-auto px-4 pb-4 pointer-events-auto">
        <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl shadow-2xl p-3 flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] pr-3 border-r border-[var(--border-default)]">
            <GitCompare className="h-4 w-4" />
            <span className="tabular-nums">{geselecteerd.length} / {max}</span>
          </div>

          {/* Geselecteerde tools */}
          <div className="flex-1 flex items-center gap-2 overflow-x-auto">
            {geselecteerd.map(tool => (
              <div key={tool.slug} className="relative group shrink-0">
                <ToolLogo src={tool.logo_url} naam={tool.naam} size={40} />
                <button
                  onClick={() => verwijder(tool.slug)}
                  aria-label={`Verwijder ${tool.naam}`}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--text-primary)] text-[var(--bg-elevated)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {/* Lege plekken visualiseren */}
            {Array.from({ length: Math.max(0, 2 - geselecteerd.length) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-10 h-10 rounded-xl border-2 border-dashed border-[var(--border-default)] flex items-center justify-center text-[var(--text-tertiary)] text-xs shrink-0"
              >
                +
              </div>
            ))}
          </div>

          {/* Acties */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={reset}
              aria-label="Reset selectie"
              className="p-2 rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
              title="Reset selectie"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            {geselecteerd.length >= 2 ? (
              <Link
                href={vergelijkUrl}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 px-5 py-2.5 rounded-full transition-colors"
              >
                <GitCompare className="h-4 w-4" />
                Vergelijk
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--text-tertiary)] bg-[var(--bg-subtle)] px-5 py-2.5 rounded-full cursor-not-allowed"
              >
                Kies nog {2 - geselecteerd.length}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
