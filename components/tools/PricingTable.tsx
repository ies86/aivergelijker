import { Check, Sparkles } from 'lucide-react'
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
      {plannen.map(plan => {
        // Bereken besparing bij jaarlijks betalen
        const maandelijksTotaal = plan.prijs_mnd * 12
        const besparing = plan.prijs_jaar > 0 ? maandelijksTotaal - plan.prijs_jaar : 0
        const besparingPercentage = plan.prijs_mnd > 0 && besparing > 0
          ? Math.round((besparing / maandelijksTotaal) * 100)
          : 0

        return (
          <div
            key={plan.naam}
            className={cn(
              'rounded-2xl border p-5 flex flex-col gap-4 transition-shadow hover:shadow-md',
              plan.aanbevolen
                ? 'border-brand-500 bg-purple-50/40 ring-1 ring-brand-500/30 relative'
                : 'border-surface-200 bg-white'
            )}
          >
            {plan.aanbevolen && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-brand-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                <Sparkles className="h-3 w-3" />
                Beste keuze
              </span>
            )}

            <div>
              <h3 className="font-bold text-surface-900" style={{ letterSpacing: '-0.01em' }}>
                {plan.naam}
              </h3>
              <div className="mt-2">
                {plan.prijs_mnd === 0 ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-emerald-600 tabular-nums" style={{ letterSpacing: '-0.025em' }}>
                      Gratis
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.025em' }}>
                        €{plan.prijs_mnd}
                      </span>
                      <span className="text-sm text-surface-500 font-medium">/mnd</span>
                    </div>
                    {plan.prijs_jaar > 0 && besparing > 0 && (
                      <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs">
                        <span className="text-surface-500 tabular-nums">€{plan.prijs_jaar}/jaar</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                          Bespaart €{besparing} ({besparingPercentage}%)
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <ul className="space-y-2 flex-1">
              {plan.functies.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-surface-600">
                  <Check className={cn('h-4 w-4 mt-0.5 shrink-0', plan.aanbevolen ? 'text-brand-500' : 'text-surface-400')} />
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
        )
      })}
    </div>
  )
}
