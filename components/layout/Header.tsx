'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { CATEGORIEEN } from '@/lib/categories'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <svg width="32" height="32" viewBox="0 0 36 36" className="shrink-0">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <rect width="36" height="36" rx="10" fill="url(#logoGrad)" />
              <path d="M10 13h6v10h-6z" rx="1.5" fill="white" fillOpacity="0.85" />
              <path d="M20 9h6v14h-6z" rx="1.5" fill="white" />
              <path d="M10 25h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[22px] font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">ai</span>
              <span className="text-surface-800">vergelijker</span>
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
            <Link
              href="/nieuws"
              className="text-sm font-medium text-surface-600 hover:text-brand-500 px-3 py-2 rounded-lg hover:bg-surface-50 transition-colors"
            >
              Nieuws
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-surface-500 hover:text-brand-500 hover:bg-surface-50 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/vergelijk/chatgpt-vs-claude"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:shadow-lg hover:scale-105 transition-all"
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
            <Link
              href="/nieuws"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-3 py-3 text-sm font-medium text-surface-700 hover:text-brand-500"
            >
              Nieuws
              <ChevronDown className="h-4 w-4 -rotate-90 text-surface-400" />
            </Link>
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
