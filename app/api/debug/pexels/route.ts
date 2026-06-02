import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Debug endpoint: test of PEXELS_API_KEY werkt.
 * Bezoek /api/debug/pexels om resultaat te zien.
 */
export async function GET() {
  const key = process.env.PEXELS_API_KEY

  if (!key) {
    return NextResponse.json({
      ok: false,
      stap: 'env-var-check',
      foutmelding: 'PEXELS_API_KEY environment variable is niet gevonden. Check Vercel Settings -> Environment Variables. Hoofdletters + underscores: PEXELS_API_KEY (exact zo).',
    })
  }

  const keyInfo = {
    aanwezig: true,
    lengte: key.length,
    eerste_4: key.substring(0, 4),
    laatste_4: key.substring(key.length - 4),
  }

  try {
    const res = await fetch('https://api.pexels.com/v1/search?query=office&per_page=1', {
      headers: { Authorization: key },
      cache: 'no-store',
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({
        ok: false,
        stap: 'pexels-api-call',
        statusCode: res.status,
        statusText: res.statusText,
        key: keyInfo,
        api_response: text.substring(0, 500),
        diagnose: res.status === 401
          ? 'API key wordt door Pexels geweigerd. Klopt de key wel? Test de key op pexels.com.'
          : `Onverwachte status ${res.status} van Pexels API.`,
      })
    }

    const data = await res.json()
    const foto = data?.photos?.[0]

    return NextResponse.json({
      ok: true,
      stap: 'pexels-api-call',
      key: keyInfo,
      foto_gevonden: !!foto,
      foto_url: foto?.src?.landscape ?? null,
      photographer: foto?.photographer ?? null,
      diagnose: 'Alles werkt! Als foto\'s op de site nog niet verschijnen, trigger dan opnieuw een deploy in Vercel.',
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      stap: 'pexels-api-call',
      key: keyInfo,
      foutmelding: String(e),
    })
  }
}
