'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function HeroSearch() {
  const [query, setQuery] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/?q=${encodeURIComponent(query.trim())}`
    }
  }

  return (
    <form onSubmit={handleSubmit} className="hero-search flex items-center max-w-2xl mx-auto px-2 py-2">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Vind je AI-tool hier..."
        className="flex-1 px-5 py-3 bg-transparent text-base text-surface-900 placeholder-surface-400 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Zoeken"
        className="w-11 h-11 rounded-full bg-surface-900 text-white hover:bg-surface-700 transition-colors flex items-center justify-center shrink-0"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  )
}
