'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Star, ArrowRight, Loader2, Box, Layers, GitCompare, BookOpen, Newspaper } from 'lucide-react'
import ToolLogo from '@/components/tools/ToolLogo'

interface ZoekItem {
  type: 'tool' | 'categorie' | 'vergelijking' | 'guide' | 'nieuws'
  titel: string
  subtitel?: string
  href: string
  logo?: string | null
  categorie?: string
  rating?: number
}

const TYPE_LABELS: Record<ZoekItem['type'], { label: string; icon: typeof Box }> = {
  tool: { label: 'Tools', icon: Box },
  categorie: { label: 'Categorieën', icon: Layers },
  vergelijking: { label: 'Vergelijkingen', icon: GitCompare },
  guide: { label: 'Guides', icon: BookOpen },
  nieuws: { label: 'Nieuws', icon: Newspaper },
}

export default function HeroSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<ZoekItem[] | null>(null)
  const [open, setOpen] = useState(false)
  const [actief, setActief] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Laad alle items lazy bij eerste focus
  useEffect(() => {
    if (items != null) return
    if (!open) return
    fetch('/api/search')
      .then(r => r.json())
      .then(d => setItems(d.items))
      .catch(() => setItems([]))
  }, [open, items])

  // Sluiten bij klik buiten
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Cmd/Ctrl+K shortcut
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Filter resultaten
  const gefilterd = useMemo(() => {
    if (!items) return []
    const q = query.trim().toLowerCase()
    if (!q) {
      // Zonder query: toon 3 populaire tools + 3 vergelijkingen
      const tools = items.filter(i => i.type === 'tool').slice(0, 4)
      const vergelijkingen = items.filter(i => i.type === 'vergelijking').slice(0, 3)
      return [...tools, ...vergelijkingen]
    }
    return items
      .filter(i =>
        i.titel.toLowerCase().includes(q) ||
        i.subtitel?.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        // Exact match eerst
        const aMatch = a.titel.toLowerCase().startsWith(q) ? 0 : 1
        const bMatch = b.titel.toLowerCase().startsWith(q) ? 0 : 1
        if (aMatch !== bMatch) return aMatch - bMatch
        // Tools voor categorieën voor vergelijkingen voor rest
        const orde: Record<ZoekItem['type'], number> = { tool: 0, categorie: 1, vergelijking: 2, guide: 3, nieuws: 4 }
        return orde[a.type] - orde[b.type]
      })
      .slice(0, 12)
  }, [items, query])

  // Reset actieve index bij filter-change
  useEffect(() => { setActief(0) }, [query])

  // Groepeer per type
  const gegroepeerd = useMemo(() => {
    const groups: Record<string, ZoekItem[]> = {}
    gefilterd.forEach(item => {
      if (!groups[item.type]) groups[item.type] = []
      groups[item.type].push(item)
    })
    return groups
  }, [gefilterd])

  // Plat lijstje voor keyboard navigatie
  const platteLijst = gefilterd

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActief(i => Math.min(i + 1, platteLijst.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActief(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = platteLijst[actief]
      if (item) {
        setOpen(false)
        router.push(item.href)
      } else if (query.trim()) {
        setOpen(false)
        router.push(`/?q=${encodeURIComponent(query.trim())}`)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div ref={containerRef} className="relative max-w-2xl mx-auto">
      <form
        onSubmit={e => {
          e.preventDefault()
          if (platteLijst[0]) {
            setOpen(false)
            router.push(platteLijst[0].href)
          }
        }}
        className="hero-search flex items-center px-2 py-2"
      >
        <div className="pl-3 pr-1">
          <Search className="h-5 w-5 text-surface-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Zoek tool, vergelijking of categorie..."
          className="flex-1 px-2 py-3 bg-transparent text-base text-surface-900 placeholder-surface-400 focus:outline-none"
        />
        <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 mr-1 text-[10px] font-mono font-semibold text-surface-500 bg-surface-100 rounded border border-surface-200">
          ⌘ K
        </kbd>
        <button
          type="submit"
          aria-label="Zoeken"
          className="w-11 h-11 rounded-full bg-surface-900 text-white hover:bg-surface-700 transition-colors flex items-center justify-center shrink-0"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-surface-200 rounded-2xl shadow-2xl overflow-hidden max-h-[70vh] overflow-y-auto z-50">
          {items == null && (
            <div className="p-6 flex items-center justify-center gap-2 text-sm text-surface-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Zoeken...
            </div>
          )}

          {items != null && platteLijst.length === 0 && (
            <div className="p-6 text-center text-sm text-surface-500">
              <p className="mb-2">Geen resultaten voor <strong className="text-surface-900">"{query}"</strong></p>
              <p className="text-xs">Probeer een AI-toolnaam zoals "ChatGPT", "Midjourney" of "Claude".</p>
            </div>
          )}

          {items != null && platteLijst.length > 0 && (
            <>
              {(['tool', 'categorie', 'vergelijking', 'guide', 'nieuws'] as const).map(type => {
                const groupItems = gegroepeerd[type]
                if (!groupItems?.length) return null
                const { label, icon: Icon } = TYPE_LABELS[type]
                return (
                  <div key={type}>
                    <div className="flex items-center gap-2 px-4 py-2 bg-surface-50 border-b border-surface-100">
                      <Icon className="h-3 w-3 text-surface-400" />
                      <p className="text-[11px] font-bold uppercase tracking-wider text-surface-400">
                        {label}
                      </p>
                    </div>
                    {groupItems.map(item => {
                      const platteIndex = platteLijst.indexOf(item)
                      const isActief = platteIndex === actief
                      return (
                        <Link
                          key={`${item.type}-${item.href}`}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          onMouseEnter={() => setActief(platteIndex)}
                          className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                            isActief ? 'bg-brand-500/5' : ''
                          }`}
                        >
                          {item.type === 'tool' ? (
                            <ToolLogo src={item.logo ?? null} naam={item.titel} size={32} />
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center shrink-0">
                              <Icon className="h-4 w-4 text-surface-500" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-surface-900 truncate flex items-center gap-2">
                              {item.titel}
                              {item.rating != null && (
                                <span className="inline-flex items-center gap-0.5 text-xs text-surface-500 tabular-nums font-medium">
                                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                  {item.rating}
                                </span>
                              )}
                            </p>
                            {item.subtitel && (
                              <p className="text-xs text-surface-500 truncate">{item.subtitel}</p>
                            )}
                          </div>
                          <ArrowRight className={`h-4 w-4 shrink-0 transition-colors ${isActief ? 'text-brand-500' : 'text-surface-300'}`} />
                        </Link>
                      )
                    })}
                  </div>
                )
              })}

              <div className="border-t border-surface-100 bg-surface-50 px-4 py-2 flex items-center justify-between text-[11px] text-surface-500">
                <span className="inline-flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 font-mono bg-white border border-surface-200 rounded">↑↓</kbd>
                  navigeren
                  <kbd className="px-1.5 py-0.5 font-mono bg-white border border-surface-200 rounded">↵</kbd>
                  open
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 font-mono bg-white border border-surface-200 rounded">esc</kbd> sluiten
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
