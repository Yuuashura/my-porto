import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

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

    const destroyLenis = () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
    }

    const initializeLenis = () => {
      destroyLenis()
      if (!mediaQuery.matches || shouldReduceMotion) return

      lenisRef.current = new Lenis({
        autoRaf: true,
        lerp: 0.07,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
        anchors: {
          offset: 0,
        },
      })
    }

    initializeLenis()
    mediaQuery.addEventListener('change', initializeLenis)

    return () => {
      mediaQuery.removeEventListener('change', initializeLenis)
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
