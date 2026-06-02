'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  delay?: number
  className?: string
}

/**
 * Wrapper die kinderen 8px omhoog laat fade-in zodra ze in viewport komen.
 * Gebruikt IntersectionObserver, zonder JS-frame-by-frame animaties.
 */
export default function FadeUp({ children, delay = 0, className = '' }: Props) {
  const [zichtbaar, setZichtbaar] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setZichtbaar(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: zichtbaar ? 1 : 0,
        transform: zichtbaar ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
