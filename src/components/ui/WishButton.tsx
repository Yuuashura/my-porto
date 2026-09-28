import { type ReactNode, useRef } from 'react'
import { motion } from 'framer-motion'

interface WishButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'gold' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
}

export default function WishButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: WishButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const variants = {
    primary:
      'bg-fontaine-teal hover:bg-fontaine-mid-teal text-white border border-fontaine-cyan/40',
    gold: 'bg-gradient-to-r from-fontaine-gold to-fontaine-light-gold text-fontaine-navy font-bold border border-fontaine-gold/60 shadow-lg shadow-fontaine-gold/20',
    ghost:
      'bg-transparent text-fontaine-cyan border border-fontaine-cyan/30 hover:bg-fontaine-cyan/10',
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      className={`
        relative px-8 py-3 rounded-lg font-semibold
        transition-all duration-300 cursor-pointer
        overflow-hidden group
        ${variants[variant]}
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center">
        {children}
      </span>
      <motion.div
        className="absolute inset-0 bg-white/10"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  )
}
