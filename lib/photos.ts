/**
 * Pexels API helper voor contextuele stock-photos.
 * Zet PEXELS_API_KEY in je Vercel env vars (Settings -> Environment Variables).
 * Zonder key vallen pagina's terug op gradient placeholders.
 */

export interface PexelsPhoto {
  url: string
  alt: string
  photographer: string
  photographerUrl: string
  width: number
  height: number
}

interface PexelsApiResponse {
  photos: Array<{
    id: number
    width: number
    height: number
    alt: string
    photographer: string
    photographer_url: string
    src: {
      original: string
      large2x: string
      large: string
      medium: string
      small: string
      portrait: string
      landscape: string
      tiny: string
    }
  }>
}

/**
 * Haalt 1 foto op die past bij de zoekterm. Cache 7 dagen via Next.js fetch.
 * Returnt null als geen key, geen resultaat, of API error.
 */
// Cache-bust versie: bump dit getal om de fetch-cache te invalideren
// (handig wanneer eerdere render een null cachte door ontbrekende env-var)
const CACHE_VERSION = 'v2'

export async function getPexelsPhoto(query: string, orientation: 'landscape' | 'portrait' | 'square' = 'landscape'): Promise<PexelsPhoto | null> {
  const key = process.env.PEXELS_API_KEY
  if (!key) return null

  try {
    const params = new URLSearchParams({
      query,
      per_page: '1',
      orientation,
      _v: CACHE_VERSION,
    })
    const res = await fetch(`https://api.pexels.com/v1/search?${params}`, {
      headers: { Authorization: key },
      next: { revalidate: 60 * 60 * 6 }, // 6 uur cache (sneller verversen)
    })
    if (!res.ok) return null

    const data = (await res.json()) as PexelsApiResponse
    const photo = data.photos[0]
    if (!photo) return null

    return {
      url: orientation === 'landscape' ? photo.src.landscape : orientation === 'portrait' ? photo.src.portrait : photo.src.medium,
      alt: photo.alt || query,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      width: photo.width,
      height: photo.height,
    }
  } catch {
    return null
  }
}

/** Vooraf-bepaalde zoektermen per categorie voor consistente vibe per sectie. */
export const CATEGORIE_PHOTO_QUERY: Record<string, string> = {
  chatbot: 'futuristic conversation interface technology',
  afbeelding: 'digital art creative design abstract',
  video: 'film studio camera production',
  coding: 'code laptop developer workspace',
  audio: 'podcast microphone studio recording',
  productiviteit: 'modern office desk workspace',
}
