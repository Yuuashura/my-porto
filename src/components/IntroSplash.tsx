import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { INTRO_HOLD, markIntroSeen } from '../lib/intro'

const word = 'Yuuashura'
const ease = [0.16, 1, 0.3, 1] as const

/** Render inside <AnimatePresence>; it calls onDone when it's time to lift. */
export function IntroSplash({ onDone }: { onDone: () => void }) {
  useEffect(markIntroSeen, [])

  return (
    <motion.div
      className="intro-splash"
      aria-hidden="true"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease }}
    >
      <p className="intro-word">
        {word.split('').map((letter, index) => (
          <span key={index}>
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.05, ease }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
        <motion.i
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.75, ease }}
        />
      </p>
      <motion.span
        className="intro-line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: INTRO_HOLD, ease: 'linear' }}
        // The progress line doubles as the timer: when it fills, the curtain lifts.
        onAnimationComplete={onDone}
      />
    </motion.div>
  )
}
