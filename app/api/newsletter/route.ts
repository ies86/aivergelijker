import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
  }

  const { error } = await supabase
    .from('nieuwsbrief')
    .insert({ email: email.toLowerCase().trim() })

  if (error) {
    if (error.code === '23505') {
      // Al aangemeld — geen fout tonen aan gebruiker
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 })
  }

  // Optioneel: stuur welkomstmail via Resend
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({ ... })

  return NextResponse.json({ ok: true })
}
