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
        'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors',
        variant === 'primary'
          ? 'bg-brand-500 text-white hover:bg-brand-600'
          : 'border border-surface-200 text-surface-700 hover:border-brand-500 hover:text-brand-500',
        className
      )}
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </Link>
  )
}
