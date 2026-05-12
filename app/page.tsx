import Link from 'next/link'
import { ArrowRight, ChevronRight, Search } from 'lucide-react'
import { getUitgelichtTools, getAllTools } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'
import ToolGrid from '@/components/tools/ToolGrid'
import NewsletterForm from '@/components/shared/NewsletterForm'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 3600

export default async function HomePage() {
  const [uitgelicht, alleTools] = await Promise.all([
    getUitgelichtTools().catch(() => []),
    getAllTools().catch(() => []),
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

      {/* Hero — Independer-stijl */}
      <section className="bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-brand-500 font-semibold text-sm mb-2">Vergelijk direct</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-surface-900 leading-tight mb-4">
              Vind de beste AI-tool voor jouw doel
            </h1>
            <p className="text-lg text-surface-500 mb-8 max-w-xl">
              Onafhankelijke vergelijkingen, eerlijke reviews en directe links — in het Nederlands.
            </p>
          </div>

          {/* Categorie-lijst à la Independer */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden max-w-xl">
            {aantalPerCategorie.map(cat => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className="category-row group"
              >
                <span className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mr-4 shrink-0">
                  <span className="text-brand-500 text-lg">{
                    cat.slug === 'chatbot' ? '💬' :
                    cat.slug === 'afbeelding' ? '🖼️' :
                    cat.slug === 'video' ? '🎬' :
                    cat.slug === 'coding' ? '⌨️' :
                    cat.slug === 'audio' ? '🎧' : '⚡'
                  }</span>
                </span>
                <span className="flex-1 font-semibold text-brand-500 group-hover:text-brand-700 transition-colors">
                  {cat.label} vergelijken
                </span>
                <span className="text-xs text-surface-400 mr-3">{cat.aantal} tools</span>
                <ChevronRight className="h-5 w-5 text-surface-300 group-hover:text-brand-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Laatste nieuws — Independer-stijl */}
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
                <div className="bg-surface-50 rounded-xl h-36 mb-3 flex items-center justify-center border border-surface-200">
                  <span className="text-4xl opacity-40">📰</span>
                </div>
                <p className="date-tag mb-1">{item.datum}</p>
                <h3 className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors leading-snug mb-1">{item.titel}</h3>
                <p className="text-xs text-surface-400">Bron: {item.bron}</p>
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
          <Link href="/categorie/chatbot" className="hidden sm:flex text-sm text-brand-500 hover:text-brand-700 font-semibold items-center gap-1">
            Bekijk alle tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ToolGrid tools={uitgelicht} />
      </section>

      {/* Vergelijkingen */}
      <section className="bg-surface-50 border-y border-surface-200">
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
              { href: '/vergelijk/runway-vs-kling', titel: 'Runway vs Kling AI', sub: 'Beste AI-videogenerator' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="card p-5 group">
                <p className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors">{item.titel}</p>
                <p className="text-sm text-surface-500 mt-1">{item.sub}</p>
                <span className="text-brand-500 text-sm font-semibold mt-3 inline-flex items-center gap-1">
                  Vergelijk <ChevronRight className="h-3.5 w-3.5" />
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
          ].map(item => (
            <Link key={item.href} href={item.href} className="card p-5 group">
              <p className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors">{item.titel}</p>
              <p className="text-sm text-surface-500 mt-1">{item.sub}</p>
              <span className="text-brand-500 text-sm font-semibold mt-3 inline-flex items-center gap-1">
                Lees meer <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-brand-500 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Blijf op de hoogte</h2>
          <p className="text-purple-200 mb-6 max-w-md mx-auto">
            Nieuwe AI-tools, vergelijkingen en deals — elke week in je inbox.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
          <p className="text-purple-300 text-xs mt-3">Geen spam. Uitschrijven kan altijd.</p>
        </div>
      </section>
    </>
  )
}
