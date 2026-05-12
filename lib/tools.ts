import { supabase } from './supabase'
import { TOOLS } from './data'
import type { Tool, Categorie } from './types'

// Probeert Supabase, valt terug op lokale data
export async function getAllTools(): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('beoordeling', { ascending: false })

    if (error || !data?.length) return TOOLS.sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0))
    return data as Tool[]
  } catch {
    return TOOLS.sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0))
  }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) return TOOLS.find(t => t.slug === slug) ?? null
    return data as Tool
  } catch {
    return TOOLS.find(t => t.slug === slug) ?? null
  }
}

export async function getToolsByCategorie(categorie: Categorie): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('categorie', categorie)
      .order('beoordeling', { ascending: false })

    if (error || !data?.length) return TOOLS.filter(t => t.categorie === categorie).sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0))
    return data as Tool[]
  } catch {
    return TOOLS.filter(t => t.categorie === categorie).sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0))
  }
}

export async function getUitgelichtTools(): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('uitgelicht', true)
      .order('beoordeling', { ascending: false })

    if (error || !data?.length) return TOOLS.filter(t => t.uitgelicht).sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0))
    return data as Tool[]
  } catch {
    return TOOLS.filter(t => t.uitgelicht).sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0))
  }
}

export async function getToolsBySlugs(slugs: string[]): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .in('slug', slugs)

    if (error || !data?.length) return TOOLS.filter(t => slugs.includes(t.slug))
    return data as Tool[]
  } catch {
    return TOOLS.filter(t => slugs.includes(t.slug))
  }
}

export async function getHiddenGems(): Promise<Tool[]> {
  return TOOLS.filter(t => t.badge === 'Tip').sort((a, b) => (b.beoordeling ?? 0) - (a.beoordeling ?? 0))
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
