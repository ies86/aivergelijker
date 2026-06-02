import { getPexelsPhoto, CATEGORIE_PHOTO_QUERY } from '@/lib/photos'

interface Props {
  /** Slug van de categorie (chatbot, video, etc.) of een eigen query-tekst */
  query: string
  /** Aspect ratio van de banner; default 16:9 */
  aspect?: '16/9' | '3/2' | '4/3' | '1/1'
  /** Tailwind kleur-classes voor fallback gradient (gebruikt indien geen foto) */
  fallbackGradient?: string
  /** Optioneel label dat over de foto getoond wordt */
  label?: string
  className?: string
}

/**
 * Server component dat een Pexels-foto laadt als banner. Valt terug op een
 * gekleurde gradient als de API-key ontbreekt of de fetch faalt.
 */
export default async function CategoryBanner({
  query,
  aspect = '16/9',
  fallbackGradient = 'from-violet-500 via-fuchsia-500 to-cyan-500',
  label,
  className = '',
}: Props) {
  const zoekQuery = CATEGORIE_PHOTO_QUERY[query] ?? query
  const photo = await getPexelsPhoto(zoekQuery, 'landscape')

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {photo ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt={photo.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Subtiele overlay voor leesbaarheid van eventueel label */}
          {label && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          )}
          {/* Attribution Pexels, vereist door hun voorwaarden */}
          <a
            href={photo.photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-1 right-2 text-[10px] text-white/60 hover:text-white/90 transition-colors"
            title="Foto van Pexels"
          >
            © {photo.photographer}
          </a>
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient}`} />
      )}
      {label && (
        <div className="absolute bottom-0 left-0 p-4 sm:p-5">
          <p className="text-white font-bold text-lg sm:text-xl" style={{ letterSpacing: '-0.02em' }}>{label}</p>
        </div>
      )}
    </div>
  )
}
