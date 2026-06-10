import { useEffect, useRef } from 'react'
import { animate, stagger, onScroll } from 'animejs'
import WishButton from './UI/WishButton'

interface HeroTeyvatProps {
  onExplore?: () => void
}

export default function HeroTeyvat({ onExplore }: HeroTeyvatProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  const subtitle = 'Hello, Traveler...'
  const nameFirst = 'Yudistira'
  const nameLast = 'Syaputra'

  useEffect(() => {
    // Reset element states to ensure clean animation starts
    animate('.hero-subtitle-char', { opacity: 0, scale: 0, duration: 0 })
    animate('.hero-char-1', { opacity: 0, y: 30, scale: 0.8, duration: 0 })
    animate('.hero-char-2', { opacity: 0, y: 30, scale: 0.8, duration: 0 })
    animate('.hero-fade-in', { opacity: 0, y: 15, duration: 0 })

    // 1. Staggered typing-pop effect for the subtitle
    animate('.hero-subtitle-char', {
      opacity: [0, 1],
      scale: [0, 1.2, 1],
      duration: 400,
      ease: 'outQuad',
      delay: stagger(60, { start: 100 }),
    })

    // 2. Wave pop-up transition for the first name
    animate('.hero-char-1', {
      y: [30, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      ease: 'outBack(1.4)',
      delay: stagger(40, { start: 400 }),
    })

    // 3. Wave pop-up transition for the last name
    animate('.hero-char-2', {
      y: [30, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      ease: 'outBack(1.4)',
      delay: stagger(40, { start: 700 }),
    })

    // 4. Fade/slide in buttons & desc
    animate('.hero-fade-in', {
      opacity: [0, 1],
      y: [15, 0],
      duration: 600,
      ease: 'outQuad',
      delay: 1100,
    })

    // 5. Scroll-linked parallax animation using Anime.js onScroll
    const parallaxAnim = animate('.hero-content', {
      opacity: [1, 0],
      y: [0, -50],
      scale: [1, 0.96],
      autoplay: false,
    })

    const scrollObserver = onScroll({
      target: '.hero-content',
      enter: 'top top',
      leave: 'bottom top',
      sync: true,
    }).link(parallaxAnim)

    return () => {
      scrollObserver.revert()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden fontaine-gradient-bg will-change-transform py-20 lg:py-0"
    >
      <div
        className="hero-content relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center will-change-transform"
      >
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          <p className="font-mono text-fontaine-cyan text-sm md:text-base tracking-widest h-5 select-none">
            {subtitle.split('').map((char, index) => (
              <span key={index} className="hero-subtitle-char inline-block opacity-0">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight select-none">
            <span className="block text-fontaine-light-gold">
              {nameFirst.split('').map((char, index) => (
                <span key={index} className="hero-char-1 inline-block opacity-0">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="block text-fontaine-light-gold mt-1">
              {nameLast.split('').map((char, index) => (
                <span key={index} className="hero-char-2 inline-block opacity-0">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h1>

          <div className="hero-fade-in opacity-0 space-y-4">
            <p className="font-heading text-lg md:text-xl text-fontaine-cyan/80 italic">
              &ldquo;Vision Developer&rdquo;
            </p>

            <p className="text-fontaine-cream/60 text-sm md:text-base max-w-xl mx-auto lg:mx-0">
              Full Stack Developer | Java &bull; React &bull; PostgreSQL &bull; Docker
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
              <WishButton variant="gold" onClick={onExplore}>
                ✦ Explore My Domains
              </WishButton>
              <WishButton
                variant="ghost"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                About Me
              </WishButton>
            </div>
          </div>
        </div>


        {/* Character Card Column */}
        <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
          <div className="relative group animate-float">
            {/* Glowing background */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-fontaine-gold via-fontaine-cyan to-fontaine-teal rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-700 pointer-events-none" />

            {/* Character Card Box */}
            <div className="relative w-64 md:w-72 aspect-[3/4.2] bg-fontaine-deep-navy border-2 border-fontaine-gold/70 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
              {/* Gold borders */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-fontaine-gold/60" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-fontaine-gold/60" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-fontaine-gold/60" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-fontaine-gold/60" />

              {/* Element top left */}
              <div className="absolute top-3.5 left-3.5 z-20 w-8 h-8 rounded-full bg-fontaine-navy/80 border border-fontaine-cyan/30 flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-fontaine-cyan fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>

              {/* Level top right */}
              <div className="absolute top-3.5 right-3.5 z-20 px-2 py-0.5 rounded-full bg-fontaine-navy/80 border border-fontaine-gold/40 text-[9px] text-fontaine-light-gold font-mono">
                Lv. 90/90
              </div>

              {/* Portrait */}
              <div className="relative flex-grow overflow-hidden bg-gradient-to-b from-fontaine-teal/20 via-fontaine-deep-navy to-fontaine-navy">
                <img
                  src="/im.jpg"
                  alt="Yudistira Syaputra"
                  className="w-full h-full object-cover object-top scale-102 group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fontaine-deep-navy via-transparent to-transparent" />

                {/* 5 Stars */}
                <div className="absolute bottom-3 left-3.5 flex gap-0.5 text-fontaine-gold text-xs drop-shadow-[0_0_4px_rgba(201,168,76,0.8)]">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>

              {/* Info Footer */}
              <div className="bg-gradient-to-b from-fontaine-navy/95 to-fontaine-deep-navy border-t border-fontaine-gold/30 p-3.5 relative z-10 text-center">
                <h3 className="font-display text-base text-fontaine-light-gold tracking-wide">
                  YUDISTIRA
                </h3>
                <p className="text-[10px] text-fontaine-cyan/80 font-mono mt-0.5 tracking-widest">
                  HYDRO &bull; VISION DEVELOPER
                </p>
              </div>
            </div>
          </div>
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

