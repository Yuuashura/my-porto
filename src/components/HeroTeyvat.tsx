import { useEffect, useRef, useState } from 'react'
import WishButton from './UI/WishButton'

export default function HeroTeyvat() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [displayText, setDisplayText] = useState('')
  const [progress, setProgress] = useState(0)
  const fullText = 'Hello, Traveler...'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) clearInterval(interval)
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const winH = window.innerHeight
      const heroH = rect.height

      const visible = Math.max(0, Math.min(rect.bottom, winH) - Math.max(rect.top, 0))
      const ratio = visible / heroH

      setProgress(Math.max(0, Math.min(1, 1 - ratio)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const heroStyle: React.CSSProperties = {
    opacity: 1 - progress,
    filter: `blur(${progress * 5}px)`,
    transform: `scale(${1 - progress * 0.03}) translateY(${progress * -30}px)`,
    transition: progress < 0.05 ? 'none' : undefined,
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden fontaine-gradient-bg will-change-transform"
    >

      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-4xl will-change-transform"
        style={heroStyle}
      >
        <p className="font-mono text-fontaine-cyan text-sm md:text-base mb-4 tracking-widest h-5">
          {displayText}
          <span className="animate-pulse">|</span>
        </p>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-fontaine-light-gold mb-4 leading-tight">
          Yudistira
          <br />
          <span className="text-gradient-gold">Syaputra</span>
        </h1>

        <p className="font-heading text-lg md:text-xl text-fontaine-cyan/80 italic mb-2">
          &ldquo;Vision Developer&rdquo;
        </p>

        <p className="text-fontaine-cream/60 text-sm md:text-base mb-10 max-w-xl mx-auto">
          Full Stack Developer | Java &bull; React &bull; PostgreSQL &bull; Docker
        </p>

        <div className="flex items-center justify-center gap-4">
          <WishButton variant="gold" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            ✦ Explore My Domains
          </WishButton>
          <WishButton
            variant="ghost"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            About Me
          </WishButton>
        </div>

        <div className="mt-16 animate-bounce text-fontaine-cyan/40" style={{ opacity: 1 - progress }}>
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-20"
        style={{
          background: `linear-gradient(to top, #0A1628, transparent)`,
          opacity: progress * 2,
        }}
      />
    </section>
  )
}
