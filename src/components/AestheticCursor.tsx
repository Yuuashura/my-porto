import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

const finePointer = '(hover: hover) and (pointer: fine)'
const interactive = 'a, button, [data-cursor], [role="button"], label'

/** Dot + trailing ring. Only for mouse users; touch keeps the native cursor. */
export function AestheticCursor() {
  const [enabled, setEnabled] = useState(() => window.matchMedia(finePointer).matches)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const query = window.matchMedia(finePointer)
    const update = () => setEnabled(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!enabled || !dot || !ring || !label) return

    const root = document.documentElement
    root.classList.add('has-cursor')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ringDuration = reduce ? 0 : 0.45
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' })
    const ringX = gsap.quickTo(ring, 'x', { duration: ringDuration, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: ringDuration, ease: 'power3' })

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      root.classList.add('cursor-visible')
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
    }
    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>(interactive)
      ring.classList.toggle('is-hover', Boolean(target))
      label.textContent = target?.dataset.cursor ?? ''
      ring.classList.toggle('has-label', Boolean(target?.dataset.cursor))
    }
    const onDown = () => ring.classList.add('is-press')
    const onUp = () => ring.classList.remove('is-press')
    const onLeave = () => root.classList.remove('cursor-visible')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      root.classList.remove('has-cursor', 'cursor-visible')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
