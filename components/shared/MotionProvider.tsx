'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/** Zet framer-motion globaal op "respecteer prefers-reduced-motion". */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
