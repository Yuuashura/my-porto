import { useEffect, useRef } from 'react'

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      barRef.current.style.width = `${progress}%`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-16 left-0 right-0 h-[3px] z-50 bg-fontaine-navy/50">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-fontaine-teal via-fontaine-cyan to-fontaine-gold shadow-[0_0_12px_rgba(126,200,227,0.5)] transition-none"
        style={{ width: '0%' }}
      />
    </div>
  )
}
