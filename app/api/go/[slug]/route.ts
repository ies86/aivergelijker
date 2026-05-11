import { NextRequest, NextResponse } from 'next/server'
import { getToolBySlug, logKlik } from '@/lib/tools'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const tool = await getToolBySlug(slug)

  if (!tool) {
    return NextResponse.json({ error: 'Tool niet gevonden' }, { status: 404 })
  }

  // Klik non-blocking loggen
  logKlik(slug, req.headers.get('referer'), req.headers.get('user-agent'))

  const bestemming = tool.affiliate_url ?? tool.website_url
  return NextResponse.redirect(bestemming, { status: 302 })
}
