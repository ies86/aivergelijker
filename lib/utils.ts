import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrijs(prijs: number): string {
  if (prijs === 0) return 'Gratis'
  return `€${prijs}/mnd`
}

export function prijsmodelLabel(model: string): string {
  switch (model) {
    case 'gratis':   return 'Gratis'
    case 'freemium': return 'Freemium'
    case 'betaald':  return 'Betaald'
    default:         return model
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
