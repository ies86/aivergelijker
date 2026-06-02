import { Info } from 'lucide-react'

/**
 * Eerlijke disclaimer: deze pagina is op basis van publiek beschikbare informatie,
 * niet onafhankelijk getest.
 */
export default function Disclaimer() {
  return (
    <div className="flex items-start gap-3 p-4 mb-8 rounded-xl bg-amber-50 border border-amber-200 text-sm">
      <Info className="h-4 w-4 text-amber-700 mt-0.5 shrink-0" />
      <p className="text-amber-900 leading-relaxed">
        Deze vergelijking is samengesteld op basis van publiek beschikbare informatie van de aanbieders.
        Wij hebben de tools niet onafhankelijk getest. Controleer prijzen en functies altijd op de website van de aanbieder.
      </p>
    </div>
  )
}
