# Design- & bouwspec

Referentie-implementatie: **booxie.nl** (live: https://booxie.vercel.app). Booxie is gebouwd op
het aivergelijker-template, dus structuur, componenten, data-aanpak, affiliate, animaties en
regels zijn 1-op-1 herbruikbaar voor aivergelijker en biohackcheck. Stem **alleen kleuren/fonts**
af op de niche.

## Tech
- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind v4.
- Config-driven via `site.config.ts` (niche-teksten, kleuren, secties, affiliate).
- Server Components voor data; alleen kleine wrappers zijn `'use client'`.
- Deploy: Vercel (`vercel --prod --yes` vanuit de projectmap; CLI is al ingelogd als rmgoudriaan-2425).

## HARDE REGELS (niet onderhandelbaar)
1. NOOIT em-dashes (—) of en-dashes (–) in zichtbare tekst. Gebruik komma, "tot", of hyphen.
2. Natuurlijk Nederlands. Geen marketing-jargon of rare termen (bv. niet "eenmalige aankoop",
   wel "Direct te bestellen bij <winkel>"). Geen Engelse term als het Nederlands kan.
3. GEEN generieke "gekleurde-rounded-square + wit lijn-icoontje"-tegels. Dat oogt AI-gegenereerd.
   Doe covers-first navigatie (echte productafbeeldingen), zoals bruna.nl. Liever geen icoontjes.
4. Hero/kop-banden NIET te dik (anders moet je meteen ver scrollen). Houd verticale padding klein
   (bv. `pt-8 pb-14` op de hero, `py-8 sm:py-12` op subpagina-koppen).
5. "Leuk" mag, maar blijf clean en betrouwbaar. Subtiel boven druk.

## Design-systeem (niche-afhankelijk; hier booxie als sjabloon)
- Stijl: claymorphism (ronde hoeken 18-24px, dikke 1.5px rand, zachte "puffy" dubbele schaduw,
  lichte hover-lift + `active:scale-95`). Voor een serieuzere niche (AI/health): zelfde structuur,
  rustiger schaduwen en strakkere radius.
- Tokens via CSS-variabelen in `globals.css` + Tailwind `@theme`. Licht + donker definiëren:
  `--bg-base, --bg-elevated, --bg-subtle, --text-primary/secondary/tertiary,
  --border-default/strong, --clay-shadow, --clay-shadow-hover`.
- Brand-kleuren als `--color-brand-300..700` + `--color-accent-400..600`.
  booxie: koraal/oranje `#ff6a3d` + zonnig geel `#ffc23c` (geen paars/cyaan).
  Kies per niche: AI = fris/tech (bv. indigo + cyaan), biohack = natuurlijk (groen + limoen/citrus).
- Per categorie een eigen kleur (`kleur`, `kleurTekst`, `gradient`) in `lib/categories.ts`,
  gebruikt voor cover-fallbacks, gekleurde panelen, dots, badges.
- Fonts via `next/font`: kop + tekst-pairing. booxie: Baloo 2 (kop) + Nunito (tekst).
  AI/health: bv. Sora/Space Grotesk (kop) + Inter (tekst). Zet `--font-display` (kop) los van
  `--font-sans` (tekst); `font-display` class op headings.
- `.card` = claymorphism. Focus-ring 3px brand. `prefers-reduced-motion` respecteren.

## Kerncomponenten (herbruikbaar)
- `BookCover`/`ProductCover` (client): toont echte afbeelding, valt bij ontbreken terug op een
  ONTWORPEN fallback (categorie-gradient + titel + auteur/merk + stippen-patroon). Nooit een
  gebroken plaatje.
- Covers-first categorie-tegels (`CategoryTiles`): per categorie een echte cover met een gekleurd
  "stapeltje" erachter (collectie-gevoel) + label + aantal. GEEN icoontjes.
- Productkaart (`ToolCard`): cover boven, titel/merk, categorie-pill + rating, prijs + 1 duidelijke
  CTA ("Bekijk"). Hele kaart in een scroll-reveal.
- `PaginaHero`: gekleurde gradient-kop-band voor overzichtspaginas (kort gehouden).
- Homepage-blokken met VARIATIE (niet steeds dezelfde rij): hero → "Net uitgekomen" scroll-strip →
  "Populairste" cover-rij → covers-first categorie-tegels → grote "Uitgelicht"-spotlight (gekleurd
  blok, cover + tekst + CTA) → categorie-secties met gekleurd intro-paneel naast de covers (om en
  om links/rechts, afwisselende achtergrond) → Recensies → nieuwsbrief.
- Header: logo + nav met kern-onderwerpen + een "Categorieën" hover-dropdown; mobiel menu via
  AnimatePresence. Warme, on-brand footer (geen koud-grijs).

## Data: covers, ratings, reviews, populariteit (de retailer-truc)
Voor niches met een dominante NL-retailer (boeken/health bij bol.com): scrape de retailer.
- Covers: haal de zoekpagina op (titel + merk), pak de eerste portret-afbeelding van het CDN
  (bv. `media.s-bol.com/.../547x840.jpg`). Beter: match het JUISTE product op de titel-slug in de
  product-URL (`/nl/nl/p/<slug>/<id>/`), niet zomaar de eerste (gesponsorde) link.
- Reviews/ratings/populariteit: lees op de productpagina de JSON-LD `aggregateRating`
  (`ratingValue` + `reviewCount`) en `reviewBody` (reviewtekst + author). Gebruik `reviewCount` als
  populariteits-signaal. Let op: veel reviewtekst laadt via JS, dus ~15-20% heeft een quote; de rest
  krijgt rating + reviewaantal + bronlink. ALTIJD met bronvermelding.
- Fallback covers: Open Library (`covers.openlibrary.org/b/id/<cover_i>-L.jpg`). Google Books is
  vaak geblokkeerd (429) op gedeelde IP's.
- Doe dit met losse Node-scripts in `/scripts` die `lib/data.ts` verrijken; jaar/prijs/datum
  blijven best-effort placeholders, duidelijk markeren als "te verfijnen".
- AI-tools (geen retailer): data is hand-curated; "reviews" via koppelingen naar bronnen (G2,
  Trustpilot, Product Hunt) MET bronlink, niet zelf verzinnen.

## Affiliate-strategie (denk als ondernemer: diversifiëren)
- Multi-merchant, config-driven in `site.config.ts` `affiliates`. Per programma jouw eigen ID:
  bol.com (partnerId), Amazon (partnerTag `?tag=`), netwerk-deeplink (Daisycon/TradeTracker/Awin)
  met `{url}`-template voor o.a. Bruna/AKO. Biohack ook iHerb/merk-programma's; AI-tools het eigen
  affiliate-programma per tool.
- Productpagina toont "Verkrijgbaar bij" met meerdere winkels (= meer kliks, back-up als één
  programma stopt). Leeg ID = gewone link zonder tracking. Centrale helper bouwt de tracked-URL;
  redirect via `/api/go/[slug]` zodat je kliks kunt loggen.

## Vaste onderdelen/secties (kopieerbaar van booxie)
Categorieën, Populairste, Net uitgekomen (≤6 mnd op `datum`), Recensies (met bron), zoekbalk met
Cmd/Ctrl+K, jaar-/prijs-filter + sortering op overzichtspaginas, sitemap/robots/JSON-LD,
nieuwsbrief, affiliate-disclosure.

## Performance
Sla externe DB-calls (Supabase) over als er geen echte config is: `supabaseActief`-vlag, anders
laadt elke pagina trage, mislukte fetches. Booxie ging van 44s naar ~6s build hierdoor.

## Animaties (framer-motion v12, subtiel, niet "AI-opvallend")
- `MotionProvider` met `<MotionConfig reducedMotion="user">` rond de app in `layout.tsx`.
- `Reveal` (client): `whileInView` fade + rise (y:18→0), `viewport={{ once:true, margin:'-60px' }}`,
  duration ~0.55, ease `[0.22,1,0.36,1]`, lichte stagger per item (`index*0.05s`). Op alle kaarten/tegels.
- `MountReveal` (client): zachte spring (scale 0.94→1 + fade) voor de cover boven de vouw op de
  productpagina.
- Header: AnimatePresence (height+fade) voor mobiel menu en zoekbalk; dropdown soft CSS-fade.

## Werkwijze
- Bouw groen houden (`npm run build`) na elke set wijzigingen; daarna `vercel --prod --yes`.
- Verifieer via gerenderde HTML (`curl`) als headless screenshots flaky zijn. Let op: React zet
  `<!-- -->` tussen tekst en `{expressies}`, dus exact-match greps op "woord {var} woord" falen soms
  terwijl het correct rendert.
