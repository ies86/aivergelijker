import { MessageSquare, Image, Play, Code, Headphones, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Image,
  Play,
  Code,
  Headphones,
  Zap,
}

interface Props {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8 rounded-lg',
  md: 'w-10 h-10 rounded-xl',
  lg: 'w-14 h-14 rounded-2xl',
}

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

export default function CategoryIcon({ name, size = 'md', className }: Props) {
  const Icon = iconMap[name] ?? Zap

  return (
    <div className={cn(
      'flex items-center justify-center bg-gradient-to-br from-brand-600/20 to-accent-500/10 border border-brand-500/10',
      sizeClasses[size],
      className
    )}>
      <Icon className={cn(iconSizes[size], 'text-brand-400')} />
    </div>
  )
}
