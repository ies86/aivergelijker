import Link from 'next/link'
import { ArrowRight, ChevronRight, Sparkles, Star } from 'lucide-react'
import { getUitgelichtTools, getAllTools, getHiddenGems } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'
import ToolGrid from '@/components/tools/ToolGrid'
import ToolLogo from '@/components/tools/ToolLogo'
import NewsletterForm from '@/components/shared/NewsletterForm'
import HeroSearch from '@/components/shared/HeroSearch'
import JsonLd from '@/components/seo/JsonLd'

const MAANDEN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']

export const revalidate = 3600

export default async function HomePage() {
  const [uitgelicht, alleTools, hiddenGems] = await Promise.all([
    getUitgelichtTools().catch(() => []),
    getAllTools().catch(() => []),
    getHiddenGems().catch(() => []),
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

  return (
    <>
      <JsonLd
        type="faq"
        vragen={[
          { vraag: 'Wat is de beste gratis AI-chatbot?', antwoord: 'ChatGPT, Claude en Gemini bieden allemaal sterke gratis versies. ChatGPT is het meest veelzijdig, Claude schrijft de beste teksten, en Gemini integreert het beste met Google Workspace.' },
          { vraag: 'Wat kost een AI-tool?', antwoord: 'De meeste AI-tools bieden een gratis versie. Betaalde plannen beginnen meestal rond €10-22 per maand. Bekijk onze prijsvergelijkingen voor actuele prijzen.' },
          { vraag: 'Welke AI-tool is het beste voor afbeeldingen?', antwoord: 'Midjourney levert de mooiste artistieke beelden. DALL-E 3 is gratis beschikbaar via ChatGPT en makkelijker te gebruiken. Adobe Firefly is het beste voor professionele designers.' },
          { vraag: 'Welke AI is het beste voor programmeren?', antwoord: 'Cursor en GitHub Copilot zijn de populairste AI-coding tools. Cursor biedt een complete AI-editor, terwijl Copilot als plugin in je bestaande editor werkt.' },
          { vraag: 'Is AI veilig om te gebruiken?', antwoord: 'Ja, de grote AI-tools van OpenAI, Google en Anthropic zijn veilig. Deel geen gevoelige persoonlijke gegevens of wachtwoorden met AI-chatbots.' },
        ]}
      />

      {/* Hero — Sneakerjagers-stijl: donker, gecentreerd met zoekbalk */}
      <section className="relative bg-surface-900 overflow-hidden">
        {/* Subtiel patroon-effect met radial gradients */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(109, 40, 217, 0.25) 0px, transparent 40%), radial-gradient(circle at 80% 70%, rgba(15, 118, 110, 0.20) 0px, transparent 40%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-20 lg:pb-28 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3">
            Jouw AI vergelijker
          </h1>
          <p className="text-base sm:text-lg text-surface-300 mb-10 max-w-xl mx-auto">
            Vind jouw nieuwe AI-tool bij meer dan 33 onafhankelijk vergeleken aanbieders.
          </p>
        </div>
        {/* Zoekbalk overlapt de overgang naar de body */}
        <div className="relative -mt-10 px-4 pb-6">
          <HeroSearch />
        </div>
      </section>

      {/* Highlights — Bento grid met Tool van de maand + 4 highlights */}
      {(() => {
        const toolVanDeMaand = uitgelicht[0]
        const huidigeMaand = MAANDEN[new Date().getMonth()]
        const goedkoopsteVdM = toolVanDeMaand?.plannen.find(p => p.prijs_mnd === 0) ?? toolVanDeMaand?.plannen[0]
        const highlights = [
          { label: 'Slimste AI', kleur: '#1e293b', body: (<><strong className="text-surface-900">Claude Opus 4.7</strong> en <strong className="text-surface-900">GPT-5</strong> zijn momenteel de slimste AI-modellen.</>) },
          { label: 'Snelste antwoord', kleur: '#f59e0b', body: (<><strong className="text-surface-900">Grok 4</strong> en <strong className="text-surface-900">Gemini 2.5 Flash</strong> reageren binnen 0,3 seconden.</>) },
          { label: 'Beste afbeeldingen', kleur: '#db2777', body: (<><strong className="text-surface-900">Midjourney V7</strong> levert de mooiste artistieke beelden.</>) },
          { label: 'Beste gratis', kleur: '#7c3aed', body: (<><strong className="text-surface-900">ChatGPT</strong>, <strong className="text-surface-900">Claude</strong> en <strong className="text-surface-900">Gemini</strong> bieden alle drie sterke gratis versies.</>) },
        ]

        return (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-surface-900 mb-1">Highlights</h2>
                <p className="text-surface-500 text-sm">Onze belangrijkste bevindingen na het vergelijken van 33+ AI-tools.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Tool van de maand — grote feature card */}
              {toolVanDeMaand && (
                <Link
                  href={`/tools/${toolVanDeMaand.slug}`}
                  className="lg:col-span-7 card p-6 sm:p-8 group relative overflow-hidden flex flex-col"
                >
                  {/* Subtiele gradient accent */}
                  <div
                    aria-hidden
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-30 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 60%)' }}
                  />
                  <div className="relative flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="cat-pill" style={{ background: '#fef3c7', color: '#b45309' }}>
                        <Sparkles className="h-3 w-3" />
                        Tool van {huidigeMaand}
                      </span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <ToolLogo src={toolVanDeMaand.logo_url} naam={toolVanDeMaand.naam} size={64} />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl sm:text-3xl font-bold text-surface-900 group-hover:text-brand-500 transition-colors leading-tight" style={{ letterSpacing: '-0.025em' }}>
                          {toolVanDeMaand.naam}
                        </h3>
                        <p className="text-sm text-surface-500 mt-1 capitalize">{toolVanDeMaand.categorie}</p>
                      </div>
                    </div>

                    <p className="text-base text-surface-600 leading-relaxed mb-5 line-clamp-3">
                      {toolVanDeMaand.beschrijving}
                    </p>

                    <div className="flex items-center gap-4 mb-5 flex-wrap">
                      {toolVanDeMaand.beoordeling && (
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <strong className="text-surface-900 tabular-nums">{toolVanDeMaand.beoordeling}</strong>
                          <span className="text-surface-400 text-xs">/ 5</span>
                        </span>
                      )}
                      {goedkoopsteVdM && (
                        <span className="text-sm text-surface-600">
                          {goedkoopsteVdM.prijs_mnd === 0
                            ? <span className="text-emerald-600 font-semibold">Gratis plan beschikbaar</span>
                            : <>Vanaf <strong className="text-surface-900 tabular-nums">€{goedkoopsteVdM.prijs_mnd}/mnd</strong></>}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-surface-100">
                      <span className="text-sm font-bold text-brand-500 group-hover:text-brand-700 transition-colors inline-flex items-center gap-1.5">
                        Bekijk volledige review <ArrowRight className="h-4 w-4" />
                      </span>
                      <span className="text-xs text-surface-400">Onafhankelijk getest</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* 4 kleinere highlight-kaarten in 2x2 grid */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map(item => (
                  <div key={item.label} className="card p-4 flex flex-col">
                    <div className="cat-pill mb-3 self-start">
                      <span className="swatch" style={{ background: item.kleur }} />
                      {item.label}
                    </div>
                    <p className="text-sm text-surface-600 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* Categorieën — schone rij met kleur-swatch zoals artificialanalysis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-surface-900 mb-1">Ontdek per categorie</h2>
        <p className="text-surface-500 text-sm mb-6">Van chatbots tot videogeneratoren — vind de juiste tool voor jouw doel.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {aantalPerCategorie.map(cat => (
            <Link
              key={cat.slug}
              href={`/categorie/${cat.slug}`}
              className="card p-4 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: cat.kleur }} />
                <p className="font-bold text-surface-900 group-hover:text-brand-500 transition-colors text-sm">{cat.label}</p>
              </div>
              <p className="text-xs text-surface-500">{cat.aantal} tools</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Laatste nieuws */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-surface-900">Laatste nieuws</h2>
          <Link href="/nieuws" className="text-sm text-surface-700 hover:text-brand-500 font-semibold flex items-center gap-1">
            Alle artikelen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { href: '/nieuws/chatgpt-gratis-gpt4o', datum: '11 mei 2026', titel: 'ChatGPT geeft gratis gebruikers toegang tot GPT-4o', bron: 'OpenAI Blog' },
            { href: '/nieuws/claude-code-lancering', datum: '8 mei 2026', titel: 'Claude Code: Anthropic lanceert AI-agent voor developers', bron: 'Anthropic' },
            { href: '/nieuws/midjourney-v7-release', datum: '5 mei 2026', titel: 'Midjourney V7: de beste AI-beelden ooit?', bron: 'Midjourney' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="card p-5 group flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="cat-pill text-[10px] py-1">{item.bron}</span>
              </div>
              <h3 className="font-bold text-surface-900 group-hover:text-brand-500 transition-colors leading-snug flex-1">{item.titel}</h3>
              <p className="date-tag mt-3">{item.datum}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Populaire tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-surface-900">Populaire AI-tools</h2>
            <p className="text-surface-500 mt-1 text-sm">De meest vergeleken tools op aivergelijker.nl</p>
          </div>
          <Link href="/categorie/chatbot" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-white border border-surface-200 text-surface-700 hover:border-surface-400 transition-colors">
            Bekijk alles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ToolGrid tools={uitgelicht} />
      </section>

      {/* Slimme alternatieven — hidden gems */}
      {hiddenGems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-surface-900">Slimme alternatieven</h2>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Tip</span>
          </div>
          <p className="text-surface-500 mb-6 text-sm">Minder bekend, maar minstens zo goed. Deze gespecialiseerde tools blinken uit in hun niche.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hiddenGems.map(tool => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-5 group flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <ToolLogo src={tool.logo_url} naam={tool.naam} size={40} />
                  <div>
                    <p className="font-bold text-surface-900 group-hover:text-brand-500 transition-colors text-sm">{tool.naam}</p>
                    <p className="text-xs text-surface-500 capitalize">{tool.categorie}</p>
                  </div>
                </div>
                <p className="text-sm text-surface-600 leading-relaxed flex-1">{tool.tagline}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-100">
                  <span className="text-xs text-surface-500">
                    {tool.plannen[0]?.prijs_mnd === 0 ? 'Gratis plan' : `Vanaf €${tool.plannen[0]?.prijs_mnd}/mnd`}
                  </span>
                  <span className="text-xs font-semibold text-surface-900 group-hover:text-brand-500 transition-colors flex items-center gap-1">
                    Bekijk <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Vergelijkingen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-surface-900 mb-1">Populaire vergelijkingen</h2>
        <p className="text-surface-500 mb-6 text-sm">Welke AI-tool past het beste bij jou? Bekijk onze uitgebreide vergelijkingen.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/vergelijk/chatgpt-vs-claude', titel: 'ChatGPT vs Claude', sub: 'Welke chatbot wint in 2026?' },
            { href: '/vergelijk/gemini-vs-chatgpt', titel: 'Gemini vs ChatGPT', sub: 'Google vs OpenAI vergeleken' },
            { href: '/vergelijk/midjourney-vs-dall-e', titel: 'Midjourney vs DALL-E 3', sub: 'Beste AI voor afbeeldingen' },
            { href: '/vergelijk/cursor-vs-github-copilot', titel: 'Cursor vs GitHub Copilot', sub: 'Beste AI voor developers' },
            { href: '/vergelijk/suno-vs-elevenlabs', titel: 'Suno vs ElevenLabs', sub: 'Muziek vs stemmen' },
            { href: '/vergelijk/perplexity-vs-chatgpt', titel: 'Perplexity vs ChatGPT', sub: 'Zoeken vs chatten' },
            { href: '/vergelijk/copilot-vs-chatgpt', titel: 'Copilot vs ChatGPT', sub: 'Microsoft vs OpenAI' },
            { href: '/vergelijk/adobe-firefly-vs-midjourney', titel: 'Firefly vs Midjourney', sub: 'Design vs kunst' },
            { href: '/vergelijk/chatgpt-vs-gemini-vs-claude', titel: 'ChatGPT vs Gemini vs Claude', sub: 'De grote drieweg-strijd' },
            { href: '/vergelijk/synthesia-vs-descript', titel: 'Synthesia vs Descript', sub: 'AI-video tools vergeleken' },
            { href: '/vergelijk/copy-ai-vs-jasper', titel: 'Copy.ai vs Jasper', sub: 'Beste AI-copywriter' },
            { href: '/vergelijk/murf-vs-elevenlabs', titel: 'Murf AI vs ElevenLabs', sub: 'Beste AI-stemgenerator' },
            { href: '/vergelijk/surfer-seo-vs-writesonic', titel: 'Surfer SEO vs Writesonic', sub: 'SEO-content die rankt' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="card p-5 group flex items-center justify-between">
              <div>
                <p className="font-bold text-surface-900 group-hover:text-brand-500 transition-colors">{item.titel}</p>
                <p className="text-sm text-surface-500 mt-1">{item.sub}</p>
              </div>
              <span className="shrink-0 w-9 h-9 rounded-lg bg-surface-100 flex items-center justify-center group-hover:bg-surface-900 transition-colors">
                <ChevronRight className="h-4 w-4 text-surface-600 group-hover:text-white transition-colors" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-surface-900 mb-1">Guides & advies</h2>
        <p className="text-surface-500 mb-6 text-sm">Lees onze uitgebreide guides en ontdek welke AI-tool bij jou past.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/beste-ai-voor/beste-gratis-ai-chatbot', titel: 'De 5 beste gratis AI-chatbots', sub: 'Geen budget? Geen probleem.' },
            { href: '/beste-ai-voor/beste-ai-voor-coderen', titel: 'Beste AI voor programmeren', sub: 'Van Cursor tot Claude Code' },
            { href: '/beste-ai-voor/beste-ai-voor-video', titel: 'Beste AI voor video', sub: 'Runway, Sora en Kling vergeleken' },
            { href: '/beste-ai-voor/ai-tools-voor-beginners', titel: 'AI-tools voor beginners', sub: 'Zo begin je met AI in 2026' },
            { href: '/beste-ai-voor/beste-ai-voor-studenten', titel: 'Beste AI voor studenten', sub: 'Gratis tools die echt helpen' },
            { href: '/beste-ai-voor/beste-ai-voor-designers', titel: 'Beste AI voor designers', sub: 'De beste tools voor creatieven' },
            { href: '/beste-ai-voor/beste-ai-voor-sollicitatiebrieven', titel: 'AI voor sollicitatiebrieven', sub: 'Schrijf de perfecte brief' },
            { href: '/beste-ai-voor/beste-ai-voor-vertalingen', titel: 'AI voor vertalingen', sub: 'Beter dan Google Translate?' },
            { href: '/beste-ai-voor/beste-ai-voor-social-media', titel: 'AI voor social media', sub: 'Content maken met AI' },
            { href: '/beste-ai-voor/beste-ai-voor-ondernemers', titel: 'AI voor ondernemers', sub: 'Bespaar tijd en geld' },
            { href: '/beste-ai-voor/beste-ai-voor-video-maken', titel: 'AI voor video maken', sub: 'Zonder camera of studio' },
            { href: '/beste-ai-voor/beste-ai-voor-seo', titel: 'AI voor SEO', sub: 'Rank hoger in Google' },
            { href: '/beste-ai-voor/beste-ai-voor-meetings', titel: 'AI voor meetings', sub: 'Nooit meer notulen maken' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="card p-5 group flex items-center justify-between">
              <div>
                <p className="font-bold text-surface-900 group-hover:text-brand-500 transition-colors">{item.titel}</p>
                <p className="text-sm text-surface-500 mt-1">{item.sub}</p>
              </div>
              <span className="shrink-0 w-9 h-9 rounded-lg bg-surface-100 flex items-center justify-center group-hover:bg-surface-900 transition-colors">
                <ArrowRight className="h-4 w-4 text-surface-600 group-hover:text-white transition-colors" />
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
            Nieuwe AI-tools, vergelijkingen en deals — elke week in je inbox.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
          <p className="text-surface-500 text-xs mt-3">Geen spam. Uitschrijven kan altijd.</p>
        </div>
      </section>
    </>
  )
}
