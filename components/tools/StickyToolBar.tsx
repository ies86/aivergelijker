'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Star, GitCompare, ChevronDown } from 'lucide-react'
import type { Tool } from '@/lib/types'
import ToolLogo from './ToolLogo'

interface Props {
  tool: Tool
  vergelijkbareTools: Tool[]
}

/**
 * Verschijnt onderaan de tool-pagina zodra de gebruiker voorbij de hoofd-header scrolt.
 * Bevat tool-info, een primaire CTA en een 'Vergelijk met...' dropdown.
 */
export default function StickyToolBar({ tool, vergelijkbareTools }: Props) {
  const [zichtbaar, setZichtbaar] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      // Verschijnt na 400px scrollen
      setZichtbaar(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Klik buiten dropdown sluit hem
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!target.closest('[data-compare-dropdown]')) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [dropdownOpen])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        zichtbaar ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!zichtbaar}
    >
      <div className="max-w-5xl mx-auto px-4 pb-4">
        <div className="bg-white border border-surface-200 rounded-2xl shadow-xl p-3 flex items-center gap-3">
          <ToolLogo src={tool.logo_url} naam={tool.naam} size={40} />

          <div className="flex-1 min-w-0">
            <p className="font-bold text-surface-900 truncate text-sm">{tool.naam}</p>
            <div className="flex items-center gap-3 text-xs text-surface-500">
              {tool.beoordeling && (
                <span className="inline-flex items-center gap-1 tabular-nums">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  {tool.beoordeling}
                </span>
              )}
              <span className="hidden sm:inline truncate">{tool.tagline}</span>
            </div>
          </div>

          {/* Vergelijk-dropdown */}
          {vergelijkbareTools.length > 0 && (
            <div className="relative" data-compare-dropdown>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-surface-100 hover:bg-surface-200 text-surface-700 transition-colors"
              >
                <GitCompare className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Vergelijk met</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-64 bg-white border border-surface-200 rounded-xl shadow-xl overflow-hidden">
                  <p className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-surface-400 bg-surface-50 border-b border-surface-100">
                    Direct vergelijken met
                  </p>
                  <div className="max-h-64 overflow-y-auto">
                    {vergelijkbareTools.map(t => (
                      <Link
                        key={t.slug}
                        href={`/vergelijk/${tool.slug}-vs-${t.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-50 transition-colors"
                      >
                        <ToolLogo src={t.logo_url} naam={t.naam} size={28} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-surface-900 truncate">{t.naam}</p>
                          <p className="text-xs text-surface-500 truncate">{t.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Primaire CTA */}
          <Link
            href={`/api/go/${tool.slug}`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-surface-900 hover:bg-surface-700 px-5 py-2.5 rounded-full transition-colors shrink-0"
          >
            Probeer
          </Link>
        </div>
      </div>
    </div>
  )
}
