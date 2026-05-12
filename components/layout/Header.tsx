'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sparkles, Search } from 'lucide-react'
import { CATEGORIEEN } from '@/lib/categories'
import CategoryIcon from '@/components/shared/CategoryIcon'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-400 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span>ai<span className="gradient-text">vergelijker</span>.nl</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIEEN.map(cat => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className="text-sm text-surface-600 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-surface-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/vergelijk/chatgpt-vs-claude"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-500 transition-colors"
            >
              Vergelijk
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-surface-500 hover:text-white hover:bg-white/5"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-white/5 px-4 py-3">
          <div className="max-w-2xl mx-auto">
            <SearchBox onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {open && (
        <div className="lg:hidden border-t border-white/5">
          <div className="px-4 py-3 space-y-1">
            {CATEGORIEEN.map(cat => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-surface-600 hover:text-white hover:bg-white/5 transition-all"
              >
                <CategoryIcon name={cat.icon} size="sm" />
                {cat.label}
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
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
      <input
        type="text"
        autoFocus
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Zoek AI-tools... bijv. ChatGPT, Midjourney, Grok"
        className="w-full pl-10 pr-4 py-2.5 bg-surface-100 border border-white/10 rounded-xl text-sm text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50"
      />
    </form>
  )
}
