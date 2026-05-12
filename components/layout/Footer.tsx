import Link from 'next/link'
import { CATEGORIEEN } from '@/lib/categories'

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 inline-flex">
              <svg width="28" height="28" viewBox="0 0 36 36" className="shrink-0">
                <rect width="36" height="36" rx="10" fill="#7c3aed" />
                <path d="M10 13h6v10h-6z" rx="1.5" fill="white" fillOpacity="0.85" />
                <path d="M20 9h6v14h-6z" rx="1.5" fill="white" />
                <path d="M10 25h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-bold text-lg text-white">
                <span className="text-purple-400">ai</span>vergelijker
              </span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed mt-2">
              De onafhankelijke vergelijkingssite voor AI-tools. Wij helpen je de juiste AI-tool te vinden.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Categorieën</h3>
            <ul className="space-y-2">
              {CATEGORIEEN.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/categorie/${cat.slug}`} className="text-sm text-surface-400 hover:text-white transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Vergelijkingen</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vergelijk/chatgpt-vs-claude" className="text-surface-400 hover:text-white transition-colors">ChatGPT vs Claude</Link></li>
              <li><Link href="/vergelijk/gemini-vs-chatgpt" className="text-surface-400 hover:text-white transition-colors">Gemini vs ChatGPT</Link></li>
              <li><Link href="/vergelijk/midjourney-vs-dall-e" className="text-surface-400 hover:text-white transition-colors">Midjourney vs DALL-E</Link></li>
              <li><Link href="/vergelijk/cursor-vs-github-copilot" className="text-surface-400 hover:text-white transition-colors">Cursor vs Copilot</Link></li>
              <li><Link href="/nieuws" className="text-surface-400 hover:text-white transition-colors">Nieuws</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Guides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/beste-ai-voor/beste-gratis-ai-chatbot" className="text-surface-400 hover:text-white transition-colors">Beste gratis chatbots</Link></li>
              <li><Link href="/beste-ai-voor/beste-ai-voor-coderen" className="text-surface-400 hover:text-white transition-colors">AI voor programmeren</Link></li>
              <li><Link href="/beste-ai-voor/ai-tools-voor-beginners" className="text-surface-400 hover:text-white transition-colors">AI voor beginners</Link></li>
              <li><Link href="/beste-ai-voor/beste-ai-voor-studenten" className="text-surface-400 hover:text-white transition-colors">AI voor studenten</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-surface-400 flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} aivergelijker.nl — Alle rechten voorbehouden.</span>
          <span className="flex items-center gap-2">
            <span>* Affiliate-links hebben geen invloed op onze beoordelingen.</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
