'use client'

import { useMemo, useState } from 'react'
import { Filter, ArrowUpDown, X } from 'lucide-react'
import type { Tool } from '@/lib/types'
import ToolGrid from './ToolGrid'

type SortKey = 'rating' | 'prijs-laag' | 'prijs-hoog' | 'naam'

interface Props {
  tools: Tool[]
}

const SORT_LABELS: Record<SortKey, string> = {
  'rating': 'Hoogste rating',
  'prijs-laag': 'Prijs (laag → hoog)',
  'prijs-hoog': 'Prijs (hoog → laag)',
  'naam': 'Naam (A → Z)',
}

export default function CategoryToolList({ tools }: Props) {
  const [alleenGratis, setAlleenGratis] = useState(false)
  const [maxPrijs, setMaxPrijs] = useState<number | null>(null)
  const [sort, setSort] = useState<SortKey>('rating')

  // Bereken min/max prijs in deze categorie voor de slider
  const { minPrijs, maxBeschikbarePrijs } = useMemo(() => {
    const prijzen = tools
      .flatMap(t => t.plannen.map(p => p.prijs_mnd))
      .filter(p => p > 0)
    return {
      minPrijs: prijzen.length ? Math.min(...prijzen) : 0,
      maxBeschikbarePrijs: prijzen.length ? Math.max(...prijzen) : 100,
    }
  }, [tools])

  const gefilterd = useMemo(() => {
    let resultaat = tools.slice()

    if (alleenGratis) {
      resultaat = resultaat.filter(t => t.plannen.some(p => p.prijs_mnd === 0))
    }

    if (maxPrijs != null) {
      resultaat = resultaat.filter(t => {
        const goedkoopste = t.plannen.find(p => p.prijs_mnd > 0)?.prijs_mnd ?? 0
        return goedkoopste === 0 || goedkoopste <= maxPrijs
      })
    }

    resultaat.sort((a, b) => {
      if (sort === 'rating') return (b.beoordeling ?? 0) - (a.beoordeling ?? 0)
      if (sort === 'naam') return a.naam.localeCompare(b.naam)
      const prijsA = a.plannen.find(p => p.prijs_mnd > 0)?.prijs_mnd ?? Infinity
      const prijsB = b.plannen.find(p => p.prijs_mnd > 0)?.prijs_mnd ?? Infinity
      return sort === 'prijs-laag' ? prijsA - prijsB : prijsB - prijsA
    })

    return resultaat
  }, [tools, alleenGratis, maxPrijs, sort])

  const heeftActieveFilters = alleenGratis || maxPrijs != null

  return (
    <>
      {/* Filter-balk */}
      <div className="card p-3 mb-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-600 px-2">
          <Filter className="h-3.5 w-3.5" /> Filter
        </span>

        <button
          onClick={() => setAlleenGratis(v => !v)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
            alleenGratis
              ? 'bg-emerald-600 text-white'
              : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
          }`}
        >
          Alleen gratis
        </button>

        {maxBeschikbarePrijs > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-100 rounded-full">
            <label htmlFor="max-prijs" className="text-xs font-medium text-surface-600">Max:</label>
            <input
              id="max-prijs"
              type="range"
              min={minPrijs}
              max={maxBeschikbarePrijs}
              step={5}
              value={maxPrijs ?? maxBeschikbarePrijs}
              onChange={e => setMaxPrijs(Number(e.target.value))}
              className="w-28 accent-brand-500"
            />
            <span className="text-xs font-bold text-surface-900 tabular-nums min-w-[3rem]">
              €{maxPrijs ?? maxBeschikbarePrijs}/mnd
            </span>
          </div>
        )}

        <div className="ml-auto inline-flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-surface-500" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortKey)}
            className="text-xs font-semibold text-surface-700 bg-surface-100 border-0 rounded-full px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          >
            {Object.entries(SORT_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        {heeftActieveFilters && (
          <button
            onClick={() => {
              setAlleenGratis(false)
              setMaxPrijs(null)
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-surface-500 hover:text-surface-900 px-2"
          >
            <X className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      {/* Resultaat-teller */}
      <p className="text-sm text-surface-500 mb-5 tabular-nums">
        <strong className="text-surface-900">{gefilterd.length}</strong>
        {' '}van {tools.length} tools{heeftActieveFilters ? ' na filteren' : ''}
      </p>

      {gefilterd.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-surface-600 mb-3">Geen tools gevonden met deze filters.</p>
          <button
            onClick={() => {
              setAlleenGratis(false)
              setMaxPrijs(null)
            }}
            className="text-sm font-semibold text-brand-500 hover:text-brand-700"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ToolGrid tools={gefilterd} />
      )}
    </>
  )
}
