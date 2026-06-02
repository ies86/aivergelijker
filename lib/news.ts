/**
 * Real AI-news feed via Hacker News (Algolia) Search API.
 * Geen API key nodig, geen verzinning - alle items linken naar de echte bron.
 *
 * Algolia HN Search Docs: https://hn.algolia.com/api
 */

export interface NewsItem {
  id: string
  title: string
  url: string | null
  domain: string | null
  points: number
  comments: number
  author: string
  createdAt: string
  hnUrl: string
}

interface AlgoliaHit {
  objectID: string
  title: string
  url: string | null
  points: number
  num_comments: number
  author: string
  created_at: string
}

/**
 * Haalt top AI-stories op uit Hacker News (laatste week, gefilterd op AI keywords).
 * Cache 1 uur.
 */
export async function getAiNews(limit: number = 6): Promise<NewsItem[]> {
  try {
    // Algolia HN search: stories met 'AI' of 'LLM' in titel, gesorteerd op recente populariteit
    const params = new URLSearchParams({
      query: 'AI OR LLM OR ChatGPT OR Claude OR Gemini',
      tags: 'story',
      numericFilters: `created_at_i>${Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 14}`, // laatste 14 dagen
      hitsPerPage: String(limit * 3), // meer ophalen, filteren op kwaliteit
    })

    const res = await fetch(`https://hn.algolia.com/api/v1/search?${params}`, {
      next: { revalidate: 60 * 60 }, // 1 uur cache
    })
    if (!res.ok) return []

    const data = (await res.json()) as { hits: AlgoliaHit[] }

    // Filter: minimaal 20 points (kwaliteit), heeft URL (geen self-posts), titel niet leeg
    const gefilterd = data.hits
      .filter(h => h.url && h.title && h.points >= 20)
      .slice(0, limit)

    return gefilterd.map(h => ({
      id: h.objectID,
      title: h.title,
      url: h.url,
      domain: h.url ? new URL(h.url).hostname.replace(/^www\./, '') : null,
      points: h.points,
      comments: h.num_comments,
      author: h.author,
      createdAt: h.created_at,
      hnUrl: `https://news.ycombinator.com/item?id=${h.objectID}`,
    }))
  } catch {
    return []
  }
}

/** Nederlandse "X dagen geleden" datum-format. */
export function relatieveTijd(isoDate: string): string {
  const now = Date.now()
  const then = new Date(isoDate).getTime()
  const diffSec = Math.floor((now - then) / 1000)

  if (diffSec < 60) return 'zojuist'
  if (diffSec < 60 * 60) return `${Math.floor(diffSec / 60)} min geleden`
  if (diffSec < 60 * 60 * 24) return `${Math.floor(diffSec / 60 / 60)} uur geleden`
  if (diffSec < 60 * 60 * 24 * 7) return `${Math.floor(diffSec / 60 / 60 / 24)} dagen geleden`
  return `${Math.floor(diffSec / 60 / 60 / 24 / 7)} weken geleden`
}
