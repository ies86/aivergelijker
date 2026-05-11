import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(url, anon, {
  global: {
    fetch: (input, init) => {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 500)
      return fetch(input, { ...init, signal: controller.signal })
        .catch((err) => { clearTimeout(timeout); throw err })
        .then((res) => { clearTimeout(timeout); return res })
    },
  },
})
