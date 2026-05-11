import type { Config } from 'tailwindcss'

// Tailwind v4: configuratie verloopt grotendeels via globals.css @theme.
// Dit bestand blijft staan voor IDE-autocomplete.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
}

export default config
