import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { CATEGORIEEN } from '@/lib/categories'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-400 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              aivergelijker.nl
            </Link>
            <p className="text-sm text-surface-500 leading-relaxed max-w-sm">
              De onafhankelijke vergelijkingssite voor AI-tools. Wij helpen je de juiste AI-tool te vinden.
            </p>
            <p className="text-xs mt-4 text-surface-400">
              * We kunnen een commissie ontvangen via affiliate-links. Dit heeft geen invloed op onze beoordelingen.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Categorieën</h3>
            <ul className="space-y-2">
              {CATEGORIEEN.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/categorie/${cat.slug}`} className="text-sm text-surface-500 hover:text-brand-400 transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Vergelijkingen</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vergelijk/chatgpt-vs-claude" className="text-surface-500 hover:text-brand-400 transition-colors">ChatGPT vs Claude</Link></li>
              <li><Link href="/vergelijk/midjourney-vs-dall-e" className="text-surface-500 hover:text-brand-400 transition-colors">Midjourney vs DALL-E</Link></li>
              <li><Link href="/vergelijk/cursor-vs-github-copilot" className="text-surface-500 hover:text-brand-400 transition-colors">Cursor vs Copilot</Link></li>
              <li><Link href="/beste-ai-voor/studenten" className="text-surface-500 hover:text-brand-400 transition-colors">Beste AI voor studenten</Link></li>
              <li><Link href="/beste-ai-voor/designers" className="text-surface-500 hover:text-brand-400 transition-colors">Beste AI voor designers</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 text-xs text-surface-400 flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} aivergelijker.nl</span>
          <span>Gebouwd in Nederland 🇳🇱</span>
        </div>
      </div>
    </footer>
  )
}
