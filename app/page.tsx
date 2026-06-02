import Link from 'next/link'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { getUitgelichtTools, getAllTools } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'
import ToolGrid from '@/components/tools/ToolGrid'
import ToolLogo from '@/components/tools/ToolLogo'
import NewsletterForm from '@/components/shared/NewsletterForm'
import HeroSearch from '@/components/shared/HeroSearch'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 3600

export default async function HomePage() {
  const [uitgelicht, alleTools] = await Promise.all([
    getUitgelichtTools().catch(() => []),
    getAllTools().catch(() => []),
  ])

  const CAT_KLEUR: Record<string, string> = {
    chatbot: '#1e293b',
    afbeelding: '#db2777',
    video: '#ea580c',
    coding: '#059669',
    audio: '#0891b2',
    productiviteit: '#6d28d9',
  }

  const aantalPerCategorie = CATEGORIEEN.map(cat => ({
    ...cat,
    aantal: alleTools.filter(t => t.categorie === cat.slug).length,
    kleur: CAT_KLEUR[cat.slug] ?? '#1e293b',
  }))

  // Data-afgeleide stats (geen verzonnen claims)
  const totaalTools = alleTools.length
  const aantalGratis = alleTools.filter(t => t.plannen.some(p => p.prijs_mnd === 0)).length
  const aantalMetAffiliate = alleTools.filter(t => t.affiliate_url != null).length
  const betaaldePrijzen = alleTools
    .map(t => t.plannen.filter(p => p.prijs_mnd > 0).sort((a, b) => a.prijs_mnd - b.prijs_mnd)[0]?.prijs_mnd)
    .filter((p): p is number => p != null)
  const goedkoopsteBetaald = betaaldePrijzen.length ? Math.min(...betaaldePrijzen) : null
  const grootsteCategorie = aantalPerCategorie.slice().sort((a, b) => b.aantal - a.aantal)[0]

  return (
    <>
      <JsonLd
        type="faq"
        vragen={[
          { vraag: 'Wat kost een AI-tool?', antwoord: 'De prijzen lopen sterk uiteen. Veel AI-tools bieden een gratis plan. Betaalde plannen starten doorgaans bij €5-22 per maand. Bekijk per tool de actuele prijzen op deze site.' },
          { vraag: 'Welke AI-tools zijn gratis te gebruiken?', antwoord: 'Een groot deel van onze tools heeft een gratis basisversie. Filter op de categoriepagina op "Alleen gratis" om alleen die tools te zien.' },
          { vraag: 'Hoe wordt deze site gefinancierd?', antwoord: 'Wanneer je via onze links een betaald abonnement neemt, ontvangen wij soms een commissie. Dat heeft geen invloed op welke tools we tonen of vergelijken.' },
        ]}
      />

      {/* Hero — Donker met tech/AI vibe */}
      <section className="relative overflow-hidden" style={{ background: '#06060a' }}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 80%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(ellipse 50% 40% at 15% 20%, rgba(124, 58, 237, 0.45), transparent 60%)',
              'radial-gradient(ellipse 45% 35% at 85% 30%, rgba(6, 182, 212, 0.30), transparent 65%)',
              'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(236, 72, 153, 0.18), transparent 70%)',
              'radial-gradient(ellipse 40% 30% at 70% 75%, rgba(167, 139, 250, 0.22), transparent 65%)',
            ].join(', '),
            filter: 'blur(40px)',
          }}
        />
        <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(167, 139, 250, 0.5) 50%, transparent 100%)' }} />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(6, 6, 10, 0.4))' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-20 lg:pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400"></span>
            </span>
            <span className="text-xs font-medium text-white/80 tabular-nums">{totaalTools} AI-tools op één plek</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3" style={{ letterSpacing: '-0.04em' }}>
            Jouw{' '}
            <span className="bg-gradient-to-r from-violet-300 via-violet-200 to-cyan-200 bg-clip-text text-transparent">
              AI vergelijker
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Vergelijk prijzen, plannen en functies van <span className="tabular-nums">{totaalTools}</span> AI-tools.
          </p>
        </div>
        <div className="relative -mt-10 px-4 pb-6">
          <HeroSearch />
        </div>
      </section>

      {/* Data-stats: alleen verifieerbare cijfers uit onze database */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-2">
        <div className="card p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.02em' }}>{totaalTools}</p>
            <p className="text-xs text-surface-500 mt-0.5">tools in onze database</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600 tabular-nums" style={{ letterSpacing: '-0.02em' }}>{aantalGratis}</p>
            <p className="text-xs text-surface-500 mt-0.5">met gratis plan</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.02em' }}>
              {goedkoopsteBetaald != null ? <>€{goedkoopsteBetaald}<span className="text-base text-surface-500 font-medium">/mnd</span></> : '—'}
            </p>
            <p className="text-xs text-surface-500 mt-0.5">goedkoopste betaalde plan</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.02em' }}>{CATEGORIEEN.length}</p>
            <p className="text-xs text-surface-500 mt-0.5">categorieën</p>
          </div>
        </div>
      </section>

      {/* Categorieën */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-surface-900 mb-1">Ontdek per categorie</h2>
        <p className="text-surface-500 text-sm mb-6">
          {grootsteCategorie ? <>Grootste categorie: <strong>{grootsteCategorie.label}</strong> ({grootsteCategorie.aantal} tools).</> : 'Bekijk alle categorieën.'}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {aantalPerCategorie.map(cat => (
            <Link key={cat.slug} href={`/categorie/${cat.slug}`} className="card p-4 group">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: cat.kleur }} />
                <p className="font-bold text-surface-900 group-hover:text-brand-500 transition-colors text-sm">{cat.label}</p>
              </div>
              <p className="text-xs text-surface-500 tabular-nums">{cat.aantal} tools</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Uitgelichte tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-surface-900">Uitgelichte tools</h2>
            <p className="text-surface-500 mt-1 text-sm">Een selectie populaire AI-tools om mee te starten.</p>
          </div>
          <Link href="/categorie/chatbot" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-white border border-surface-200 text-surface-700 hover:border-surface-400 transition-colors">
            Bekijk alle categorieën <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ToolGrid tools={uitgelicht} />
      </section>

      {/* Vergelijkingen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-surface-900 mb-1">Vergelijkingen</h2>
        <p className="text-surface-500 mb-6 text-sm">Side-by-side vergelijkingen van AI-tools op prijs en functies.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/vergelijk/chatgpt-vs-claude', titel: 'ChatGPT vs Claude' },
            { href: '/vergelijk/gemini-vs-chatgpt', titel: 'Gemini vs ChatGPT' },
            { href: '/vergelijk/midjourney-vs-dall-e', titel: 'Midjourney vs DALL-E 3' },
            { href: '/vergelijk/cursor-vs-github-copilot', titel: 'Cursor vs GitHub Copilot' },
            { href: '/vergelijk/suno-vs-elevenlabs', titel: 'Suno vs ElevenLabs' },
            { href: '/vergelijk/perplexity-vs-chatgpt', titel: 'Perplexity vs ChatGPT' },
            { href: '/vergelijk/copilot-vs-chatgpt', titel: 'Copilot vs ChatGPT' },
            { href: '/vergelijk/adobe-firefly-vs-midjourney', titel: 'Firefly vs Midjourney' },
            { href: '/vergelijk/chatgpt-vs-gemini-vs-claude', titel: 'ChatGPT vs Gemini vs Claude' },
            { href: '/vergelijk/synthesia-vs-descript', titel: 'Synthesia vs Descript' },
            { href: '/vergelijk/copy-ai-vs-jasper', titel: 'Copy.ai vs Jasper' },
            { href: '/vergelijk/murf-vs-elevenlabs', titel: 'Murf AI vs ElevenLabs' },
            { href: '/vergelijk/surfer-seo-vs-writesonic', titel: 'Surfer SEO vs Writesonic' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="card p-5 group flex items-center justify-between">
              <p className="font-bold text-surface-900 group-hover:text-brand-500 transition-colors">{item.titel}</p>
              <span className="shrink-0 w-9 h-9 rounded-lg bg-surface-100 flex items-center justify-center group-hover:bg-surface-900 transition-colors">
                <ChevronRight className="h-4 w-4 text-surface-600 group-hover:text-white transition-colors" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-surface-900 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Blijf op de hoogte</h2>
          <p className="text-surface-400 mb-6 max-w-md mx-auto">
            Nieuwe AI-tools en vergelijkingen — in je inbox wanneer er iets nieuws is.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
          <p className="text-surface-500 text-xs mt-3">Geen spam. Uitschrijven kan altijd.</p>
        </div>
      </section>

      {/* Affiliate-disclosure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <p className="text-xs text-surface-500 text-center">
          Sommige links op deze site zijn affiliate-links. Wanneer je via deze links een abonnement afsluit, ontvangen wij soms een commissie. Dat heeft geen invloed op welke tools we tonen.
        </p>
      </section>
    </>
  )
}
