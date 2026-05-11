import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-6">🤖</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Pagina niet gevonden</h1>
      <p className="text-gray-500 mb-8">
        Deze pagina bestaat niet (meer). Misschien is de tool hernoemd of is de vergelijking verplaatst.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-600 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Terug naar home
      </Link>
    </div>
  )
}
