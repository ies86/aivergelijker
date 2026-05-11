import Link from 'next/link'
import { Zap } from 'lucide-react'
import { CATEGORIEEN } from '@/lib/categories'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Merk */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <Zap className="h-5 w-5 text-brand-500" />
              aivergelijker.nl
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              De onafhankelijke vergelijkingssite voor AI-tools. Wij helpen je de juiste AI-tool te vinden voor jouw situatie.
            </p>
            <p className="text-xs mt-4 text-gray-500">
              * aivergelijker.nl kan een commissie ontvangen wanneer je via onze links een aankoop doet. Dit heeft geen invloed op onze beoordelingen.
            </p>
          </div>

          {/* Categorieën */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Categorieën</h3>
            <ul className="space-y-2">
              {CATEGORIEEN.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/categorie/${cat.slug}`} className="text-sm hover:text-white transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vergelijkingen */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Vergelijkingen</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vergelijk/chatgpt-vs-claude" className="hover:text-white transition-colors">ChatGPT vs Claude</Link></li>
              <li><Link href="/vergelijk/midjourney-vs-dall-e" className="hover:text-white transition-colors">Midjourney vs DALL-E</Link></li>
              <li><Link href="/vergelijk/cursor-vs-github-copilot" className="hover:text-white transition-colors">Cursor vs Copilot</Link></li>
              <li><Link href="/beste-ai-voor/studenten" className="hover:text-white transition-colors">Beste AI voor studenten</Link></li>
              <li><Link href="/beste-ai-voor/designers" className="hover:text-white transition-colors">Beste AI voor designers</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-gray-600 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} aivergelijker.nl — Alle rechten voorbehouden</span>
          <span>Gebouwd in Nederland 🇳🇱</span>
        </div>
      </div>
    </footer>
  )
}
