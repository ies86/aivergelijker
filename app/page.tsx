import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { getAllTools } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'
import ToolLogo from '@/components/tools/ToolLogo'
import NewsletterForm from '@/components/shared/NewsletterForm'
import HeroSearch from '@/components/shared/HeroSearch'
import CategoryBanner from '@/components/shared/CategoryBanner'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 3600

const CAT_KLEUR: Record<string, string> = {
  chatbot: '#1e293b',
  afbeelding: '#db2777',
  video: '#ea580c',
  coding: '#059669',
  audio: '#0891b2',
  productiviteit: '#6d28d9',
}

const CAT_GRADIENT: Record<string, string> = {
  chatbot: 'from-slate-700 to-slate-900',
  afbeelding: 'from-pink-500 to-fuchsia-700',
  video: 'from-orange-500 to-red-700',
  coding: 'from-emerald-500 to-teal-700',
  audio: 'from-cyan-500 to-blue-700',
  productiviteit: 'from-violet-500 to-purple-700',
}

export default async function HomePage() {
  const alleTools = await getAllTools().catch(() => [])

  // Data-afgeleide stats
  const totaalTools = alleTools.length
  const aantalGratis = alleTools.filter(t => t.plannen.some(p => p.prijs_mnd === 0)).length
  const betaaldePrijzen = alleTools
    .map(t => t.plannen.filter(p => p.prijs_mnd > 0).sort((a, b) => a.prijs_mnd - b.prijs_mnd)[0]?.prijs_mnd)
    .filter((p): p is number => p != null)
  const goedkoopsteBetaald = betaaldePrijzen.length ? Math.min(...betaaldePrijzen) : null

  // Per categorie: filter uit reeds-opgehaalde alleTools (geen extra fetches)
  const categorieData = CATEGORIEEN.map(cat => {
    const tools = alleTools.filter(t => t.categorie === cat.slug)
    return { ...cat, tools, aantal: tools.length }
  })

  return (
    <>
      <JsonLd
        type="faq"
        vragen={[
          { vraag: 'Wat kost een AI-tool?', antwoord: 'De prijzen lopen sterk uiteen. Veel AI-tools bieden een gratis plan. Betaalde plannen starten doorgaans bij €5-22 per maand.' },
          { vraag: 'Welke AI-tools zijn gratis te gebruiken?', antwoord: 'Een groot deel van onze tools heeft een gratis basisversie. Filter op de categoriepagina op "Alleen gratis" om alleen die tools te zien.' },
          { vraag: 'Hoe wordt deze site gefinancierd?', antwoord: 'Wanneer je via onze links een betaald abonnement neemt, ontvangen wij soms een commissie. Dat heeft geen invloed op welke tools we tonen.' },
        ]}
      />

      {/* Hero — RTINGS-stijl: strakke statement-titel + zoekbalk */}
      <section className="relative overflow-hidden border-b border-[var(--border-default)]" style={{ background: '#06060a' }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 80%)',
        }} />
        <div aria-hidden className="absolute inset-0" style={{
          backgroundImage: [
            'radial-gradient(ellipse 50% 40% at 15% 20%, rgba(124, 58, 237, 0.4), transparent 60%)',
            'radial-gradient(ellipse 45% 35% at 85% 30%, rgba(6, 182, 212, 0.28), transparent 65%)',
          ].join(', '),
          filter: 'blur(40px)',
        }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-violet-300/80 mb-4">
            Vergelijk · Kies · Probeer
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase" style={{ letterSpacing: '-0.03em' }}>
            Vind de juiste{' '}
            <span className="bg-gradient-to-r from-violet-300 via-violet-200 to-cyan-200 bg-clip-text text-transparent">
              AI-tool
            </span>
            <br className="hidden sm:block" /> voor jouw doel
          </h1>
          <p className="text-base sm:text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Prijzen, plannen en functies van <span className="tabular-nums font-semibold text-white/80">{totaalTools}</span> AI-tools naast elkaar — in het Nederlands.
          </p>
        </div>
        <div className="relative -mt-10 px-4 pb-8">
          <HeroSearch />
        </div>
      </section>

      {/* Stats-strip — RTINGS "4,630 Bought & Tested" stijl */}
      <section className="border-b border-[var(--border-default)]" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          <div>
            <p className="text-3xl font-extrabold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.025em' }}>{totaalTools}</p>
            <p className="text-xs text-surface-500 mt-1 uppercase tracking-wider font-semibold">Tools in database</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 tabular-nums" style={{ letterSpacing: '-0.025em' }}>{aantalGratis}</p>
            <p className="text-xs text-surface-500 mt-1 uppercase tracking-wider font-semibold">Met gratis plan</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.025em' }}>
              {goedkoopsteBetaald != null ? <>€{goedkoopsteBetaald}<span className="text-base text-surface-500 font-medium">/mnd</span></> : '—'}
            </p>
            <p className="text-xs text-surface-500 mt-1 uppercase tracking-wider font-semibold">Goedkoopste betaalde</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-surface-900 tabular-nums" style={{ letterSpacing: '-0.025em' }}>{CATEGORIEEN.length}</p>
            <p className="text-xs text-surface-500 mt-1 uppercase tracking-wider font-semibold">Categorieën</p>
          </div>
        </div>
      </section>

      {/* Categorie-secties — RTINGS alternating image/text stijl */}
      {categorieData.filter(c => c.aantal > 0).map((cat, i) => {
        const imageOnLeft = i % 2 === 0
        const topTools = cat.tools.slice(0, 4)

        return (
          <section key={cat.slug} className="border-b border-[var(--border-default)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${imageOnLeft ? '' : 'lg:[&>div:first-child]:order-2'}`}>
                {/* Beeld-kolom */}
                <div className="lg:col-span-5">
                  <CategoryBanner
                    query={cat.slug}
                    aspect="4/3"
                    fallbackGradient={CAT_GRADIENT[cat.slug] ?? 'from-violet-500 to-cyan-500'}
                  />
                </div>

                {/* Tekst + tools-kolom */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: CAT_KLEUR[cat.slug] }} />
                    <p className="text-xs uppercase tracking-[0.2em] font-semibold text-surface-500">{cat.label}</p>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 mb-3" style={{ letterSpacing: '-0.025em' }}>
                    Beste {cat.label.toLowerCase()} tools
                  </h2>
                  <p className="text-surface-600 mb-6 max-w-lg">{cat.beschrijving}</p>

                  {/* Top-4 tools mini-grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {topTools.map(tool => {
                      const goedkoopste = tool.plannen.find(p => p.prijs_mnd === 0) ?? tool.plannen[0]
                      return (
                        <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-3 flex items-center gap-3 group">
                          <ToolLogo src={tool.logo_url} naam={tool.naam} size={36} />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-surface-900 group-hover:text-brand-500 transition-colors truncate">{tool.naam}</p>
                            <p className="text-xs text-surface-500 tabular-nums truncate">
                              {goedkoopste?.prijs_mnd === 0 ? 'Gratis plan' : `Vanaf €${goedkoopste?.prijs_mnd}/mnd`}
                            </p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>

                  <Link
                    href={`/categorie/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-surface-900 hover:text-brand-500 transition-colors"
                  >
                    Alle {cat.aantal} {cat.label.toLowerCase()} bekijken
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Vergelijkingen */}
      <section className="border-b border-[var(--border-default)]" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-surface-500 mb-2">Side-by-side</p>
            <h2 className="text-2xl font-extrabold text-surface-900" style={{ letterSpacing: '-0.025em' }}>Vergelijkingen</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { href: '/vergelijk/chatgpt-vs-claude', titel: 'ChatGPT vs Claude' },
              { href: '/vergelijk/gemini-vs-chatgpt', titel: 'Gemini vs ChatGPT' },
              { href: '/vergelijk/midjourney-vs-dall-e', titel: 'Midjourney vs DALL-E 3' },
              { href: '/vergelijk/cursor-vs-github-copilot', titel: 'Cursor vs GitHub Copilot' },
              { href: '/vergelijk/suno-vs-elevenlabs', titel: 'Suno vs ElevenLabs' },
              { href: '/vergelijk/perplexity-vs-chatgpt', titel: 'Perplexity vs ChatGPT' },
              { href: '/vergelijk/copilot-vs-chatgpt', titel: 'Copilot vs ChatGPT' },
              { href: '/vergelijk/adobe-firefly-vs-midjourney', titel: 'Firefly vs Midjourney' },
              { href: '/vergelijk/synthesia-vs-descript', titel: 'Synthesia vs Descript' },
              { href: '/vergelijk/copy-ai-vs-jasper', titel: 'Copy.ai vs Jasper' },
              { href: '/vergelijk/murf-vs-elevenlabs', titel: 'Murf AI vs ElevenLabs' },
              { href: '/vergelijk/surfer-seo-vs-writesonic', titel: 'Surfer SEO vs Writesonic' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="group flex items-center justify-between px-4 py-3 border border-[var(--border-default)] rounded-lg hover:border-brand-500 hover:bg-surface-50 transition-colors">
                <p className="font-semibold text-sm text-surface-900 group-hover:text-brand-500 transition-colors">{item.titel}</p>
                <ChevronRight className="h-4 w-4 text-surface-400 group-hover:text-brand-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-surface-900 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.025em' }}>Blijf op de hoogte</h2>
          <p className="text-surface-400 mb-6 max-w-md mx-auto text-sm">
            Nieuwe AI-tools en vergelijkingen — in je inbox wanneer er iets nieuws is.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
          <p className="text-surface-500 text-xs mt-3">Geen spam. Uitschrijven kan altijd.</p>
        </div>
      </section>

      {/* Affiliate-disclosure */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center">
        <p className="text-xs text-surface-500">
          Sommige links op deze site zijn affiliate-links. Wanneer je via deze links een abonnement afsluit, ontvangen wij soms een commissie. Dat heeft geen invloed op welke tools we tonen.
        </p>
      </section>
    </>
  )
}
