import { cn } from '@/lib/utils'

interface Props {
  label: string
  variant?: 'nieuw' | 'populair' | 'aanbevolen' | 'gratis' | 'freemium' | 'betaald'
  className?: string
}

const styles: Record<string, string> = {
  nieuw:      'bg-emerald-100 text-emerald-700',
  populair:   'bg-orange-100 text-orange-700',
  aanbevolen: 'bg-brand-100 text-brand-700',
  gratis:     'bg-green-100 text-green-700',
  freemium:   'bg-blue-100 text-blue-700',
  betaald:    'bg-gray-100 text-gray-600',
}

export default function Badge({ label, variant, className }: Props) {
  const key = variant ?? label.toLowerCase()
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', styles[key] ?? 'bg-gray-100 text-gray-600', className)}>
      {label}
    </span>
  )
}
