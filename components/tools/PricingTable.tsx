import { Check } from 'lucide-react'
import type { Plan } from '@/lib/types'
import AffiliateButton from '@/components/shared/AffiliateButton'
import { cn } from '@/lib/utils'

interface Props {
  plannen: Plan[]
  toolSlug: string
}

export default function PricingTable({ plannen, toolSlug }: Props) {
  if (!plannen.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {plannen.map(plan => (
        <div
          key={plan.naam}
          className={cn(
            'rounded-xl border p-5 flex flex-col gap-4',
            plan.aanbevolen
              ? 'border-brand-500 ring-2 ring-brand-500 relative'
              : 'border-gray-200'
          )}
        >
          {plan.aanbevolen && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-semibold px-3 py-0.5 rounded-full">
              Aanbevolen
            </span>
          )}

          <div>
            <h3 className="font-semibold text-gray-900">{plan.naam}</h3>
            <div className="mt-1">
              {plan.prijs_mnd === 0 ? (
                <span className="text-2xl font-bold text-gray-900">Gratis</span>
              ) : (
                <div>
                  <span className="text-2xl font-bold text-gray-900">€{plan.prijs_mnd}</span>
                  <span className="text-sm text-gray-500">/mnd</span>
                  {plan.prijs_jaar > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">€{plan.prijs_jaar}/jaar bij jaarlijks betalen</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <ul className="space-y-2 flex-1">
            {plan.functies.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <AffiliateButton
            toolSlug={toolSlug}
            label={plan.prijs_mnd === 0 ? 'Gratis starten' : 'Kies dit plan'}
            variant={plan.aanbevolen ? 'primary' : 'outline'}
            className="w-full justify-center"
          />
        </div>
      ))}
    </div>
  )
}
