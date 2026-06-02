import Link from 'next/link'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { getAllTools } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'
import ToolLogo from '@/components/tools/ToolLogo'
import NewsletterForm from '@/components/shared/NewsletterForm'
import HeroSearch from '@/components/shared/HeroSearch'
import CategoryBanner from '@/components/shared/CategoryBanner'
import NewsSection from '@/components/shared/NewsSection'
import JsonLd from '@/components/seo/JsonLd'

// Sneller cache-verversen zodat content-updates binnen 5 min zichtbaar zijn
export const revalidate = 300

// RTINGS-stijl: alle categorie-labels in dezelfde warme kleur
const LABEL_KLEUR = 'text-orange-700'
const DOT_KLEUR = '#c2410c'

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

  // Data-afgeleide stats (geen verzonnen claims)
  const totaalTools = alleTools.length
  const aantalGratis = alleTools.filter(t => t.plannen.some(p => p.prijs_mnd === 0)).length
  const betaaldePrijzen = alleTools
    .map(t => t.plannen.filter(p => p.prijs_mnd > 0).sort((a, b) => a.prijs_mnd - b.prijs_mnd)[0]?.prijs_mnd)
    .filter((p): p is number => p != null)
  const goedkoopsteBetaald = betaaldePrijzen.length ? Math.min(...betaaldePrijzen) : null

  // Topkeuzes: prominente tools (gebaseerd op uitgelicht flag = bewust gemaakte keuze in data.ts)
  const topkeuzes = alleTools.filter(t => t.uitgelicht).slice(0, 6)

  // Recent bijgewerkte tools — voor 'reviews' sectie
  const recent = [...alleTools]
    .sort((a, b) => (b.bijgewerkt ?? '').localeCompare(a.bijgewerkt ?? ''))
    .slice(0, 4)

  // Per categorie groepen
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

      {/* Hero */}
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

      {/* Stats-strip */}
      <section className="border-b border-[var(--border-default)]" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
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

      {/* Topkeuzes — prominente affiliate-rij bovenaan (RTINGS featured-products stijl) */}
      {topkeuzes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex items-end justify-between mb-5 pb-3 border-b border-[var(--border-default)]">
            <div className="flex items-center gap-2.5">
              <Sparkles className={`h-4 w-4 ${LABEL_KLEUR}`} />
              <h2 className={`text-sm font-extrabold uppercase tracking-[0.12em] ${LABEL_KLEUR}`}>Topkeuzes</h2>
            </div>
            <p className="text-xs text-surface-500">Onze meest aanbevolen tools</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topkeuzes.map(tool => {
              const goedkoopste = tool.plannen.find(p => p.prijs_mnd === 0) ?? tool.plannen[0]
              return (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-4 group flex flex-col items-center text-center">
                  <ToolLogo src={tool.logo_url} naam={tool.naam} size={56} />
                  <p className="font-bold text-sm text-surface-900 group-hover:text-brand-500 transition-colors mt-3 line-clamp-1">{tool.naam}</p>
                  <p className="text-xs text-surface-500 tabular-nums mt-1">
                    {goedkoopste?.prijs_mnd === 0 ? <span className="text-emerald-600 font-semibold">Gratis</span> : `€${goedkoopste?.prijs_mnd}/mnd`}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Categorie-blokken — RTINGS asymmetric stijl, kleinere foto's, eenzelfde warme labelkleur */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {categorieData.filter(c => c.aantal > 0).map(cat => {
          const featured = cat.tools[0]
          const overige = cat.tools.slice(1, 4)
          const gradient = CAT_GRADIENT[cat.slug] ?? 'from-violet-500 to-cyan-500'
          const featGoedkoopste = featured?.plannen.find(p => p.prijs_mnd === 0) ?? featured?.plannen[0]

          return (
            <section key={cat.slug} aria-labelledby={`cat-${cat.slug}`}>
              <div className="flex items-end justify-between mb-4 pb-2 border-b border-[var(--border-default)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-block w-2 h-2 rounded-sm" style={{ background: DOT_KLEUR }} />
                  <h2 id={`cat-${cat.slug}`} className={`text-sm font-extrabold uppercase tracking-[0.12em] ${LABEL_KLEUR}`}>
                    {cat.label}
                  </h2>
                </div>
                <Link href={`/categorie/${cat.slug}`} className="text-xs font-semibold text-surface-600 hover:text-brand-500 inline-flex items-center gap-1 transition-colors">
                  Alle {cat.aantal} bekijken
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Asymmetric: featured (groot) + lijst (rechts). Beeld is nu kleiner (max h-48) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {featured && (
                  <Link href={`/tools/${featured.slug}`} className="lg:col-span-7 group block">
                    <div className="relative w-full overflow-hidden rounded-xl mb-3 ring-1 ring-[var(--border-default)] transition-shadow group-hover:shadow-lg h-44 sm:h-48">
                      <CategoryBanner query={cat.slug} aspect="16/9" fallbackGradient={gradient} className="!h-full" />
                    </div>
                    <div className="flex items-start gap-3">
                      <ToolLogo src={featured.logo_url} naam={featured.naam} size={40} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-extrabold text-lg text-surface-900 group-hover:text-brand-500 transition-colors leading-tight" style={{ letterSpacing: '-0.02em' }}>
                          {featured.naam}
                        </h3>
                        <p className="text-sm text-surface-600 mt-0.5 line-clamp-1">{featured.tagline}</p>
                        <p className="text-xs text-surface-500 mt-1 tabular-nums">
                          {featGoedkoopste?.prijs_mnd === 0
                            ? <span className="text-emerald-600 font-semibold">Gratis plan</span>
                            : featGoedkoopste
                              ? <>Vanaf <strong className="text-surface-900">€{featGoedkoopste.prijs_mnd}/mnd</strong></>
                              : null}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}

                <div className="lg:col-span-5 flex flex-col divide-y divide-[var(--border-default)]">
                  {overige.map(tool => {
                    const goedkoopste = tool.plannen.find(p => p.prijs_mnd === 0) ?? tool.plannen[0]
                    return (
                      <Link key={tool.slug} href={`/tools/${tool.slug}`} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0 group">
                        <ToolLogo src={tool.logo_url} naam={tool.naam} size={48} />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-surface-900 group-hover:text-brand-500 transition-colors line-clamp-1">{tool.naam}</p>
                          <p className="text-xs text-surface-500 mt-0.5 line-clamp-1">{tool.tagline}</p>
                          <p className="text-xs text-surface-600 mt-0.5 tabular-nums">
                            {goedkoopste?.prijs_mnd === 0 ? <span className="text-emerald-600 font-semibold">Gratis</span> : `€${goedkoopste?.prijs_mnd}/mnd`}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                  {cat.aantal > 4 && (
                    <Link href={`/categorie/${cat.slug}`} className="flex items-center justify-between py-2.5 text-xs font-semibold text-surface-600 hover:text-brand-500 transition-colors">
                      Bekijk alle {cat.aantal} {cat.label.toLowerCase()}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Reviews + Nieuws sectie (RTINGS 'What's New' + 'R&D In The Lab' stijl) */}
      <section className="border-t border-[var(--border-default)]" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Reviews kolom (2/3 breedte) — met grotere teaser cards */}
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-4 pb-2 border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2.5">
                <span className="inline-block w-2 h-2 rounded-sm" style={{ background: DOT_KLEUR }} />
                <h2 className={`text-sm font-extrabold uppercase tracking-[0.12em] ${LABEL_KLEUR}`}>Recente reviews</h2>
              </div>
              <Link href="/categorie/chatbot" className="text-xs font-semibold text-surface-600 hover:text-brand-500 inline-flex items-center gap-1 transition-colors">
                Alle reviews
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recent.map(tool => {
                const goedkoopste = tool.plannen.find(p => p.prijs_mnd === 0) ?? tool.plannen[0]
                // Eerste zin van beschrijving als "waarvoor dient het"
                const eersteZin = tool.beschrijving.split(/(?<=[.!?])\s+/)[0] ?? tool.tagline
                return (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card group flex flex-col p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <ToolLogo src={tool.logo_url} naam={tool.naam} size={48} />
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-base text-surface-900 group-hover:text-brand-500 transition-colors line-clamp-1" style={{ letterSpacing: '-0.02em' }}>{tool.naam}</p>
                        <p className="text-xs text-surface-500 line-clamp-1 capitalize">{tool.categorie} · {goedkoopste?.prijs_mnd === 0 ? <span className="text-emerald-600 font-semibold">Gratis</span> : <>Vanaf €{goedkoopste?.prijs_mnd}/mnd</>}</p>
                      </div>
                    </div>
                    <p className="text-sm text-surface-600 leading-relaxed line-clamp-2 mb-3">{eersteZin}</p>
                    <span className="text-xs font-semibold text-brand-500 group-hover:text-brand-700 transition-colors inline-flex items-center gap-1 mt-auto">
                      Lees verder <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Nieuws kolom (1/3 breedte) — live AI-nieuws van Hacker News */}
          <NewsSection limit={5} labelKleur={LABEL_KLEUR} dotKleur={DOT_KLEUR} />
        </div>
      </section>

      {/* Vergelijkingen — 2-kolom (RTINGS-stijl) */}
      <section className="border-t border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-4 pb-2 border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2.5">
                <span className="inline-block w-2 h-2 rounded-sm" style={{ background: DOT_KLEUR }} />
                <h2 className={`text-sm font-extrabold uppercase tracking-[0.12em] ${LABEL_KLEUR}`}>Side-by-side vergelijkingen</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: '/vergelijk/chatgpt-vs-claude', titel: 'ChatGPT vs Claude' },
                { href: '/vergelijk/gemini-vs-chatgpt', titel: 'Gemini vs ChatGPT' },
                { href: '/vergelijk/midjourney-vs-dall-e', titel: 'Midjourney vs DALL-E 3' },
                { href: '/vergelijk/cursor-vs-github-copilot', titel: 'Cursor vs GitHub Copilot' },
                { href: '/vergelijk/suno-vs-elevenlabs', titel: 'Suno vs ElevenLabs' },
                { href: '/vergelijk/perplexity-vs-chatgpt', titel: 'Perplexity vs ChatGPT' },
                { href: '/vergelijk/copilot-vs-chatgpt', titel: 'Copilot vs ChatGPT' },
                { href: '/vergelijk/adobe-firefly-vs-midjourney', titel: 'Firefly vs Midjourney' },
              ].map(item => (
                <Link key={item.href} href={item.href} className="group flex items-center justify-between px-3 py-2.5 hover:bg-surface-50 rounded-md transition-colors">
                  <p className="font-semibold text-sm text-surface-800 group-hover:text-brand-500 transition-colors">{item.titel}</p>
                  <ChevronRight className="h-4 w-4 text-surface-300 group-hover:text-brand-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 pb-2 border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2.5">
                <span className="inline-block w-2 h-2 rounded-sm" style={{ background: DOT_KLEUR }} />
                <h2 className={`text-sm font-extrabold uppercase tracking-[0.12em] ${LABEL_KLEUR}`}>Niche tools</h2>
              </div>
            </div>
            <div className="flex flex-col divide-y divide-[var(--border-default)]">
              {[
                { href: '/vergelijk/synthesia-vs-descript', titel: 'Synthesia vs Descript', sub: 'AI-video tools' },
                { href: '/vergelijk/copy-ai-vs-jasper', titel: 'Copy.ai vs Jasper', sub: 'AI-copywriting' },
                { href: '/vergelijk/murf-vs-elevenlabs', titel: 'Murf AI vs ElevenLabs', sub: 'Voice generation' },
                { href: '/vergelijk/surfer-seo-vs-writesonic', titel: 'Surfer SEO vs Writesonic', sub: 'AI voor SEO' },
              ].map(item => (
                <Link key={item.href} href={item.href} className="py-2.5 first:pt-0 group">
                  <p className="font-bold text-sm text-surface-900 group-hover:text-brand-500 transition-colors">{item.titel}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{item.sub}</p>
                </Link>
              ))}
            </div>
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

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center">
        <p className="text-xs text-surface-500">
          Sommige links op deze site zijn affiliate-links. Wanneer je via deze links een abonnement afsluit, ontvangen wij soms een commissie. Dat heeft geen invloed op welke tools we tonen.
        </p>
      </section>
    </>
  )
}
