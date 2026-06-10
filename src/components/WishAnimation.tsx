import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WishAnimationProps {
  isOpen: boolean
  onClose: () => void
}

export default function WishAnimation({ isOpen, onClose }: WishAnimationProps) {
  const [phase, setPhase] = useState<'idle' | 'meteor' | 'flash' | 'reveal'>('idle')
  const [starsVisible, setStarsVisible] = useState<boolean[]>([false, false, false, false, false])

  useEffect(() => {
    if (isOpen) {
      setPhase('meteor')
      setStarsVisible([false, false, false, false, false])

      // 1. Play meteor animation for 1.2 seconds
      const timer1 = setTimeout(() => {
        setPhase('flash')
      }, 1200)

      // 2. Play white flash for 200ms
      const timer2 = setTimeout(() => {
        setPhase('reveal')
      }, 1400)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      setPhase('idle')
    }
  }, [isOpen])

  // Trigger stars pop animation sequentially after reveal
  useEffect(() => {
    if (phase === 'reveal') {
      const timers = [100, 300, 500, 700, 900].map((delay, index) =>
        setTimeout(() => {
          setStarsVisible((prev) => {
            const next = [...prev]
            next[index] = true
            return next
          })
        }, delay)
      )
      return () => timers.forEach(clearTimeout)
    }
  }, [phase])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center select-none font-body">
        {/* PHASE 1: METEOR */}
        {phase === 'meteor' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Dark starry background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80" />
            
            {/* The Shooting Star (Meteor) */}
            <div 
              className="absolute w-[500px] h-[4px] bg-gradient-to-r from-transparent via-fontaine-cyan to-fontaine-gold rounded-full blur-[1px] pointer-events-none"
              style={{
                animation: 'meteor-fly 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                transformOrigin: 'left center',
              }}
            />
            
            {/* Glow Head of the Meteor */}
            <div 
              className="absolute w-6 h-6 rounded-full bg-white border-4 border-fontaine-gold shadow-[0_0_30px_rgba(201,168,76,1)] pointer-events-none"
              style={{
                animation: 'meteor-head-fly 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              }}
            />
          </div>
        )}

        {/* PHASE 2: FLASH */}
        {phase === 'flash' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-[110]"
            transition={{ duration: 0.15 }}
          />
        )}

        {/* PHASE 3: CHARACTER REVEAL */}
        {phase === 'reveal' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center relative">
            {/* Rotating light rays background */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
              <div className="absolute w-[200vw] h-[200vw] bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.15)_0%,_transparent_60%)] pointer-events-none" />
              <div 
                className="absolute w-[150vw] h-[150vw] opacity-35 pointer-events-none"
                style={{
                  backgroundImage: 'conic-gradient(from 0deg, transparent, rgba(201,168,76,0.4) 10deg, transparent 20deg, transparent 40deg, rgba(201,168,76,0.4) 50deg, transparent 60deg, transparent 90deg, rgba(201,168,76,0.4) 100deg, transparent 110deg, transparent 180deg, rgba(201,168,76,0.4) 190deg, transparent 200deg, transparent)',
                  animation: 'spin-slow 25s linear infinite',
                }}
              />
            </div>

            {/* Content Container */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center justify-center max-w-4xl w-full px-6"
            >
              {/* Hydro Element Emblem */}
              <div className="mb-4 w-16 h-16 rounded-full bg-fontaine-navy/80 border border-fontaine-cyan/40 flex items-center justify-center shadow-lg shadow-fontaine-cyan/20 animate-pulse">
                <svg className="w-10 h-10 text-fontaine-cyan fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>

              {/* Elegant Character Photo Frame */}
              <div className="relative group mb-6">
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
              <h2 className="font-display text-4xl md:text-5xl text-fontaine-light-gold mb-1 text-center tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                YUDISTIRA SYAPUTRA
              </h2>
              
              <p className="font-heading text-lg md:text-xl text-fontaine-cyan mb-4 font-semibold tracking-widest text-center">
                ✦ VISION DEVELOPER ✦
              </p>

              {/* 5 Stars pop animation */}
              <div className="flex gap-2 text-2xl md:text-3xl text-fontaine-gold mb-8 drop-shadow-[0_0_8px_rgba(201,168,76,0.8)]">
                {starsVisible.map((visible, i) => (
                  <span
                    key={i}
                    className="transition-all duration-300 transform"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'scale(1)' : 'scale(0) rotate(-45deg)',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Click anywhere to skip */}
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-fontaine-gold hover:bg-fontaine-light-gold text-fontaine-navy font-bold shadow-lg shadow-fontaine-gold/30 hover:scale-105 transition-all duration-200"
              >
                Enter Domain
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>
  )
}
