import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/** Debug endpoint voor Pexels integratie. */
export async function GET() {
  const key = process.env.PEXELS_API_KEY

  if (!key) {
    return NextResponse.json({
      ok: false,
      stap: 'env-var-check',
      foutmelding: 'PEXELS_API_KEY environment variable niet gevonden.',
    })
  }

  const keyInfo = {
    aanwezig: true,
    lengte: key.length,
    eerste_4: key.substring(0, 4),
    laatste_4: key.substring(key.length - 4),
  }

  // Doe 3 verschillende calls om te checken: ratelimit info
  const queries = ['office', 'futuristic', 'studio']
  const resultaten = []

  for (const query of queries) {
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
        headers: { Authorization: key },
        cache: 'no-store',
      })

      const ratelimit = {
        limit: res.headers.get('X-Ratelimit-Limit'),
        remaining: res.headers.get('X-Ratelimit-Remaining'),
        reset: res.headers.get('X-Ratelimit-Reset'),
      }

      if (!res.ok) {
        const text = await res.text()
        resultaten.push({
          query,
          ok: false,
          status: res.status,
          ratelimit,
          response: text.substring(0, 200),
        })
      } else {
        const data = await res.json()
        resultaten.push({
          query,
          ok: true,
          status: res.status,
          ratelimit,
          fotoGevonden: data?.photos?.length > 0,
          fotoUrl: data?.photos?.[0]?.src?.landscape ?? null,
        })
      }
    } catch (e) {
      resultaten.push({ query, ok: false, foutmelding: String(e) })
    }
  }

  return NextResponse.json({
    ok: resultaten.every(r => r.ok),
    key: keyInfo,
    resultaten,
    diagnose: resultaten.some(r => r.status === 429)
      ? 'Pexels rate limit bereikt (50/uur op gratis tier). Wacht een uur of upgrade.'
      : resultaten.some(r => r.status === 401)
      ? 'Pexels API key geweigerd. Genereer nieuwe key op pexels.com.'
      : 'Onbekende toestand. Bekijk resultaten array.',
  })
}
