import { supabase } from './supabase'
import { TOOLS } from './data'
import type { Tool, Categorie } from './types'
import { siteConfig } from '@/site.config'

/**
 * Per-tool domein-overrides voor gevallen waar het tool-product
 * onder een andere merkdomein zit dan website_url suggereert.
 */
const DOMEIN_OVERRIDES: Record<string, string> = {
  'chatgpt': 'openai.com',
  'dall-e': 'openai.com',
  'sora': 'openai.com',
  'claude': 'anthropic.com',
  'claude-code': 'anthropic.com',
  'gemini': 'google.com',
  'copilot': 'microsoft.com',
  'github-copilot': 'github.com',
  'cursor': 'cursor.com',
  'windsurf': 'codeium.com',
  'v0': 'vercel.com',
  'grok': 'x.ai',
  'midjourney': 'midjourney.com',
  'stable-diffusion': 'stability.ai',
  'runway': 'runwayml.com',
  'kling': 'klingai.com',
  'elevenlabs': 'elevenlabs.io',
  'suno': 'suno.com',
  'murf-ai': 'murf.ai',
  'notion-ai': 'notion.so',
  'gamma': 'gamma.app',
  'jasper': 'jasper.ai',
  'perplexity': 'perplexity.ai',
  'poe': 'poe.com',
  'adobe-firefly': 'adobe.com',
  'ideogram': 'ideogram.ai',
  'synthesia': 'synthesia.io',
  'descript': 'descript.com',
  'pictory': 'pictory.ai',
  'copy-ai': 'copy.ai',
  'writesonic': 'writesonic.com',
  'fireflies-ai': 'fireflies.ai',
  'surfer-seo': 'surferseo.com',
  // Nieuwe tools met publieke affiliate-programma's (jasper.ai is hierboven al gedefinieerd)
  'frase': 'frase.io',
  'rytr': 'rytr.me',
  'tome': 'tome.app',
  'lumen5': 'lumen5.com',
  'invideo-ai': 'invideo.io',
  'leonardo-ai': 'leonardo.ai',
  'looka': 'looka.com',
  'cleanvoice': 'cleanvoice.ai',
  'resemble-ai': 'resemble.ai',
  'pictory-ai': 'pictory.ai',
  'beautiful-ai': 'beautiful.ai',
}

function domeinVoor(tool: Tool): string | null {
  if (DOMEIN_OVERRIDES[tool.slug]) return DOMEIN_OVERRIDES[tool.slug]
  if (tool.website_url) {
    try {
      return new URL(tool.website_url).hostname.replace(/^www\./, '')
    } catch {
      return null
    }
  }
  return null
}

function logoVoor(tool: Tool): string | null {
  if (tool.logo_url) return tool.logo_url
  const domein = domeinVoor(tool)
  if (!domein) return null
  // Google's favicon-service levert betrouwbare 128px logos voor vrijwel elk domein.
  return `https://www.google.com/s2/favicons?domain=${domein}&sz=128`
}

function metLogos(tools: Tool[]): Tool[] {
  // Optioneel: toon alleen producten met affiliate-link (waar je geld aan verdient).
  const zichtbaar = siteConfig.alleenMetAffiliate
    ? tools.filter(t => t.affiliate_url != null && t.affiliate_url !== '')
    : tools
  return zichtbaar.map(t => ({ ...t, logo_url: logoVoor(t) }))
}

// Probeert Supabase, valt terug op lokale data
export async function getAllTools(): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('beoordeling', { ascending: false })

    if (error || !data?.length) return metLogos(TOOLS.sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0)))
    return metLogos(data as Tool[])
  } catch {
    return metLogos(TOOLS.sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0)))
  }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('slug', slug)
      .single()

    const tool = (error || !data) ? (TOOLS.find(t => t.slug === slug) ?? null) : (data as Tool)
    return tool ? metLogos([tool])[0] : null
  } catch {
    const tool = TOOLS.find(t => t.slug === slug) ?? null
    return tool ? metLogos([tool])[0] : null
  }
}

export async function getToolsByCategorie(categorie: Categorie): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('categorie', categorie)
      .order('beoordeling', { ascending: false })

    if (error || !data?.length) return metLogos(TOOLS.filter(t => t.categorie === categorie).sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0)))
    return metLogos(data as Tool[])
  } catch {
    return metLogos(TOOLS.filter(t => t.categorie === categorie).sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0)))
  }
}

export async function getUitgelichtTools(): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('uitgelicht', true)
      .order('beoordeling', { ascending: false })

    if (error || !data?.length) return metLogos(TOOLS.filter(t => t.uitgelicht).sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0)))
    return metLogos(data as Tool[])
  } catch {
    return metLogos(TOOLS.filter(t => t.uitgelicht).sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0)))
  }
}

export async function getToolsBySlugs(slugs: string[]): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .in('slug', slugs)

    if (error || !data?.length) return metLogos(TOOLS.filter(t => slugs.includes(t.slug)))
    return metLogos(data as Tool[])
  } catch {
    return metLogos(TOOLS.filter(t => slugs.includes(t.slug)))
  }
}

export async function getHiddenGems(): Promise<Tool[]> {
  return metLogos(TOOLS.filter(t => t.badge === 'Tip').sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0)))
}

export async function logKlik(toolSlug: string, referer: string | null, userAgent: string | null) {
  try {
    await supabase.from('klik_tracking').insert({
      tool_slug: toolSlug,
      referer,
      user_agent: userAgent,
    })
  } catch {
    // Ignore errors when Supabase is unavailable
  }
}
