import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowUpRight } from 'lucide-react'
import type { Tool } from '@/lib/types'
import Badge from '@/components/shared/Badge'
import { prijsmodelLabel } from '@/lib/utils'

interface Props {
  tool: Tool
}

export default function ToolCard({ tool }: Props) {
  const goedkoopstePlan = tool.plannen.find(p => p.prijs_mnd === 0) ?? tool.plannen[0]

  return (
    <div className="bg-surface-100 rounded-2xl border border-white/5 p-5 flex flex-col gap-4 card-hover gradient-border">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {tool.logo_url ? (
            <Image src={tool.logo_url} alt={tool.naam} width={44} height={44} className="rounded-xl object-contain bg-surface-200 p-1.5" />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
              {tool.naam[0]}
            </div>
          )}
          <div>
            <Link href={`/tools/${tool.slug}`} className="font-semibold text-white hover:text-brand-400 transition-colors">
              {tool.naam}
            </Link>
            <div className="flex items-center gap-1 mt-0.5">
              {tool.beoordeling && (
                <>
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-surface-500">{tool.beoordeling}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <Badge label={prijsmodelLabel(tool.prijsmodel)} variant={tool.prijsmodel} />
          {tool.badge && <Badge label={tool.badge} />}
        </div>
      </div>

      <p className="text-sm text-surface-500 leading-relaxed">{tool.tagline}</p>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
        <div className="text-sm text-surface-500">
          {goedkoopstePlan
            ? goedkoopstePlan.prijs_mnd === 0
              ? <span className="text-emerald-400 font-medium">Gratis</span>
              : <span>Vanaf <strong className="text-white">&euro;{goedkoopstePlan.prijs_mnd}/mnd</strong></span>
            : null}
        </div>
        <Link
          href={`/api/go/${tool.slug}`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 px-3 py-1.5 rounded-lg border border-brand-500/20 hover:border-brand-500/40 hover:bg-brand-500/5 transition-all"
        >
          Probeer nu
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
