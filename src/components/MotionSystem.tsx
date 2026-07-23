import type { ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion'
import { useDesktopMotion } from '../hooks/useMotion'

export type RevealVariant = 'rise' | 'slide-left' | 'slide-right' | 'scale'

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  amount?: number
}

export function Reveal({
  children,
  className,
  variant = 'rise',
  delay = 0,
  amount = 0.18,
  ...props
}: RevealProps) {
  const cinematic = useDesktopMotion()
  const shouldReduceMotion = useReducedMotion()
  const distance = cinematic ? 42 : 16

  const initialByVariant: Record<RevealVariant, { x?: number; y?: number; scale?: number }> = {
    rise: { y: distance },
    'slide-left': { x: -distance },
    'slide-right': { x: distance },
    scale: { y: cinematic ? 22 : 10, scale: cinematic ? 1.035 : 1.01 },
  }

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : initialByVariant[variant]}
      whileInView={shouldReduceMotion ? undefined : { x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: cinematic ? 0.64 : 0.42,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
