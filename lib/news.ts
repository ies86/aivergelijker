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
  // Strategie: pak meerdere queries (een per AI keyword), combineer + dedupe
  const queries = ['AI', 'ChatGPT', 'Claude', 'OpenAI', 'LLM']
  const veertienDagenGeleden = Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 14

  try {
    const responses = await Promise.all(
      queries.map(q => {
        const params = new URLSearchParams({
          query: q,
          tags: 'story',
          numericFilters: `created_at_i>${veertienDagenGeleden},points>20`,
          hitsPerPage: '10',
        })
        return fetch(`https://hn.algolia.com/api/v1/search?${params}`, {
          next: { revalidate: 60 * 60 }, // 1 uur cache
        }).then(r => r.ok ? r.json() as Promise<{ hits: AlgoliaHit[] }> : { hits: [] as AlgoliaHit[] })
      })
    )

    // Combineer alle hits, dedupliceer op objectID, filter op URL, sorteer op points
    const seen = new Set<string>()
    const allHits: AlgoliaHit[] = []
    for (const resp of responses) {
      for (const hit of resp.hits) {
        if (!seen.has(hit.objectID) && hit.url && hit.title) {
          seen.add(hit.objectID)
          allHits.push(hit)
        }
      }
    }

    const top = allHits.sort((a, b) => b.points - a.points).slice(0, limit)

    return top.map(h => ({
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
