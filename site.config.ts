/**
 * Centrale site-configuratie. Hier staan alle niche-specifieke teksten
 * zodat dezelfde codebase makkelijk voor andere affiliate-sites gebruikt
 * kan worden via scripts/nieuwe-affiliate-site.js.
 *
 * Bij een nieuwe niche-site hoef je in principe alleen:
 *   1. Deze file aanpassen (naam, hero, FAQ, kleuren)
 *   2. lib/categories.ts aanpassen (de categorieen van jouw niche)
 *   3. lib/data.ts vullen (de producten zelf)
 *   4. Optioneel: lib/photos.ts Pexels-zoektermen per categorie
 *
 * De wizard scripts/nieuwe-affiliate-site.js doet stap 1 grotendeels automatisch.
 */

export const siteConfig = {
  // Identiteit
  slug: 'aivergelijker',
  domein: 'aivergelijker.nl',
  naam: 'aivergelijker',
  domeinExtensie: '.nl',

  // Niche: wat vergelijk je?
  niche: 'AI-tools',            // meervoud, voor lopende tekst
  nicheEnkelvoud: 'AI-tool',    // enkelvoud, voor de grote gekleurde hero-titel

  // Prijstype: 'abonnement' = maandprijzen + plannen (SaaS, AI-tools).
  //            'eenmalig'   = 1 vaste prijs per product (boeken, gadgets, sneakers).
  prijsType: 'abonnement' as 'abonnement' | 'eenmalig',

  // Toon alleen producten met een affiliate-link (waar je geld aan verdient)?
  // true  = verberg producten zonder affiliate_url
  // false = toon alles (bv. zolang je nog niet overal bij een programma zit)
  alleenMetAffiliate: false,

  // Hero (grote titel = heroPrefix + [nicheEnkelvoud in kleur] + heroSuffix)
  heroOverline: 'Vergelijk · Kies · Probeer',
  heroPrefix: 'Vind de juiste',
  heroSuffix: 'voor jouw doel',
  heroOndertitel: 'Prijzen, plannen en functies van {n} {niche} naast elkaar, in het Nederlands.',

  // SEO
  paginaTitel: 'aivergelijker.nl: vergelijk de beste AI-tools',
  siteOmschrijving: 'Vergelijk de beste AI-tools voor consumenten. Onafhankelijke prijsvergelijkingen, in het Nederlands.',
  taal: 'nl-NL',
  keywords: [
    'AI tools vergelijken', 'beste AI tools', 'ChatGPT vergelijken',
    'AI chatbot vergelijking', 'AI tools Nederland', 'AI voor beginners',
    'beste gratis AI', 'AI vergelijker',
  ] as string[],

  // FAQ (homepage structured data + eventueel weergave)
  faq: [
    { vraag: 'Wat kost een AI-tool?', antwoord: 'De prijzen lopen sterk uiteen. Veel AI-tools bieden een gratis plan. Betaalde plannen starten doorgaans bij €5-22 per maand.' },
    { vraag: 'Welke AI-tools zijn gratis te gebruiken?', antwoord: 'Een groot deel van onze tools heeft een gratis basisversie. Filter op de categoriepagina op "Alleen gratis" om alleen die tools te zien.' },
    { vraag: 'Hoe wordt deze site gefinancierd?', antwoord: 'Wanneer je via onze links een betaald abonnement neemt, ontvangen wij soms een commissie. Dat heeft geen invloed op welke tools we tonen.' },
  ],

  // Welke homepage-secties tonen? (zet uit wat niet bij je niche past)
  secties: {
    nieuwsFeed: true,      // live AI-nieuws via Hacker News (alleen zinvol voor tech-niches)
    vergelijkingen: true,  // de "side-by-side vergelijkingen" sectie met handmatige links
  },

  // Brand kleuren (3 violet-cyan accenten in logo-bars)
  brandKleurDonker: '#a78bfa',
  brandKleurMidden: '#c4b5fd',
  brandKleurLicht: '#67e8f9',

  // Footer
  footerTagline: 'De onafhankelijke vergelijkingssite voor AI-tools. Wij helpen je de juiste AI-tool te vinden.',
  footerVergelijkingen: [
    { label: 'ChatGPT vs Claude', href: '/vergelijk/chatgpt-vs-claude' },
    { label: 'Gemini vs ChatGPT', href: '/vergelijk/gemini-vs-chatgpt' },
    { label: 'Midjourney vs DALL-E', href: '/vergelijk/midjourney-vs-dall-e' },
    { label: 'Cursor vs Copilot', href: '/vergelijk/cursor-vs-github-copilot' },
    { label: 'Perplexity vs ChatGPT', href: '/vergelijk/perplexity-vs-chatgpt' },
    { label: 'Synthesia vs Descript', href: '/vergelijk/synthesia-vs-descript' },
  ] as { label: string; href: string }[],
  footerGuides: [
    { label: 'Beste gratis chatbots', href: '/beste-ai-voor/beste-gratis-ai-chatbot' },
    { label: 'AI voor programmeren', href: '/beste-ai-voor/beste-ai-voor-coderen' },
    { label: 'AI voor beginners', href: '/beste-ai-voor/ai-tools-voor-beginners' },
    { label: 'AI voor studenten', href: '/beste-ai-voor/beste-ai-voor-studenten' },
    { label: 'AI voor SEO', href: '/beste-ai-voor/beste-ai-voor-seo' },
  ] as { label: string; href: string }[],

  // Newsletter
  nieuwsbriefTitel: 'Blijf op de hoogte',
  nieuwsbriefSubtitel: 'Nieuwe {niche} en vergelijkingen, in je inbox wanneer er iets nieuws is.',

  // Affiliate
  affiliateDisclosure: 'Sommige links op deze site zijn affiliate-links. Wanneer je via deze links een aankoop doet, ontvangen wij soms een commissie. Dat heeft geen invloed op welke {niche} we tonen.',
} as const

export type SiteConfig = typeof siteConfig

/** Helper: vervangt {niche} en {n} placeholders in een config-string. */
export function vulIn(tekst: string, aantal?: number): string {
  return tekst
    .replace(/\{niche\}/g, siteConfig.niche)
    .replace(/\{n\}/g, aantal != null ? String(aantal) : '')
    .trim()
}
