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
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !actief
            ? 'bg-brand-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Alle tools
      </Link>
      {CATEGORIEEN.map(cat => (
        <Link
          key={cat.slug}
          href={`/categorie/${cat.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
            actief === cat.slug
              ? 'bg-brand-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>{cat.icon}</span>
          {cat.label}
        </Link>
      ))}
    </nav>
  )
}
