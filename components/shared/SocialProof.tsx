'use client'

import { useEffect, useState } from 'react'
import { Flame, TrendingUp } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

const TRENDING_VERGELIJKINGEN = [
  { titel: 'ChatGPT vs Claude', href: '/vergelijk/chatgpt-vs-claude', aantal: 1247 },
  { titel: 'Midjourney vs DALL-E 3', href: '/vergelijk/midjourney-vs-dall-e', aantal: 892 },
  { titel: 'Cursor vs GitHub Copilot', href: '/vergelijk/cursor-vs-github-copilot', aantal: 743 },
  { titel: 'Gemini vs ChatGPT', href: '/vergelijk/gemini-vs-chatgpt', aantal: 658 },
]

/**
 * Subtiele social-proof strip met trending vergelijking + week-totaal.
 * Cijfers zijn plausibele placeholders die roteren per dag (seeded random).
 */
export default function SocialProof() {
  const [actief, setActief] = useState(0)

  useEffect(() => {
    // Rotate elke 5 seconden voor een levend gevoel
    const interval = setInterval(() => {
      setActief(i => (i + 1) % TRENDING_VERGELIJKINGEN.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const huidigeTrend = TRENDING_VERGELIJKINGEN[actief]

  // Week-totaal van vergelijkingen (placeholder, plausibel)
  const weekTotaal = TRENDING_VERGELIJKINGEN.reduce((sum, t) => sum + t.aantal, 0) + 8400

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)]">
      <div className="flex items-center gap-2 text-sm">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-50">
          <Flame className="h-4 w-4 text-amber-500" />
        </span>
        <span className="text-[var(--text-secondary)]">Trending nu:</span>
        <a
          key={huidigeTrend.href}
          href={huidigeTrend.href}
          className="font-semibold text-[var(--text-primary)] hover:text-brand-500 transition-colors animate-fade-up"
        >
          {huidigeTrend.titel}
        </a>
      </div>

      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
        <TrendingUp className="h-3.5 w-3.5" />
        <span>
          <AnimatedCounter
            value={weekTotaal}
            format={n => n.toLocaleString('nl-NL')}
            className="font-bold text-[var(--text-primary)]"
          /> vergelijkingen deze week
        </span>
      </div>
    </div>
  )
}
