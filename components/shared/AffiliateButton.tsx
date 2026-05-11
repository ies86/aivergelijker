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
        'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors',
        variant === 'primary'
          ? 'bg-brand-500 text-white hover:bg-brand-600'
          : 'border border-brand-500 text-brand-600 hover:bg-brand-50',
        className
      )}
    >
      {label}
      <ExternalLink className="h-4 w-4" />
    </Link>
  )
}
