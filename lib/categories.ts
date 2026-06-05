import type { Categorie } from './types'

export interface CategorieInfo {
  slug: Categorie
  label: string
  beschrijving: string
  langeBeschrijving: string
  icon: string // Lucide icon name
}

export const CATEGORIEEN: CategorieInfo[] = [
  {
    slug: 'chatbot',
    label: 'Chatbots',
    beschrijving: 'AI-assistenten voor gesprekken, schrijven en research',
    langeBeschrijving: 'AI-chatbots zijn de snelst groeiende categorie. Van ChatGPT tot Claude en Grok, deze tools beantwoorden vragen, schrijven teksten, analyseren documenten en helpen bij dagelijkse taken. De meeste bieden een gratis versie aan.',
    icon: 'MessageSquare',
  },
  {
    slug: 'afbeelding',
    label: 'Afbeeldingen',
    beschrijving: 'Genereer unieke beelden van een tekstomschrijving',
    langeBeschrijving: 'AI-beeldgeneratoren maken in seconden professionele afbeeldingen van een simpele beschrijving. Ideaal voor social media, marketing, presentaties en creatieve projecten. De kwaliteit is inmiddels moeilijk van echte foto\'s te onderscheiden.',
    icon: 'Image',
  },
  {
    slug: 'video',
    label: 'Video',
    beschrijving: 'Maak en bewerk video\'s met kunstmatige intelligentie',
    langeBeschrijving: 'AI-videogeneratoren transformeren tekst of afbeeldingen naar bewegend beeld. Van korte clips voor social media tot professionele producties, tools als Runway en Sora maken videoproductie toegankelijk voor iedereen.',
    icon: 'Play',
  },
  {
    slug: 'coding',
    label: 'Coding',
    beschrijving: 'AI-tools die je helpen sneller en beter te programmeren',
    langeBeschrijving: 'AI-codetools versnellen je workflow drastisch. Ze genereren code, debuggen fouten, refactoren bestanden en begrijpen je hele codebase. Van Cursor tot GitHub Copilot, onmisbaar voor moderne developers.',
    icon: 'Code',
  },
  {
    slug: 'audio',
    label: 'Audio',
    beschrijving: 'AI voor stemmen, muziek en spraaksynthese',
    langeBeschrijving: 'AI-audiotools genereren realistische stemmen, complete muzieknummers en professionele voice-overs. ElevenLabs leidt in stemkloning, terwijl Suno hele nummers componeert vanuit een tekstprompt.',
    icon: 'Headphones',
  },
  {
    slug: 'productiviteit',
    label: 'Productiviteit',
    beschrijving: 'AI-tools voor presentaties, notities en werkstromen',
    langeBeschrijving: 'Productiviteitstools met AI automatiseren repetitief werk. Denk aan presentaties genereren, content schrijven in je eigen stijl, notities samenvatten en werkstromen optimaliseren. Bespaar uren per week.',
    icon: 'Zap',
  },
]

export function getCategorieInfo(slug: Categorie): CategorieInfo | undefined {
  return CATEGORIEEN.find(c => c.slug === slug)
}
