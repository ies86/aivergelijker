import { cn } from '@/lib/utils'

interface Props {
  label: string
  variant?: 'nieuw' | 'populair' | 'aanbevolen' | 'gratis' | 'freemium' | 'betaald'
  className?: string
}

const styles: Record<string, string> = {
  nieuw:      'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
  populair:   'bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20',
  aanbevolen: 'bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20',
  gratis:     'bg-green-500/10 text-green-400 ring-1 ring-green-500/20',
  freemium:   'bg-cyan-500/10 text-accent-400 ring-1 ring-cyan-500/20',
  betaald:    'bg-surface-300/50 text-surface-600 ring-1 ring-white/10',
}

export default function Badge({ label, variant, className }: Props) {
  const key = variant ?? label.toLowerCase()
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase', styles[key] ?? 'bg-surface-300/50 text-surface-600 ring-1 ring-white/10', className)}>
      {label}
    </span>
  )
}
