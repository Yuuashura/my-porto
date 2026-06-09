import { useEffect, useState } from 'react'
import WishButton from './UI/WishButton'
import ParticleField from './ParticleField'

export default function HeroTeyvat() {
  const [displayText, setDisplayText] = useState('')
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden fontaine-gradient-bg"
    >
      <ParticleField />

      <div className="relative z-10 text-center px-6 max-w-4xl">
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

        <div className="mt-16 animate-bounce text-fontaine-cyan/40">
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
