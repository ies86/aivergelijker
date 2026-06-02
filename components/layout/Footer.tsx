import Link from 'next/link'
import { CATEGORIEEN } from '@/lib/categories'

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 inline-flex">
              <svg width="30" height="30" viewBox="0 0 36 36" className="shrink-0">
                <defs>
                  <linearGradient id="footerSparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c4b5fd" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <rect width="36" height="36" rx="9" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.15" />
                <path
                  d="M16 6 C 16.5 13, 17 14.5, 18 15 C 19.5 16, 22 16.5, 26 17 C 22 17.5, 19.5 18, 18 19 C 17 19.5, 16.5 21, 16 28 C 15.5 21, 15 19.5, 14 19 C 12.5 18, 10 17.5, 6 17 C 10 16.5, 12.5 16, 14 15 C 15 14.5, 15.5 13, 16 6 Z"
                  fill="url(#footerSparkGrad)"
                />
                <path
                  d="M27 22 C 27.2 24, 27.4 24.5, 27.8 24.7 C 28.4 25, 29.2 25.2, 30.5 25.4 C 29.2 25.6, 28.4 25.8, 27.8 26.1 C 27.4 26.3, 27.2 26.8, 27 28.8 C 26.8 26.8, 26.6 26.3, 26.2 26.1 C 25.6 25.8, 24.8 25.6, 23.5 25.4 C 24.8 25.2, 25.6 25, 26.2 24.7 C 26.6 24.5, 26.8 24, 27 22 Z"
                  fill="white"
                  fillOpacity="0.75"
                />
              </svg>
              <span className="font-bold text-lg text-white">
                <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">ai</span>vergelijker
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
