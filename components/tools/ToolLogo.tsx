'use client'

import { useState } from 'react'

interface Props {
  src: string | null
  naam: string
  size?: number
}

/**
 * Uniforme logo-weergave: wit vierkant met afgeronde hoeken.
 * Valt terug op een letter-avatar als het externe logo niet laadt.
 */
export default function ToolLogo({ src, naam, size = 44 }: Props) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  return (
    <div
      className="rounded-xl bg-white border border-surface-200 flex items-center justify-center overflow-hidden shrink-0"
      style={{ width: size, height: size }}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${naam} logo`}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className="object-contain"
          style={{ width: size * 0.72, height: size * 0.72 }}
        />
      ) : (
        <span className="font-bold text-surface-900" style={{ fontSize: size * 0.42 }}>
          {naam[0]}
        </span>
      )}
    </div>
  )
}
