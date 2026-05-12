'use client'

import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    setStatus(res.ok ? 'done' : 'error')
  }

  if (status === 'done') {
    return (
      <p className="text-emerald-400 font-medium text-sm">
        Gelukt! Je ontvangt de nieuwste AI-updates in je inbox.
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="flex gap-2 flex-col sm:flex-row">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="jouw@email.nl"
          className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-2.5 bg-white text-surface-50 text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-60 whitespace-nowrap inline-flex items-center gap-2"
      >
        {status === 'loading' ? 'Bezig...' : 'Aanmelden'}
        <ArrowRight className="h-4 w-4" />
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1">Er ging iets mis. Probeer het opnieuw.</p>
      )}
    </form>
  )
}
