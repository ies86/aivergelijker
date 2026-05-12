import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  toolSlug: string
  label?: string
  variant?: 'primary' | 'outline'
  className?: string
}

export default function AffiliateButton({ toolSlug, label = 'Bezoek website', variant = 'primary', className }: Props) {
  return (
    <Link
      href={`/api/go/${toolSlug}`}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
        variant === 'primary'
          ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-500 hover:to-brand-400 shadow-lg shadow-brand-500/20'
          : 'border border-white/10 text-surface-700 hover:border-brand-500/50 hover:text-brand-400 hover:bg-brand-500/5',
        className
      )}
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </Link>
  )
}
