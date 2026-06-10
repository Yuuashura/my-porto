import { useEffect } from 'react'
import { animate, stagger } from 'animejs'

interface WishAnimationProps {
  isOpen: boolean
  onClose: () => void
}

export default function WishAnimation({ isOpen, onClose }: WishAnimationProps) {
  useEffect(() => {
    if (!isOpen) return

    // Initialize all animatable elements to their starting state before running animations
    // Meteor
    animate('.wish-meteor', { x: -200, y: -200, scale: 0.5, opacity: 0, duration: 0 })
    animate('.wish-meteor-head', { x: -200, y: -200, scale: 0.5, opacity: 0, duration: 0 })
    
    // Flash
    animate('.wish-flash', { opacity: 0, duration: 0 })
    
    // Reveal (reset values to prepare for entrance animations)
    animate('.reveal-container', { opacity: 0, duration: 0 })
    animate('.reveal-rays', { rotate: 0, opacity: 0, scale: 1, duration: 0 })
    animate('.reveal-emblem', { scale: 0, opacity: 0, duration: 0 })
    animate('.reveal-card', { scale: 0.6, opacity: 0, duration: 0 })
    animate('.reveal-char', { scale: 0, opacity: 0, duration: 0 })
    animate('.reveal-text', { y: 40, opacity: 0, duration: 0 })
    animate('.reveal-star', { scale: 0, opacity: 0, duration: 0 })
    animate('.reveal-btn', { y: 20, opacity: 0, duration: 0 })

    // Hide reveal container initially during meteor phase
    animate('.reveal-container', { opacity: 0, duration: 0 })

    // Step 1: Play Shooting Star / Meteor Animation
    const meteorAnim = animate('.wish-meteor', {
      x: [-150, window.innerWidth + 150],
      y: [-150, window.innerHeight + 150],
      scale: [0.5, 1.4],
      opacity: [0, 1, 1, 0],
      duration: 1200,
      ease: 'outQuad',
    })

    const headAnim = animate('.wish-meteor-head', {
      x: [-150, window.innerWidth + 150],
      y: [-150, window.innerHeight + 150],
      scale: [0.5, 1.4],
      opacity: [0, 1, 1, 0],
      duration: 1200,
      ease: 'outQuad',
    })

    // Step 2: Meteor Impact -> Play White Flash
    Promise.all([meteorAnim, headAnim]).then(() => {
      animate('.wish-flash', {
        opacity: [0, 1, 0],
        duration: 350,
        ease: 'linear',
      }).then(() => {
        // Show the character reveal elements
        animate('.reveal-container', { opacity: 1, duration: 100 })

        // Step 3: Animate Character Reveal Components
        // 1. Rotating gold light rays (slow infinite loop)
        animate('.reveal-rays', {
          rotate: [0, 360],
          opacity: [0, 0.35],
          duration: 30000,
          loop: true,
          ease: 'linear',
        })

        // 2. Hydro emblem pop-in
        animate('.reveal-emblem', {
          scale: [0, 1.2, 1],
          opacity: [0, 1],
          duration: 600,
          ease: 'outBack',
        })

        // 3. 5-star character portrait card zoom/spring in
        animate('.reveal-card', {
          scale: [0.6, 1.04, 1],
          opacity: [0, 1],
          duration: 800,
          ease: 'outElastic(1, 0.75)',
        })

        // 4. Staggered character entrance wave for title name
        animate('.reveal-char', {
          scale: [0, 1.4, 1],
          opacity: [0, 1],
          duration: 600,
          ease: 'outBack',
          delay: stagger(45, { start: 150 }),
        })

        // 5. Slide up subtitles (staggered)
        animate('.reveal-text', {
          y: [40, 0],
          opacity: [0, 1],
          duration: 700,
          ease: 'outQuad',
          delay: stagger(120, { start: 400 }),
        })

        // 6. Staggered pop-in for the 5 golden stars
        animate('.reveal-star', {
          scale: [0, 1.6, 1],
          opacity: [0, 1],
          duration: 500,
          ease: 'outBack',
          delay: stagger(100, { start: 650 }),
        })

        // 7. Fade/Slide up the Enter Domain Button
        animate('.reveal-btn', {
          y: [20, 0],
          opacity: [0, 1],
          duration: 500,
          ease: 'outQuad',
          delay: 1100,
        })
      })
    })
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center select-none font-body">
      {/* 1. METEOR PHASE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {/* Dark starry background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80" />
        
        {/* The Shooting Star (Meteor) */}
        <div className="wish-meteor absolute w-[500px] h-[4px] bg-gradient-to-r from-transparent via-fontaine-cyan to-fontaine-gold rounded-full blur-[1px] opacity-0" style={{ transformOrigin: 'left center' }} />
        
        {/* Glow Head of the Meteor */}
        <div className="wish-meteor-head absolute w-6 h-6 rounded-full bg-white border-4 border-fontaine-gold shadow-[0_0_30px_rgba(201,168,76,1)] opacity-0" />
      </div>

      {/* 2. FLASH PHASE */}
      <div className="wish-flash absolute inset-0 bg-white z-[110] opacity-0 pointer-events-none" />

      {/* 3. REVEAL PHASE */}
      <div className="reveal-container absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0">
        
        {/* Rotating light rays background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none">
          <div className="absolute w-[200vw] h-[200vw] bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.12)_0%,_transparent_60%)]" />
          <div 
            className="reveal-rays absolute w-[150vw] h-[150vw] opacity-0"
            style={{
              backgroundImage: 'conic-gradient(from 0deg, transparent, rgba(201,168,76,0.4) 10deg, transparent 20deg, transparent 40deg, rgba(201,168,76,0.4) 50deg, transparent 60deg, transparent 90deg, rgba(201,168,76,0.4) 100deg, transparent 110deg, transparent 180deg, rgba(201,168,76,0.4) 190deg, transparent 200deg, transparent)',
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl w-full px-6">
          
          {/* Hydro Element Emblem */}
          <div className="reveal-emblem mb-4 w-16 h-16 rounded-full bg-fontaine-navy/85 border border-fontaine-cyan/40 flex items-center justify-center shadow-lg shadow-fontaine-cyan/20 opacity-0 scale-0">
            <svg className="w-10 h-10 text-fontaine-cyan fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>

          {/* Elegant Character Photo Frame */}
          <div className="reveal-card relative group mb-6 opacity-0 scale-[0.6]">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-fontaine-gold via-fontaine-light-gold to-fontaine-cyan rounded-2xl blur-md opacity-70 animate-pulse-glow" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-fontaine-deep-navy border-4 border-fontaine-gold rounded-2xl overflow-hidden shadow-2xl">
              {/* Gold border corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-fontaine-gold" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-fontaine-gold" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-fontaine-gold" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-fontaine-gold" />
              
              {/* Portrait image */}
              <img
                src="/im.jpg"
                alt="Yudistira Syaputra"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fontaine-navy via-transparent to-transparent opacity-80" />
            </div>
          </div>

          {/* Character Details */}
          <h2 className="font-display text-4xl md:text-5xl text-fontaine-light-gold mb-1 text-center tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] select-none">
            {"YUDISTIRA SYAPUTRA".split('').map((char, index) => (
              <span key={index} className="reveal-char inline-block opacity-0">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          
          <p className="reveal-text font-heading text-lg md:text-xl text-fontaine-cyan mb-4 font-semibold tracking-widest text-center opacity-0">
            ✦ VISION DEVELOPER ✦
          </p>

          {/* 5 Stars pop animation */}
          <div className="flex gap-2 text-2xl md:text-3xl text-fontaine-gold mb-8 drop-shadow-[0_0_8px_rgba(201,168,76,0.8)]">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="reveal-star opacity-0 scale-0">
                ★
              </span>
            ))}
          </div>

          {/* Enter Domain Button */}
          <button
            onClick={onClose}
            className="reveal-btn opacity-0 px-8 py-3 rounded-full bg-fontaine-gold hover:bg-fontaine-light-gold text-fontaine-navy font-bold shadow-lg shadow-fontaine-gold/30 hover:scale-105 transition-all duration-200"
          >
            Enter Domain
          </button>
        </div>
      </div>
    </div>
  )
}
