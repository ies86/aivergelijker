import Link from 'next/link'
import { CATEGORIEEN } from '@/lib/categories'
import type { Categorie } from '@/lib/types'

interface Props {
  actief?: Categorie
}

export default function CategoryNav({ actief }: Props) {
  return (
    <nav className="flex gap-2 flex-wrap">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
          !actief
            ? 'bg-brand-500 text-white'
            : 'bg-surface-100 text-surface-600 hover:text-brand-500 hover:bg-purple-50'
        }`}
      >
        Alle tools
      </Link>
      {CATEGORIEEN.map(cat => (
        <Link
          key={cat.slug}
          href={`/categorie/${cat.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            actief === cat.slug
              ? 'bg-brand-500 text-white'
              : 'bg-surface-100 text-surface-600 hover:text-brand-500 hover:bg-purple-50'
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  )
}
