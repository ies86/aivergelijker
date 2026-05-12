import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center mx-auto mb-6 text-4xl">
        ?
      </div>
      <h1 className="text-3xl font-bold text-white mb-3">Pagina niet gevonden</h1>
      <p className="text-surface-500 mb-8">
        Deze pagina bestaat niet (meer). Misschien is de tool hernoemd of verplaatst.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/20">
        <ArrowLeft className="h-4 w-4" />
        Terug naar home
      </Link>
    </div>
  )
}
