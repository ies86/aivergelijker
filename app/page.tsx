import Link from 'next/link'
import { ArrowRight, ChevronRight, Sparkles, MessageSquare, Image as ImageIcon, Play, Code, Headphones, Zap } from 'lucide-react'
import { getUitgelichtTools, getAllTools, getHiddenGems } from '@/lib/tools'
import { CATEGORIEEN } from '@/lib/categories'
import ToolGrid from '@/components/tools/ToolGrid'
import NewsletterForm from '@/components/shared/NewsletterForm'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 3600

const CAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  chatbot: MessageSquare,
  afbeelding: ImageIcon,
  video: Play,
  coding: Code,
  audio: Headphones,
  productiviteit: Zap,
}

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

      {/* Hero — kleurrijk met gradiënt en blobs */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-cyan-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-300 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/3" />
        <div className="absolute top-1/4 left-1/2 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-full px-4 py-1.5 mb-5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-pink-500" />
              <span className="text-xs font-semibold text-surface-700">33+ AI-tools onafhankelijk vergeleken</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
              <span className="text-surface-900">Vind de </span>
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                beste AI-tool
              </span>
              <span className="text-surface-900"> voor jouw doel</span>
            </h1>
            <p className="text-lg text-surface-600 mb-10 max-w-xl">
              Onafhankelijke vergelijkingen, eerlijke reviews en directe links — in het Nederlands.
            </p>
          </div>

          {/* Categorie-knoppen — elk een eigen kleur */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl">
            {aantalPerCategorie.map(cat => {
              const Icon = CAT_ICONS[cat.slug] ?? MessageSquare
              return (
                <Link
                  key={cat.slug}
                  href={`/categorie/${cat.slug}`}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white px-4 py-5 text-center hover:shadow-lg transition-all group hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 rounded-xl cat-icon-${cat.slug} flex items-center justify-center mx-auto mb-2 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <p className={`font-bold text-sm cat-text-${cat.slug}`}>{cat.label}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{cat.aantal} tools</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Laatste nieuws — met kleurrijke kaarten */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-surface-900">Laatste nieuws</h2>
              <p className="text-surface-500 text-sm mt-1">Vers van de pers — alle AI-updates</p>
            </div>
            <Link href="/nieuws" className="text-sm text-brand-500 hover:text-brand-700 font-semibold flex items-center gap-1">
              Alle artikelen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: '/nieuws/chatgpt-gratis-gpt4o', datum: '11 mei 2026', titel: 'ChatGPT geeft gratis gebruikers toegang tot GPT-4o', bron: 'OpenAI Blog', gradient: 'from-violet-500 via-fuchsia-500 to-pink-500' },
              { href: '/nieuws/claude-code-lancering', datum: '8 mei 2026', titel: 'Claude Code: Anthropic lanceert AI-agent voor developers', bron: 'Anthropic', gradient: 'from-orange-400 via-amber-500 to-pink-500' },
              { href: '/nieuws/midjourney-v7-release', datum: '5 mei 2026', titel: 'Midjourney V7: de beste AI-beelden ooit?', bron: 'Midjourney', gradient: 'from-cyan-500 via-blue-500 to-indigo-600' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="group">
                <div className={`bg-gradient-to-br ${item.gradient} rounded-2xl h-36 mb-4 flex items-end p-5 shadow-lg group-hover:shadow-xl group-hover:scale-[1.02] transition-all`}>
                  <p className="text-[11px] font-bold text-white/95 uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">{item.bron}</p>
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
          <Link href="/categorie/chatbot" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-white border border-surface-200 text-surface-700 hover:border-brand-500 hover:text-brand-500 transition-all">
            Bekijk alles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ToolGrid tools={uitgelicht} />
      </section>

      {/* Slimme alternatieven — hidden gems met goud/amber thema */}
      {hiddenGems.length > 0 && (
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-surface-900">Slimme alternatieven</h2>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full shadow-sm">Tip</span>
            </div>
            <p className="text-surface-600 mb-8">Minder bekend, maar minstens zo goed. Deze gespecialiseerde tools blinken uit in hun niche.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hiddenGems.map((tool, idx) => {
                const gradients = [
                  'from-amber-400 to-orange-500',
                  'from-pink-500 to-rose-500',
                  'from-violet-500 to-fuchsia-500',
                  'from-cyan-500 to-blue-500',
                  'from-emerald-500 to-teal-500',
                  'from-indigo-500 to-purple-600',
                  'from-orange-500 to-red-500',
                  'from-fuchsia-500 to-pink-500',
                ]
                const grad = gradients[idx % gradients.length]
                return (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card p-5 group flex flex-col bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-bold text-base shrink-0 shadow-md`}>
                        {tool.naam[0]}
                      </div>
                      <div>
                        <p className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors text-sm">{tool.naam}</p>
                        <p className="text-xs text-surface-400 capitalize">{tool.categorie}</p>
                      </div>
                    </div>
                    <p className="text-sm text-surface-500 leading-relaxed flex-1">{tool.tagline}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-100">
                      <span className="text-xs text-surface-500 font-medium">
                        {tool.plannen[0]?.prijs_mnd === 0 ? 'Gratis plan' : `Vanaf €${tool.plannen[0]?.prijs_mnd}/mnd`}
                      </span>
                      <span className="text-xs font-bold text-brand-500 group-hover:text-brand-700 transition-colors flex items-center gap-1">
                        Bekijk <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Vergelijkingen — kleurrijke kaarten */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-cyan-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-surface-900 mb-2">Populaire vergelijkingen</h2>
          <p className="text-surface-600 mb-8">Welke AI-tool past het beste bij jou? Bekijk onze uitgebreide vergelijkingen.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/vergelijk/chatgpt-vs-claude', titel: 'ChatGPT vs Claude', sub: 'Welke chatbot wint in 2026?', color: 'violet' },
              { href: '/vergelijk/gemini-vs-chatgpt', titel: 'Gemini vs ChatGPT', sub: 'Google vs OpenAI vergeleken', color: 'cyan' },
              { href: '/vergelijk/midjourney-vs-dall-e', titel: 'Midjourney vs DALL-E 3', sub: 'Beste AI voor afbeeldingen', color: 'pink' },
              { href: '/vergelijk/cursor-vs-github-copilot', titel: 'Cursor vs GitHub Copilot', sub: 'Beste AI voor developers', color: 'emerald' },
              { href: '/vergelijk/suno-vs-elevenlabs', titel: 'Suno vs ElevenLabs', sub: 'Muziek vs stemmen', color: 'cyan' },
              { href: '/vergelijk/perplexity-vs-chatgpt', titel: 'Perplexity vs ChatGPT', sub: 'Zoeken vs chatten', color: 'indigo' },
              { href: '/vergelijk/copilot-vs-chatgpt', titel: 'Copilot vs ChatGPT', sub: 'Microsoft vs OpenAI', color: 'cyan' },
              { href: '/vergelijk/adobe-firefly-vs-midjourney', titel: 'Firefly vs Midjourney', sub: 'Design vs kunst', color: 'pink' },
              { href: '/vergelijk/chatgpt-vs-gemini-vs-claude', titel: 'ChatGPT vs Gemini vs Claude', sub: 'De grote drieweg-strijd', color: 'violet' },
              { href: '/vergelijk/synthesia-vs-descript', titel: 'Synthesia vs Descript', sub: 'AI-video tools vergeleken', color: 'orange' },
              { href: '/vergelijk/copy-ai-vs-jasper', titel: 'Copy.ai vs Jasper', sub: 'Beste AI-copywriter', color: 'fuchsia' },
              { href: '/vergelijk/murf-vs-elevenlabs', titel: 'Murf AI vs ElevenLabs', sub: 'Beste AI-stemgenerator', color: 'cyan' },
              { href: '/vergelijk/surfer-seo-vs-writesonic', titel: 'Surfer SEO vs Writesonic', sub: 'SEO-content die rankt', color: 'emerald' },
            ].map(item => {
              const colorMap: Record<string, { bg: string; bgHover: string; text: string }> = {
                violet: { bg: 'bg-violet-50', bgHover: 'group-hover:bg-violet-500', text: 'text-violet-600' },
                cyan: { bg: 'bg-cyan-50', bgHover: 'group-hover:bg-cyan-500', text: 'text-cyan-600' },
                pink: { bg: 'bg-pink-50', bgHover: 'group-hover:bg-pink-500', text: 'text-pink-600' },
                emerald: { bg: 'bg-emerald-50', bgHover: 'group-hover:bg-emerald-500', text: 'text-emerald-600' },
                indigo: { bg: 'bg-indigo-50', bgHover: 'group-hover:bg-indigo-500', text: 'text-indigo-600' },
                orange: { bg: 'bg-orange-50', bgHover: 'group-hover:bg-orange-500', text: 'text-orange-600' },
                fuchsia: { bg: 'bg-fuchsia-50', bgHover: 'group-hover:bg-fuchsia-500', text: 'text-fuchsia-600' },
              }
              const c = colorMap[item.color] ?? colorMap.violet
              return (
                <Link key={item.href} href={item.href} className="card p-5 group flex items-center justify-between bg-white/80 backdrop-blur-sm">
                  <div>
                    <p className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors">{item.titel}</p>
                    <p className="text-sm text-surface-500 mt-1">{item.sub}</p>
                  </div>
                  <span className={`shrink-0 w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ${c.bgHover} transition-colors`}>
                    <ChevronRight className={`h-4 w-4 ${c.text} group-hover:text-white transition-colors`} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-surface-900 mb-2">Guides & advies</h2>
        <p className="text-surface-600 mb-8">Lees onze uitgebreide guides en ontdek welke AI-tool bij jou past.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/beste-ai-voor/beste-gratis-ai-chatbot', titel: 'De 5 beste gratis AI-chatbots', sub: 'Geen budget? Geen probleem.', color: 'emerald' },
            { href: '/beste-ai-voor/beste-ai-voor-coderen', titel: 'Beste AI voor programmeren', sub: 'Van Cursor tot Claude Code', color: 'indigo' },
            { href: '/beste-ai-voor/beste-ai-voor-video', titel: 'Beste AI voor video', sub: 'Runway, Sora en Kling vergeleken', color: 'orange' },
            { href: '/beste-ai-voor/ai-tools-voor-beginners', titel: 'AI-tools voor beginners', sub: 'Zo begin je met AI in 2026', color: 'violet' },
            { href: '/beste-ai-voor/beste-ai-voor-studenten', titel: 'Beste AI voor studenten', sub: 'Gratis tools die echt helpen', color: 'cyan' },
            { href: '/beste-ai-voor/beste-ai-voor-designers', titel: 'Beste AI voor designers', sub: 'De beste tools voor creatieven', color: 'pink' },
            { href: '/beste-ai-voor/beste-ai-voor-sollicitatiebrieven', titel: 'AI voor sollicitatiebrieven', sub: 'Schrijf de perfecte brief', color: 'fuchsia' },
            { href: '/beste-ai-voor/beste-ai-voor-vertalingen', titel: 'AI voor vertalingen', sub: 'Beter dan Google Translate?', color: 'cyan' },
            { href: '/beste-ai-voor/beste-ai-voor-social-media', titel: 'AI voor social media', sub: 'Content maken met AI', color: 'pink' },
            { href: '/beste-ai-voor/beste-ai-voor-ondernemers', titel: 'AI voor ondernemers', sub: 'Bespaar tijd en geld', color: 'emerald' },
            { href: '/beste-ai-voor/beste-ai-voor-video-maken', titel: 'AI voor video maken', sub: 'Zonder camera of studio', color: 'orange' },
            { href: '/beste-ai-voor/beste-ai-voor-seo', titel: 'AI voor SEO', sub: 'Rank hoger in Google', color: 'emerald' },
            { href: '/beste-ai-voor/beste-ai-voor-meetings', titel: 'AI voor meetings', sub: 'Nooit meer notulen maken', color: 'indigo' },
          ].map(item => {
            const colorMap: Record<string, { bg: string; bgHover: string; text: string }> = {
              violet: { bg: 'bg-violet-50', bgHover: 'group-hover:bg-violet-500', text: 'text-violet-600' },
              cyan: { bg: 'bg-cyan-50', bgHover: 'group-hover:bg-cyan-500', text: 'text-cyan-600' },
              pink: { bg: 'bg-pink-50', bgHover: 'group-hover:bg-pink-500', text: 'text-pink-600' },
              emerald: { bg: 'bg-emerald-50', bgHover: 'group-hover:bg-emerald-500', text: 'text-emerald-600' },
              indigo: { bg: 'bg-indigo-50', bgHover: 'group-hover:bg-indigo-500', text: 'text-indigo-600' },
              orange: { bg: 'bg-orange-50', bgHover: 'group-hover:bg-orange-500', text: 'text-orange-600' },
              fuchsia: { bg: 'bg-fuchsia-50', bgHover: 'group-hover:bg-fuchsia-500', text: 'text-fuchsia-600' },
            }
            const c = colorMap[item.color] ?? colorMap.violet
            return (
              <Link key={item.href} href={item.href} className="card p-5 group flex items-center justify-between">
                <div>
                  <p className="font-bold text-surface-800 group-hover:text-brand-500 transition-colors">{item.titel}</p>
                  <p className="text-sm text-surface-500 mt-1">{item.sub}</p>
                </div>
                <span className={`shrink-0 w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ${c.bgHover} transition-colors`}>
                  <ArrowRight className={`h-4 w-4 ${c.text} group-hover:text-white transition-colors`} />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Newsletter — kleurrijke gradiënt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/3" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Blijf op de hoogte</h2>
            <p className="text-white/90 mb-6 max-w-md mx-auto">
              Nieuwe AI-tools, vergelijkingen en deals — elke week in je inbox.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>
            <p className="text-white/70 text-xs mt-3">Geen spam. Uitschrijven kan altijd.</p>
          </div>
        </div>
      </section>
    </>
  )
}
