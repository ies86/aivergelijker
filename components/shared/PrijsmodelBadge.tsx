'use client'

import { useState } from 'react'
import type { Prijsmodel } from '@/lib/types'
import { prijsmodelLabel, prijsmodelUitleg } from '@/lib/utils'

interface Props {
  model: Prijsmodel
  className?: string
}

/**
 * Prijsmodel-badge met hover tooltip — legt uit wat Freemium etc. betekent.
 * Tooltip verschijnt boven de badge bij hover (desktop) of tap (mobile).
 */
export default function PrijsmodelBadge({ model, className = '' }: Props) {
  const [open, setOpen] = useState(false)

  const kleur =
    model === 'gratis' ? 'badge-green' :
    model === 'freemium' ? 'badge-purple' :
    'badge-amber'

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(o => !o)
        }}
        className={`text-xs font-semibold px-2.5 py-1 rounded-full cursor-help ${kleur}`}
        aria-label={`${prijsmodelLabel(model)}: ${prijsmodelUitleg(model)}`}
      >
        {prijsmodelLabel(model)}
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 px-3 py-2 text-xs font-normal text-white bg-surface-900 rounded-lg shadow-xl pointer-events-none"
          style={{ lineHeight: 1.4 }}
        >
          {prijsmodelUitleg(model)}
          <span
            aria-hidden
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-surface-900"
          />
        </span>
      )}
    </span>
  )
}
