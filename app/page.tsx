import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { getUitgelichtTools, getAllTools, getHiddenGems } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'
import ToolGrid from '@/components/tools/ToolGrid'
import NewsletterForm from '@/components/shared/NewsletterForm'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 3600

export default async function HomePage() {
  const [uitgelicht, alleTools, hiddenGems] = await Promise.all([
    getUitgelichtTools().catch(() => []),
    getAllTools().catch(() => []),
    getHiddenGems().catch(() => []),
  ])

  const aantalPerCategorie = CATEGORIEEN.map(cat => ({
    ...cat,
    aantal: alleTools.filter(t => t.categorie === cat.slug).length,
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

      {/* Hero */}
      <section className="bg-gradient-to-b from-purple-50 to-[#f0f0f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-brand-500 font-semibold text-sm mb-2 tracking-wide uppercase">Vergelijk direct</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-surface-900 leading-tight mb-4">
              Vind de beste AI-tool voor jouw doel
            </h1>
            <p className="text-lg text-surface-500 mb-10 max-w-xl">
              Onafhankelijke vergelijkingen, eerlijke reviews en directe links — in het Nederlands.
            </p>
          </div>

          {/* Categorie-knoppen */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl">
            {aantalPerCategorie.map(cat => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className="bg-white rounded-xl border border-surface-200 px-4 py-4 text-center hover:border-brand-500 hover:shadow-md transition-all group"
              >
                <p className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors text-sm">{cat.label}</p>
                <p className="text-xs text-surface-400 mt-1">{cat.aantal} tools</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Laatste nieuws */}
      <section className="bg-white border-y border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-surface-900">Laatste nieuws</h2>
            <Link href="/nieuws" className="text-sm text-brand-500 hover:text-brand-700 font-semibold flex items-center gap-1">
              Alle artikelen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: '/nieuws/chatgpt-gratis-gpt4o', datum: '11 mei 2026', titel: 'ChatGPT geeft gratis gebruikers toegang tot GPT-4o', bron: 'OpenAI Blog' },
              { href: '/nieuws/claude-code-lancering', datum: '8 mei 2026', titel: 'Claude Code: Anthropic lanceert AI-agent voor developers', bron: 'Anthropic' },
              { href: '/nieuws/midjourney-v7-release', datum: '5 mei 2026', titel: 'Midjourney V7: de beste AI-beelden ooit?', bron: 'Midjourney' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="group">
                <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl h-32 mb-3 border border-purple-100 flex items-end p-4">
                  <p className="text-[11px] font-semibold text-brand-500 uppercase tracking-wider">{item.bron}</p>
                </div>
                <p className="date-tag mb-1">{item.datum}</p>
                <h3 className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors leading-snug">{item.titel}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Populaire tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-surface-900">Populaire AI-tools</h2>
            <p className="text-surface-500 mt-1">De meest vergeleken tools op aivergelijker.nl</p>
          </div>
          <Link href="/categorie/chatbot" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-white border border-surface-200 text-surface-700 hover:border-brand-500 hover:text-brand-500 transition-all">
            Bekijk alles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ToolGrid tools={uitgelicht} />
      </section>

      {/* Slimme alternatieven — hidden gems */}
      {hiddenGems.length > 0 && (
        <section className="bg-white border-y border-surface-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-surface-900">Slimme alternatieven</h2>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Tip</span>
            </div>
            <p className="text-surface-500 mb-8">Minder bekend, maar minstens zo goed. Deze gespecialiseerde tools blinken uit in hun niche.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hiddenGems.map(tool => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-5 group flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {tool.naam[0]}
                    </div>
                    <div>
                      <p className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors text-sm">{tool.naam}</p>
                      <p className="text-xs text-surface-400">{tool.categorie}</p>
                    </div>
                  </div>
                  <p className="text-sm text-surface-500 leading-relaxed flex-1">{tool.tagline}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-100">
                    <span className="text-xs text-surface-400">
                      {tool.plannen[0]?.prijs_mnd === 0 ? 'Gratis plan' : `Vanaf €${tool.plannen[0]?.prijs_mnd}/mnd`}
                    </span>
                    <span className="text-xs font-semibold text-brand-500 group-hover:text-brand-700 transition-colors flex items-center gap-1">
                      Bekijk <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vergelijkingen */}
      <section className="bg-white border-y border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-surface-900 mb-2">Populaire vergelijkingen</h2>
          <p className="text-surface-500 mb-8">Welke AI-tool past het beste bij jou? Bekijk onze uitgebreide vergelijkingen.</p>
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
                  <p className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors">{item.titel}</p>
                  <p className="text-sm text-surface-500 mt-1">{item.sub}</p>
                </div>
                <span className="shrink-0 w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                  <ChevronRight className="h-4 w-4 text-brand-500 group-hover:text-white transition-colors" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-surface-900 mb-2">Guides & advies</h2>
        <p className="text-surface-500 mb-8">Lees onze uitgebreide guides en ontdek welke AI-tool bij jou past.</p>
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
                <p className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors">{item.titel}</p>
                <p className="text-sm text-surface-500 mt-1">{item.sub}</p>
              </div>
              <span className="shrink-0 w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                <ArrowRight className="h-4 w-4 text-brand-500 group-hover:text-white transition-colors" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
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
