import Link from 'next/link'
import { CATEGORIEEN } from '@/lib/categories'

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 inline-flex">
              <svg width="24" height="24" viewBox="0 0 26 26" className="shrink-0">
                <rect x="2" y="14" width="5" height="10" rx="1" fill="#a78bfa" />
                <rect x="10" y="9" width="5" height="15" rx="1" fill="#c4b5fd" />
                <rect x="18" y="3" width="5" height="21" rx="1" fill="#67e8f9" />
              </svg>
              <span className="font-extrabold text-lg text-white tracking-tight" style={{ letterSpacing: '-0.025em' }}>
                aivergelijker<span className="text-white/40 font-bold">.nl</span>
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
              <li><Link href="/vergelijk/perplexity-vs-chatgpt" className="text-surface-400 hover:text-white transition-colors">Perplexity vs ChatGPT</Link></li>
              <li><Link href="/vergelijk/copilot-vs-chatgpt" className="text-surface-400 hover:text-white transition-colors">Copilot vs ChatGPT</Link></li>
              <li><Link href="/vergelijk/synthesia-vs-descript" className="text-surface-400 hover:text-white transition-colors">Synthesia vs Descript</Link></li>
              <li><Link href="/vergelijk/murf-vs-elevenlabs" className="text-surface-400 hover:text-white transition-colors">Murf AI vs ElevenLabs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Guides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/beste-ai-voor/beste-gratis-ai-chatbot" className="text-surface-400 hover:text-white transition-colors">Beste gratis chatbots</Link></li>
              <li><Link href="/beste-ai-voor/beste-ai-voor-coderen" className="text-surface-400 hover:text-white transition-colors">AI voor programmeren</Link></li>
              <li><Link href="/beste-ai-voor/ai-tools-voor-beginners" className="text-surface-400 hover:text-white transition-colors">AI voor beginners</Link></li>
              <li><Link href="/beste-ai-voor/beste-ai-voor-studenten" className="text-surface-400 hover:text-white transition-colors">AI voor studenten</Link></li>
              <li><Link href="/beste-ai-voor/beste-ai-voor-video-maken" className="text-surface-400 hover:text-white transition-colors">AI voor video maken</Link></li>
              <li><Link href="/beste-ai-voor/beste-ai-voor-seo" className="text-surface-400 hover:text-white transition-colors">AI voor SEO</Link></li>
              <li><Link href="/beste-ai-voor/beste-ai-voor-meetings" className="text-surface-400 hover:text-white transition-colors">AI voor meetings</Link></li>
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
