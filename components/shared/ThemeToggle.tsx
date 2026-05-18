'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [gemount, setGemount] = useState(false)

  // Lees initiele theme uit DOM (gezet door initial-script in head)
  useEffect(() => {
    const huidig = (document.documentElement.dataset.theme as Theme) || 'light'
    setTheme(huidig)
    setGemount(true)
  }, [])

  function toggle() {
    const nieuw: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(nieuw)
    document.documentElement.dataset.theme = nieuw
    try {
      localStorage.setItem('theme', nieuw)
    } catch {
      // localStorage kan disabled zijn
    }
  }

  // Voorkom hydration mismatch
  if (!gemount) {
    return <div className="w-9 h-9" aria-hidden />
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Wissel naar ${theme === 'light' ? 'donkere' : 'lichte'} modus`}
      title={`Wissel naar ${theme === 'light' ? 'donkere' : 'lichte'} modus`}
      className="w-9 h-9 rounded-full flex items-center justify-center text-surface-500 hover:text-surface-900 hover:bg-surface-100 transition-colors"
    >
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  )
}
