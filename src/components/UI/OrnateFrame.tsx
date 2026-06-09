import { type ReactNode } from 'react'

interface OrnateFrameProps {
  children: ReactNode
  className?: string
  variant?: 'gold' | 'cyan'
  padding?: string
}

export default function OrnateFrame({
  children,
  className = '',
  variant = 'gold',
  padding = 'p-6',
}: OrnateFrameProps) {
  const borderColor =
    variant === 'gold' ? 'stroke-fontaine-gold' : 'stroke-fontaine-cyan'
  const glowColor =
    variant === 'gold'
      ? 'drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]'
      : 'drop-shadow-[0_0_8px_rgba(126,200,227,0.5)]'

  return (
    <div className={`relative ${className}`}>
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${glowColor}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="4"
          fill="none"
          className={borderColor}
          strokeWidth="1"
          strokeDasharray="4 2"
        />
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="2"
          fill="none"
          className={borderColor}
          strokeWidth="0.5"
          opacity="0.5"
        />
        <circle cx="8" cy="8" r="2.5" className={borderColor} fill="currentColor" />
        <circle cx="92" cy="8" r="2.5" className={borderColor} fill="currentColor" />
        <circle cx="8" cy="92" r="2.5" className={borderColor} fill="currentColor" />
        <circle cx="92" cy="92" r="2.5" className={borderColor} fill="currentColor" />
      </svg>
      <div className={`relative z-10 ${padding}`}>{children}</div>
    </div>
  )
}
