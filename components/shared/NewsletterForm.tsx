'use client'

import { useState } from 'react'

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
      <p className="text-white font-semibold">
        Gelukt! Je ontvangt de nieuwste AI-updates in je inbox.
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="flex gap-2 flex-col sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="jouw@email.nl"
        className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-white text-violet-700 text-sm font-bold rounded-full hover:bg-white/95 hover:shadow-lg transition-all disabled:opacity-60 shrink-0"
      >
        {status === 'loading' ? 'Bezig...' : 'Aanmelden'}
      </button>
      {status === 'error' && (
        <p className="text-red-300 text-xs mt-1">Er ging iets mis. Probeer het opnieuw.</p>
      )}
    </form>
  )
}
