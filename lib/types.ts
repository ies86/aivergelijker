export type Categorie = 'chatbot' | 'afbeelding' | 'video' | 'coding' | 'audio' | 'productiviteit'
export type Prijsmodel = 'gratis' | 'freemium' | 'betaald'

export interface Plan {
  naam: string
  prijs_mnd: number
  prijs_jaar: number
  functies: string[]
  aanbevolen: boolean
}

export interface Tool {
  id: string
  slug: string
  naam: string
  tagline: string
  beschrijving: string
  logo_url: string | null
  website_url: string
  affiliate_url: string | null
  categorie: Categorie
  prijsmodel: Prijsmodel
  plannen: Plan[]
  beoordeling: number | null
  uitgelicht: boolean
  badge: string | null
  aangemaakt: string
  bijgewerkt: string
}
