import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import type { Tool } from '@/lib/types'
import Badge from '@/components/shared/Badge'
import AffiliateButton from '@/components/shared/AffiliateButton'
import { prijsmodelLabel } from '@/lib/utils'

interface Props {
  tool: Tool
}

export default function ToolCard({ tool }: Props) {
  const goedkoopstePlan = tool.plannen.find(p => p.prijs_mnd === 0) ?? tool.plannen[0]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {tool.logo_url ? (
            <Image src={tool.logo_url} alt={tool.naam} width={44} height={44} className="rounded-lg object-contain bg-gray-50 p-1" />
          ) : (
            <div className="w-11 h-11 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg">
              {tool.naam[0]}
            </div>
          )}
          <div>
            <Link href={`/tools/${tool.slug}`} className="font-semibold text-gray-900 hover:text-brand-600 transition-colors">
              {tool.naam}
            </Link>
            <div className="flex items-center gap-1 mt-0.5">
              {tool.beoordeling && (
                <>
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-500">{tool.beoordeling}</span>
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

      {/* Tagline */}
      <p className="text-sm text-gray-600 leading-relaxed">{tool.tagline}</p>

      {/* Prijs + CTA */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          {goedkoopstePlan
            ? goedkoopstePlan.prijs_mnd === 0
              ? <span className="text-green-600 font-medium">Gratis beschikbaar</span>
              : <span>Vanaf <strong className="text-gray-900">€{goedkoopstePlan.prijs_mnd}/mnd</strong></span>
            : null}
        </div>
        <AffiliateButton toolSlug={tool.slug} label="Bekijk tool" variant="outline" className="text-xs py-1.5 px-3" />
      </div>
    </div>
  )
}
