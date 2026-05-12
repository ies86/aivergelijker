import type { Tool } from '@/lib/types'

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
        name: 'aivergelijker.nl',
        url: 'https://aivergelijker.nl',
        description: 'Vergelijk de beste AI-tools voor consumenten. Onafhankelijke reviews, prijsvergelijkingen en eerlijke aanbevelingen.',
        inLanguage: 'nl',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://aivergelijker.nl/?q={search_term_string}',
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
        url: `https://aivergelijker.nl/tools/${tool.slug}`,
        applicationCategory: 'AI Tool',
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
        url: `https://aivergelijker.nl/${props.slug}`,
        inLanguage: 'nl',
        publisher: {
          '@type': 'Organization',
          name: 'aivergelijker.nl',
          url: 'https://aivergelijker.nl',
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
