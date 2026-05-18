import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowUpRight } from 'lucide-react'
import type { Tool } from '@/lib/types'
import { prijsmodelLabel } from '@/lib/utils'

interface Props {
  tool: Tool
}

const CAT_GRADIENT: Record<string, string> = {
  chatbot: 'from-indigo-500 to-violet-600',
  afbeelding: 'from-pink-500 to-fuchsia-600',
  video: 'from-orange-500 to-amber-500',
  coding: 'from-emerald-500 to-teal-600',
  audio: 'from-cyan-500 to-blue-600',
  productiviteit: 'from-violet-500 to-purple-600',
}

export default function ToolCard({ tool }: Props) {
  const goedkoopstePlan = tool.plannen.find(p => p.prijs_mnd === 0) ?? tool.plannen[0]
  const gradient = CAT_GRADIENT[tool.categorie] ?? CAT_GRADIENT.chatbot

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {tool.logo_url ? (
            <Image src={tool.logo_url} alt={tool.naam} width={44} height={44} className="rounded-xl object-contain bg-surface-100 p-1.5" />
          ) : (
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
              {tool.naam[0]}
            </div>
          )}
          <div>
            <Link href={`/tools/${tool.slug}`} className="font-bold text-surface-900 hover:text-brand-500 transition-colors">
              {tool.naam}
            </Link>
            <div className="flex items-center gap-1 mt-0.5">
              {tool.beoordeling && (
                <>
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium text-surface-600">{tool.beoordeling}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            tool.prijsmodel === 'gratis' ? 'badge-green' :
            tool.prijsmodel === 'freemium' ? 'badge-purple' : 'badge-amber'
          }`}>
            {prijsmodelLabel(tool.prijsmodel)}
          </span>
          {tool.badge && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm">
              {tool.badge}
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-surface-500 leading-relaxed">{tool.tagline}</p>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-surface-100">
        <div className="text-sm text-surface-500">
          {goedkoopstePlan
            ? goedkoopstePlan.prijs_mnd === 0
              ? <span className="text-emerald-600 font-bold">Gratis</span>
              : <span>Vanaf <strong className="text-surface-900">&euro;{goedkoopstePlan.prijs_mnd}/mnd</strong></span>
            : null}
        </div>
        <Link
          href={`/api/go/${tool.slug}`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg hover:scale-105 px-4 py-2 rounded-full transition-all"
        >
          Probeer nu
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
