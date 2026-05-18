'use client'

import { Check, GitCompare } from 'lucide-react'
import { gebruikVergelijking } from '@/lib/compareStore'

interface Props {
  slug: string
  variant?: 'icon' | 'full'
  className?: string
}

/**
 * Toggle-knop om een tool toe te voegen aan de vergelijk-bar onderaan.
 */
export default function CompareToggleButton({ slug, variant = 'icon', className = '' }: Props) {
  const { slugs, toggle, gemount, max } = gebruikVergelijking()

  if (!gemount) return null

  const geselecteerd = slugs.includes(slug)
  const vol = slugs.length >= max && !geselecteerd

  if (variant === 'full') {
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (vol) return
          toggle(slug)
        }}
        disabled={vol}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition-colors ${
          geselecteerd
            ? 'bg-brand-500 text-white'
            : vol
              ? 'bg-[var(--bg-subtle)] text-[var(--text-tertiary)] cursor-not-allowed'
              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--border-default)]'
        } ${className}`}
        title={vol ? `Max ${max} tools` : geselecteerd ? 'Verwijder uit vergelijking' : 'Voeg toe aan vergelijking'}
      >
        {geselecteerd ? <Check className="h-3.5 w-3.5" /> : <GitCompare className="h-3.5 w-3.5" />}
        {geselecteerd ? 'Geselecteerd' : 'Vergelijk'}
      </button>
    )
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (vol) return
        toggle(slug)
      }}
      disabled={vol}
      aria-label={geselecteerd ? 'Verwijder uit vergelijking' : 'Voeg toe aan vergelijking'}
      title={vol ? `Max ${max} tools` : geselecteerd ? 'Verwijder uit vergelijking' : 'Voeg toe aan vergelijking'}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
        geselecteerd
          ? 'bg-brand-500 text-white'
          : vol
            ? 'bg-[var(--bg-subtle)] text-[var(--text-tertiary)] cursor-not-allowed'
            : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--border-default)]'
      } ${className}`}
    >
      {geselecteerd ? <Check className="h-3.5 w-3.5" /> : <GitCompare className="h-3.5 w-3.5" />}
    </button>
  )
}
