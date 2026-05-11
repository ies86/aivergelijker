import type { Categorie } from './types'

export interface CategorieInfo {
  slug: Categorie
  label: string
  beschrijving: string
  icon: string
}

export const CATEGORIEEN: CategorieInfo[] = [
  {
    slug: 'chatbot',
    label: 'Chatbots',
    beschrijving: 'AI-assistenten voor gesprekken, schrijven en research',
    icon: '💬',
  },
  {
    slug: 'afbeelding',
    label: 'Afbeelding',
    beschrijving: 'Genereer unieke beelden van een tekstomschrijving',
    icon: '🎨',
  },
  {
    slug: 'video',
    label: 'Video',
    beschrijving: 'Maak en bewerk video\'s met kunstmatige intelligentie',
    icon: '🎬',
  },
  {
    slug: 'coding',
    label: 'Coding',
    beschrijving: 'AI-tools die je helpen sneller en beter te programmeren',
    icon: '💻',
  },
  {
    slug: 'audio',
    label: 'Audio',
    beschrijving: 'AI voor stemmen, muziek en spraaksynthese',
    icon: '🎵',
  },
  {
    slug: 'productiviteit',
    label: 'Productiviteit',
    beschrijving: 'AI-tools voor presentaties, notities en werkstromen',
    icon: '⚡',
  },
]

export function getCategorieInfo(slug: Categorie): CategorieInfo | undefined {
  return CATEGORIEEN.find(c => c.slug === slug)
}
