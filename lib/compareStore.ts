'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'aivergelijker:compare'
const MAX_SELECTIE = 4

type Listener = (slugs: string[]) => void
const listeners = new Set<Listener>()

function lees(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.slice(0, MAX_SELECTIE) : []
  } catch {
    return []
  }
}

function schrijf(slugs: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs))
  } catch {
    // localStorage kan disabled zijn
  }
  listeners.forEach(l => l(slugs))
}

export function gebruikVergelijking() {
  const [slugs, setSlugs] = useState<string[]>([])
  const [gemount, setGemount] = useState(false)

  useEffect(() => {
    setSlugs(lees())
    setGemount(true)
    const listener: Listener = (nieuw) => setSlugs(nieuw)
    listeners.add(listener)
    // Sync tussen tabs via storage event
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setSlugs(lees())
    }
    window.addEventListener('storage', onStorage)
    return () => {
      listeners.delete(listener)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  function voegToe(slug: string) {
    const huidig = lees()
    if (huidig.includes(slug)) return
    if (huidig.length >= MAX_SELECTIE) return
    schrijf([...huidig, slug])
  }

  function verwijder(slug: string) {
    schrijf(lees().filter(s => s !== slug))
  }

  function reset() {
    schrijf([])
  }

  function toggle(slug: string) {
    const huidig = lees()
    if (huidig.includes(slug)) verwijder(slug)
    else voegToe(slug)
  }

  return { slugs, voegToe, verwijder, reset, toggle, max: MAX_SELECTIE, gemount }
}
