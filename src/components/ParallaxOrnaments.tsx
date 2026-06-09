import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { animate } from 'animejs'

interface Ornament {
  id: number
  type: 'circle' | 'diamond' | 'hex' | 'ring'
  x: number
  y: number
  size: number
  color: string
  delay: number
}

const ornaments: Ornament[] = [
  { id: 1, type: 'circle', x: 10, y: 20, size: 40, color: '#7EC8E3', delay: 0 },
  { id: 2, type: 'diamond', x: 85, y: 30, size: 30, color: '#C9A84C', delay: 0.5 },
  { id: 3, type: 'hex', x: 15, y: 60, size: 35, color: '#7EC8E3', delay: 1 },
  { id: 4, type: 'ring', x: 90, y: 70, size: 50, color: '#C9A84C', delay: 1.5 },
  { id: 5, type: 'circle', x: 50, y: 15, size: 20, color: '#1A6B8A', delay: 2 },
  { id: 6, type: 'diamond', x: 75, y: 85, size: 25, color: '#7EC8E3', delay: 2.5 },
]

export default function ParallaxOrnaments() {
  const [scrollY, setScrollY] = useState(0)
  const ornamentRefs = useRef<(HTMLDivElement | null)[]>([])
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!inView) return
    ornamentRefs.current.forEach((el, i) => {
      if (!el) return
      animate(el, {
        opacity: [0, 0.3],
        scale: [0.5, 1],
        ease: 'outQuad',
        duration: 1200,
        delay: ornaments[i].delay * 800,
      })
    })
  }, [inView])

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {ornaments.map((orn, i) => {
        const parallaxSpeed = (i % 3 + 1) * 0.03
        const yOffset = scrollY * parallaxSpeed
        const rotateOffset = scrollY * (0.02 + i * 0.005)

        return (
          <div
            key={orn.id}
            ref={(el) => { ornamentRefs.current[i] = el }}
            className="absolute opacity-0"
            style={{
              left: `${orn.x}%`,
              top: `${orn.y}%`,
              transform: `translateY(${yOffset}px) rotate(${rotateOffset}deg)`,
              transition: 'transform 0.1s linear',
            }}
          >
            <svg width={orn.size} height={orn.size} viewBox="0 0 50 50">
              {orn.type === 'circle' && (
                <circle cx="25" cy="25" r="20" fill="none" stroke={orn.color} strokeWidth="1" opacity="0.4" />
              )}
              {orn.type === 'diamond' && (
                <polygon
                  points="25,3 47,25 25,47 3,25"
                  fill="none"
                  stroke={orn.color}
                  strokeWidth="1"
                  opacity="0.3"
                />
              )}
              {orn.type === 'hex' && (
                <polygon
                  points="25,2 46,13.5 46,36.5 25,48 4,36.5 4,13.5"
                  fill="none"
                  stroke={orn.color}
                  strokeWidth="0.8"
                  opacity="0.3"
                />
              )}
              {orn.type === 'ring' && (
                <>
                  <circle cx="25" cy="25" r="20" fill="none" stroke={orn.color} strokeWidth="0.8" opacity="0.2" />
                  <circle cx="25" cy="25" r="10" fill="none" stroke={orn.color} strokeWidth="0.5" opacity="0.15" />
                </>
              )}
            </svg>
          </div>
        )
      })}
    </div>
  )
}
