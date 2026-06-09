import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Tentang', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Kontak', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((l) => l.href.slice(1))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(`#${id}`)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-fontaine-navy/80 backdrop-blur-lg shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo('#hero')}
          className="font-display text-xl text-fontaine-gold hover:text-fontaine-light-gold transition-colors"
        >
          ✦ Yudistira
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === link.href
                  ? 'text-fontaine-cyan bg-fontaine-cyan/10'
                  : 'text-fontaine-cream/70 hover:text-fontaine-cream hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo('#contact')}
          className="hidden md:block px-5 py-2 rounded-lg text-sm font-semibold bg-fontaine-gold text-fontaine-navy hover:bg-fontaine-light-gold transition-colors"
        >
          Hire Me
        </button>
      </div>
    </nav>
  )
}
