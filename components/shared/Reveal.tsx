'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Vertraging in seconden (voor stagger). */
  delay?: number
  /** Verticale verschuiving waar vandaan (px). */
  y?: number
  className?: string
}

/**
 * Subtiele scroll-reveal: element komt zacht omhoog + fade-in zodra het in beeld
 * komt. Eén keer, niet opdringerig. Respecteert reduced-motion via MotionConfig.
 */
export default function Reveal({ children, delay = 0, y = 18, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
