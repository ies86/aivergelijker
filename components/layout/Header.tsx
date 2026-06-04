'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { CATEGORIEEN } from '@/lib/categories'
import ThemeToggle from '@/components/shared/ThemeToggle'
import { siteConfig } from '@/site.config'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-elevated)] border-b border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Minimaal data-bar icoon, drie oplopende balkjes = ranking */}
            <svg width="26" height="26" viewBox="0 0 26 26" className="shrink-0">
              <rect x="2" y="14" width="5" height="10" rx="1" className="fill-violet-500" />
              <rect x="10" y="9" width="5" height="15" rx="1" className="fill-violet-600" />
              <rect x="18" y="3" width="5" height="21" rx="1" className="fill-cyan-500" />
            </svg>
            <span className="text-[20px] font-extrabold tracking-tight text-[var(--text-primary)]" style={{ letterSpacing: '-0.025em' }}>
              {siteConfig.naam}<span className="text-surface-400 font-bold">{siteConfig.domeinExtensie}</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {CATEGORIEEN.map(cat => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className="text-sm font-medium text-surface-600 hover:text-brand-500 px-3 py-2 rounded-lg hover:bg-surface-50 transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-surface-500 hover:text-brand-500 hover:bg-surface-50 transition-colors"
              aria-label="Zoeken"
            >
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <Link
              href="/vergelijk/chatgpt-vs-claude"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-elevated)] hover:opacity-90 transition-opacity"
            >
              Vergelijk
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-surface-500 hover:text-surface-900"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-surface-200 px-4 py-3 bg-surface-50">
          <div className="max-w-2xl mx-auto">
            <SearchBox onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {open && (
        <div className="lg:hidden border-t border-surface-200 bg-white">
          <div className="px-4 py-2">
            {CATEGORIEEN.map(cat => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-3 text-sm font-medium text-surface-700 hover:text-brand-500 border-b border-surface-100 last:border-0"
              >
                {cat.label}
                <ChevronDown className="h-4 w-4 -rotate-90 text-surface-400" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function SearchBox({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/?q=${encodeURIComponent(query.trim())}`
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
      <input
        type="text"
        autoFocus
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Zoek AI-tools... bijv. ChatGPT, Midjourney"
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-surface-300 rounded-full text-sm text-surface-800 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
      />
    </form>
  )
}
