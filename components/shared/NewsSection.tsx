import Link from 'next/link'
import { ExternalLink, ArrowUpRight, Newspaper } from 'lucide-react'
import { getAiNews, relatieveTijd } from '@/lib/news'

interface Props {
  /** Aantal items om te tonen */
  limit?: number
  /** Tailwind class voor label-kleur */
  labelKleur?: string
  /** Hex of CSS-kleur voor de label-dot */
  dotKleur?: string
}

/**
 * Toont live AI-nieuws uit Hacker News (echte stories, niet verzonnen).
 * Elk item linkt direct naar de originele bron + heeft een HN-discussie-link.
 */
export default async function NewsSection({ limit = 5, labelKleur = 'text-orange-700', dotKleur = '#c2410c' }: Props) {
  const items = await getAiNews(limit)

  return (
    <div>
      <div className="flex items-end justify-between mb-4 pb-2 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-2.5">
          <Newspaper className={`h-4 w-4 ${labelKleur}`} aria-hidden style={{ color: dotKleur }} />
          <h2 className={`text-sm font-extrabold uppercase tracking-[0.12em] ${labelKleur}`}>
            AI-nieuws van vandaag
          </h2>
        </div>
        <a
          href="https://hn.algolia.com/?dateRange=last24h&type=story&query=AI"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-surface-600 hover:text-brand-500 inline-flex items-center gap-1 transition-colors"
        >
          Bron: Hacker News
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-sm text-surface-500">
          <p className="font-semibold text-surface-700">Geen nieuws beschikbaar</p>
          <p className="text-xs mt-1">Kom later terug, de feed wordt elk uur ververst.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <a
              key={item.id}
              href={item.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-l-2 border-surface-200 hover:border-brand-500 pl-3 py-1 transition-colors"
            >
              <p className="text-sm font-bold text-surface-900 group-hover:text-brand-500 transition-colors leading-snug line-clamp-2">
                {item.title}
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-surface-500">
                <span className="font-medium tabular-nums">{item.domain ?? 'web'}</span>
                <span>·</span>
                <span>{relatieveTijd(item.createdAt)}</span>
                <span>·</span>
                <span className="tabular-nums">{item.points} stemmen</span>
                <ArrowUpRight className="h-3 w-3 ml-auto text-surface-300 group-hover:text-brand-500 transition-colors shrink-0" />
              </div>
            </a>
          ))}
        </div>
      )}

      <p className="text-[10px] text-surface-400 mt-4 italic">
        Wij selecteren niet, dit is een live feed gefilterd op AI-keywords uit Hacker News.
      </p>
    </div>
  )
}
