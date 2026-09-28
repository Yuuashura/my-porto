import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '../lib/gsap'

const desktopMotionQuery = '(min-width: 781px) and (hover: hover) and (pointer: fine)'

export function useDesktopMotion() {
  const shouldReduceMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(desktopMotionQuery).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopMotionQuery)
    const update = () => setIsDesktop(mediaQuery.matches)

    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return isDesktop && !shouldReduceMotion
}

export function useSmoothScroll(paused: boolean) {
  const shouldReduceMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopMotionQuery)
    // Lenis is driven by the GSAP ticker so ScrollTrigger pins and smooth scroll share one clock.
    const tick = (time: number) => lenisRef.current?.raf(time * 1000)

    const destroyLenis = () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
    }

    const initializeLenis = () => {
      destroyLenis()
      if (!mediaQuery.matches || shouldReduceMotion) return

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.07,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
        anchors: {
          offset: 0,
        },
      })
      lenis.on('scroll', ScrollTrigger.update)
      lenisRef.current = lenis
    }

    initializeLenis()
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    mediaQuery.addEventListener('change', initializeLenis)

    return () => {
      mediaQuery.removeEventListener('change', initializeLenis)
      gsap.ticker.remove(tick)
      destroyLenis()
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!lenisRef.current) return
    if (paused) {
      lenisRef.current.stop()
    } else {
      lenisRef.current.start()
    }
  }, [paused])

  return lenisRef
}
