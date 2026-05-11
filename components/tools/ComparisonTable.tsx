import Image from 'next/image'
import { Check, X, Minus } from 'lucide-react'
import type { Tool } from '@/lib/types'
import AffiliateButton from '@/components/shared/AffiliateButton'

interface Criterium {
  label: string
  waarden: (string | boolean | null)[]
}

interface Props {
  tools: Tool[]
  criteria: Criterium[]
}

function CelWaarde({ waarde }: { waarde: string | boolean | null }) {
  if (waarde === true)  return <Check className="h-5 w-5 text-green-500 mx-auto" />
  if (waarde === false) return <X className="h-5 w-5 text-red-400 mx-auto" />
  if (waarde === null)  return <Minus className="h-4 w-4 text-gray-300 mx-auto" />
  return <span className="text-sm text-gray-700">{waarde}</span>
}

export default function ComparisonTable({ tools, criteria }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-5 py-4 text-sm font-semibold text-gray-500 w-44">Criterium</th>
            {tools.map(tool => (
              <th key={tool.slug} className="px-5 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  {tool.logo_url ? (
                    <Image src={tool.logo_url} alt={tool.naam} width={36} height={36} className="rounded-lg object-contain" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                      {tool.naam[0]}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-gray-900">{tool.naam}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {criteria.map((cr, i) => (
            <tr key={cr.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-5 py-3.5 text-sm font-medium text-gray-700">{cr.label}</td>
              {cr.waarden.map((w, j) => (
                <td key={j} className="px-5 py-3.5 text-center">
                  <CelWaarde waarde={w} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 bg-gray-50">
            <td className="px-5 py-4" />
            {tools.map(tool => (
              <td key={tool.slug} className="px-5 py-4 text-center">
                <AffiliateButton toolSlug={tool.slug} label="Probeer gratis" variant="primary" className="text-xs py-2 px-4 mx-auto" />
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
