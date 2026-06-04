import type { Tool } from '@/lib/types'
import { siteConfig } from '@/site.config'

const BASE = `https://${siteConfig.domein}`

interface WebsiteJsonLdProps {
  type: 'website'
}

interface ToolJsonLdProps {
  type: 'tool'
  tool: Tool
}

interface ArticleJsonLdProps {
  type: 'article'
  titel: string
  beschrijving: string
  datum?: string
  slug: string
}

interface FAQJsonLdProps {
  type: 'faq'
  vragen: { vraag: string; antwoord: string }[]
}

type JsonLdProps = WebsiteJsonLdProps | ToolJsonLdProps | ArticleJsonLdProps | FAQJsonLdProps

export default function JsonLd(props: JsonLdProps) {
  let data: Record<string, unknown>

  switch (props.type) {
    case 'website':
      data = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.domein,
        url: BASE,
        description: siteConfig.siteOmschrijving,
        inLanguage: 'nl',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }
      break

    case 'tool': {
      const { tool } = props
      const goedkoopste = tool.plannen.find(p => p.prijs_mnd > 0)
      data = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.naam,
        description: tool.beschrijving,
        url: `${BASE}/tools/${tool.slug}`,
        applicationCategory: siteConfig.niche,
        operatingSystem: 'Web',
        ...(tool.beoordeling && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: tool.beoordeling,
            bestRating: 5,
            worstRating: 1,
            ratingCount: 1,
          },
        }),
        ...(goedkoopste && {
          offers: {
            '@type': 'Offer',
            price: goedkoopste.prijs_mnd,
            priceCurrency: 'EUR',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
          },
        }),
        ...(tool.prijsmodel === 'gratis' && {
          offers: {
            '@type': 'Offer',
            price: 0,
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          },
        }),
      }
      break
    }

    case 'article':
      data = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: props.titel,
        description: props.beschrijving,
        url: `${BASE}/${props.slug}`,
        inLanguage: 'nl',
        publisher: {
          '@type': 'Organization',
          name: siteConfig.domein,
          url: BASE,
        },
        ...(props.datum && {
          datePublished: props.datum,
          dateModified: props.datum,
        }),
      }
      break

    case 'faq':
      data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.vragen.map(v => ({
          '@type': 'Question',
          name: v.vraag,
          acceptedAnswer: {
            '@type': 'Answer',
            text: v.antwoord,
          },
        })),
      }
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
