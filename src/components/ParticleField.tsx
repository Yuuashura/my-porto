import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  drift: number
  speed: number
  phase: number
  color: string
}

// Palette at low alpha: mauve, rose, charcoal.
const colors = ['rgba(226, 180, 189, 0.55)', 'rgba(247, 214, 208, 0.7)', 'rgba(74, 74, 74, 0.14)']

/** Soft dust floating upward. Drawn as a fixed overlay so it shows over the opaque stacked sections. */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let particles: Particle[] = []
    let frame = 0
    let width = 0
    let height = 0

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = width < 780 ? 24 : 45
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        drift: Math.random() * 12 + 4,
        speed: Math.random() * 0.25 + 0.08,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const particle of particles) {
        const x = particle.x + Math.sin(time / 2400 + particle.phase) * particle.drift
        ctx.beginPath()
        ctx.arc(x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      }
    }

    const loop = (time: number) => {
      for (const particle of particles) {
        particle.y -= particle.speed
        if (particle.y < -10) {
          particle.y = height + 10
          particle.x = Math.random() * width
        }
      }
      draw(time)
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(frame)
      if (reduce) draw(0)
      else if (!document.hidden) frame = requestAnimationFrame(loop)
    }
    const onResize = () => {
      init()
      start()
    }

    init()
    start()
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', start)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', start)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
