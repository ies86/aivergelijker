import { supabase } from './supabase'
import type { Tool, Categorie } from './types'

export async function getAllTools(): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('beoordeling', { ascending: false })

  if (error) throw error
  return data as Tool[]
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as Tool
}

export async function getToolsByCategorie(categorie: Categorie): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('categorie', categorie)
    .order('beoordeling', { ascending: false })

  if (error) throw error
  return data as Tool[]
}

export async function getUitgelichtTools(): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('uitgelicht', true)
    .order('beoordeling', { ascending: false })

  if (error) throw error
  return data as Tool[]
}

export async function getToolsBySlugs(slugs: string[]): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .in('slug', slugs)

  if (error) throw error
  return data as Tool[]
}

export async function logKlik(toolSlug: string, referer: string | null, userAgent: string | null) {
  await supabase.from('klik_tracking').insert({
    tool_slug: toolSlug,
    referer,
    user_agent: userAgent,
  })
}
