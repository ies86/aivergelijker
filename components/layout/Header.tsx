'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { CATEGORIEEN } from '@/lib/categories'
import ThemeToggle from '@/components/shared/ThemeToggle'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-elevated)] border-b border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg width="34" height="34" viewBox="0 0 36 36" className="shrink-0">
              <defs>
                <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
                <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              {/* Donker afgerond vierkant met subtiele gradient */}
              <rect width="36" height="36" rx="9" fill="url(#logoBgGrad)" />
              {/* Hoofd-sparkle: 4-puntig met curved/concave kanten */}
              <path
                d="M16 6 C 16.5 13, 17 14.5, 18 15 C 19.5 16, 22 16.5, 26 17 C 22 17.5, 19.5 18, 18 19 C 17 19.5, 16.5 21, 16 28 C 15.5 21, 15 19.5, 14 19 C 12.5 18, 10 17.5, 6 17 C 10 16.5, 12.5 16, 14 15 C 15 14.5, 15.5 13, 16 6 Z"
                fill="url(#sparkGrad)"
              />
              {/* Kleine accent-sparkle rechtsboven (shimmer) */}
              <path
                d="M27 22 C 27.2 24, 27.4 24.5, 27.8 24.7 C 28.4 25, 29.2 25.2, 30.5 25.4 C 29.2 25.6, 28.4 25.8, 27.8 26.1 C 27.4 26.3, 27.2 26.8, 27 28.8 C 26.8 26.8, 26.6 26.3, 26.2 26.1 C 25.6 25.8, 24.8 25.6, 23.5 25.4 C 24.8 25.2, 25.6 25, 26.2 24.7 C 26.6 24.5, 26.8 24, 27 22 Z"
                fill="white"
                fillOpacity="0.75"
              />
            </svg>
            <span className="text-[22px] font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">ai</span>
              <span className="text-[var(--text-primary)]">vergelijker</span>
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
