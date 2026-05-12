import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Sparkles, Search } from 'lucide-react'
import { getUitgelichtTools, getAllTools } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'
import ToolGrid from '@/components/tools/ToolGrid'
import NewsletterForm from '@/components/shared/NewsletterForm'
import CategoryIcon from '@/components/shared/CategoryIcon'
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-600/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 ring-1 ring-brand-500/20">
            <Sparkles className="h-4 w-4" />
            {alleTools.length}+ AI-tools vergeleken
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-5">
            <span className="text-white">Vind de perfecte</span>
            <br />
            <span className="gradient-text">AI-tool</span>
            <span className="text-white"> voor jou</span>
          </h1>
          <p className="text-lg text-surface-500 max-w-2xl mx-auto mb-10">
            Onafhankelijke vergelijkingen, eerlijke reviews en directe links naar de beste AI-tools — in het Nederlands.
          </p>

          <div className="max-w-xl mx-auto mb-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-500" />
              <Link
                href="/?q="
                className="block w-full pl-12 pr-4 py-4 bg-surface-100 border border-white/10 rounded-2xl text-sm text-surface-500 hover:border-brand-500/30 transition-all text-left"
              >
                Zoek AI-tools... bijv. ChatGPT, Midjourney, Grok
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/vergelijk/chatgpt-vs-claude" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/20">
              ChatGPT vs Claude
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/beste-ai-voor/beste-ai-voor-studenten" className="inline-flex items-center gap-2 border border-white/10 text-surface-700 px-6 py-3 rounded-xl font-semibold hover:border-white/20 hover:bg-white/5 transition-all">
              Beste AI voor studenten
            </Link>
          </div>
        </div>
      </section>

      {/* Categorieën */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Ontdek per categorie</h2>
          <p className="text-surface-500">Van chatbots tot videogeneratoren — vind de juiste tool voor jouw doel.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aantalPerCategorie.map(cat => (
            <Link
              key={cat.slug}
              href={`/categorie/${cat.slug}`}
              className="flex items-start gap-4 bg-surface-100 border border-white/5 rounded-2xl p-5 hover:border-brand-500/20 hover:bg-surface-200 transition-all group card-hover"
            >
              <CategoryIcon name={cat.icon} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white group-hover:text-brand-400 transition-colors">{cat.label}</span>
                  <span className="text-xs text-surface-400 bg-surface-200 px-2 py-0.5 rounded-full">{cat.aantal} tools</span>
                </div>
                <p className="text-sm text-surface-500 leading-relaxed">{cat.beschrijving}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Uitgelichte tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Populaire AI-tools</h2>
          <Link href="/categorie/chatbot" className="text-sm text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
            Alle tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ToolGrid tools={uitgelicht} />
      </section>

      {/* Vergelijkingen */}
      <section className="border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">Populaire vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/vergelijk/chatgpt-vs-claude', titel: 'ChatGPT vs Claude', sub: 'Welke chatbot wint in 2026?' },
              { href: '/vergelijk/gemini-vs-chatgpt', titel: 'Gemini vs ChatGPT', sub: 'Google vs OpenAI vergeleken' },
              { href: '/vergelijk/midjourney-vs-dall-e', titel: 'Midjourney vs DALL-E 3', sub: 'Beste AI voor afbeeldingen' },
              { href: '/vergelijk/cursor-vs-github-copilot', titel: 'Cursor vs GitHub Copilot', sub: 'Beste AI voor developers' },
              { href: '/vergelijk/suno-vs-elevenlabs', titel: 'Suno vs ElevenLabs', sub: 'Muziek vs stemmen — wat past bij jou?' },
              { href: '/vergelijk/runway-vs-kling', titel: 'Runway vs Kling AI', sub: 'Beste AI-videogenerator' },
              { href: '/vergelijk/chatgpt-plus-vs-gratis', titel: 'ChatGPT Plus vs Gratis', sub: 'Is betalen de moeite waard?' },
              { href: '/vergelijk/notion-ai-vs-gamma', titel: 'Notion AI vs Gamma', sub: 'Productiviteit vs presentaties' },
              { href: '/beste-ai-voor/beste-ai-voor-studenten', titel: 'Beste AI voor studenten', sub: 'Gratis tools die echt helpen' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-surface-100 rounded-2xl p-5 border border-white/5 hover:border-brand-500/20 hover:bg-surface-200 transition-all group card-hover"
              >
                <p className="font-semibold text-white group-hover:text-brand-400">{item.titel}</p>
                <p className="text-sm text-surface-500 mt-1">{item.sub}</p>
                <span className="text-brand-400 text-sm font-medium mt-3 inline-flex items-center gap-1">
                  Vergelijk <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Guides & advies</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: '/beste-ai-voor/beste-gratis-ai-chatbot', titel: 'Beste gratis AI-chatbots', sub: 'De 5 beste gratis chatbots van 2026' },
            { href: '/beste-ai-voor/beste-ai-voor-coderen', titel: 'AI voor programmeren', sub: 'Van Cursor tot Claude Code' },
            { href: '/beste-ai-voor/beste-ai-voor-video', titel: 'AI voor video', sub: 'Runway, Sora en Kling vergeleken' },
            { href: '/beste-ai-voor/beste-ai-voor-designers', titel: 'AI voor designers', sub: 'De beste tools voor creatieven' },
            { href: '/beste-ai-voor/ai-tools-voor-beginners', titel: 'AI voor beginners', sub: 'Zo begin je met AI in 2026' },
            { href: '/beste-ai-voor/beste-ai-voor-studenten', titel: 'AI voor studenten', sub: 'Gratis tools die echt helpen' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-surface-100 rounded-2xl p-5 border border-white/5 hover:border-accent-400/20 hover:bg-surface-200 transition-all group card-hover"
            >
              <p className="font-semibold text-white group-hover:text-accent-400">{item.titel}</p>
              <p className="text-sm text-surface-500 mt-1">{item.sub}</p>
              <span className="text-accent-400 text-sm font-medium mt-3 inline-flex items-center gap-1">
                Lees guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Nieuws */}
      <section className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Laatste nieuws</h2>
            <Link href="/nieuws" className="text-sm text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
              Alle nieuws <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/nieuws/chatgpt-gratis-gpt4o', datum: '11 mei 2026', titel: 'ChatGPT geeft gratis toegang tot GPT-4o' },
              { href: '/nieuws/claude-code-lancering', datum: '8 mei 2026', titel: 'Claude Code: AI-agent voor developers' },
              { href: '/nieuws/midjourney-v7-release', datum: '5 mei 2026', titel: 'Midjourney V7: de beste AI-beelden ooit?' },
              { href: '/nieuws/google-gemini-gratis-update', datum: '2 mei 2026', titel: 'Google maakt Gemini 2.0 gratis' },
              { href: '/nieuws/runway-gen3-alpha-update', datum: '28 apr 2026', titel: 'Runway Gen-3 Alpha Turbo update' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-surface-100 rounded-2xl p-5 border border-white/5 hover:border-brand-500/20 hover:bg-surface-200 transition-all group card-hover"
              >
                <p className="text-xs text-surface-400 mb-2">{item.datum}</p>
                <p className="font-semibold text-white group-hover:text-brand-400">{item.titel}</p>
                <span className="text-brand-400 text-sm font-medium mt-3 inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-brand-600/20 to-accent-500/10 rounded-3xl p-8 sm:p-12 text-center border border-brand-500/10 glow">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Blijf op de hoogte</h2>
          <p className="text-surface-500 mb-6 max-w-md mx-auto">
            Nieuwe AI-tools, vergelijkingen en deals — elke week in je inbox.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
          <p className="text-surface-400 text-xs mt-3">Geen spam. Uitschrijven kan altijd.</p>
        </div>
      </section>
    </>
  )
}
