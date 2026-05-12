import Link from 'next/link'
import { CATEGORIEEN } from '@/lib/categories'
import type { Categorie } from '@/lib/types'
import CategoryIcon from '@/components/shared/CategoryIcon'

interface Props {
  actief?: Categorie
}

export default function CategoryNav({ actief }: Props) {
  return (
    <nav className="flex gap-2 flex-wrap">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !actief
            ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20'
            : 'bg-surface-200 text-surface-600 hover:text-white hover:bg-surface-300'
        }`}
      >
        Alle tools
      </Link>
      {CATEGORIEEN.map(cat => (
        <Link
          key={cat.slug}
          href={`/categorie/${cat.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
            actief === cat.slug
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20'
              : 'bg-surface-200 text-surface-600 hover:text-white hover:bg-surface-300'
          }`}
        >
          <CategoryIcon name={cat.icon} size="sm" className="w-6 h-6 rounded-md bg-transparent border-0" />
          {cat.label}
        </Link>
      ))}
    </nav>
  )
}
