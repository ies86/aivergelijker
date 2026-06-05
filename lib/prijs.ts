import type { Tool } from './types'
import { siteConfig } from '@/site.config'

/**
 * Centrale prijs-logica. Werkt voor twee soorten sites:
 *  - 'abonnement': maandprijzen uit tool.plannen (SaaS, AI-tools) -> "Vanaf €22/mnd"
 *  - 'eenmalig':   1 vaste prijs uit tool.prijs (boeken, gadgets)  -> "€14,95"
 *
 * Door overal deze helpers te gebruiken, hoeft de UI niet te weten welk
 * prijstype de site heeft.
 */

const SUFFIX = siteConfig.prijsType === 'abonnement' ? '/mnd' : ''

/** Formatteert een bedrag als "€15" (heel) of "€14,95" (met centen). */
export function formatEuro(bedrag: number): string {
  if (Number.isInteger(bedrag)) return `€${bedrag}`
  return `€${bedrag.toFixed(2).replace('.', ',')}`
}

/** Is dit product (in dit model) gratis? */
export function heeftGratis(tool: Tool): boolean {
  if (siteConfig.prijsType === 'eenmalig') {
    return tool.prijs === 0 || tool.prijsmodel === 'gratis'
  }
  return tool.plannen.some(p => p.prijs_mnd === 0) || tool.prijsmodel === 'gratis'
}

/**
 * De laagste relevante betaalde prijs als getal (voor sorteren/filteren/stats),
 * of null als die er niet is. Bij 'abonnement' = goedkoopste maandplan > 0.
 */
export function goedkoopstePrijs(tool: Tool): number | null {
  if (siteConfig.prijsType === 'eenmalig') {
    return tool.prijs != null && tool.prijs > 0 ? tool.prijs : null
  }
  const betaald = tool.plannen.filter(p => p.prijs_mnd > 0).map(p => p.prijs_mnd)
  return betaald.length ? Math.min(...betaald) : null
}

/**
 * Label voor cards en lijsten.
 *  - gratis            -> "Gratis"
 *  - eenmalig + prijs  -> "€14,95"
 *  - abonnement + prijs-> "Vanaf €22/mnd" (of zonder 'Vanaf' als vanaf=false)
 *  - onbekend          -> null
 */
export function prijsLabel(tool: Tool, opts: { vanaf?: boolean } = {}): string | null {
  if (heeftGratis(tool)) return 'Gratis'
  const prijs = goedkoopstePrijs(tool)
  if (prijs == null) return null
  if (siteConfig.prijsType === 'eenmalig') return formatEuro(prijs)
  const vanaf = opts.vanaf ?? true
  return `${vanaf ? 'Vanaf ' : ''}${formatEuro(prijs)}${SUFFIX}`
}

/** Korte prijs voor stats: "€15" of "€15/mnd" (zonder 'Vanaf'); null -> 'n.v.t.'. */
export function prijsStat(bedrag: number | null): string {
  if (bedrag == null || bedrag <= 0) return 'n.v.t.'
  return `${formatEuro(bedrag)}${SUFFIX}`
}

export const prijsSuffix = SUFFIX
