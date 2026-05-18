'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  value: number
  duration?: number
  /** Optionele formatter — bv. (n) => `€${n}` */
  format?: (n: number) => string
  className?: string
  /** Starts pas met animeren wanneer in viewport */
  lazyTrigger?: boolean
}

/**
 * Animated counter die van 0 naar value telt zodra hij in beeld komt.
 * Gebruikt requestAnimationFrame voor smooth animatie.
 */
export default function AnimatedCounter({
  value,
  duration = 1200,
  format = (n) => String(n),
  className = '',
  lazyTrigger = true,
}: Props) {
  const [huidig, setHuidig] = useState(0)
  const [gestart, setGestart] = useState(!lazyTrigger)
  const elementRef = useRef<HTMLSpanElement>(null)

  // Trigger op viewport intersection
  useEffect(() => {
    if (!lazyTrigger || gestart) return
    const el = elementRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setGestart(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [lazyTrigger, gestart])

  // Eenmaal gestart, animeer naar de doelwaarde
  useEffect(() => {
    if (!gestart) return
    let frame: number
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setHuidig(Math.round(value * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [gestart, value, duration])

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {format(huidig)}
    </span>
  )
}
